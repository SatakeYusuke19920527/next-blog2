import Router from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { error, no_error, selectError } from '../features/errorSlice';
import { selectUser } from '../features/userSlice';
import { useLoginCheck } from '../hooks/useLoginCheck';
import { useAppDispatch, useAppSelector } from '../hooks/useRTK';
import { getErrorText } from '../models/error/errorApplicationService';
import { resetPassword } from '../models/user/userApplicationService';
const ResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const err = useAppSelector(selectError);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isLogin = useLoginCheck();

  useEffect(() => {
    if (isLogin) {
      console.log('🚀 ~ file: register.tsx:30 ~ useEffect ~ isLogin', isLogin);
      Router.push('/');
    } else {
      console.log('🚀 ~ file: register.tsx:33 ~ useEffect ~ isLogin', isLogin);
    }
  }, [isLogin]);

  const resetPasswordByFirebase = async () => {
    setIsLoading(true);
    const err = await resetPassword(email);  
    console.log("🚀 ~ file: resetPassword.tsx:31 ~ resetPasswordByFirebase ~ err", err)
    if (err !== undefined) {
      const errMessage = getErrorText(err as string);
      console.log(
        '🚀 ~ file: register.tsx:17 ~ createUserByFirebaseAuth ~ err',
        errMessage
      );
      dispatch(
        error({
          code: err,
          message: errMessage,
        })
      );
    } else {
      dispatch(no_error());
    }
    setIsLoading(false);
    window.alert("メールアドレス再設定用のメールを送信しました。メール本文のリンクよりパスワードの再設定を行ってください。")
  };

  return (
    <Layout>
      <div className="w-full h-full pt-12 flex flex-col  justify-center items-center">
        <h2 className="text-gray-600 text-10s text-left mb-5">
          パスワード再設定
        </h2>
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                メールアドレスを入力してください。
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="email"
                placeholder="メールアドレス"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          {err.message !== '' ? (
            <div className="text-sm font-semibold mt-2 pt-1 mb-0">
              <p className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                {err.message}
              </p>
            </div>
          ) : null}

          <div className="w-full px-3 md:flex md:items-center">
            <div className="w-full">
              <button
                className="w-full shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={resetPasswordByFirebase}
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin h-5 w-5 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                  </div>
                ) : (
                  'パスワード再設定'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPassword;

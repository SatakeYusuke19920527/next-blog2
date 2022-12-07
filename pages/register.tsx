import { useState } from 'react';
import Layout from '../components/Layout';
import { error, no_error, selectError } from '../features/errorSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useRTK';
import { getErrorText } from '../models/error/errorApplicationService';
import { createUser } from '../models/user/userApplicationService';
const Register = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const err = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  
  const createUserByFirebaseAuth = async () => {
    setIsLoading(true);
    const err = await createUser(email, password, displayName);
    console.log("🚀 ~ file: register.tsx:17 ~ createUserByFirebaseAuth ~ err", err)
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
  }

  return (
    <Layout>
      <div className="w-full h-full pt-12 flex flex-col  justify-center items-center">
        <h2 className="text-gray-600 text-10s text-left">ユーザ登録</h2>
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                ユーザ名
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="userid"
                type="text"
                placeholder="ユーザ名"
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                E-mail
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="email"
                placeholder="ご使用されるメールアドレスを入力してください"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                パスワード
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="password"
                type="password"
                placeholder="ご使用されるパスワードを入力してください"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
                placeholder="住所"
              >
                住所
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="address"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
                placeholder="電話番号"
              >
                電話番号
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="phonenumber"
                type="number"
              />
              <p className="text-gray-600 text-xs italic">ハイフンは不要</p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
                placeholder="業種"
              >
                業種
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="industry"
                type="type"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                会社名
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="company"
                type="text"
                placeholder="会社名"
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
                onClick={createUserByFirebaseAuth}
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin h-5 w-5 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                  </div>
                ) : (
                  '登録'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;

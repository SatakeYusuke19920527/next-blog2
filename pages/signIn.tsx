import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { error, no_error, selectError } from '../features/errorSlice';
import { useLoginCheck } from '../hooks/useLoginCheck';
import { useAppDispatch, useAppSelector } from '../hooks/useRTK';
import { getErrorText } from '../models/error/errorApplicationService';
import { login } from '../models/user/userApplicationService';

const signIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const isLogin = useLoginCheck();
  const err = useAppSelector(selectError);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  useEffect(() => {
    if (isLogin) {
      console.log('🚀 ~ file: signIn.tsx:16 ~ signIn ~ isLogin', isLogin);
      Router.push('/');
    } else {
      console.log('🚀 ~ file: signIn.tsx:16 ~ signIn ~ isLogin', isLogin);
    }
  }, [isLogin]);
  
  const loginByFirebaseAuth = async () => {
    setIsLoading(true)
    const err = await login(email, password);
    if (err !== undefined) {
      const errMessage = getErrorText(err as string);
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
  };
  return (
    <Layout>
      <section className="h-auto">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                {/* <!-- Email input --> */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                {err.message !== '' ? (
                  <div className="text-sm font-semibold mt-2 pt-1 mb-0">
                    <p className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                      {err.message}
                    </p>
                  </div>
                ) : null}
                <div className="text-center lg:text-left">
                  <button
                    type="button"
                    onClick={loginByFirebaseAuth}
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    {isLoading ? (
                      <div className="flex justify-center">
                        <div className="animate-spin h-5 w-5 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                      </div>
                    ) : (
                      'Login'
                    )}
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    新規ユーザー登録は
                    <Link
                      href="/register"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      こちら
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default signIn
import { useState } from 'react';
import Layout from '../components/Layout';
import { error, no_error, selectError } from '../features/errorSlice';
import { selectPage } from '../features/pageSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useRTK';
import { getErrorText } from '../models/error/errorApplicationService';
import { sendEmail } from '../models/mail/mailApplicationService';
import { auth } from '../plugins/firebase';
import { MailType } from '../types/types';

const Contact = () => {
  const [uname, setUname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const err = useAppSelector(selectError);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendEmailByFirebase = async () => {
    setIsLoading(true);
    const uid = auth.currentUser?.uid;
    const mailObj: MailType = {
      uid,
      uname,
      email,
      content,
      project: page.title !== "" ? page.title : "",
      url: page.url !== "" ? page.url : ""
    };
    const err = await sendEmail(mailObj);
    console.log('🚀 ~ file: contact.tsx:22 ~ sendEmail ~ err', err);
    if (err !== undefined) {
      const errMessage = getErrorText(err as string);
      console.log(
        '🚀 ~ file: contact.tsx:32 ~ sendEmailByFirebase ~ errMessage',
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
      setUname('');
      setEmail('');
      setContent('');
      window.alert('送信完了しました。');
    }
    setIsLoading(false);
  };

  const renderTitle = () => {
    return page.title !== "" ? (
      <h2 className="text-gray-600 text-lg text-left">
        { page.title }のお問合せ
      </h2>
    ) : null
  }

  return (
    <Layout>
      <div className="w-full h-full pt-12 flex flex-col  justify-center items-center">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            {renderTitle()}
            <div className="w-full px-3 py-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                名前
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="nick"
                type="text"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                メールアドレス
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                お問合せ内容
              </label>
              <textarea
                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                placeholder="例)詳細内容についてプレゼンしてほしい 等"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
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
                onClick={sendEmailByFirebase}
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin h-5 w-5 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                  </div>
                ) : (
                  'お問合せ'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;

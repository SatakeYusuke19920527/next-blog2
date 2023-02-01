import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Timeline } from 'react-twitter-widgets';
import Card from '../components/Card';
import InnerNavbar from '../components/InnerNavbar';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import Search from '../components/Search';
import { get_pages, selectPage } from '../features/pageSlice';
import { useLoginCheck } from '../hooks/useLoginCheck';
import { useAppDispatch, useAppSelector } from '../hooks/useRTK';
import useWindowSize from '../hooks/useWindowSize';
import { IndexProps } from '../types/types';
import { fetchPages } from '../utils/notion';

// export const getStaticProps: GetStaticProps = async () => {
//   const {results} = await fetchPages({});
//   return {
//     props: {
//       pages: results ? results : []
//     },
//     revalidate: 10
//   }
// }

export const getServerSideProps: GetServerSideProps = async () => {
  const { results } = await fetchPages({});
  return {
    props: {
      pages: results ? results : [],
    },
  };
};

const Home: NextPage<IndexProps> = ({ pages }) => {
  const isUser = useLoginCheck();
  const dispatch = useAppDispatch();
  const displayPages = useAppSelector(selectPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [width] = useWindowSize();

  useEffect(() => {
    dispatch(get_pages(pages));
    console.log(
      '🚀 ~ file: index.tsx:21 ~ isUser ~ login check : [',
      isUser,
      ']'
    );
  }, [pages]);

  const renderLoading = () => (
    <div className="w-full flex justify-center items-center h-60">
      <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
      <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full mx-4"></div>
      <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
    </div>
  );

  return (
    <Layout>
      <div className="w-full">
        <div className="pt-8 grid lg:grid-cols-10 md:grid-cols-1 items-start container-fluid gap-6">
          <div className="rounded-md lg:col-span-2 md:col-span-1 gap-6 h-full">
            <Search setIsLoading={setIsLoading} />
            <div
              className="w-full mt-5 border-gray-300  shadow-lg rounded-lg"
              style={{ display: width < 600 ? 'none' : 'block' }}
            >
              <Timeline
                dataSource={{
                  sourceType: 'profile',
                  screenName: 'seikei_poratl',
                }}
                options={{
                  height: '600',
                }}
              />
            </div>
          </div>
          <div className="grid lg:col-span-8 ">
            <InnerNavbar setIsLoading={setIsLoading} />
            <Loader />
            {isLoading ? (
              renderLoading()
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 w-full gap-6">
                {displayPages &&
                  displayPages.map((page, index) => (
                    <Card key={index} page={page} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

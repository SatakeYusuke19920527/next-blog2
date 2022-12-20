import type { GetStaticProps, NextPage } from 'next';
import Card from '../components/Card';
import Layout from '../components/Layout';
import Search from '../components/Search';
import { useLoginCheck } from '../hooks/useLoginCheck';
import { IndexProps } from '../types/types';
import { fetchPages } from '../utils/notion';

export const getStaticProps: GetStaticProps = async () => {
  const {results} = await fetchPages({});
  return {
    props: {
      pages: results ? results : []
    },
    revalidate: 10
  }
}

const Home: NextPage<IndexProps> = ({ pages }) => {
  const isUser = useLoginCheck();
  console.log(
    '🚀 ~ file: index.tsx:21 ~ isUser ~ login check : [',
    isUser,
    ']'
  );
  
  return (
    <Layout>
      <div className="w-full pt-8 grid lg:grid-cols-10 md:grid-cols-1  container-fluid gap-6">
        <div className="rounded-md lg:col-span-2 md:col-span-1 gap-6 h-full">
          <Search />
        </div>
        <div className="grid lg:col-span-8 lg:grid-cols-3 md:grid-cols-2 w-full gap-6">
          {/* Card */}
          {pages.map((page, index) => (
            <Card key={index} page={page} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
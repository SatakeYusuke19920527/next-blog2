import type { GetStaticProps, NextPage } from 'next';
import Card from '../components/Card';
import Layout from '../components/Layout';
import Search from '../components/Search';
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
  console.log('🚀 ~ file: index.tsx ~ line 19 ~ pages', pages);

  return (
    <Layout>
      <div className="w-full pt-8">
        <Search />
        <div className="grid md:gap-6 mt-10 md:grid-cols-3 w-full my-12">
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
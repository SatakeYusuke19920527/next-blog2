import type { NextPage } from 'next';
import Card from '../components/Card';
import Layout from '../components/Layout';
import { sampleCards } from '../utils/sample';

const Home:NextPage = () => {
  return (
    <Layout>
      <div className="w-full  pt-12">
        <h1 className="mb-8">
          検索を配置予定
        </h1>
        <div className="grid md:gap-6 mt-10 md:grid-cols-3 w-full my-12">
          {/* Card */}
          {sampleCards.map((page, index) => (
            <Card key={index} page={page} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
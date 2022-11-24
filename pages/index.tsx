import type { NextPage } from 'next';
import Card from '../components/Card';
import Layout from '../components/Layout';
import Search from '../components/Search';
import { sampleCards } from '../utils/sample';

const Home:NextPage = () => {
  return (
    <Layout>
      <div className="w-full pt-8">
        <Search />
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
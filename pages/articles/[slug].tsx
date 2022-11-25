import type { NextPage } from "next";
import { GetServerSideProps } from 'next';
import ArticleMeta from '../../components/ArticleMeta';
import Layout from '../../components/Layout';
import { ArticleMetaProps, Params } from '../../types/types';
import { sampleCards } from '../../utils/sample';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log("🚀 ~ file: [slug].tsx ~ line 6 ~ constgetServerSideProps:GetServerSideProps= ~ ctx", ctx)
  const { slug } = ctx.params as Params;
  const page = sampleCards.find((data) => data.slug === slug);
  return {
    props: {
      page
    }
  }
}

const Article: NextPage<ArticleMetaProps> = ({page}) => {
  return (
    <Layout>
      <article className="items-center max-w-2xl w-full mx-auto">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>
        {/* article */}
        <div className="my-12">article {page.content}</div>
      </article>
    </Layout>
  );
};

export default Article;

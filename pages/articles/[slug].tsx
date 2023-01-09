import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NotionBlocks from 'notion-block-renderer';
import { useEffect } from 'react';
import ArticleMeta from '../../components/ArticleMeta';
import Layout from '../../components/Layout';
import { selectError } from '../../features/errorSlice';
import { selectPageInfo } from '../../features/selectedPageSlice';
import { useLoginCheck } from '../../hooks/useLoginCheck';
import { useAppDispatch, useAppSelector } from '../../hooks/useRTK';
import { ArticleProps, Params, SelectPageInfoType } from '../../types/types';
import { fetchBlocksByPageId, fetchPages } from '../../utils/notion';
import { getText } from '../../utils/property';

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchPages({});
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: getText(page.properties.slug.rich_text),
      },
    };
  });
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;
  const { results } = await fetchPages({ slug: slug });
  const page = results[0];
  const pageId = page.id;
  const { results: blocks } = await fetchBlocksByPageId(pageId);
  return {
    props: {
      page: page,
      blocks: blocks,
    },
    revalidate: 10,
  };
};

const Article: NextPage<ArticleProps> = ({ page, blocks }) => {
  console.log("🚀 ~ file: [slug].tsx:46 ~ blocks", blocks)
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLogin = useLoginCheck();
  const err = useAppSelector(selectError);

  useEffect(() => {
    const title = getText(page.properties.name.title) as string;
    const url = `https://next-blog2-zeta.vercel.app/articles/${getText(
      page.properties.slug.rich_text
    )}`;
    const pageInfoObj: SelectPageInfoType = {
      title,
      url,
    };
    dispatch(selectPageInfo(pageInfoObj));
  }, []);

  const moveTocontact = async () => {
    router.push(`/contact`);
  };

  const moveToSignIn = () => {
    router.push(`/signIn`);
  }

  return isLogin ? (
    <Layout>
      <article className="items-center max-w-2xl w-full mx-auto">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>
        {/* article */}
        <div className="my-12">
          <NotionBlocks
            blocks={blocks}
            isCodeHighlighter={false}
            // syntaxHighlighterCSS={tomorrowNightBright}
          />
        </div>
        <div className="w-full px-3 md:flex md:items-center">
          {err.message !== '' ? (
            <div className="text-sm font-semibold mt-2 pt-1 mb-0">
              <p className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                {err.message}
              </p>
            </div>
          ) : null}
          <div className="w-full">
            <button
              className="w-full shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={moveTocontact}
            >
              お問合せ
            </button>
          </div>
        </div>
      </article>
    </Layout>
  ) : (
    <Layout>
      <article className="items-center max-w-2xl w-full mx-auto">
        <div className="w-full">
          <h4 className="mt-10">詳細ページはログイン後閲覧可能となります。</h4>
          <button
            className="shadow mt-5 bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={moveToSignIn}
          >
            ログインページへ移動
          </button>
        </div>
      </article>
    </Layout>
  );
};

export default Article;

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Router from 'next/router';
import NotionBlocks from 'notion-block-renderer';
import { useState } from "react";
import ArticleMeta from '../../components/ArticleMeta';
import Layout from '../../components/Layout';
import { selectError } from "../../features/errorSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRTK";
import { ArticleProps, Params } from '../../types/types';
import { fetchBlocksByPageId, fetchPages } from "../../utils/notion";
import { getText } from "../../utils/property";

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchPages({})
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: getText(page.properties.slug.rich_text)
      }
    }
  })
  return {
    paths,
    fallback: "blocking"
  }
}

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
  const [uname, setUname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const dispatch = useAppDispatch();
  const err = useAppSelector(selectError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const moveTocontact = async () => {
    Router.push(`/contact/${getText(page.properties.slug.rich_text)}`);
  };
  return (
    <Layout>
      <article className="items-center max-w-2xl w-full mx-auto">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>
        {/* article */}
        <div className="my-12">
          <NotionBlocks blocks={blocks} isCodeHighlighter={true} />
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
      </article>
    </Layout>
  );
};

export default Article;

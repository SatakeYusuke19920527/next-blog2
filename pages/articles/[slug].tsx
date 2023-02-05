import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ArticleMeta from '../../components/ArticleMeta';
import Block from '../../components/Block';
import Layout from '../../components/Layout';
import { selectError } from '../../features/errorSlice';
import { selectPageInfo } from '../../features/selectedPageSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRTK';
import { ArticleProps, Params, SelectPageInfoType } from '../../types/types';
import {
  fetchBlocksByPageId,
  fetchPages,
  getColumnListChildrenAllInBlockByBlocks,
  getTableChildrenAllInBlockByBlocks,
} from '../../utils/notion';
import { getText } from '../../utils/property';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params as Params;
  const { results } = await fetchPages({ slug: slug });
  const page = results[0];
  const pageId = page.id;
  const { results: blocks } = await fetchBlocksByPageId(pageId);
  const tableData = await getTableChildrenAllInBlockByBlocks(blocks);
  const columnListData = await getColumnListChildrenAllInBlockByBlocks(blocks);
  return {
    props: {
      page: page,
      blocks: blocks,
      tableData: tableData,
      columnListData: columnListData,
    },
  };
};

const Article: NextPage<ArticleProps> = ({
  page,
  blocks,
  tableData,
  columnListData,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
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

  return (
    <Layout>
      <article className="items-center max-w-2xl w-full mx-auto bg-white m-5 md:p-10 p-3">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>
        {/* お問合せボタン */}
        <div className="w-full flex justify-center items-center">
          <button
            className="w-8/12 shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={moveTocontact}
          >
            カタログ依頼・お問合せ
          </button>
        </div>
        {/* article */}
        <div className="my-12 animate-slide-in-bck-center flex justify-center">
          <Block
            blocks={blocks}
            tableData={tableData}
            columnListData={columnListData}
          />
        </div>
        {/* お問合せボタン */}
        <div className="w-full flex justify-center items-center">
          <button
            className="w-8/12 shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={moveTocontact}
          >
            カタログ依頼・お問合せ
          </button>
        </div>
        <div className="w-full px-3 md:flex md:items-center">
          {err.message !== '' ? (
            <div className="text-sm font-semibold mt-2 pt-1 mb-0">
              <p className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                {err.message}
              </p>
            </div>
          ) : null}
        </div>
        <br />
      </article>
    </Layout>
  );
};

export default Article;

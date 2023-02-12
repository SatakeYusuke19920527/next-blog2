import Image from 'next/image';
import { FC } from 'react';
import Youtube from 'react-youtube';
import { BlockProps, ColumnType } from '../types/types';
import { removeDuplicates } from '../utils/notion';
import { getBackgroundColor, getText } from '../utils/property';
import Table from './notion/Table';

const Block: FC<BlockProps> = ({ blocks, tableData, columnListData }) => {
  const renderNotionBlock = (block: any) => {
    switch (block.type) {
      case 'heading_1':
        const dicideHeading1Color = (): string => {
          if (block.heading_1.color !== 'default') {
            return block.heading_1.color;
          } else if (
            block.heading_1.rich_text[0].annotations.color !== 'default'
          ) {
            return block.heading_1.rich_text[0].annotations.color;
          } else {
            return 'default';
          }
        };
        return (
          <h1 style={{ color: getBackgroundColor(dicideHeading1Color()) }}>
            {getText(block.heading_1.rich_text)}
          </h1>
        );
      case 'heading_2':
        const dicideHeading2Color = (): string => {
          if (block.heading_2.color !== 'default') {
            return block.heading_2.color;
          } else if (
            block.heading_2.rich_text[0].annotations.color !== 'default'
          ) {
            return block.heading_2.rich_text[0].annotations.color;
          } else {
            return 'default';
          }
        };
        return (
          <h2 style={{ color: getBackgroundColor(dicideHeading2Color()) }}>
            {getText(block.heading_2.rich_text)}
          </h2>
        );
      case 'paragraph':
        if (block.paragraph.rich_text.length !== 0) {
          return (
            <pre
              className="text-lg whitespace-pre-wrap mb-0"
              style={{
                color: getBackgroundColor(
                  block.paragraph.rich_text[0].annotations.color
                ),
              }}
            >
              {getText(block.paragraph.rich_text)}
            </pre>
          );
        } else {
          return (
            <p className="text-lg">{getText(block.paragraph.rich_text)}</p>
          );
        }

      case 'divider':
        return (
          <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300" />
        );
      case 'callout':
        return (
          <div
            style={{
              backgroundColor: getBackgroundColor(block.callout.color),
            }}
            className="flex justify-start items-start"
          >
            <p className="mb-0 p-3 text-xl">{block.callout.icon.emoji}</p>
            <p className="mb-0 p-3 text-xl">
              {getText(block.callout.rich_text)}
            </p>
          </div>
        );
      case 'code':
        return (
          <div
            style={{
              backgroundColor: '#F7F6F3',
            }}
            className="p-5 my-3"
          >
            <pre className="whitespace-pre-wrap mb-0">
              {getText(block.code.rich_text)}
            </pre>
          </div>
        );
      case 'bulleted_list_item':
        return (
          <ul className="my-3">
            {block.bulleted_list_item.rich_text.map(
              (bli: any, index: number) => {
                return <li key={index}>・ {bli.plain_text}</li>;
              }
            )}
          </ul>
        );
      case 'image':
        const renderCaption = () => {
          if (block.image.caption.length !== 0) {
            return (
              <pre className="whitespace-pre-wrap mb-0 text-gray-500 text-sm">
                {block.image.caption[0].plain_text}
              </pre>
            );
          } else {
            return null;
          }
        };
        if (block.image.file) {
          return (
            <div className="w-full my-3">
              <Image
                width={1000}
                height={700}
                src={block.image.file.url}
                alt={block.image.type}
                unoptimized
              />
              {renderCaption()}
            </div>
          );
        } else if (block.image.external) {
          return (
            <div className="w-full my-3">
              <Image
                width={500}
                height={500}
                src={block.image.external.url}
                alt={block.image.type}
                unoptimized
              />
              {renderCaption()}
            </div>
          );
        } else {
          return null;
        }
      case 'video':
        let videoUrl = '';
        const videoFullUrl = block.video.external.url;
        videoUrl = videoFullUrl.substring(videoFullUrl.indexOf('v=') + 2);
        return (
          <div className="w-full my-3">
            <Youtube
              iframeClassName="w-full sm:h-96 h-full"
              videoId={videoUrl}
            />
          </div>
        );
      case 'bookmark':
        let bookmarkName: string = '';
        if (block.bookmark.caption.length !== 0) {
          bookmarkName = block.bookmark.caption[0].plain_text;
        } else {
          bookmarkName = block.bookmark.url;
        }
        return (
          <div className="w-full my-5">
            <a
              href={block.bookmark.url}
              className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="flex-grow-0 mr-2">
                <Image
                  width={20}
                  height={20}
                  src={`http://www.google.com/s2/favicons?domain=${block.bookmark.url}`}
                  alt="block.bookmark.url"
                  unoptimized
                />
              </div>
              <p className="flex-grow-1 font-normal mb-0 text-blue-700 truncate whitespace-nowrap">
                {bookmarkName}
              </p>
            </a>
          </div>
        );
      case 'quote':
        return (
          <div
            className="border-l-2 border-gray-900"
            style={{
              borderColor: getBackgroundColor(block.quote.color),
            }}
          >
            <pre
              className="my-3 text-xl pl-3 whitespace-pre-wrap"
              style={{
                color: getBackgroundColor(block.quote.color),
              }}
            >
              {getText(block.quote.rich_text)}
            </pre>
          </div>
        );
      case 'table':
        return <Table block={block} tableData={tableData} />;
      case 'column_list':
        const renderColumnList = () => {
          const parentIds: string[] = [];
          const displayColumnList: ColumnType[] = [];
          columnListData.column_list_data.map((clData) => {
            if (block.id === clData.parent.block_id) {
              parentIds.push(clData.id);
            }
          });
          parentIds.forEach((pid) => {
            columnListData.column_data.forEach((cdata) => {
              if (pid === cdata.parent.block_id) {
                displayColumnList.push(cdata);
              }
            });
          });
          const NoDupDisplayColumnList = removeDuplicates(
            displayColumnList,
            'id'
          );

          return NoDupDisplayColumnList.map((dclist, index) => {
            const imageUrl = dclist.image.file
              ? dclist.image.file.url
              : dclist.image.external.url;
            return (
              <div key={index} className="w-1/2 px-1 my-3">
                <Image
                  width={500}
                  height={500}
                  key={index}
                  src={imageUrl}
                  alt={dclist.image.type}
                  className="w-full"
                  unoptimized
                />
                {dclist.image?.caption.length >= 0 ? (
                  <pre className="whitespace-pre-wrap mt-1 mb-0 text-gray-500 text-sm">
                    {dclist.image.caption[0].plain_text}
                  </pre>
                ) : null}
              </div>
            );
          });
        };
        return (
          <div className="w-full flex justify-between flex-wrap">
            {renderColumnList()}
          </div>
        );
      default:
        console.log(`unknoen block type: ${block.type}`);
        return null;
      // debug用
      // return <div>unknown blockType : {block.type}</div>;
    }
  };
  return (
    <div>
      {blocks.map((block, index) => {
        return <div key={index}>{renderNotionBlock(block)}</div>;
      })}
    </div>
  );
};

export default Block;

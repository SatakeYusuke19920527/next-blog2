import Link from 'next/link';
import { FC } from 'react';
import Youtube from 'react-youtube';
import { BlockProps } from '../types/types';
import { renderNotionTable } from '../utils/notion';
import { getBackgroundColor, getText } from '../utils/property';

const Block: FC<BlockProps> = ({ blocks }) => {
  console.log("🚀 ~ file: Block.tsx:6 ~ blocks", blocks)
  const getData = async () => {
    const res = await renderNotionTable();
    console.log("🚀 ~ file: Block.tsx:12 ~ getData ~ res", res)
  }
  const renderNotionBlock = (block: any) => {
    switch (block.type) {
      case 'heading_1':
        return <h1>{getText(block.heading_1.rich_text)}</h1>;
      case 'heading_2':
        return (
          <h2 style={{ color: getBackgroundColor(block.heading_2.color) }}>
            {getText(block.heading_2.rich_text)}
          </h2>
        );
      case 'paragraph':
        return <p>{getText(block.paragraph.rich_text)}</p>;
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
            <p className="mb-0 p-3">{block.callout.icon.emoji}</p>
            <p className="mb-0 p-3">{getText(block.callout.rich_text)}</p>
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
            <p className="mb-0">{getText(block.code.rich_text)}</p>
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
        return (
          <div className="w-full my-3">
            <img src={block.image.file.url} alt={block.image.file.url} />
          </div>
        );
      case 'video':
        let videoUrl = '';
        const videoFullUrl = block.video.external.url;
        videoUrl = videoFullUrl.substring(videoFullUrl.indexOf('v=') + 2);
        return <Youtube videoId={videoUrl} />;
      case 'bookmark':
        return (
          <div>
            <Link className="text-blue-700 underline" href={block.bookmark.url}>
              {block.bookmark.url}
            </Link>
          </div>
        );
      case 'quote':
        return (
          <div className="border-l-2 border-gray-900">
            <p className="my-3 text-lg pl-3">
              {getText(block.quote.rich_text)}
            </p>
          </div>
        );
      // case 'table':
      //   return (
      //     <div className="border-l-2 border-gray-900">
      //       {/* {block.table.children.map((td: any, index: number) => {
      //         return (<div>{td}</div>)
      //       })} */}
      //       table 予定地
      //     </div>
      //   );
      default:
        console.log(`unknoen block type: ${block.type}`);
        return <div>unknown blockType : {block.type}</div>;
    }
  };
  return (
    <div>
      <button onClick={getData}>test</button>
      {blocks.map((block, index) => {
        return <div key={index}>{renderNotionBlock(block)}</div>;
      })}
    </div>
  );
  
};

export default Block;

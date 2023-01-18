import { FC } from 'react';
import Youtube from 'react-youtube';
import { BlockProps } from '../types/types';
import { getBackgroundColor, getText } from '../utils/property';

const Block: FC<BlockProps> = ({ blocks }) => {
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
        return <p className="text-lg">{getText(block.paragraph.rich_text)}</p>;
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
            <p className="mb-0 p-3 text-lg">{block.callout.icon.emoji}</p>
            <p className="mb-0 p-3 text-lg">
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
        if (block.image.file) {
          return  (
            <div className="w-full my-3">
              <img src={block.image.file.url} alt={block.image.type} />
            </div>
          )
        } else if (block.image.external) {
          return (
            <div className="w-full my-3">
              <img src={block.image.external.url} alt={block.image.type} />
            </div>
          );
        } else {
          return null
        }
      case 'video':
        let videoUrl = '';
        const videoFullUrl = block.video.external.url;
        videoUrl = videoFullUrl.substring(videoFullUrl.indexOf('v=') + 2);
        return (
          <div className="w-full">
            <Youtube
              iframeClassName="w-full sm:h-96 h-full"
              videoId={videoUrl}
            />
          </div>
        );
      case 'bookmark':
        let bookmarkName:string = ""
        if (block.bookmark.caption[0].length !== 0) {
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
                  <img
                    src={`http://www.google.com/s2/favicons?domain=${block.bookmark.url}`}
                    alt="block.bookmark.url"
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
          <div className="border-l-2 border-gray-900">
            <p className="my-3 text-lg pl-3">
              {getText(block.quote.rich_text)}
            </p>
          </div>
        );
      case 'table':
        // const renderHeader = () => {
        //   return tableData.results[0].table_row.cells.map((tr, index) => {
        //     return (
        //       <th scope="col" className="px-6 py-3" key={index}>
        //         {tr[0].text.content}
        //       </th>
        //     );
        //   });
        // }
        
        // const renderBody = () => (
        //   tableData.results.map((tr) => {
        //     const renderTd = () => {
        //       for (let i = 0; i <= block.table.table_width; i++) {
        //         return <td>test</td>;
        //       }
        //     }
        //     return <tr>{renderTd()}</tr>;
        //   })
        // )
        // return (
        //   <div className="my-5">
        //     <table className="w-full text-sm text-left text-gray-500 ">
        //       <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        //         <tr>{renderHeader()}</tr>
        //       </thead>
        //       <tbody>
        //         {/* <tr className="bg-white border-b">{renderBody()}</tr> */}
        //           {renderBody()}
        //       </tbody>
        //     </table>
        //   </div>
        // );
      default:
        console.log(`unknoen block type: ${block.type}`);
        return <div>unknown blockType : {block.type}</div>;
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

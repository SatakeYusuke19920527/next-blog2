import { FC } from 'react';
const Table: FC<any> = ({ block, tableData }) => {
  const renderTable = () => {
    return tableData.map((tbl: any, index: number) => {
      return block.id === tbl.parentId ? (
        <div key={index} className="w-full mt-3 mb-5">
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-base text-gray-500 ">
              <thead className=" text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  {tbl.tblData.length > 0 &&
                    tbl.tblData[0].table_row.cells.map(
                      (cell: any, index: number) => {
                        return (
                          <th scope="col" className="px-1" key={index}>
                            <pre className="whitespace-pre-wrap">
                              {cell[0].plain_text}
                            </pre>
                          </th>
                        );
                      }
                    )}
                </tr>
              </thead>
              <tbody>
                {tbl.tblData.slice(1).map((td: any, index: number) => {
                  return (
                    <tr key={index} className="bg-white border-b">
                      {td.table_row.cells.map((cell: any, index: number) => {
                        return cell[0] && cell[0].href !== null ? (
                          <td key={index} className="px-1 py-2">
                            <a href={cell[0].href}>{cell[0].href}</a>
                          </td>
                        ) : (
                          <td key={index} className="px-1">
                            <pre className="whitespace-pre-wrap">
                              {cell[0]?.plain_text}
                            </pre>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null;
    });
  };
  return renderTable();
};

export default Table;

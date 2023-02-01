import { FC } from 'react';
const Table: FC<any> = ({ tableData }) => {
  return tableData ? (
    <div className="w-full mt-3 mb-5">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              {tableData.length > 0 &&
                tableData[0].table_row.cells.map((cell: any, index: number) => {
                  return (
                    <th scope="col" className="px-1" key={index}>
                      <pre className="whitespace-pre-wrap">
                        {cell[0].plain_text}
                      </pre>
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {tableData.slice(1).map((td: any, index: number) => {
              return (
                <tr key={index} className="bg-white border-b">
                  {td.table_row.cells.map((cell: any, index: number) => {
                    return cell[0].href ? (
                      <td key={index} className="px-1 py-2">
                        <a href={cell[0].href}>{cell[0].href}</a>
                      </td>
                    ) : (
                      <td key={index} className="px-1">
                        <pre className="whitespace-pre-wrap">
                          {cell[0].plain_text}
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
};

export default Table;

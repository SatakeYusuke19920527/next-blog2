import { FC } from 'react';
const Table: FC<any> = ({ tableData }) => {
  return tableData ? (
    <table className="w-full text-sm text-left text-gray-500 my-5">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          {tableData[0].table_row.cells.map((cell: any, index: number) => {
            return (
              <th className='col p-3' key={index}>
                <pre>{cell[0].plain_text}</pre>
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
                  <td key={index}>
                    <a href={cell[0].href} className="flex items-center p-3">
                      {cell[0].href}
                    </a>
                  </td>
                ) : (
                  <td key={index} className="p-1">
                    {cell[0].plain_text}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;
};

export default Table
import { Dispatch, SetStateAction } from 'react';

const PageNation = ({
  pageNo,
  setPageNo,
  totalPageAmount,
}: {
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  totalPageAmount: number;
}) => {
  const pageNoElementAmount = Array.from(
    { length: totalPageAmount },
    (_, i) => i + 1
  );
  const pageNoDecrement = () => {
    pageNo !== 1 ? setPageNo((prev) => prev - 1) : setPageNo(1);
  };
  const pageNoIncrement = () => {
    pageNo !== totalPageAmount
      ? setPageNo((prev) => prev + 1)
      : setPageNo(totalPageAmount);
  };
  const renderPageNationElement = () =>
    pageNoElementAmount.map((pnea, index) => {
      return pnea === pageNo ? (
        <li key={index}>
          <a
            href={`#${pnea}`}
            onClick={() => setPageNo(pnea)}
            aria-current="page"
            className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            {pnea}
          </a>
        </li>
      ) : (
        <li key={index}>
          <a
            href={`#${pnea}`}
            onClick={() => setPageNo(pnea)}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
          >
            {pnea}
          </a>
        </li>
      );
    });
  return totalPageAmount !== 1 ? (
    <nav className="w-full flex mt-10 justify-center items-center">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <a
            href={`#${pageNo}`}
            onClick={pageNoDecrement}
            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        {renderPageNationElement()}
        <li>
          <a
            href={`#${pageNo}`}
            onClick={pageNoIncrement}
            className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  ) : null;
};

export default PageNation;

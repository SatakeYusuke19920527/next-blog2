import { categoryConfig, searchConfig } from "../site.config";

const Search = () => {
  return (
    <div style={{display: "block"}}>
      <div className="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row content-between">
          <div className="grid grid-cols-8 gap-2 p-2 rounded w-full">
            <div className="col-span-1 flex items-center p-2 justify-center">
              <label className="text-center">{searchConfig.category}</label>
            </div>
            <select className="col-span-7 border p-2 rounded">
              {categoryConfig.map((c, index) => (
                <option key={index}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="grid grid-cols-8 gap-2 border border-gray-200 p-2 rounded">
            <div className="col-span-1 flex items-center p-2 justify-center">
              <label>{searchConfig.companyName}</label>
            </div>
            <div className="col-span-3 flex border rounded bg-gray-300 items-center p-2 ">
              <svg
                className="fill-current text-gray-800 mr-2 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  className="heroicon-ui"
                  d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                />
              </svg>
              <input
                type="text"
                placeholder={searchConfig.companyName}
                className="bg-gray-300 w-full focus:outline-none text-gray-700"
              />
            </div>
            <div className="col-span-1 flex items-center p-2 justify-center">
              <label>{searchConfig.keyword}</label>
            </div>
            <div className="col-span-3 flex border rounded bg-gray-300 items-center p-2 ">
              <svg
                className="fill-current text-gray-800 mr-2 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  className="heroicon-ui"
                  d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM5.68 7.1A7.96 7.96 0 0 0 4.06 11H5a1 1 0 0 1 0 2h-.94a7.95 7.95 0 0 0 1.32 3.5A9.96 9.96 0 0 1 11 14.05V9a1 1 0 0 1 2 0v5.05a9.96 9.96 0 0 1 5.62 2.45 7.95 7.95 0 0 0 1.32-3.5H19a1 1 0 0 1 0-2h.94a7.96 7.96 0 0 0-1.62-3.9l-.66.66a1 1 0 1 1-1.42-1.42l.67-.66A7.96 7.96 0 0 0 13 4.06V5a1 1 0 0 1-2 0v-.94c-1.46.18-2.8.76-3.9 1.62l.66.66a1 1 0 0 1-1.42 1.42l-.66-.67zM6.71 18a7.97 7.97 0 0 0 10.58 0 7.97 7.97 0 0 0-10.58 0z"
                />
              </svg>
              <input
                type="text"
                placeholder={searchConfig.keyword}
                className="bg-gray-300 w-full focus:outline-none text-gray-700"
              />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-2 border border-gray-200 p-2 rounded">
            <div className="col-span-1 flex items-center p-2 justify-center">
              <label>{searchConfig.prefectures}</label>
            </div>
            <div className="col-span-3 flex border rounded bg-gray-300 items-center p-2 ">
              <svg
                className="fill-current text-gray-800 mr-2 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  className="heroicon-ui"
                  d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                />
              </svg>
              <input
                type="text"
                placeholder={searchConfig.prefectures}
                className="bg-gray-300 w-full focus:outline-none text-gray-700"
              />
            </div>
            <div className="col-span-1 flex items-center p-2 justify-center">
              <label>{searchConfig.updateDate}</label>
            </div>
            <div className="col-span-3 flex border rounded bg-gray-300 items-center p-2 ">
              <svg
                className="fill-current text-gray-800 mr-2 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  className="heroicon-ui"
                  d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM5.68 7.1A7.96 7.96 0 0 0 4.06 11H5a1 1 0 0 1 0 2h-.94a7.95 7.95 0 0 0 1.32 3.5A9.96 9.96 0 0 1 11 14.05V9a1 1 0 0 1 2 0v5.05a9.96 9.96 0 0 1 5.62 2.45 7.95 7.95 0 0 0 1.32-3.5H19a1 1 0 0 1 0-2h.94a7.96 7.96 0 0 0-1.62-3.9l-.66.66a1 1 0 1 1-1.42-1.42l.67-.66A7.96 7.96 0 0 0 13 4.06V5a1 1 0 0 1-2 0v-.94c-1.46.18-2.8.76-3.9 1.62l.66.66a1 1 0 0 1-1.42 1.42l-.66-.67zM6.71 18a7.97 7.97 0 0 0 10.58 0 7.97 7.97 0 0 0-10.58 0z"
                />
              </svg>
              <input
                type="text"
                placeholder={searchConfig.updateDate}
                className="bg-gray-300 w-full focus:outline-none text-gray-700"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="p-2 border w-1/4 rounded-md bg-gray-600 text-white hover:bg-gray-800">
            {searchConfig.search}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search
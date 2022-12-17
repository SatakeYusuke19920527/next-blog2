import { categoryConfig, searchConfig } from "../site.config";

const Search = () => {
  return (
    <div>
      <div className="border border-gray-300 p-3 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg h-full">
        <p className="w-full m-0 text-gray-700 border-gray-200 rounded px-3 py-3">
          絞り込みはこちら
        </p>
        <div className="w-full">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="keyword"
            type="text"
            placeholder="キーワード"
          />
        </div>
        <div className="grid grid-cols-8 gap-2 rounded w-full">
          <select className="col-span-8 border p-2 rounded">
            {categoryConfig.map((c, index) => (
              <option key={index}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="prefecture"
            type="text"
            placeholder="都道府県"
          />
        </div>
        
        <div className="flex w-full justify-center">
          <button className="p-2 border w-full rounded-md bg-gray-600 text-white hover:bg-gray-800">
            {searchConfig.search}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search
import { useState } from "react";
import { categoryConfig, searchConfig } from "../site.config";

const Search = () => {
  const [category, setCategory] = useState<string>('')
  console.log("🚀 ~ file: Search.tsx:6 ~ Search ~ category", category)
  const renderSearchForm = (category: string) => {
    switch (category) {
      case '成形設備':
        return (
          <>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="facility"
                type="text"
                placeholder="設備"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="clamping"
                type="text"
                placeholder="対象成形機（型締力）"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="subsidy"
                type="text"
                placeholder="補助金"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="moldingMachine_category"
                type="text"
                placeholder="カテゴリ"
              />
            </div>
          </>
        );
      case '成形屋':
        return (
          <>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="industry"
                type="text"
                placeholder="業種"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="resin"
                type="text"
                placeholder="使用樹脂"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="clamping"
                type="text"
                placeholder="型締力"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="iso"
                type="text"
                placeholder="ISO"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="employees"
                type="text"
                placeholder="従業員数"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="capital"
                type="text"
                placeholder="資本金"
              />
            </div>
          </>
        );
      case '金型屋':
        return (
          <>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="specialtyIndustry"
                type="text"
                placeholder="得意とする業種"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="prototype"
                type="text"
                placeholder="試作成形機の有無"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="clampingSize"
                type="text"
                placeholder="製作可能サイズ（型締力）"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="iso"
                type="text"
                placeholder="ISO"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="employees"
                type="text"
                placeholder="従業員数"
              />
            </div>
            <div className="w-full">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="capital"
                type="text"
                placeholder="資本金"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  }
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
          <select
            className="col-span-8 border p-2 rounded"
            onChange={(e) => setCategory(e.target.value)}
          >
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
        {renderSearchForm(category)}
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
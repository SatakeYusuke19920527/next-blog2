import axios from 'axios';
import { Dispatch, SetStateAction, useState } from "react";
import { get_pages } from '../features/pageSlice';
import { useAppDispatch } from '../hooks/useRTK';
import { categoryConfig, clampingForceConfig, industryTypeConfig, moldingEquipmentConfig, resinUsedConfig, searchConfig, subsidyConfig } from "../site.config";
/*
□共通
□成形設備
・設備
→射出成形機、取出機、乾燥機、温調機、輸送機、混合機、コンベア、ストッカー、クランプ、粉砕機、チラー、その他
・型締力
→〜10t未満、10t〜49t、50t〜99t、100t〜249t、250t〜499t、500t〜999t、1000t〜1399t、1400t以上
・補助金
⇨補助金対象、補助金対象外


□成形屋
・業種
→家電、自動車、OA通信、電子部品、工業部品、容器、医療、雑貨、その他
・使用樹脂
→PE、PP、PS、ABS、PVC、PMMA、PET、PA、POM、PC、PPE、PPS、PI、PEI、PEEK、PTFE、フッ素樹脂、エラストマー、生分解性プラスチック、熱硬化樹脂、プラマグ樹脂、その他
・型締力
→〜10t未満、10t〜49t、50t〜99t、100t〜249t、250t〜499t、500t〜999t、1000t〜1399t、1400t以上
・ISO
→ISO9001、ISO14001
□金型メーカー
・得意とする業種
→家電、自動車、OA通信、電子部品、工業部品、容器、医療、雑貨、その他
・試作成形機の有無
→あり、なし
・製作可能サイズ
→〜10t未満、10t〜49t、50t〜99t、100t〜249t、250t〜499t、500t〜999t、1000t〜1399t、1400t以上
・ISO
→ISO9001、ISO14001
*
*
*/
const Search = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [category, setCategory] = useState<string>('成形設備');
  const [keyword, setKeyword] = useState<string>('')
  const dispatch = useAppDispatch();
  // const [searchObj, setSearchObj] = useState<any>({});

  const startSearch = async () => {
    setIsLoading(true);
    const result: any = await searchPage();
    console.log('🚀 ~ file: Search.tsx:51 ~ startSearch ~ test', result.data.results);
    dispatch(get_pages(result.data.results));
    setIsLoading(false);
  };

  const searchPage = () => {
    return new Promise((resolve, reject) => {
      axios.get('/api/search')
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  const renderSearchForm = (category: string) => {
    switch (category) {
      case '成形設備':
        return (
          <>
            {/* 設備 射出成形機、取出機、乾燥機、温調機、輸送機、混合機、コンベア、ストッカー、クランプ、粉砕機、チラー、その他 */}
            <div className="w-full">
              <div className="grid grid-cols-8 gap-2 rounded w-full">
                <select
                  className="col-span-8 border p-2 rounded"
                  // onChange={(e) => setSearchObj(e.target.value)}
                >
                  {moldingEquipmentConfig.map((mec, index) => (
                    <option key={index} value={category}>
                      {mec}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* 型締力 〜10t未満、10t〜49t、50t〜99t、100t〜249t、250t〜499t、500t〜999t、1000t〜1399t、1400t以上 */}
            <div className="w-full">
              <select
                className="col-span-8 border p-2 rounded w-full"
                // onChange={(e) => setSearchObj(e.target.value)}
              >
                {clampingForceConfig.map((cfc, index) => (
                  <option key={index} value={category}>
                    {cfc}
                  </option>
                ))}
              </select>
            </div>
            {/* 補助金 補助金対象、補助金対象外 */}
            <div className="w-full">
              <select
                className="col-span-8 border p-2 rounded w-full"
                // onChange={(e) => setSearchObj(e.target.value)}
              >
                {subsidyConfig.map((sc, index) => (
                  <option key={index} value={category}>
                    {sc}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
      case '成形会社':
        return (
          <>
            {/* 業種 家電、自動車、OA通信、電子部品、工業部品、容器、医療、雑貨、その他 */}
            <div className="w-full">
              <select
                className="col-span-8 border p-2 rounded w-full"
                // onChange={(e) => setSearchObj(e.target.value)}
              >
                {industryTypeConfig.map((itc, index) => (
                  <option key={index} value={category}>
                    {itc}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <select
                className="col-span-8 border p-2 rounded w-full"
                // onChange={(e) => setSearchObj(e.target.value)}
              >
                {resinUsedConfig.map((ruc, index) => (
                  <option key={index} value={category}>
                    {ruc}
                  </option>
                ))}
              </select>
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
      case '金型メーカー':
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
  };
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
            onChange={e => setKeyword(e.target.value)}
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
            placeholder="所在地"
          />
        </div>
        {renderSearchForm(category)}
        <div className="flex w-full justify-center">
          <button
            className="p-2 border w-full rounded-md bg-gray-600 text-white hover:bg-gray-800"
            onClick={startSearch}
          >
            {searchConfig.search}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search
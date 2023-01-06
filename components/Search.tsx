import axios from 'axios';
import { createRef, Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { get_pages } from '../features/pageSlice';
import { useAppDispatch } from '../hooks/useRTK';
import { categoryConfig, clampingForceConfig, industryTypeConfig, moldingEquipmentConfig, resinUsedConfig, searchConfig, subsidyConfig } from "../site.config";

const Search = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  // 成形設備
  const [modalEquipments, setModalEquipments] = useState<string[]>([]);
  const moldingEquipmentConfigRefs = useRef<RefObject<HTMLInputElement>[]>(
    []
  );
  moldingEquipmentConfig.forEach((_, index) => {
    moldingEquipmentConfigRefs.current[index] = createRef<HTMLInputElement>();
  });

  // 型締力
  const [clampingForce, setClampingForce] = useState<string[]>([]);
  const clampingForceConfigRefs = useRef<RefObject<HTMLInputElement>[]>([]);
  clampingForceConfig.forEach((_, index) => {
    clampingForceConfigRefs.current[index] = createRef<HTMLInputElement>();
  });

  // 補助金対象
  const [subsidy, setSubsidy] = useState<string[]>([]);
  const subsidyConfigRefs = useRef<RefObject<HTMLInputElement>[]>([]);
  subsidyConfig.forEach((_, index) => {
    subsidyConfigRefs.current[index] = createRef<HTMLInputElement>();
  });

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    initializeState()
  }, [category])
  
  const initializeState = () => {
    setModalEquipments([]);
    setClampingForce([]);
    setSubsidy([]);
  }

  const startSearch = async () => {
    setIsLoading(true);
    // 検索条件のオブジェクトを作成
    let searchObj = {};
    if (keyword !== '') searchObj = { ...searchObj, keyword: keyword };
    if (category !== 'カテゴリを選択してください')
      searchObj = { ...searchObj, category: category };
    if (location !== '') searchObj = { ...searchObj, location: location };

    // 成形設備用検索オブジェクト作成
    if (category === '成形設備') {
      searchObj = { ...searchObj, modalEquipments };
      searchObj = { ...searchObj, clampingForce };
      searchObj = { ...searchObj, subsidy };
    }

    console.log(
      '🚀 ~ file: Search.tsx:38 ~ startSearch ~ searchObj',
      searchObj
    );
    const result: any = await searchPage(searchObj);
    dispatch(get_pages(result.data.results));
    setIsLoading(false);
  };

  const searchPage = (s_obj: Object) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/search', { search: s_obj })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const renderSearchForm = (category: string) => {
    switch (category) {
      case '成形設備':
        return (
          <>
            {/* 設備 射出成形機、取出機、乾燥機、温調機、輸送機、混合機、コンベア、ストッカー、クランプ、粉砕機、チラー、その他 */}
            <div className="w-full">
              {/* {isOpen ? ( */}
              <div className="grid grid-cols-8 gap-2 rounded w-full">
                <ul className="w-full col-span-8 border p-2 rounded">
                  {moldingEquipmentConfig.map(
                    (mec: string, index: number) => {
                      const selectModalEquipment = () => {
                        if (
                          moldingEquipmentConfigRefs.current[index].current
                            ?.checked
                        ) {
                          setModalEquipments([...modalEquipments, mec]);
                        } else {
                          setModalEquipments(
                            modalEquipments.filter((me) => me !== mec)
                          );
                        }
                      };
                      return (
                        <li
                          key={index}
                          className="w-full border-b  border-white rounded-t-lg"
                        >
                          <div className="flex items-center pl-3">
                            <input
                              id={`${mec}-${index}`}
                              type="checkbox"
                              value={mec}
                              checked={moldingEquipmentConfigRefs.current[index].current?.checked}
                              ref={moldingEquipmentConfigRefs.current[index]}
                              onChange={() => selectModalEquipment()}
                            />
                            <label
                              htmlFor={`${mec}-${index}`}
                              className="w-full ml-2 text-sm font-medium"
                            >
                              {`${mec}`}
                            </label>
                          </div>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </div>
            {/* 型締力 〜10t未満、10t〜49t、50t〜99t、100t〜249t、250t〜499t、500t〜999t、1000t〜1399t、1400t以上 */}
            <div className="w-full">
              <div className="grid grid-cols-8 gap-2 rounded w-full">
                <ul className="w-full col-span-8 border p-2 rounded">
                  {clampingForceConfig.map((cfc: string, index: number) => {
                    const selectWeight = () => {
                      if (
                        clampingForceConfigRefs.current[index].current
                          ?.checked
                      ) {
                        setClampingForce([...clampingForce, cfc]);
                      } else {
                        setClampingForce(
                          clampingForce.filter((me) => me !== cfc)
                        );
                      }
                    };
                    return (
                      <li
                        key={index}
                        className="w-full border-b  border-white rounded-t-lg"
                      >
                        <div className="flex items-center pl-3">
                          <input
                            id={`${cfc}-${index}`}
                            type="checkbox"
                            value={cfc}
                            ref={clampingForceConfigRefs.current[index]}
                            onChange={() => selectWeight()}
                          />
                          <label
                            htmlFor={`${cfc}-${index}`}
                            className="w-full ml-2 text-sm font-medium"
                          >
                            {`${cfc}`}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* 補助金 補助金対象、補助金対象外 */}
            <div className="w-full">
              <div className="grid grid-cols-8 gap-2 rounded w-full">
                <ul className="w-full col-span-8 border p-2 rounded">
                  {subsidyConfig.map((sc: string, index: number) => {
                    const selectSubsidy = () => {
                      if (
                        subsidyConfigRefs.current[index].current
                          ?.checked
                      ) {
                        setSubsidy([...subsidy, sc]);
                      } else {
                        setSubsidy(subsidy.filter((s) => s !== sc));
                      }
                    };
                    return (
                      <li
                        key={index}
                        className="w-full border-b  border-white rounded-t-lg"
                      >
                        <div className="flex items-center pl-3">
                          <input
                            id={`${sc}-${index}`}
                            type="checkbox"
                            value={sc}
                            ref={subsidyConfigRefs.current[index]}
                            onChange={() => selectSubsidy()}
                          />
                          <label
                            htmlFor={`${sc}-${index}`}
                            className="w-full ml-2 text-sm font-medium"
                          >
                            {`${sc}`}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
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
      <div className="border border-gray-300 p-3 grid grid-cols-1 gap-3 bg-white shadow-lg rounded-lg h-full">
        <p className="w-full m-0 text-gray-700 border-gray-200 rounded px-3 py-3">
          絞り込みはこちら
        </p>
        <div className="w-full">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="keyword"
            type="text"
            placeholder="キーワード"
            onChange={(e) => setKeyword(e.target.value)}
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
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="prefecture"
            type="text"
            placeholder="所在地"
            onChange={(e) => setLocation(e.target.value)}
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
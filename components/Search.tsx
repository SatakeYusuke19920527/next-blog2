import axios from 'axios';
import { createRef, Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { get_pages } from '../features/pageSlice';
import { useAppDispatch } from '../hooks/useRTK';
import { categoryConfig, clampingForceConfig, industryTypeConfig, isoConfig, isPrototypeMoldingMachineConfig, moldingEquipmentConfig, resinUsedConfig, searchConfig, subsidyConfig } from "../site.config";

const Search = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  }) => {
    const dispatch = useAppDispatch();
    const [keyword, setKeyword] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    /** 成形設備 */
    // 設備名
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

    /** 成形会社 */
    // 業種
    const [industry, setIndustry] = useState<string[]>([]);
    const industryTypeConfigRefs = useRef<RefObject<HTMLInputElement>[]>([]);
    industryTypeConfig.forEach((_, index) => {
      industryTypeConfigRefs.current[index] = createRef<HTMLInputElement>();
    });

    // 使用樹脂
    const [resin, setResin] = useState<string[]>([]);
    const resinUsedConfigRefs = useRef<RefObject<HTMLInputElement>[]>([]);
    resinUsedConfig.forEach((_, index) => {
      resinUsedConfigRefs.current[index] = createRef<HTMLInputElement>();
    });

    // ISO
    const [iso, setIso] = useState<string[]>([]);
    const isoConfigRefs = useRef<RefObject<HTMLInputElement>[]>([]);
    isoConfig.forEach((_, index) => {
      isoConfigRefs.current[index] = createRef<HTMLInputElement>();
    });

    // 試作成形機の有無
    const [proto, setProto] = useState<string[]>([]);
    const isPrototypeMoldingMachineConfigRefs = useRef<
      RefObject<HTMLInputElement>[]
    >([]);
    isPrototypeMoldingMachineConfig.forEach((_, index) => {
      isPrototypeMoldingMachineConfigRefs.current[index] =
        createRef<HTMLInputElement>();
    });

    useEffect(() => {
      initializeState();
    }, [category]);

    const initializeState = () => {
      setModalEquipments([]);
      setClampingForce([]);
      setSubsidy([]);
      setClampingForce([]);
      setIndustry([]);
      setResin([]);
      setIso([]);
      setProto([]);
    };

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

      // 金型メーカー検索オブジェクト作成
      if (category === '金型メーカー') {
        searchObj = { ...searchObj, industry };
        searchObj = { ...searchObj, clampingForce };
        searchObj = { ...searchObj, proto };
        searchObj = { ...searchObj, iso };
      }

      // 成形会社用検索オブジェクト作成
      if (category === '成形会社') {
        searchObj = { ...searchObj, industry };
        searchObj = { ...searchObj, resin };
        searchObj = { ...searchObj, clampingForce };
        searchObj = { ...searchObj, iso };
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
                  <h4 className="w-full col-span-8 rounded m-0">設備</h4>
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
                                checked={
                                  moldingEquipmentConfigRefs.current[index]
                                    .current?.checked
                                }
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
                  <h4 className="w-full col-span-8 rounded m-0">型締力</h4>
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
                  <h4 className="w-full col-span-8 rounded m-0">補助金対象</h4>
                  <ul className="w-full col-span-8 border p-2 rounded">
                    {subsidyConfig.map((sc: string, index: number) => {
                      const selectSubsidy = () => {
                        if (subsidyConfigRefs.current[index].current?.checked) {
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
              {/* 業界 家電、自動車、OA通信、電子部品、工業部品、容器、医療、雑貨、その他 */}
              <div className="w-full">
                <div className="grid grid-cols-8 gap-2 rounded w-full">
                  <h4 className="w-full col-span-8 rounded m-0">業界</h4>
                  <ul className="w-full col-span-8 border p-2 rounded">
                    {industryTypeConfig.map((itc: string, index: number) => {
                      const selectIndustryType = () => {
                        if (
                          industryTypeConfigRefs.current[index].current?.checked
                        ) {
                          setIndustry([...industry, itc]);
                        } else {
                          setIndustry(industry.filter((s) => s !== itc));
                        }
                      };
                      return (
                        <li
                          key={index}
                          className="w-full border-b  border-white rounded-t-lg"
                        >
                          <div className="flex items-center pl-3">
                            <input
                              id={`${itc}-${index}`}
                              type="checkbox"
                              value={itc}
                              ref={industryTypeConfigRefs.current[index]}
                              onChange={() => selectIndustryType()}
                            />
                            <label
                              htmlFor={`${itc}-${index}`}
                              className="w-full ml-2 text-sm font-medium"
                            >
                              {`${itc}`}
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/* 使用樹脂 `PE`, `PP`, `PS`, `ABS`, `PVC`, `PMMA`, `PET`, `PA`, `POM`, `PC`, `PPE`, `PPS`, `PI`, `PEI`, `PEEK`, `PTFE`, `フッ素樹脂`, `エラストマー`, `生分解性プラスチック`, `熱効果樹脂`, `プラマグ樹脂`, `その他` */}
              <div className="w-full">
                <div className="grid grid-cols-8 gap-2 rounded w-full">
                  <h4 className="w-full col-span-8 rounded m-0">樹脂</h4>
                  <ul className="w-full col-span-8 border p-2 rounded">
                    {resinUsedConfig.map((ruc: string, index: number) => {
                      const selectResinUsedType = () => {
                        if (
                          resinUsedConfigRefs.current[index].current?.checked
                        ) {
                          setResin([...resin, ruc]);
                        } else {
                          setResin(resin.filter((s) => s !== ruc));
                        }
                      };
                      return (
                        <li
                          key={index}
                          className="w-full border-b  border-white rounded-t-lg"
                        >
                          <div className="flex items-center pl-3">
                            <input
                              id={`${ruc}-${index}`}
                              type="checkbox"
                              value={ruc}
                              ref={resinUsedConfigRefs.current[index]}
                              onChange={() => selectResinUsedType()}
                            />
                            <label
                              htmlFor={`${ruc}-${index}`}
                              className="w-full ml-2 text-sm font-medium"
                            >
                              {`${ruc}`}
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/* 型締力 〜10t未満、10t〜49t、50t〜99t、100t〜249t、250t〜499t、500t〜999t、1000t〜1399t、1400t以上 */}
              <div className="w-full">
                <div className="grid grid-cols-8 gap-2 rounded w-full">
                  <h4 className="w-full col-span-8 rounded m-0">型締力</h4>
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
              {/* ISO ISO9001,ISO14001 */}
              <div className="w-full">
                <div className="grid grid-cols-8 gap-2 rounded w-full">
                  <h4 className="w-full col-span-8 rounded m-0">ISO</h4>
                  <ul className="w-full col-span-8 border p-2 rounded">
                    {isoConfig.map((ic: string, index: number) => {
                      const selectIso = () => {
                        if (isoConfigRefs.current[index].current?.checked) {
                          setIso([...iso, ic]);
                        } else {
                          setIso(iso.filter((me) => me !== ic));
                        }
                      };
                      return (
                        <li
                          key={index}
                          className="w-full border-b  border-white rounded-t-lg"
                        >
                          <div className="flex items-center pl-3">
                            <input
                              id={`${ic}-${index}`}
                              type="checkbox"
                              value={ic}
                              ref={isoConfigRefs.current[index]}
                              onChange={() => selectIso()}
                            />
                            <label
                              htmlFor={`${ic}-${index}`}
                              className="w-full ml-2 text-sm font-medium"
                            >
                              {`${ic}`}
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
        case '金型メーカー':
          return (
            <>
              {/* 業界 家電、自動車、OA通信、電子部品、工業部品、容器、医療、雑貨、その他 */}
              <div className="w-full">
                <div className="grid grid-cols-8 gap-2 rounded w-full">
                  <h4 className="w-full col-span-8 rounded m-0">業界</h4>
                  <ul className="w-full col-span-8 border p-2 rounded">
                    {industryTypeConfig.map((itc: string, index: number) => {
                      const selectIndustryType = () => {
                        if (
                          industryTypeConfigRefs.current[index].current?.checked
                        ) {
                          setIndustry([...industry, itc]);
                        } else {
                          setIndustry(industry.filter((s) => s !== itc));
                        }
                      };
                      return (
                        <li
                          key={index}
                          className="w-full border-b  border-white rounded-t-lg"
                        >
                          <div className="flex items-center pl-3">
                            <input
                              id={`${itc}-${index}`}
                              type="checkbox"
                              value={itc}
                              ref={industryTypeConfigRefs.current[index]}
                              onChange={() => selectIndustryType()}
                            />
                            <label
                              htmlFor={`${itc}-${index}`}
                              className="w-full ml-2 text-sm font-medium"
                            >
                              {`${itc}`}
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/* 型締力 〜10t未満、10t〜49t、50t〜99t、100t〜249t、250t〜499t、500t〜999t、1000t〜1399t、1400t以上 */}
              <div className="w-full">
                <div className="grid grid-cols-8 gap-2 rounded w-full">
                  <h4 className="w-full col-span-8 rounded m-0">型締力</h4>
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
              {/* 試作成形機あり,試作成形機なし */}
              <div className="w-full">
                <div className="grid grid-cols-8 gap-2 rounded w-full">
                  <h4 className="w-full col-span-8 rounded m-0">
                    試作成形機の有無
                  </h4>
                  <ul className="w-full col-span-8 border p-2 rounded">
                    {isPrototypeMoldingMachineConfig.map(
                      (ipmm: string, index: number) => {
                        const selectProto = () => {
                          if (
                            isPrototypeMoldingMachineConfigRefs.current[index]
                              .current?.checked
                          ) {
                            setProto([...proto, ipmm]);
                          } else {
                            setProto(proto.filter((me) => me !== ipmm));
                          }
                        };
                        return (
                          <li
                            key={index}
                            className="w-full border-b  border-white rounded-t-lg"
                          >
                            <div className="flex items-center pl-3">
                              <input
                                id={`${ipmm}-${index}`}
                                type="checkbox"
                                value={ipmm}
                                ref={
                                  isPrototypeMoldingMachineConfigRefs.current[
                                    index
                                  ]
                                }
                                onChange={() => selectProto()}
                              />
                              <label
                                htmlFor={`${ipmm}-${index}`}
                                className="w-full ml-2 text-sm font-medium"
                              >
                                {`${ipmm}`}
                              </label>
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
              {/* ISO ISO9001,ISO14001 */}
              <div className="w-full">
                <div className="grid grid-cols-8 gap-2 rounded w-full">
                  <h4 className="w-full col-span-8 rounded m-0">
                    ISO
                  </h4>
                  <ul className="w-full col-span-8 border p-2 rounded">
                    {isoConfig.map((ic: string, index: number) => {
                      const selectIso = () => {
                        if (isoConfigRefs.current[index].current?.checked) {
                          setIso([...iso, ic]);
                        } else {
                          setIso(iso.filter((me) => me !== ic));
                        }
                      };
                      return (
                        <li
                          key={index}
                          className="w-full border-b  border-white rounded-t-lg"
                        >
                          <div className="flex items-center pl-3">
                            <input
                              id={`${ic}-${index}`}
                              type="checkbox"
                              value={ic}
                              ref={isoConfigRefs.current[index]}
                              onChange={() => selectIso()}
                            />
                            <label
                              htmlFor={`${ic}-${index}`}
                              className="w-full ml-2 text-sm font-medium"
                            >
                              {`${ic}`}
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
              className="p-2 border w-full text-white rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 ..."
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
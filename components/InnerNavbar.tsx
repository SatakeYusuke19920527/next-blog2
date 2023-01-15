import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { get_pages } from "../features/pageSlice";
import { useAppDispatch } from "../hooks/useRTK";
import { innerNavbarConfig } from "../site.config";

const InnerNavbar = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  }) => {
  const dispatch = useAppDispatch();
  const [activeMenu, setActiveMenu] = useState<string>('すべて')
  
  const startSearch = async (category: string ) => {
    setIsLoading(true);
    setActiveMenu(category);
    // 検索条件のオブジェクトを作成
    let searchObj = {};
    if (category !== "すべて") {
      searchObj = { ...searchObj, category: category };  
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
  return (
    <div className="w-full mb-3">
      <ul className="grid grid-cols-5">
        {innerNavbarConfig.map((inc, index) => {
          return (
            <li
              key={index}
              onClick={() => startSearch(inc)}
              className={`mb-1 block p-4 text-sm font-semibold ${
                activeMenu === inc ? 'text-blue-500' : 'text-gray-400'
              } hover:bg-blue-50 hover:text-blue-600 rounded cursor-pointer border-r ${
                activeMenu === inc ? 'bg-white' : 'bg-gray'
              }`}
            >
              {inc}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InnerNavbar
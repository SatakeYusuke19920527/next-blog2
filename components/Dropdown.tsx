import { useState } from "react";

const Dropdown = ({ dropdownProps }: { dropdownProps: string[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return isOpen ? (
    <div className="grid grid-cols-8 gap-2 rounded w-full">
      <ul className="w-full col-span-8 border p-2 rounded">
        <li
          className="w-full border-b border-white rounded-t-lg"
          onClick={handleOpen}
        >
          <label className="w-full py-3 ml-3 text-sm font-medium">閉じる</label>
        </li>
        {dropdownProps.map((mec: string, index: number) => {
          return (
            <li
              key={index}
              className="w-full border-b  border-white rounded-t-lg"
            >
              <div className="flex items-center pl-3">
                <input
                  id={`${mec}-${index}`}
                  type="checkbox"
                  // checked={isChecked}
                  className=""
                  onChange={() => setIsChecked(!isChecked)}
                />
                <label
                  htmlFor={`${mec}-${index}`}
                  className="w-full py-1 ml-2 text-sm font-medium"
                >
                  {`${mec}`}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div className="grid grid-cols-8 gap-2 rounded w-full" onClick={handleOpen}>
      <ul className="w-full col-span-8 border p-2 rounded">
        <li className="w-full border-b border-white rounded-t-lg">
          <label className="w-full py-1 ml-1 ">
            {dropdownProps[0]}
            </label>
          
        </li>
      </ul>
    </div>
  );
};

export default Dropdown
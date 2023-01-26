import Link from "next/link";
import { selectUser } from "../features/userSlice";
import { useLoginCheck } from "../hooks/useLoginCheck";
import { useAppSelector } from "../hooks/useRTK";
import { logout } from "../models/user/userApplicationService";

const Navbar = () => {
  const isLogin = useLoginCheck()
  const user = useAppSelector(selectUser)
  const handleLogout = async () => {
    const result = window.confirm("ログアウトしますか？")
    if (result) await logout();
  }
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between text-gray-900 hover:text-gray-700 focus:text-gray-700 navbar navbar-expand-lg bg-white">
      <div className="grid md:grid-cols-10 grid-cols-4 container-fluid w-full px-6">
        <div
          className="flex bg-grey-light rounded-md w-full md:col-span-9 col-span-3 p-2"
          aria-label="breadcrumb1"
        >
          <Link href={`/`} className="hover:text-gray-600">
            <img
              className="w-full h-16"
              src="../static/seikei-portal-icon.png"
              alt="icon"
            />
          </Link>
          {/* <div className="pl-4">
            <Breadcrumb />
          </div> */}
        </div>
        <div
          className="bg-grey-light rounded-md w-full col-span-1 p-2 grid grid-cols-1 place-items-center h-full"
          aria-label="breadcrumb1"
        >
          <div
            className="bg-grey-light rounded-md w-full col-span-1 text-right gap-3"
            aria-label="breadcrumb2"
          >
            {isLogin ? (
              <button onClick={handleLogout} className="hover:text-gray-400">
                {user.displayName}
              </button>
            ) : (
              <Link href={`/signIn`} className="hover:text-gray-600">
                ログイン
              </Link>
            )}
          </div>
          {/* <div
            className="bg-grey-light rounded-md w-full col-span-1 md:block hidden text-right gap-3"
            aria-label="breadcrumb2"
          >
            <Link href={`/contact`} className="text-white hover:text-gray-100">
              お問合せ
            </Link>
          </div> */}
          {/* レスポンシブ対応予定 */}
          {/* <div
            className="bg-grey-light rounded-md w-full col-span-3 text-right gap-3 md:hidden"
            aria-label="breadcrumb2"
          >
            <button>
              <Link href="/" className="text-white hover:text-gray-100">
                test
              </Link>
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar
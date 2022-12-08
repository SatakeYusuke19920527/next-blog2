import Link from "next/link";
import { selectUser } from "../features/userSlice";
import { useLoginCheck } from "../hooks/useLoginCheck";
import { useAppSelector } from "../hooks/useRTK";
import { logout } from "../models/user/userApplicationService";
import { siteConfig } from "../site.config";

const Navbar = () => {
  const isLogin = useLoginCheck()
  const user = useAppSelector(selectUser)
  const handleLogout = async () => {
    const result = window.confirm("ログアウトしますか？")
    if (result) await logout();
  }
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3  text-white hover:text-gray-700 focus:text-gray-700 navbar navbar-expand-lg bg-gray-900">
      <div className="grid grid-cols-10 container-fluid w-full px-6">
        <div
          className="bg-grey-light rounded-md w-full col-span-8 p-2"
          aria-label="breadcrumb1"
        >
          <Link href={`/`} className="text-white hover:text-gray-100">
            {siteConfig.title}
          </Link>
        </div>
        <div
          className="bg-grey-light rounded-md w-full col-span-2 p-2 grid grid-cols-2"
          aria-label="breadcrumb1"
        >
          <div
            className="bg-grey-light rounded-md w-full col-span-1 md:block hidden text-right gap-3"
            aria-label="breadcrumb2"
          >
            {isLogin ? (
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-100"
              >
                ログアウト
              </button>
            ) : (
              <Link href={`/signIn`} className="text-white hover:text-gray-100">
                ログイン
              </Link>
            )}
          </div>
          <div
            className="bg-grey-light rounded-md w-full col-span-1 md:block hidden text-right gap-3"
            aria-label="breadcrumb2"
          >
            <Link href={`/contact`} className="text-white hover:text-gray-100">
              お問合せ
            </Link>
          </div>
          <div
            className="bg-grey-light rounded-md w-full col-span-3 text-right gap-3 md:hidden"
            aria-label="breadcrumb2"
          >
            <button>
              <Link href="/" className="text-white hover:text-gray-100">
                test
              </Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
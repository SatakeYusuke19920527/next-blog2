import Link from "next/link";
import { navbarMenu, siteConfig } from "../site.config";

const Navbar = () => {
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3  text-white hover:text-gray-700 focus:text-gray-700 navbar navbar-expand-lg bg-gray-900">
      <div className="grid grid-cols-4 container-fluid w-full px-6">
        <div
          className="bg-grey-light rounded-md w-full col-span-3 p-2"
          aria-label="breadcrumb1"
        >
          <Link href="/" className="text-white hover:text-gray-100">
            {siteConfig.title}
          </Link>
        </div>
        <div
          className="bg-grey-light rounded-md w-full col-span-1 p-2 grid grid-cols-3"
          aria-label="breadcrumb1"
        >
          {navbarMenu.map((menu, index) => (
            <div
              className="bg-grey-light rounded-md w-full col-span-1 md:block hidden text-right gap-3"
              aria-label="breadcrumb2"
              key={index}
            >
              <Link href="/" className="text-white hover:text-gray-100">
                {menu.name}
              </Link>
            </div>
          ))}
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
import HideBetween from '@/components/HideBetween';

export default function NavigationBar() {
  return (
    <HideBetween div startDivID="base-div" endDivID="search-bar">
      <header className="z-30 w-full px-2 py-4 bg-white sm:px-4 shadow-md">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <a href="#">
            <span className="text-2xl font-extrabold text-blue-600">Logo</span>
          </a>
          <div className="flex items-center space-x-1">
            <ul className="hidden space-x-2 md:inline-flex">
              <li>
                <a
                  href="#"
                  className="px-4 py-2 font-semibold text-gray-600 rounded"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-4 py-2 font-semibold text-gray-600 rounded"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-4 py-2 font-semibold text-gray-600 rounded"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-4 py-2 font-semibold text-gray-600 rounded"
                >
                  Contact Us
                </a>
              </li>
            </ul>
            <div className="inline-flex md:hidden">
              <button className="flex-none px-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
                <span className="sr-only">Open Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </HideBetween>
  );
}

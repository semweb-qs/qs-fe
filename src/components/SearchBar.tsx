import { Option, Select } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SearchBar({ defaultValue = '', showLogo = false }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(defaultValue ?? '');
  const searchFunction = () => {
    if (searchValue !== '')
      router.push({ pathname: '/search', query: { q: searchValue } });
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex w-screen bg-white items-center content-center justify-center">
      <div
        id="search-bar"
        className="flex flex-col md:flex-row gap-5 md:gap-2 items-center w-full max-w-screen-lg mb-3 px-5 pt-4"
      >
        {showLogo && (
          <div className="shrink-0 p-0 m-0">
            <a href={'/'}>
              <img
                className="p-0 m-0 h-10"
                src={`${router.basePath}/assets/Medigle.png`}
                alt={'Medigle logo'}
              ></img>
            </a>
          </div>
        )}
        <form onSubmit={onFormSubmit} className="flex space-x-1 w-full mb-2">
          <input
            type="text"
            className="block w-full mx-2 px-4 py-2 text-blue-700 bg-white border rounded-full focus:border-blue-400 focus:ring-blue-300/40 focus:outline-none"
            onChange={handleChange}
            value={searchValue}
            placeholder="Search..."
          />
          <button
            onClick={searchFunction}
            className="px-4 text-white bg-blue-500 rounded-full hover:bg-blue-600 active:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

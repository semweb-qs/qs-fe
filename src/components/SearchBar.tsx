import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import MedigleLogo from '@/components/MedigleLogo';

export default function SearchBar({ defaultValue = '', showLogo = false }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(defaultValue ?? '');
  useEffect(() => {
    if (defaultValue !== '') {
      localStorage.setItem('search', JSON.stringify(defaultValue));
    }
    if (localStorage.getItem('search') === null) {
      localStorage.setItem('search', '');
    }
    setSearchValue(JSON.parse(localStorage.getItem('search')));
  }, []);
  const searchFunction = () => {
    if (searchValue !== '')
      router.push({ pathname: '/search', query: { q: searchValue } });
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    localStorage.setItem('search', JSON.stringify(event.target.value));
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    // send state to server with e.g. `window.fetch`
  };
  return (
    <div className="flex w-screen bg-white items-center content-center justify-center">
      <div
        id="search-bar"
        className="flex flex-col md:flex-row gap-5 md:gap-5 items-center justify-center w-full max-w-screen-lg mb-3 px-5 pt-4"
      >
        {showLogo && <MedigleLogo />}
        <form
          onSubmit={onFormSubmit}
          className="flex w-4/5 justify-center items-center"
        >
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              onChange={handleChange}
              value={searchValue}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <button
            onClick={searchFunction}
            type="submit"
            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2 -ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            Search
          </button>
        </form>
        {/* <form onSubmit={onFormSubmit} className="flex space-x-1 w-full mb-2"> */}
        {/*  <input */}
        {/*    autoComplete="on" */}
        {/*    type="text" */}
        {/*    className="block w-full mx-2 px-4 py-2 text-blue-700 bg-white border rounded-full focus:border-blue-400 focus:ring-blue-300/40 focus:outline-none" */}
        {/*    onChange={handleChange} */}
        {/*    value={searchValue} */}
        {/*    placeholder="Search..." */}
        {/*  /> */}
        {/*  <button */}
        {/*    onClick={searchFunction} */}
        {/*    className="px-4 text-white bg-blue-500 rounded-full hover:bg-blue-600 active:bg-blue-700" */}
        {/*  > */}
        {/*    <svg */}
        {/*      xmlns="http://www.w3.org/2000/svg" */}
        {/*      className="w-5 h-5" */}
        {/*      fill="none" */}
        {/*      viewBox="0 0 24 24" */}
        {/*      stroke="currentColor" */}
        {/*      strokeWidth={2} */}
        {/*    > */}
        {/*      <path */}
        {/*        strokeLinecap="round" */}
        {/*        strokeLinejoin="round" */}
        {/*        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" */}
        {/*      /> */}
        {/*    </svg> */}
        {/*  </button> */}
        {/* </form> */}
      </div>
    </div>
  );
}

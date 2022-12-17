import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';

import MedigleLogo from '@/components/MedigleLogo';
import { useVoiceSearch } from '@/utils/instantSearchConnectors';

export default function SearchBar(props) {
  const [searchValue, setSearchValue] = useState('');
  const { query, refine, clear, isSearchStalled } = useSearchBox(props);
  const {
    isBrowserSupported,
    isListening,
    toggleListening,
    voiceListeningState,
  } = useVoiceSearch(props);
  // console.log(voiceListeningState)
  useEffect(() => {
    try {
      setSearchValue(voiceListeningState.transcript);
    } catch {}
  }, [voiceListeningState]);
  const onFormSubmit = (e) => {
    e.preventDefault();
    // send state to server with e.g. `window.fetch`
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    refine(searchValue);
    localStorage.setItem('search', event.target.value);
  };
  return (
    <div className="z-50 flex w-screen bg-white items-center content-center justify-center overflow-hidden">
      <div
        id="search-bar"
        className="flex flex-col md:flex-row gap-5 md:gap-5 items-center justify-center w-full max-w-screen-lg mb-3 px-5 pt-4"
      >
        {props.showLogo && <MedigleLogo />}
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
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>

            <input
              type="text"
              id="voice-search"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900
               text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500
               block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600
               dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-amber-500
               dark:focus:border-amber-500 outline-amber-400"
              placeholder="Search..."
              onChange={handleChange}
              value={searchValue}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-8"
              onClick={() => {
                clear();
                setSearchValue('');
              }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                viewBox="0 0 15 15"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                />
              </svg>
            </button>
            {isBrowserSupported && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => {
                  toggleListening();
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  fill={isListening ? 'red' : 'currentColor'}
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
            )}
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-amber-500 rounded-lg border border-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
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
      </div>
    </div>
  );
}

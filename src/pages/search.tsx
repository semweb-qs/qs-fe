import { useRouter } from 'next/router';
import { useState } from 'react';

import HideBetween from '@/components/HideBetween';
import BoxComponent from '@/components/infoBox';
import SearchComponent from '@/components/searchBar';
import SearchResultComponent from '@/components/SearchResultComponent';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const images = [
  {
    src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
  },
  {
    src: 'https://static.wikia.nocookie.net/gensin-impact/images/e/e1/Character_Venti_Game.png',
  },
  {
    src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
    alt: 'Boats (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
  },
];

const attributes = [
  ['Nama', 'Massachusets Institute of Technology'],
  ['Lokasi', 'Depok'],
  ['Negara', 'Indonesia'],
];

const accordions = [
  { header: 'Ini kepalanya', content: 'Ini Kontennya' },
  { header: 'Ini', content: 'Kocak lu' },
];

const Search = () => {
  const router = useRouter();
  const [textFieldValue, setTextFieldValue] = useState('');
  const { q } = router.query;
  const description = `Search: ${q}`;
  return (
    <div id="base-div">
      <HideBetween
        div
        startDivID="base-div"
        endDivID="search-bar"
      >
        <header className="z-30 w-full px-2 py-4 bg-white sm:px-4 shadow-md">
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            <a href="#">
              <span className="text-2xl font-extrabold text-blue-600">
                Logo
              </span>
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
      <Main
        meta={<Meta title="MedLine Search Engine" description={description} />}
      >
        <div className="flex flex-col items-center content-center justify-center">
          {/* Use router.basePath relatively */}
          <SearchComponent></SearchComponent>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-start">
          <div
            id="search-result"
            className="flex flex-col gap-7 w-full md:w-3/5 m-2 px-3"
          >
            <SearchResultComponent
              title={description}
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl et orci feugiat semper. Aliquam erat volutpat. Maecenas semper ipsum a dolor interdum, a accumsan risus malesuada. Cras eu bibendum massa. Nunc suscipit quam vel est condimentum, ut posuere ante ultricies. Curabitur porttitor, augue a volutpat dictum, metus dolor commodo odio, ultricies viverra lorem risus id nisi. Aenean mollis, libero et dapibus vulputate, ligula metus facilisis urna, ac dignissim justo eros id ex. Donec interdum molestie velit nec aliquam. Ut tempor tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquet augue mauris, sed tempus tellus viverra vitae. Nunc luctus in ante id bibendum. Nunc vehicula dui et ornare volutpat. Ut gravida venenatis odio sit amet consectetur. Praesent tempus varius gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              url="https://example.org/vocab/mit"
            ></SearchResultComponent>
            <SearchResultComponent
              title="MIT"
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl et orci feugiat semper. Aliquam erat volutpat. Maecenas semper ipsum a dolor interdum, a accumsan risus malesuada. Cras eu bibendum massa. Nunc suscipit quam vel est condimentum, ut posuere ante ultricies. Curabitur porttitor, augue a volutpat dictum, metus dolor commodo odio, ultricies viverra lorem risus id nisi. Aenean mollis, libero et dapibus vulputate, ligula metus facilisis urna, ac dignissim justo eros id ex. Donec interdum molestie velit nec aliquam. Ut tempor tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquet augue mauris, sed tempus tellus viverra vitae. Nunc luctus in ante id bibendum. Nunc vehicula dui et ornare volutpat. Ut gravida venenatis odio sit amet consectetur. Praesent tempus varius gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              url="https://example.org/vocab/mit"
            ></SearchResultComponent>
            <SearchResultComponent
              title="MIT"
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl et orci feugiat semper. Aliquam erat volutpat. Maecenas semper ipsum a dolor interdum, a accumsan risus malesuada. Cras eu bibendum massa. Nunc suscipit quam vel est condimentum, ut posuere ante ultricies. Curabitur porttitor, augue a volutpat dictum, metus dolor commodo odio, ultricies viverra lorem risus id nisi. Aenean mollis, libero et dapibus vulputate, ligula metus facilisis urna, ac dignissim justo eros id ex. Donec interdum molestie velit nec aliquam. Ut tempor tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquet augue mauris, sed tempus tellus viverra vitae. Nunc luctus in ante id bibendum. Nunc vehicula dui et ornare volutpat. Ut gravida venenatis odio sit amet consectetur. Praesent tempus varius gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              url="https://example.org/vocab/mit"
            ></SearchResultComponent>
            <SearchResultComponent
              title="MIT"
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl et orci feugiat semper. Aliquam erat volutpat. Maecenas semper ipsum a dolor interdum, a accumsan risus malesuada. Cras eu bibendum massa. Nunc suscipit quam vel est condimentum, ut posuere ante ultricies. Curabitur porttitor, augue a volutpat dictum, metus dolor commodo odio, ultricies viverra lorem risus id nisi. Aenean mollis, libero et dapibus vulputate, ligula metus facilisis urna, ac dignissim justo eros id ex. Donec interdum molestie velit nec aliquam. Ut tempor tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquet augue mauris, sed tempus tellus viverra vitae. Nunc luctus in ante id bibendum. Nunc vehicula dui et ornare volutpat. Ut gravida venenatis odio sit amet consectetur. Praesent tempus varius gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              url="https://example.org/vocab/mit"
            ></SearchResultComponent>
            <SearchResultComponent
              title="MIT"
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl et orci feugiat semper. Aliquam erat volutpat. Maecenas semper ipsum a dolor interdum, a accumsan risus malesuada. Cras eu bibendum massa. Nunc suscipit quam vel est condimentum, ut posuere ante ultricies. Curabitur porttitor, augue a volutpat dictum, metus dolor commodo odio, ultricies viverra lorem risus id nisi. Aenean mollis, libero et dapibus vulputate, ligula metus facilisis urna, ac dignissim justo eros id ex. Donec interdum molestie velit nec aliquam. Ut tempor tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquet augue mauris, sed tempus tellus viverra vitae. Nunc luctus in ante id bibendum. Nunc vehicula dui et ornare volutpat. Ut gravida venenatis odio sit amet consectetur. Praesent tempus varius gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              url="https://example.org/vocab/mit"
            ></SearchResultComponent>
            <SearchResultComponent
              title="MIT"
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl et orci feugiat semper. Aliquam erat volutpat. Maecenas semper ipsum a dolor interdum, a accumsan risus malesuada. Cras eu bibendum massa. Nunc suscipit quam vel est condimentum, ut posuere ante ultricies. Curabitur porttitor, augue a volutpat dictum, metus dolor commodo odio, ultricies viverra lorem risus id nisi. Aenean mollis, libero et dapibus vulputate, ligula metus facilisis urna, ac dignissim justo eros id ex. Donec interdum molestie velit nec aliquam. Ut tempor tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquet augue mauris, sed tempus tellus viverra vitae. Nunc luctus in ante id bibendum. Nunc vehicula dui et ornare volutpat. Ut gravida venenatis odio sit amet consectetur. Praesent tempus varius gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              url="https://example.org/vocab/mit"
            ></SearchResultComponent>
            <SearchResultComponent
              title="MIT"
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl et orci feugiat semper. Aliquam erat volutpat. Maecenas semper ipsum a dolor interdum, a accumsan risus malesuada. Cras eu bibendum massa. Nunc suscipit quam vel est condimentum, ut posuere ante ultricies. Curabitur porttitor, augue a volutpat dictum, metus dolor commodo odio, ultricies viverra lorem risus id nisi. Aenean mollis, libero et dapibus vulputate, ligula metus facilisis urna, ac dignissim justo eros id ex. Donec interdum molestie velit nec aliquam. Ut tempor tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquet augue mauris, sed tempus tellus viverra vitae. Nunc luctus in ante id bibendum. Nunc vehicula dui et ornare volutpat. Ut gravida venenatis odio sit amet consectetur. Praesent tempus varius gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              url="https://example.org/vocab/mit"
            ></SearchResultComponent>
          </div>
        </div>
      </Main>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!context.query.q) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
}

export default Search;

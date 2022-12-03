import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import HideBetween from '@/components/HideBetween';
import SearchBar from '@/components/SearchBar';
import SearchResultComponent from '@/components/SearchResultComponent';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const BASE_API = 'http://localhost:8080';
const SEARCH_API = `${BASE_API}/search`;

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

const Search = ({ searchResult }) => {
  const router = useRouter();
  const [textFieldValue, setTextFieldValue] = useState('');
  const q = String(router.query.q);
  const description = `Search: ${q}`;
  return (
    <div id="base-div">
      <Main
        meta={<Meta title="MedLine Search Engine" description={description} />}
      >
        <div className="sticky top-0 flex flex-col items-center content-center justify-center">
          {/* Use router.basePath relatively */}
          <SearchBar showLogo={true} defaultValue={q}></SearchBar>
        </div>

        {searchResult.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src={`${router.basePath}/assets/NotFound.gif`}
              alt={'Not Found logo'}
            ></img>
            <div className="font-bold">
              No Document Found...
            </div>
          </div>
        ) : (
          <div
            id="search-result"
            className="flex flex-col gap-7 max-w-screen-md m-2 px-3 place-self-start"
          >
            {searchResult.map((val, idx) => {
              return (
                <SearchResultComponent
                  score={val.score}
                  key={idx}
                  title={val.id}
                  desc={val.excerpt}
                  url={val.path}
                ></SearchResultComponent>
              );
            })}
          </div>
        )}
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
  let resultList = [];
  try {
    const res = await axios.post(SEARCH_API, {
      content: context.query.q,
      rerank: true,
    });
    resultList = res.data.results;
  } catch {}
  return {
    props: {
      searchResult: resultList,
    },
  };
}

export default Search;

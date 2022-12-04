import axios from 'axios';
import Decimal from 'decimal.js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import HideBetween from '@/components/HideBetween';
import SearchBar from '@/components/SearchBar';
import SearchResultComponent from '@/components/SearchResultComponent';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const SEARCH_API = `${AppConfig.base_backend}/search`;
const SPELLCHECK_API = `${AppConfig.base_backend}/spellcheck`;

const Search = ({ searchResult, spellcheck, showSpellcheck, duration }) => {
  const router = useRouter();
  const [textFieldValue, setTextFieldValue] = useState('');
  const q = String(router.query.q);
  const k = Number(router.query.k ?? 10);
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
        <div className="max-w-screen-md px-5 pt-4">
          {showSpellcheck && (
            <div>
              Maybe, you mean: &quot;
              <a href={`/search?q=${spellcheck}`}>{spellcheck}</a>&quot;?
            </div>
          )}
          <div className="text-sm text-blue-800">
            Fetched results in:{' '}
            <span className="font-bold">
              {new Decimal(duration).toPrecision(4)}
            </span>{' '}
            ms
          </div>
        </div>
        {searchResult.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src={`${router.basePath}/assets/NotFoundCompressed.gif`}
              alt={'Not Found logo'}
            ></img>
            <div className="font-bold">No Document Found...</div>
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
                  url={`collection/${val.path}`}
                ></SearchResultComponent>
              );
            })}
          </div>
        )}
        <div className="w-full flex justify-center text-center">
          <Link scroll={false} href={`/search?q=${q}&k=${k + 10}`}>
            More result ▼
          </Link>
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
  const k = context.query.k ?? 10;
  const start = performance.now();
  let resultList = [];
  try {
    const res = await axios.post(SEARCH_API, {
      content: context.query.q,
      k,
      rerank: true,
    });
    if (res.data.results) resultList = res.data.results;
  } catch {}
  const duration = performance.now() - start;

  let spellcheckQuery = context.query.q;
  let changed = false;
  try {
    const res = await axios.post(SPELLCHECK_API, {
      content: context.query.q,
      rerank: true,
    });
    // console.log(res.data)
    if (res.data.spellcheck) spellcheckQuery = res.data.spellcheck;
    if (res.data.changed) changed = res.data.changed;
  } catch {}

  return {
    props: {
      searchResult: resultList,
      spellcheck: spellcheckQuery,
      showSpellcheck: changed,
      duration,
    },
  };
}

export default Search;

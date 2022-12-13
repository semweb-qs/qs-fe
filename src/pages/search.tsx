import axios from 'axios';
import Decimal from 'decimal.js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import BoxComponent from '@/components/BoxComponent';
import SearchBar from '@/components/SearchBar';
import SearchResultComponent from '@/components/SearchResultComponent';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';
import { highlight, titleize } from '@/utils/highlight';
import { getVocab } from '@/utils/sparql';
import { emoji } from '@/utils/qol';

const SEARCH_API = `${AppConfig.base_backend}/search`;

const Search = ({
  searchResult,
  spellcheck,
  showSpellcheck,
  duration,
  resultDesc,
}) => {
  const router = useRouter();
  const [textFieldValue, setTextFieldValue] = useState('');
  const q = String(router.query.q);
  const k = Number(router.query.k ?? 10);
  const description = `Search: ${q}`;
  return (
    <div id="base-div">
      <Main
        meta={<Meta title="QS World Search Engine" description={description} />}
      >
        <div className="sticky z-[100] top-0 flex flex-col items-center content-center justify-center">
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
          <div className="text-sm text-amber-800">
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
          <div className="flex flex-col-reverse lg:flex-row">
            <div
              id="search-result"
              className="flex flex-col gap-7 max-w-screen-md m-2 px-3 place-self-start"
            >
              {searchResult.map((val, idx) => {
                const iri = getVocab(val.id.split(' ')[0]);
                const label = resultDesc[iri];
                const highlighted = highlight(label, q);
                const type = titleize(val.id.split(' ')[1]);
                return (
                  <SearchResultComponent
                    score={val.score}
                    key={idx}
                    title={`${label}`}
                    desc={highlighted}
                    iri={`[${emoji[type]} ${type} :${val.id.split(' ')[0]}]`}
                    url={`${router.basePath} /${val.id.split(' ')[0]}`}
                  ></SearchResultComponent>
                );
              })}
            </div>
            <BoxComponent
              name={searchResult[0].id}
              url={`${searchResult[0].path}`}
              query={q}
            ></BoxComponent>
          </div>
        )}
        <div className="w-full flex justify-center text-center">
          <Link scroll={false} href={` / search ? q =${q}&k=${k + 10}`}>
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
  let changed = false;
  let spellcheckQuery = context.query.q;
  let desc = {};
  try {
    const res = await axios.post(
      SEARCH_API,
      {
        content: context.query.q,
        k,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'application/json',
        },
      }
    );
    const tmp = [];
    for (const des of res.data.desc) {
      tmp.push([des['@id'], des[AppConfig.rdfsLabel][0]['@value']]);
    }
    desc = Object.fromEntries(tmp);
    if (res.data.results) {
      resultList = res.data.results;
      spellcheckQuery = res.data.spell_checked;
      changed = res.data.changed;
    }
  } catch (e) {}
  const duration = performance.now() - start;
  return {
    props: {
      searchResult: resultList,
      spellcheck: spellcheckQuery,
      showSpellcheck: changed,
      duration,
      resultDesc: desc,
    },
  };
}

export default Search;

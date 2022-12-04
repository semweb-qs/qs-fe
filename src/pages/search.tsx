import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import HideBetween from '@/components/HideBetween';
import SearchBar from '@/components/SearchBar';
import SearchResultComponent from '@/components/SearchResultComponent';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const SEARCH_API = `${AppConfig.base_backend}/search`;

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

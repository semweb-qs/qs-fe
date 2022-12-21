import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Hits, InstantSearch } from 'react-instantsearch-hooks-web';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

import BoxComponent from '@/components/BoxComponent';
import SearchBar from '@/components/SearchBar';
import SearchErrorToast from '@/components/SearchError';
import { HitsResults, OneResult } from '@/components/SearchResultComponent';
import Stats from '@/components/Stats';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';
import { cutDescription } from '@/utils/highlight';
import { emoji } from '@/utils/qol';
import { getVocab } from '@/utils/sparql';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'DCQ02OBoCcUazHCjlFmHRGXn6veorMJy',
    nodes: [
      {
        host: 'searchqs.smuada.com',
        port: 443,
        protocol: 'https',
      },
    ],
  },
  additionalSearchParameters: {
    query_by: 'university,description',
  },
});
const { searchClient } = typesenseInstantsearchAdapter;

const Search = () => {
  const router = useRouter();
  const [boxID, setBoxID] = useState('Q10159');
  const changeBox = () => {
    try {
      const topMost = document.getElementById('result-1');
      const topSearch = topMost.getAttribute('data-id');
      if (boxID !== topSearch) {
        setBoxID(topSearch);
      }
    } catch {
      setBoxID('');
    }
  };
  useEffect(() => {
    setInterval(changeBox, 1000);
  }, []);
  return (
    <div id="base-div">
      <Main
        meta={
          <Meta
            title="QS World Search Engine"
            description="QS World searching page"
          />
        }
      >
        <InstantSearch searchClient={searchClient} indexName="universities">
          <div className="sticky z-[100] top-0 flex flex-col items-center content-center justify-center">
            <SearchBar showLogo />
          </div>
          <div className="md:pl-4 mx-10">
            <Stats />
            <div className={'flex flex-col-reverse md:flex-row justify-center'}>
              <HitsResults />
              <div id="box-component">
                <BoxComponent
                  isVocab={true}
                  boxID={boxID}
                  type={'University'}
                />
              </div>
            </div>
          </div>
          <SearchErrorToast />
        </InstantSearch>
      </Main>
    </div>
  );
};

export default Search;

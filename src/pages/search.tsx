import { useRouter } from 'next/router';
import React from 'react';
import { Hits, InstantSearch } from 'react-instantsearch-hooks-web';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

import SearchBar from '@/components/SearchBar';
import { OneResult } from '@/components/SearchResultComponent';
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

const SEARCH_API = `${AppConfig.base_backend}/search`;

const Hit = ({ hit }) => {
  // eslint-disable-next-line no-underscore-dangle
  const desc = cutDescription(hit._highlightResult.description.value);

  return (
    <OneResult
      url={getVocab(hit.objectID)}
      title={hit.university}
      desc={desc}
      titleBold={`[${emoji.University} ${hit.objectID}]`}
    ></OneResult>
  );
};

const Search = () => {
  const router = useRouter();

  return (
    <div id="base-div">
      <Main
        meta={
          <Meta title="QS World Deprecated Engine" description="QS World" />
        }
      >
        <InstantSearch searchClient={searchClient} indexName="universities">
          <div className="sticky z-[100] top-0 flex flex-col items-center content-center justify-center">
            <SearchBar showLogo />
          </div>
          <Stats />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </Main>
    </div>
  );
};

export default Search;

import { setSettings } from '@algolia/client-search';
import { index } from 'instantsearch.js/es/widgets';
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
  const desc = cutDescription(hit._highlightResult.description.value);

  return (
    <OneResult
      url={getVocab(hit.objectID)}
      title={hit.university}
      desc={desc}
      titleBold={`[${emoji.University} ${hit.objectID}]`}
    ></OneResult>
    // <article>
    //   <h1>
    //     <Highlight attribute="university" hit={hit} />
    //   </h1>
    //   <p>
    //     <Highlight attribute="description" hit={hit} />
    //   </p>
    // </article>
  );
};

const Search = ({
  searchResult,
  spellcheck,
  showSpellcheck,
  duration,
  resultDesc,
}) => {
  const router = useRouter();
  // const [textFieldValue, setTextFieldValue] = useState("");
  // const q = String(router.query.q);
  // const k = Number(router.query.k ?? 10);
  // const description = `Search: ${q}`;

  return (
    <div id="base-div">
      <Main
        meta={<Meta title="QS World Search Engine" description="QS World" />}
      >
        <InstantSearch searchClient={searchClient} indexName="universities">
          <div className="sticky z-[100] top-0 flex flex-col items-center content-center justify-center">
            <SearchBar />
          </div>
          <Stats />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </Main>
    </div>
  );
};

export default Search;

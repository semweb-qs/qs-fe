import { useRouter } from 'next/router';
import React from 'react';
import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
  useConnector,
} from 'react-instantsearch-hooks-web';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

import SearchBar from '@/components/SearchBar';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';
import {useStats} from "@/utils/instantSearchConnectors";

export function Stats(props) {
  const {
    hitsPerPage,
    nbHits,
    areHitsSorted,
    nbSortedHits,
    nbPages,
    page,
    processingTimeMS,
    query,
  } = useStats(props);

  // console.log(processingTimeMS, nbHits);

  return (
    <div>
      <p>{String(nbHits)}</p>
      <p>{String(processingTimeMS)}</p>
    </div>
  );
}

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
  // console.log(hit);
  return (
    <article>
      <h1>
        <Highlight attribute="university" hit={hit} />
      </h1>
      <p>
        <Highlight attribute="description" hit={hit} />
      </p>
    </article>
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
        <div className="sticky z-[100] top-0 flex flex-col items-center content-center justify-center">
          <InstantSearch searchClient={searchClient} indexName="universities">
            <SearchBar />
            <Stats />
            <Hits hitComponent={Hit} />
          </InstantSearch>
        </div>
        {/* <div className="max-w-screen-md px-5 pt-4">
          {showSpellcheck && (
            <div>
              Maybe, you mean: &quot;
              <a href={`/search?q=${spellcheck}`}>{spellcheck}</a>&quot;?
            </div>
          )}
          <div className="text-sm text-amber-800">
            Fetched results in:{" "}
            <span className="font-bold">
              {new Decimal(duration).toPrecision(4)}
            </span>{" "}
            ms
          </div>
        </div> */}
        {/* {searchResult.length === 1 ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src={`${router.basePath}/assets/NotFoundCompressed.gif`}
              alt={"Not Found logo"}
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
                const iri = getVocab(val.id.split(" ")[0]);
                const label = resultDesc[iri];
                const highlighted = highlight(label, q);
                const type = titleize(val.id.split(" ")[1]);
                return (
                  <SearchResultComponent
                    score={val.score}
                    key={idx}
                    title={`${label}`}
                    desc={highlighted}
                    titleBold={`[${emoji[type]} ${type} :${
                      val.id.split(" ")[0]
                    }]`}
                    url={iri}
                  ></SearchResultComponent>
                );
              })}
            </div>
            <BoxComponent id={"Q1257946"} type={"University"}></BoxComponent>
          </div>
        )} */}
      </Main>
    </div>
  );
};

export default Search;

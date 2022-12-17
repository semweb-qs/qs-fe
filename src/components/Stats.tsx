import Decimal from 'decimal.js';

import { useStats } from '@/utils/instantSearchConnectors';

const Stats = (props) => {
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
  const timeResult = Number(processingTimeMS);
  return (
    <div className="max-w-screen-md px-5 pt-4">
      {/* {showSpellcheck && ( */}
      {/*  <div> */}
      {/*    Maybe, you mean: &quot; */}
      {/*    <a href={`/search?q=${spellcheck}`}>{spellcheck}</a>&quot;? */}
      {/*  </div> */}
      {/* )} */}
      <div className="text-sm text-amber-800">
        Fetched results in:{' '}
        <span className="font-bold">
          {new Decimal(timeResult).toPrecision(4)}
        </span>{' '}
        ms
      </div>
    </div>
  );
};

export default Stats;

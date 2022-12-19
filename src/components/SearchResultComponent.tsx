import { Option, Select } from '@material-tailwind/react';
import Decimal from 'decimal.js';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import {
  Highlight,
  Snippet,
  useInfiniteHits,
  useSearchBox,
} from 'react-instantsearch-hooks-web';

import BoxComponent from '@/components/BoxComponent';
import { cutDescription } from '@/utils/highlight';
import { emoji } from '@/utils/qol';
import { getVocab } from '@/utils/sparql';

const MAX_DESC = 300;

export function OneResult({ id, url, title, desc, titleBold }) {
  const showDesc = desc.replace(
    /<mark>(.+?)<\/mark>/g,
    "<span className='font-extrabold text-amber-800 bg-amber-50'>$1</span>"
  );
  return (
    <div
      id={id}
      data-id={url.split('/').slice(-1)}
      className="flex flex-col gap-0 my-3 md:mr-2 w-full"
    >
      <div className="font-light text-gray-700 text-sm m-0 p-0">{url}</div>
      <hr className={'m-0 p-0'} />
      <a href={url} className="arial text-xl m-0 p-0 text-amber-700 w-fit">
        <strong>{titleBold}</strong> {title}
      </a>
      <div className="arial m-0 p-0 text-sm">{parse(showDesc)}</div>
    </div>
  );
}

export function HitsResults() {
  const { hits } = useInfiniteHits();
  const { isSearchStalled } = useSearchBox(
    {},
    { $$widgetType: 'custom.loadingIndicator' }
  );

  const router = useRouter();
  if (!isSearchStalled) {
    if (hits.length !== 0) {
      return (
        <div className={'w-full md:w-3/4 md:pr-10 justify-self-start'}>
          {hits.map((hit, i) => {
            let curDesc = '';
            try {
              // @ts-ignore
              // eslint-disable-next-line no-underscore-dangle
              curDesc = hit._highlightResult.description.value;
            } catch {}
            const desc = cutDescription(curDesc);
            // eslint-disable-next-line no-underscore-dangle
            const position = `result-${hit.__position}`;
            return (
              <OneResult
                key={position}
                id={position}
                url={getVocab(hit.objectID)}
                title={hit.university}
                desc={desc}
                titleBold={`[${emoji.University} ${hit.objectID}]`}
              ></OneResult>
            );
          })}
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center">
        <img
          src={`${router.basePath}/assets/NotFoundCompressed.gif`}
          alt={'Not Found logo'}
        ></img>
        <div className="font-bold">No Document Found...</div>
      </div>
    );
  }
  return <div />;
}

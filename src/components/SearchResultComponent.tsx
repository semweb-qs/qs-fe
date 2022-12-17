import { Option, Select } from '@material-tailwind/react';
import Decimal from 'decimal.js';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import { Highlight, Snippet } from 'react-instantsearch-hooks-web';

import BoxComponent from '@/components/BoxComponent';

const MAX_DESC = 300;

export function OneResult({ url, title, desc, titleBold }) {
  const showDesc = desc.replace(
    /<mark>(.+?)<\/mark>/g,
    "<span className='font-extrabold text-amber-800 bg-amber-50'>$1</span>"
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="font-light text-gray-700 text-sm">{url}</div>
      <hr />
      <a href={url} className="arial text-xl m-0 p-0 text-amber-700 w-fit">
        <strong>{titleBold}</strong> {title}
      </a>
      {/* <Highlight */}
      {/*  attribute="description" */}
      {/*  hit={hit} */}
      {/*  highlightedTagName="span" */}
      {/*  classNames={{ */}
      {/*    highlighted: 'font-extrabold text-amber-800 bg-amber-50', */}
      {/*    root: 'text-sm', */}
      {/*    // separator: */}
      {/*    //   'MyCustomHighlightSeparator MyCustomHighlightSeparator--subclass', */}
      {/*  }} */}
      {/* /> */}
      <div className="arial m-0 p-0 text-sm">{parse(showDesc)}</div>
    </div>
  );
}

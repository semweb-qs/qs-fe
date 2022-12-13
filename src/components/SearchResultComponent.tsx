import { Option, Select } from '@material-tailwind/react';
import Decimal from 'decimal.js';
import parse from 'html-react-parser';

const MAX_DESC = 300;

export default function SearchResultComponent({
  url,
  title,
  desc,
  titleBold,
  score,
}) {
  // let showDesc = desc;
  // if (showDesc.length > MAX_DESC) {
  //   showDesc = showDesc.slice(0, MAX_DESC);
  //   showDesc += '...';
  // }
  return (
    <div className="flex flex-col">
      <div className="font-light text-gray-700 text-sm">
        {url} |{' '}
        <span className="font-bold">
          score: {new Decimal(score).toPrecision(4)}
        </span>
      </div>
      <hr />
      <a href={url} className="arial text-xl m-0 p-0 text-amber-700 w-fit">
        <strong>{titleBold}</strong> {title}
      </a>
      <div className="arial m-0 p-0 text-sm">{parse(desc)}</div>
    </div>
  );
}

import { Option, Select } from '@material-tailwind/react';

const MAX_DESC = 100;

export default function SearchResultComponent({ url, title, desc }) {
  let showDesc = desc;
  if (showDesc.length > MAX_DESC) {
    showDesc = showDesc.slice(0, MAX_DESC);
    showDesc += '...';
  }
  return (
    <div className="flex flex-col">
      <div className="font-light text-gray-700 text-sm">{url}</div>
      <hr />
      <a href={url} className="arial text-2xl m-0 p-0 text-amber-700 w-fit">
        {title}
      </a>
      <div className="arial m-0 p-0">{showDesc}</div>
    </div>
  );
}

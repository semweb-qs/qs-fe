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
      <a href={url} className="font-bold text-2xl m-0 p-0 text-purple-300">
        {title}
      </a>
      <div className="text-md m-0 p-0">{showDesc}</div>
    </div>
  );
}

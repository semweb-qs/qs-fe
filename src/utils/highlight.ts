import { distance } from 'fastest-levenshtein';

import { AppConfig } from '@/utils/AppConfig';

export const highlight = (content, q) => {
  try {
    const queries = q.split(/(\s+)/);
    for (let i = 0; i < queries.length; i += 1) {
      queries[i] = queries[i].toLowerCase();
    }
    const newDesc = [];
    for (const desc of content.split(/(\s+)/)) {
      let added = false;
      const curDesc = desc.toLowerCase();

      for (const query of queries) {
        const lim =
          Math.ceil(Math.log2(Math.min(query.length, desc.length))) - 1;
        if (distance(query, curDesc) <= lim) {
          added = true;
          break;
        }
      }

      if (added) {
        newDesc.push(
          `<span className='font-bold text-black-800'>${desc}</span>`
        );
      } else {
        newDesc.push(desc);
      }
    }
    return newDesc.join(' ');
  } catch {
    return '';
  }
};

export const titleize = (str) => {
  let upper = true;
  let newStr = '';
  for (let i = 0, l = str.length; i < l; i += 1) {
    // Note that you can also check for all kinds of spaces  with
    // str[i].match(/\s/)
    if (str[i] === ' ') {
      upper = true;
      newStr += str[i];
    } else {
      newStr += upper ? str[i].toUpperCase() : str[i].toLowerCase();
      upper = false;
    }
  }
  return newStr;
};

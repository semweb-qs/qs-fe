import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import SearchBar from '@/components/SearchBar';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const COLLECTION_API = `${AppConfig.base_backend}/collection`;
const Collection = ({ content }) => {
  const router = useRouter();
  const { part, cid } = router.query;
  const q = router.query.q ? String(router.query.q) : '';
  const description = `MedLine Document ${part} ${cid}`;
  return (
    <Main meta={<Meta title="MedLine Document" description={description} />}>
      <div className="sticky top-0 flex flex-col items-center content-center justify-center">
        {/* Use router.basePath relatively */}
        <SearchBar showLogo={true} defaultValue={q}></SearchBar>
      </div>
      <h1 className="font-bold text-center">
        Collection: {part}/{cid}
      </h1>
      <p className={'text-sm p-5 text-justify'}>{content}</p>
    </Main>
  );
};

export async function getServerSideProps(context) {
  const { part, cid } = context.query;
  let result = '';
  try {
    const res = await axios.post(
      COLLECTION_API,
      {
        part: `${part}`,
        cid: `${cid}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'application/json',
        },
      }
    );
    result = res.data.content;
  } catch {}
  return {
    props: {
      content: result,
    },
  };
}

export default Collection;

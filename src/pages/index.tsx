import { useRouter } from 'next/router';
import { useState } from 'react';

import SearchBar from '@/components/SearchBar';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const router = useRouter();
  const [textFieldValue, setTextFieldValue] = useState('');
  return (
    <Main
      meta={
        <Meta
          title="QS World Search Engine"
          description="QS World Search Engine Homepage"
        />
      }
    >
      <div className="border-b border-gray-300">
        <a
          href={'/'}
          className="flex pt-16 pb-8 content-center items-center text-center justify-center"
        >
          <img
            className="w-3/4 md:w-1/2 p-0 m-0"
            src={`${router.basePath}/assets/qs-world.png`}
            alt={'Medigle logo'}
          ></img>
        </a>
      </div>
    </Main>
  );
};

export default Index;

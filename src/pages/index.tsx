import { useRouter } from 'next/router';
import { useState } from 'react';

import BoxComponent from '@/components/infoBox';
import SearchComponent from '@/components/searchBar';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const images = [
  {
    src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
  },
  {
    src: 'https://static.wikia.nocookie.net/gensin-impact/images/e/e1/Character_Venti_Game.png',
  },
  {
    src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
    alt: 'Boats (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
  },
];

const attributes = [['ayam', 'telur']];

const accordions = [
  { header: 'Ini kepalanya', content: 'Ini Kontennya' },
  { header: 'Ini', content: 'Kocak lu' },
];

const Index = () => {
  const router = useRouter();
  const [textFieldValue, setTextFieldValue] = useState('');
  return (
    <Main
      meta={
        <Meta
          title="QS World University Ranking Semantic Web"
          description="QS World University Ranking Semantic Web"
        />
      }
    >
      <div className="flex flex-col items-center content-center justify-center">
        {/* Use router.basePath relatively */}
        <SearchComponent></SearchComponent>
      </div>

      <div className="flex flex-col items-center content-center justify-center">
        <BoxComponent images={images} attributes={attributes} accordionsData={accordions}></BoxComponent>
      </div>
    </Main>
  );
};

export default Index;

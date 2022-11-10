import { useRouter } from 'next/router';
import { useState } from 'react';

import BoxComponent from '@/components/infoBox';
import SearchComponent from '@/components/searchBar';
import SearchResultComponent from '@/components/SearchResultComponent';
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

const attributes = [
  ['Nama', 'Massachusets Institute of Technology'],
  ['Lokasi', 'Depok'],
  ['Negara', 'Indonesia'],
];

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

      <div className="flex flex-col-reverse md:flex-row">
        <div
          id="search-result"
          className="flex flex-col gap-7 w-full md:w-3/5 m-2 px-3"
        >
          <SearchResultComponent
            title="Asu"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl et orci feugiat semper. Aliquam erat volutpat. Maecenas semper ipsum a dolor interdum, a accumsan risus malesuada. Cras eu bibendum massa. Nunc suscipit quam vel est condimentum, ut posuere ante ultricies. Curabitur porttitor, augue a volutpat dictum, metus dolor commodo odio, ultricies viverra lorem risus id nisi. Aenean mollis, libero et dapibus vulputate, ligula metus facilisis urna, ac dignissim justo eros id ex. Donec interdum molestie velit nec aliquam. Ut tempor tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquet augue mauris, sed tempus tellus viverra vitae. Nunc luctus in ante id bibendum. Nunc vehicula dui et ornare volutpat. Ut gravida venenatis odio sit amet consectetur. Praesent tempus varius gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            url="https://example.org/vocab/asu"
          ></SearchResultComponent>
          <SearchResultComponent
            title="Asu"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl et orci feugiat semper. Aliquam erat volutpat. Maecenas semper ipsum a dolor interdum, a accumsan risus malesuada. Cras eu bibendum massa. Nunc suscipit quam vel est condimentum, ut posuere ante ultricies. Curabitur porttitor, augue a volutpat dictum, metus dolor commodo odio, ultricies viverra lorem risus id nisi. Aenean mollis, libero et dapibus vulputate, ligula metus facilisis urna, ac dignissim justo eros id ex. Donec interdum molestie velit nec aliquam. Ut tempor tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquet augue mauris, sed tempus tellus viverra vitae. Nunc luctus in ante id bibendum. Nunc vehicula dui et ornare volutpat. Ut gravida venenatis odio sit amet consectetur. Praesent tempus varius gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            url="https://example.org/vocab/asu"
          ></SearchResultComponent>
          <SearchResultComponent
            title="Asu"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl et orci feugiat semper. Aliquam erat volutpat. Maecenas semper ipsum a dolor interdum, a accumsan risus malesuada. Cras eu bibendum massa. Nunc suscipit quam vel est condimentum, ut posuere ante ultricies. Curabitur porttitor, augue a volutpat dictum, metus dolor commodo odio, ultricies viverra lorem risus id nisi. Aenean mollis, libero et dapibus vulputate, ligula metus facilisis urna, ac dignissim justo eros id ex. Donec interdum molestie velit nec aliquam. Ut tempor tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquet augue mauris, sed tempus tellus viverra vitae. Nunc luctus in ante id bibendum. Nunc vehicula dui et ornare volutpat. Ut gravida venenatis odio sit amet consectetur. Praesent tempus varius gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            url="https://example.org/vocab/asu"
          ></SearchResultComponent>
          <SearchResultComponent
            title="Asu"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl et orci feugiat semper. Aliquam erat volutpat. Maecenas semper ipsum a dolor interdum, a accumsan risus malesuada. Cras eu bibendum massa. Nunc suscipit quam vel est condimentum, ut posuere ante ultricies. Curabitur porttitor, augue a volutpat dictum, metus dolor commodo odio, ultricies viverra lorem risus id nisi. Aenean mollis, libero et dapibus vulputate, ligula metus facilisis urna, ac dignissim justo eros id ex. Donec interdum molestie velit nec aliquam. Ut tempor tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquet augue mauris, sed tempus tellus viverra vitae. Nunc luctus in ante id bibendum. Nunc vehicula dui et ornare volutpat. Ut gravida venenatis odio sit amet consectetur. Praesent tempus varius gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            url="https://example.org/vocab/asu"
          ></SearchResultComponent>
          <SearchResultComponent
            title="Asu"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl et orci feugiat semper. Aliquam erat volutpat. Maecenas semper ipsum a dolor interdum, a accumsan risus malesuada. Cras eu bibendum massa. Nunc suscipit quam vel est condimentum, ut posuere ante ultricies. Curabitur porttitor, augue a volutpat dictum, metus dolor commodo odio, ultricies viverra lorem risus id nisi. Aenean mollis, libero et dapibus vulputate, ligula metus facilisis urna, ac dignissim justo eros id ex. Donec interdum molestie velit nec aliquam. Ut tempor tincidunt luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquet augue mauris, sed tempus tellus viverra vitae. Nunc luctus in ante id bibendum. Nunc vehicula dui et ornare volutpat. Ut gravida venenatis odio sit amet consectetur. Praesent tempus varius gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            url="https://example.org/vocab/asu"
          ></SearchResultComponent>
        </div>
        <div className="flex-start w-full md:w-2/5 flex flex-col items-center content-center justify-center">
          <BoxComponent
            images={images}
            attributes={attributes}
            accordionsData={accordions}
          ></BoxComponent>
        </div>
      </div>
    </Main>
  );
};

export default Index;

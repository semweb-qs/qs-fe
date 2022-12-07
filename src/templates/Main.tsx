import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-center overflow-hidden w-full text-gray-700 antialiased">
      {props.meta}

      <div className="max-w-screen-xl">
        <div className="content w-full pb-5 text-xl">{props.children}</div>

        <div className="border-t border-gray-300 py-8 text-center text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.title}. Made with{' '}
          <span role="img" aria-label="Love">
            ♥
          </span>{' '}
          by{' '}
          <a href="https://github.com/semweb-qs"> QS World Semantic Web Team</a>
          . Repository setup by{' '}
          <a href="https://creativedesignsguru.com"> CreativeDesignsGuru</a>.
          {/*
           * PLEASE READ THIS SECTION
           * We'll really appreciate if you could have a link to our website
           * The link doesn't need to appear on every pages, one link on one page is enough.
           * Thank you for your support it'll mean a lot for us.
           */}
        </div>
      </div>
    </div>
  );
};

export { Main };

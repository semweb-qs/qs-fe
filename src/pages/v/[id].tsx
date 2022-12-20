import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

import BoxComponent from '@/components/BoxComponent';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { particlesConfig } from '@/utils/particlesConfig';

const Vocabulary = () => {
  const router = useRouter();
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  const vocabID = router.query.id;

  return (
    <Main
      meta={
        <Meta
          title="QS World Search Engine"
          description="QS World Search Engine Homepage"
        />
      }
    >
      <Particles
        className={'z-[-1] fixed'}
        id="tsparticles"
        init={particlesInit}
        /*
            // @ts-ignore */
        options={particlesConfig}
      />
      <div
        className={
          'flex w-[70vw] max-w-xl justify-center content-center align-middle mx-auto my-10'
        }
      >
        <BoxComponent boxID={vocabID} type={'Vocabulary Type'}></BoxComponent>
      </div>
    </Main>
  );
};

export default Vocabulary;

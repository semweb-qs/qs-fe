import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import Typed from 'typed.js';

import SearchBar from '@/components/SearchBar';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const tmp = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 900,
      },
    },
    color: {
      value: '#d97006',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.3,
      random: false,
      anim: {
        enable: false,
        speed: 0.1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 6,
      random: true,
      anim: {
        enable: false,
        speed: 10,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#d97006',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: true,
        mode: 'grab',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      push: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};

const typedOptions = {
  strings: ['<i>First</i> sentence.', '&amp; a second sentence.'],
  typeSpeed: 40,
};

const Index = () => {
  const router = useRouter();
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const typeTarget = useRef(null);

  useEffect(() => {
    const typed = new Typed(typeTarget.current, {
      strings: [' Personalized', ' Premium', ' Only'],
      typeSpeed: 40,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );
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
        loaded={particlesLoaded}
        /*
            // @ts-ignore */
        options={tmp}
      />
      <div className="flex justify-center text-center content-center max-w-screen-md w-full mx-auto">
        <a
          href={'/'}
          className="w-[70vw] max-w-xl mx-auto flex pt-16 pb-8 content-center items-center text-center justify-center"
        >
          <img
            className="z-10 p-0 m-0"
            src={`${router.basePath}/assets/qs-world.png`}
            alt={'Medigle logo'}
          ></img>
        </a>
      </div>
      <div
        className={
          'flex w-[70vw] max-w-xl justify-center content-center align-middle mx-auto'
        }
      >
        <div
          className={
            'flex flex-row justify-center text-center font-bold text-lg sm:text-4xl'
          }
        >
          <div
            className={'flex flex-col lg:flex-row break-words whitespace-pre'}
          >
            <div>
              The <span ref={typeTarget} />
            </div>
            <div className={'text-amber-700'}> QS World Semantic Web </div>
            <div>Search Engine</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-center content-center max-w-screen-md w-full mx-auto">
        <a
          className={
            'text-lg sm:text-2xl mt-10 font-bold shadow px-6 py-2 sm:px-10 sm:py-5 rounded-xl bg-amber-400 bg-opacity-30'
          }
          href={'/search'}
        >
          🚀 Start Now
        </a>
      </div>
    </Main>
  );
};

export default Index;

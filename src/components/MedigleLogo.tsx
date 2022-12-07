import { useRouter } from 'next/router';

const MedigleLogo = () => {
  const router = useRouter();
  return (
    <div className="shrink-0 p-0 m-0">
      <a href={'/'}>
        <img
          className="p-0 m-0 h-10"
          src={`${router.basePath}/assets/qs-world.png`}
          alt={'Medigle logo'}
        ></img>
      </a>
    </div>
  );
};

export default MedigleLogo;

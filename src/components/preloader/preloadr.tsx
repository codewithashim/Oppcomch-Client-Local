import React from 'react';
import Image from 'next/image';
import Preloader from '../../asects/preloader/preloader.gif';

const PreloaderComponent = () => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-white bg-opacity-75">
      <Image src={Preloader} alt="Preloader" width={100} height={100} />
    </div>
  );
};

export default PreloaderComponent;

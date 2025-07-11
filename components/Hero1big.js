import React, { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';

const Hero1big = ({ mediaData }) => {
  const [visibleMedia, setVisibleMedia] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (mediaData) {
      const filteredData = mediaData.filter((media) => media.firstBanner);
      setVisibleMedia(filteredData);
    }
  }, [mediaData]);

  const handleButtonClick = () => {
    router.push('/keliones');
  };

  return (
    <section className='flex justify-center items-center w-full relative aspect-[16/5]'>
      {visibleMedia.map((media, index) => (
        <div key={index} className='relative w-full h-full'>
          {media.firstBanner && index === startIndex && (
            <>
              <div className='absolute inset-0 w-full h-full'>
                <Image
                  src={media.images[0] || '/Placeholder.png'}
                  alt={media.name}
                  fill
                  className='object-cover w-full h-full'
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  priority
                />
                <div
                  className='absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4'
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                >
                  <h2 className='text-3xl font-bold'>{media.name}</h2>
                  <p className='text-lg mt-4'>{media.description}</p>
                  <button
                    className='mt-4 bg-button hover:bg-hover3 text-white py-2 px-4 rounded'
                    onClick={handleButtonClick}
                  >
                    Visos kelionės
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default Hero1big;

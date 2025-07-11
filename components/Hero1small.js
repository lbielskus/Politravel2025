import React, { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';

const Hero1small = ({ mediaData }) => {
  const [visibleMedia, setVisibleMedia] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (mediaData) {
      const filteredData = mediaData.filter((media) => media.firstBanner);
      setVisibleMedia(filteredData);
    }
  }, [mediaData]);

  const handleButtonClick = (route) => {
    router.push(route);
  };

  return (
    <section className='flex justify-center items-center bg-banner rounded-xl'>
      {visibleMedia.map((media, index) => (
        <div
          key={index}
          className='relative w-full h-auto rounded-xl shadow-2xl overflow-hidden pt-2'
        >
          {media.firstBanner && index === startIndex && (
            <>
              <div className='w-full h-[200px] sm:w-[400px] mx-auto px-6 '>
                <Image
                  src={media.images[0] || '/Placeholder.png'}
                  alt={media.name}
                  width={326}
                  height={164}
                  style={{ objectFit: 'contain', objectPosition: 'right' }}
                  placeholder='blur'
                  blurDataURL='https://res.cloudinary.com/dtv9ufmel/image/upload/v1713120176/ecommerce-app/file_1713120176508.webp'
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  className='rounded-2xl'
                />
              </div>
              <div className='p-4 text-text pt-16'>
                <h2 className='text-xl font-semibold text-center'>
                  {media.name}
                </h2>
                <p className='text-sm mt-4 text-center'>{media.description}</p>
                <button
                  className='block bg-button hover:bg-hover3 text-white  py-2 px-4 mt-4 rounded mx-auto'
                  onClick={() => handleButtonClick('/keliones')}
                >
                  Visos kelionės
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default Hero1small;

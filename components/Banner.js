import React from 'react';
import Image from 'next/legacy/image';

const Banner = ({ imageUrl, title }) => {
  return (
    <section className='flex justify-center items-center bg-gray-200 rounded-xl '>
      {imageUrl ? (
        <div
          className='relative w-full h-0 rounded-xl shadow-2xl'
          style={{ paddingBottom: '24%' }}
        >
          <Image
            src={imageUrl}
            alt={title}
            width={1200}
            height={288}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
            className='rounded-2xl w-full h-full'
          />
        </div>
      ) : (
        <p className='text-red-500'>Error: Image not found</p>
      )}
    </section>
  );
};

export default Banner;

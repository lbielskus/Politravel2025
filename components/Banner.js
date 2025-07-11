import React from 'react';
import Image from 'next/image';

const Banner = ({ imageUrl, title }) => {
  return (
    <section className='flex justify-center items-center bg-gray-200 rounded-xl '>
      {imageUrl ? (
        <div className='aspect-[16/5] relative w-full rounded-xl shadow-2xl'>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className='object-cover rounded-2xl'
            sizes='100vw'
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      ) : (
        <p className='text-red-500'>Error: Image not found</p>
      )}
    </section>
  );
};

export default Banner;

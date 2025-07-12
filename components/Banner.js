import React from 'react';
import Image from 'next/image';

const Banner = ({ imageUrl, title, small }) => {
  return (
    <section
      className={`flex justify-center items-center bg-gray-200 rounded-xl ${
        small ? 'h-32' : ''
      }`}
    >
      {imageUrl ? (
        <div
          className={`${
            small ? 'aspect-[16/4] h-32' : 'aspect-[16/3]'
          } relative w-full rounded-xl shadow-2xl`}
        >
          <Image
            src={imageUrl || '/Placeholder.png'}
            alt={small ? '' : title}
            fill
            className='object-cover rounded-2xl'
            sizes='100vw'
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* Only show text if not small */}
          {!small && title && (
            <div className='absolute inset-0 flex flex-col justify-center items-center text-white text-2xl font-bold bg-black/30'>
              {title}
            </div>
          )}
        </div>
      ) : (
        <p className='text-red-500'>Error: Image not found</p>
      )}
    </section>
  );
};

export default Banner;

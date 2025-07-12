import React from 'react';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';

const Banner = ({
  image = 'https://res.cloudinary.com/dgsidhhur/image/upload/v1719743756/ecommerce-app/sqltzz8bfsdtzjkjhyie.png',
  title = 'Visos kelionės',
  description = 'Kelionės autobusu bei lėktuvu. Teatralizuotos ekskursijos istorijos aistruoliams. Aktyvios kelionės ištroškusiems nuotykių ir atradimų.',
  buttonText = 'Visos kelionės',
  buttonLink = '/keliones',
}) => {
  const router = useRouter();
  return (
    <section className='w-full h-[350px] relative '>
      <Image
        src={image}
        alt={title}
        layout='fill'
        className='object-cover w-full h-full rounded-2xl'
        priority
      />
      <div
        className='rounded-2xl absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4'
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      >
        <h2 className='text-3xl font-bold'>{title}</h2>
        <p className='text-lg mt-4'>{description}</p>
        <button
          className='mt-4 bg-button hover:bg-hover3 text-white py-2 px-4 rounded'
          onClick={() => router.push(buttonLink)}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default Banner;

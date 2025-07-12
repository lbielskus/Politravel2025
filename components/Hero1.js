import React from 'react';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Banner = ({
  image = 'https://res.cloudinary.com/dgsidhhur/image/upload/v1719743756/ecommerce-app/sqltzz8bfsdtzjkjhyie.png',
  title = 'Visos kelionės',
  description = 'Kelionės autobusu bei lėktuvu. Teatralizuotos ekskursijos istorijos aistruoliams. Aktyvios kelionės ištroškusiems nuotykių ir atradimų.',
  buttonText = 'Visos kelionės',
  buttonLink = '/keliones',
}) => {
  const router = useRouter();
  return (
    <motion.section
      className='w-full h-[350px] relative'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={image}
          alt={title}
          layout='fill'
          className='object-cover w-full h-full rounded-2xl'
          priority
        />
      </motion.div>
      <div
        className='rounded-2xl absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4'
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      >
        <motion.h2
          className='text-3xl font-bold'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className='text-lg mt-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {description}
        </motion.p>
        <motion.button
          className='mt-4 bg-button hover:bg-hover3 text-white py-2 px-4 rounded transition-all duration-300'
          onClick={() => router.push(buttonLink)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.section>
  );
};

export default Banner;

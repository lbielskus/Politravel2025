import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import { motion } from 'framer-motion';

import { FaBus } from 'react-icons/fa';
import { FaPlaneUp } from 'react-icons/fa6';
import { FaMountainSun } from 'react-icons/fa6';
import { GiMountedKnight } from 'react-icons/gi';
import { TbWorld } from 'react-icons/tb';
import { GiOpenBook } from 'react-icons/gi';

const ServicesCards = () => {
  return (
    <section className='py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
            Mūsų paslaugos
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            Atraskite įvairias kelionių galimybes, pritaikytas jūsų poreikiams
          </p>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <Card
            title='Visos kelionės'
            icon={<TbWorld className='text-7xl  text-button' />}
            url='/keliones'
          />
          <Card
            title='Kelionės autobusu'
            icon={<FaBus className='text-6xl  text-button ' />}
            url='/kategorijos/keliones-autobusu' // Updated to use slug-based URL
          />
          <Card
            title='Kelionės lėktuvu'
            icon={<FaPlaneUp className='text-6xl  text-button' />}
            url='/kategorijos/keliones-lektuvu'
          />
          <Card
            title='Aktyvios kelionės'
            icon={<FaMountainSun className='text-6xl  text-button' />}
            url='/kategorijos/aktyvios-keliones'
          />
          <Card
            title='Teatralizuotos ekskursijos'
            icon={<GiMountedKnight className='text-7xl  text-button' />}
            url='/kategorijos/teatralizuotos-ekskursijos'
          />
          <Card
            title='Straipsniai'
            icon={<GiOpenBook className='text-7xl  text-button' />}
            url='/straipsniai'
          />
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ title, icon, url }) => {
  const router = useRouter(); // Use the useRouter hook

  const handleClick = () => {
    router.push(url); // Navigate to the specified URL
  };

  return (
    <motion.div
      className='bg-white rounded-2xl p-6 h-200 flex flex-col items-center justify-center shadow-2xl w-[200px] md:w-[200px] lg:w-[250px] xl:w-[250px] mx-auto'
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      whileHover={{
        y: -10,
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className='icon-container w-16 h-16 text-center'
        whileHover={{
          scale: 1.2,
          rotate: 5,
          transition: { duration: 0.3 },
        }}
      >
        {icon}
      </motion.div>

      <motion.button
        onClick={handleClick} // Add onClick handler to the button
        className='h-15 mt-11 bg-button text-white px-4 py-2 rounded-md hover:bg-hover3 transition-colors'
        whileHover={{
          scale: 1.05,
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        {title}
      </motion.button>
    </motion.div>
  );
};

export default ServicesCards;

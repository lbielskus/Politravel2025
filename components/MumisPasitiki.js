import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MumisPasitiki = () => {
  const openUrl = () => {
    window.open('https://lbvisible.com', '_blank');
  };

  return (
    <motion.section
      className='py-4 bg-gradient-to-r from-green-50/40 to-blue-100/40 rounded-2xl shadow-2xl flex justify-center items-center'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className='container mx-auto'>
        <div className='flex flex-col items-center space-y-8 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-4 gap-12'>
          <motion.div
            className='inline-block rounded-lg border border-gray-300 overflow-hidden shadow-md cursor-pointer bg-white p-1 flex items-center justify-center'
            style={{ minHeight: 'unset', height: 'auto', maxHeight: '90px' }}
            onClick={openUrl}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src='/3.png'
              alt='Logo 1'
              width={220}
              height={70}
              className='object-contain rounded-md'
              style={{ maxHeight: '70px', width: 'auto', height: 'auto' }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default MumisPasitiki;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MumisPasitiki = () => {
  const openUrl = () => {
    window.open('https://lbvisible.com', '_blank');
  };

  return (
    <section className='py-4 bg-gradient-to-r from-green-50/40 to-blue-100/40 rounded-2xl shadow-2xl flex justify-center items-center'>
      <div className='container mx-auto'>
        <div className='flex flex-col items-center space-y-8 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-4 gap-12'>
          <div
            className='inline-block rounded-lg border border-gray-300 overflow-hidden shadow-md cursor-pointer bg-white p-1 flex items-center justify-center'
            style={{ minHeight: 'unset', height: 'auto', maxHeight: '90px' }}
            onClick={openUrl}
          >
            <Image
              src='/3.png'
              alt='Logo 1'
              width={220}
              height={70}
              className='object-contain rounded-md'
              style={{ maxHeight: '70px', width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MumisPasitiki;

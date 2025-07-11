import React from 'react';
import Layout from '../../components/Layout';
import { NextSeo } from 'next-seo';

const DUK = () => {
  return (
    <>
      <NextSeo
        title='PoliTravel.lt / D. U. K.'
        description='Dažniausiai užduodami klausimai'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://politravel.lt/',
          site_name: 'PoliTravel',
          images: [
            {
              url: 'https://res.cloudinary.com/dgsidhhur/image/upload/v1719670070/ecommerce-app/zx6rrkftwt5agzysa7tg.png',
              width: 1200,
              height: 630,
              alt: 'Politravel logo',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      {/* Remove <Layout> wrapper, keep only the content */}
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-3xl font-semibold mb-4'>
          Dažniausiai užduodami klausimai
        </h1>
        <p className='text-lg mb-4'>D. U. K.</p>
      </div>
    </>
  );
};

export default DUK;

// If you need categories as props, fetch from your API route like this:
export async function getServerSideProps({ req }) {
  const baseUrl = req.headers['x-forwarded-proto']
    ? `${req.headers['x-forwarded-proto']}://${req.headers.host}`
    : `http://${req.headers.host}`;

  let categories = [];
  try {
    const res = await fetch(`${baseUrl}/api/categories`);
    categories = await res.json();
  } catch (error) {
    // Error handling for production
  }

  return {
    props: {
      categories,
    },
  };
}

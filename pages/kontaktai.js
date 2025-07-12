import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ContactForm from '../components/ContactForm';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const ContactPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <NextSeo
        title='Kontaktai'
        description='Kontaktai'
        openGraph={{
          type: 'website',
          locale: 'lt_LT',
          url: 'https://politravel.lt/kontaktai',
          site_name: 'PoliTravel.lt',
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
      <div className='container mx-auto mt-8'>
        {loading ? (
          <div className='flex justify-center items-center min-h-screen mx-auto'>
            <Spinner />
          </div>
        ) : (
          <>
            <ContactForm />
          </>
        )}
      </div>
    </>
  );
};

export default ContactPage;

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

import '../styles/globals.css';
import { Montserrat } from 'next/font/google';
import { DefaultSeo } from 'next-seo';
import { CartContextProvider } from '../lib/CartContext';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Layout from '../components/Layout';
import { AnimatePresence, motion } from 'framer-motion';
import {
  usePageTransition,
  pageTransitionVariants,
} from '../hooks/usePageTransition';

const montserrat = Montserrat({
  subsets: ['latin'],
});

type Category = {
  id: string;
  [key: string]: any; // or define your fields more specifically
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { isLoading } = usePageTransition();

  useEffect(() => {
    const handleRouteChange = () => {
      setShowCategories(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    // Fetch categories from Firestore on mount
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, 'categories'));
      setCategories(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchCategories();
  }, []);

  return (
    <>
      <DefaultSeo
        title='PoliTravel.lt - Išskirtinės kelionių programos'
        description='Atraskite nuostabias keliones su PoliTravel.lt. Išskirtinės kelionių programos, patikimi partneriai ir nepamirštami atsiminimai.'
        canonical='https://politravel.lt'
        openGraph={{
          type: 'website',
          locale: 'lt_LT',
          url: 'https://politravel.lt/',
          site_name: 'PoliTravel.lt',
          title: 'PoliTravel.lt - Išskirtinės kelionių programos',
          description:
            'Atraskite nuostabias keliones su PoliTravel.lt. Išskirtinės kelionių programos, patikimi partneriai ir nepamirštami atsiminimai.',
          images: [
            {
              url: 'https://res.cloudinary.com/dgsidhhur/image/upload/v1719670070/ecommerce-app/zx6rrkftwt5agzysa7tg.png',
              width: 1200,
              height: 630,
              alt: 'PoliTravel.lt - Kelionių agentūra',
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          handle: '@politravel',
          site: '@politravel',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'kelionės, kelionių agentūra, kelionių programos, kelionės užsienį, kelionės Lietuvoje, PoliTravel, kelionių pasiūlymai',
          },
          {
            name: 'author',
            content: 'PoliTravel.lt',
          },
          {
            name: 'robots',
            content:
              'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'alternate',
            hrefLang: 'lt',
            href: 'https://politravel.lt',
          },
        ]}
      />
      <CartContextProvider>
        <Toaster position='top-center' />
        <Layout
          categories={categories}
          showCategories={showCategories}
          setShowCategories={setShowCategories}
          className={montserrat.className}
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={router.asPath}
              initial='initial'
              animate='in'
              exit='out'
              variants={pageTransitionVariants}
              transition={{ duration: 0.3 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </CartContextProvider>
    </>
  );
}

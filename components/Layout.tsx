import Head from 'next/head';
import { ReactNode, Dispatch, SetStateAction } from 'react';
import CookieConsent from './CookieConsent';
import usePerformanceMonitoring from '../hooks/usePerformanceMonitoring';
import Header from './Header';
import Footer from './Footer';
import ContactButton from './ContactButton';
import BackToTopButton from './BackToTopButton';
import TopBanner from './TopBanner';
import Top2Banner from './Top2Banner';

type LayoutProps = {
  children: ReactNode;
  categories: any[];
  showCategories: boolean;
  setShowCategories: Dispatch<SetStateAction<boolean>>;
  className?: string;
};

const Layout = ({
  children,
  categories,
  showCategories,
  setShowCategories,
  className,
}: LayoutProps) => {
  // Monitor performance in production
  usePerformanceMonitoring();

  return (
    <>
    <div
      className={`gpu-accelerate min-h-screen max-w-screen-2xl mx-auto bg-background sm:px-6 ${className}`}
    >
      <Head>
        <title>Your Website Title</title>
        <meta name='description' content='Your website description' />
        <link rel='icon' href='/favicon.ico' />

        {/* Preload critical resources */}
        <link
          rel='preload'
          href='/fonts/montserrat.woff2'
          as='font'
          type='font/woff2'
          crossOrigin=''
        />

        {/* DNS prefetch for external domains */}
        <link rel='dns-prefetch' href='//res.cloudinary.com' />
        <link rel='dns-prefetch' href='//firebasestorage.googleapis.com' />

        {/* Viewport optimization for mobile */}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, viewport-fit=cover'
        />
      </Head>
      <Top2Banner />
      <TopBanner />
      <Header
        categories={categories}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
      />
      <main className='will-change-scroll sm:mt-8'>{children}</main>
      <Footer />
      <ContactButton />
      <BackToTopButton />
      {/* CookieConsent moved outside */}
    </div>
    <CookieConsent />
    </>
  );
};

export default Layout;

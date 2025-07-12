import Banner from '../components/Banner';
import Products from '../components/Products';
import Collection from '../components/Collection';
import ContactDiv from '../components/ContactDiv';
import SlidingCategories from '../components/SlidingCategories';
import MumisPasitiki from '../components/MumisPasitiki';
import IconCards from '../components/IconCards';
// import ContactForm from '../components/ContactForm';
import { DefaultSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Head from 'next/head';

const Hero1 = dynamic(() => import('../components/Hero1'), { ssr: false });
const BlogSlide = dynamic(() => import('../components/BlogSlide'), {
  ssr: false,
});

export default function Home({
  newProducts,
  collectionProduct1,
  blogPosts,
  pricingProducts,
  categories,
  mediaData,
}) {
  const imageUrl =
    'https://res.cloudinary.com/dgsidhhur/image/upload/v1719743756/ecommerce-app/sqltzz8bfsdtzjkjhyie.png';

  // Find the firstBanner image from mediaData
  const topBanner = mediaData?.find((m) => m.firstBanner);
  const topBannerImage = topBanner?.images?.[0] || '';
  const topBannerTitle = topBanner?.name || '';
  const topBannerDescription = topBanner?.description || '';
  const topBannerButton = topBanner?.route ? 'Plačiau' : 'Visos kelionės';
  const topBannerButtonLink = topBanner?.route || '/keliones';

  // Structured data for the homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'PoliTravel.lt',
    description: 'Išskirtinės kelionių programos, norintiems atrasti daugiau.',
    url: 'https://politravel.lt',
    logo: 'https://res.cloudinary.com/dgsidhhur/image/upload/v1719670070/ecommerce-app/zx6rrkftwt5agzysa7tg.png',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LT',
      addressLocality: 'Vilnius',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Lithuanian',
    },
    sameAs: [
      'https://www.facebook.com/politravel',
      'https://www.instagram.com/politravel',
    ],
  };

  return (
    <>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel='canonical' href='https://politravel.lt' />
      </Head>
      <DefaultSeo
        title='PoliTravel.lt - Išskirtinės kelionių programos'
        description='Atraskite nuostabias keliones su PoliTravel.lt. Išskirtinės kelionių programos, patikimi partneriai ir nepamirštami atsiminimai. Užsakykite kelionę jau šiandien!'
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
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <Hero1
        image={topBannerImage}
        title={topBannerTitle}
        description={topBannerDescription}
        buttonText={topBannerButton}
        buttonLink={topBannerButtonLink}
      />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <Products products={newProducts} />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <BlogSlide posts={blogPosts} />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <SlidingCategories categories={categories} />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <div className='rounded-xl overflow-hidden'>
        <Banner imageUrl={topBannerImage} title='' small={true} />
      </div>
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <IconCards />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <MumisPasitiki />
      {/* <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <ContactForm /> */}
    </>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch products
    const productsSnapshot = await getDocs(collection(db, 'products'));
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch blogs
    const blogsSnapshot = await getDocs(collection(db, 'blog'));
    const blogPosts = blogsSnapshot.docs.map((doc) => {
      const data = doc.data();
      let createdAt = null;
      if (
        data.createdAt &&
        typeof data.createdAt === 'object' &&
        data.createdAt.seconds
      ) {
        createdAt = new Date(data.createdAt.seconds * 1000).toISOString();
      } else if (data.createdAt) {
        createdAt = data.createdAt;
      }
      return {
        id: doc.id,
        ...data,
        createdAt,
      };
    });

    // Fetch categories
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const categories = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch media
    const mediaSnapshot = await getDocs(collection(db, 'media'));
    const mediaData = mediaSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Process data
    const newProducts = products.slice(0, 3);
    const collectionProduct1 = products[0] || null;
    const pricingProducts = products.filter((p) =>
      [
        '65e64f0f283b34d56e536412',
        '65ec4f3fcf19fe7cb322f75e',
        '65ec50cbcf19fe7cb322f775',
        '65ec526ccf19fe7cb322f782',
        '65ec526ccf19fe7cb322f783',
      ].includes(p.id)
    );

    return {
      props: {
        collectionProduct1,
        newProducts,
        blogPosts: JSON.parse(JSON.stringify(blogPosts)), // Serialize blogPosts
        pricingProducts,
        categories,
        mediaData,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        collectionProduct1: null,
        newProducts: [],
        blogPosts: [],
        pricingProducts: [],
        categories: [],
        mediaData: [],
      },
    };
  }
}

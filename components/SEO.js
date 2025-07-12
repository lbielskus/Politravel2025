import { NextSeo } from 'next-seo';
import Head from 'next/head';

const SEO = ({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  structuredData,
  keywords,
  noindex = false,
  nofollow = false,
}) => {
  const robotsContent =
    noindex || nofollow
      ? `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <>
      <Head>
        {structuredData && (
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
        {canonical && <link rel='canonical' href={canonical} />}
        <meta name='robots' content={robotsContent} />
        {keywords && <meta name='keywords' content={keywords} />}
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          type: 'website',
          locale: 'lt_LT',
          site_name: 'PoliTravel.lt',
          ...openGraph,
        }}
        twitter={{
          handle: '@politravel',
          site: '@politravel',
          cardType: 'summary_large_image',
          ...twitter,
        }}
        additionalMetaTags={[
          {
            name: 'author',
            content: 'PoliTravel.lt',
          },
          {
            name: 'robots',
            content: robotsContent,
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'alternate',
            hrefLang: 'lt',
            href: canonical || 'https://politravel.lt',
          },
        ]}
      />
    </>
  );
};

export default SEO;

import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='lt'>
        <Head>
          {/* Preload critical resources */}
          <link
            rel='preload'
            href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
            as='style'
          />
          <link rel='preload' href='/styles/globals.css' as='style' />

          {/* Favicon and app icons */}
          <link rel='icon' href='/favicon.ico' type='image/x-icon' />
          <link rel='apple-touch-icon' href='/favicon.png' />

          {/* Meta tags for better SEO */}
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content='#16a34a' />
          <meta name='msapplication-TileColor' content='#16a34a' />

          {/* Open Graph default meta tags */}
          <meta property='og:type' content='website' />
          <meta property='og:site_name' content='PoliTravel.lt' />
          <meta property='og:locale' content='lt_LT' />

          {/* Twitter Card default meta tags */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@politravel' />

          {/* Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${
              process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-XXXXXXXXXX'
            }`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${
                  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-XXXXXXXXXX'
                }', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `,
            }}
          />

          {/* Google Search Console verification */}
          <meta
            name='google-site-verification'
            content='your-verification-code'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

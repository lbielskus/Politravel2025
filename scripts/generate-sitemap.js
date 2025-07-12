const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase config is complete
const isFirebaseConfigComplete = () => {
  return (
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  );
};

// Initialize Firebase only if config is complete
let app, db;
if (isFirebaseConfigComplete()) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message);
  }
}

// Slugify function
const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/ą/g, 'a')
    .replace(/č/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ė/g, 'e')
    .replace(/į/g, 'i')
    .replace(/š/g, 's')
    .replace(/ų/g, 'u')
    .replace(/ū/g, 'u')
    .replace(/ž/g, 'z')
    .replace(/[^\w\s-]/g, ' ')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Generate sitemap entries
const generateSitemapEntries = async () => {
  const entries = [];

  // If Firebase is not available, return empty entries
  if (!db) {
    console.warn(
      'Firebase not available, generating empty sitemap. This is normal for build environments without Firebase access.'
    );
    return entries;
  }

  try {
    console.log('Fetching products from Firebase...');
    // Fetch products
    const productsSnapshot = await getDocs(collection(db, 'products'));
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`Found ${products.length} products`);
    products.forEach((product) => {
      if (product.title) {
        const slug = slugify(product.title);
        entries.push({
          loc: `https://politravel.lt/keliones/${slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.8,
        });
      }
    });

    console.log('Fetching categories from Firebase...');
    // Fetch categories
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const categories = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`Found ${categories.length} categories`);
    categories.forEach((category) => {
      if (category.name) {
        const slug = slugify(category.name);
        entries.push({
          loc: `https://politravel.lt/kategorijos/${slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.7,
        });
      }
    });

    console.log('Fetching blog posts from Firebase...');
    // Fetch blog posts
    const blogsSnapshot = await getDocs(collection(db, 'blog'));
    const blogs = blogsSnapshot.docs.map((doc) => {
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

    console.log(`Found ${blogs.length} blog posts`);
    blogs.forEach((blog) => {
      if (blog.title) {
        const slug = slugify(blog.title);
        entries.push({
          loc: `https://politravel.lt/straipsniai/${slug}`,
          lastmod: blog.createdAt || new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.6,
        });
      }
    });
  } catch (error) {
    console.error('Error fetching data for sitemap:', error.message);
    console.warn(
      'Continuing with empty sitemap. This is normal if Firebase is not accessible during build.'
    );
  }

  return entries;
};

// Generate sitemap XML
const generateSitemapXML = (entries) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
};

// Main function
const main = async () => {
  console.log('Generating dynamic sitemap entries...');

  const entries = await generateSitemapEntries();
  const xml = generateSitemapXML(entries);

  // Write to file
  const outputPath = path.join(__dirname, '../public/sitemap-dynamic.xml');
  fs.writeFileSync(outputPath, xml);

  console.log(`Generated sitemap with ${entries.length} dynamic entries`);
  console.log(`Sitemap saved to: ${outputPath}`);

  if (entries.length === 0) {
    console.log('⚠️  Note: Sitemap is empty. This is normal if:');
    console.log('   - Firebase is not accessible during build');
    console.log('   - No data exists in Firebase collections');
    console.log('   - Environment variables are not set');
    console.log(
      '   The sitemap will be populated when the site is deployed and Firebase is accessible.'
    );
  }
};

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateSitemapEntries, generateSitemapXML };

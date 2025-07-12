import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const entries = [];

    // Fetch products with better error handling
    try {
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const products = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(`Found ${products.length} products for sitemap`);

      products.forEach((product) => {
        if (product.title && product.title.trim()) {
          const slug = slugify(product.title);
          if (slug) {
            entries.push({
              loc: `https://politravel.lt/keliones/${slug}`,
              lastmod:
                product.updatedAt ||
                product.createdAt ||
                new Date().toISOString(),
              changefreq: 'weekly',
              priority: 0.8,
            });
          }
        }
      });
    } catch (error) {
      console.error('Error fetching products for sitemap:', error);
    }

    // Fetch categories with better error handling
    try {
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const categories = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(`Found ${categories.length} categories for sitemap`);

      categories.forEach((category) => {
        if (category.name && category.name.trim()) {
          const slug = slugify(category.name);
          if (slug) {
            entries.push({
              loc: `https://politravel.lt/kategorijos/${slug}`,
              lastmod:
                category.updatedAt ||
                category.createdAt ||
                new Date().toISOString(),
              changefreq: 'weekly',
              priority: 0.7,
            });
          }
        }
      });
    } catch (error) {
      console.error('Error fetching categories for sitemap:', error);
    }

    // Fetch blog posts with better error handling
    try {
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

      console.log(`Found ${blogs.length} blog posts for sitemap`);

      blogs.forEach((blog) => {
        if (blog.title && blog.title.trim()) {
          const slug = slugify(blog.title);
          if (slug) {
            entries.push({
              loc: `https://politravel.lt/straipsniai/${slug}`,
              lastmod: blog.createdAt || new Date().toISOString(),
              changefreq: 'monthly',
              priority: 0.6,
            });
          }
        }
      });
    } catch (error) {
      console.error('Error fetching blog posts for sitemap:', error);
    }

    // Generate XML
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

    // Set headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader(
      'Cache-Control',
      'public, max-age=3600, stale-while-revalidate=86400'
    );

    res.status(200).send(xml);
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);

    // Return empty sitemap on error
    const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(emptyXml);
  }
}

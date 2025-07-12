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

    // Fetch products
    const productsSnapshot = await getDocs(collection(db, 'products'));
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

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

    // Fetch categories
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const categories = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

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

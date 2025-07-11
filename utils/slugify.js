/**
 * Convert a string to a URL-friendly slug
 * @param {string} text - The text to convert to a slug
 * @returns {string} - URL-friendly slug
 */
const slugify = (text) => {
  if (!text) return '';

  return (
    text
      .toString()
      .toLowerCase()
      .trim()
      // Replace Lithuanian characters
      .replace(/ą/g, 'a')
      .replace(/č/g, 'c')
      .replace(/ę/g, 'e')
      .replace(/ė/g, 'e')
      .replace(/į/g, 'i')
      .replace(/š/g, 's')
      .replace(/ų/g, 'u')
      .replace(/ū/g, 'u')
      .replace(/ž/g, 'z')
      // Replace common European characters
      .replace(/ä|à|á|â|ã|å/g, 'a')
      .replace(/ö|ò|ó|ô|õ|ø/g, 'o')
      .replace(/ü|ù|ú|û/g, 'u')
      .replace(/ë|è|é|ê/g, 'e')
      .replace(/ï|ì|í|î/g, 'i')
      .replace(/ÿ|ý/g, 'y')
      .replace(/ñ/g, 'n')
      .replace(/ç/g, 'c')
      .replace(/ß/g, 'ss')
      // Replace special characters with spaces
      .replace(/[^\w\s-]/g, ' ')
      // Replace multiple spaces or hyphens with single hyphen
      .replace(/[\s_-]+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
  );
};

/**
 * Create a slug from title only
 * @param {string} title - The product/article title
 * @returns {string} - Clean title-based slug
 */
const createSlug = (title) => {
  return slugify(title);
};

/**
 * Find product/article by slug (title matching)
 * @param {Array} items - Array of products/articles
 * @param {string} slug - The slug to match against
 * @returns {Object|null} - The matching item or null if not found
 */
const findBySlug = (items, slug) => {
  if (!items || !slug) return null;

  return (
    items.find((item) => {
      const itemSlug = slugify(item.title || item.name);
      return itemSlug === slug;
    }) || null
  );
};

export { slugify, createSlug, findBySlug };

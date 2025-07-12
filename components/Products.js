import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from '../lib/CartContext';
import toast from 'react-hot-toast';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { createSlug } from '../utils/slugify';
import FloatingGlassCard from './Cards/FloatingGlassCard';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function Products({ products }) {
  const { addProduct } = useContext(CartContext);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const router = useRouter();

  // Sort products by date (newest first) and limit to 6 for homepage
  const featuredProducts = [...products]
    .sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt || 0);
      const dateB = new Date(b.date || b.createdAt || 0);
      return dateB - dateA;
    })
    .slice(0, 6);

  const handleToggleLike = (productId) => {
    setLikedProducts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
        toast.success('Pašalinta iš mėgstamų');
      } else {
        newLiked.add(productId);
        toast.success('Pridėta į mėgstamus');
      }
      return newLiked;
    });
  };

  const handleProductClick = (productId, productTitle) => {
    if (!productId || !productTitle) {
      return;
    }
    const slug = createSlug(productTitle);
    router.push(`/keliones/${slug}`);
  };

  return (
    <section className='py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className='inline-flex items-center gap-2 bg-gradient-to-r from-button/10 to-primary/10 px-4 py-2 rounded-full mb-4'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <TrendingUp className='w-4 h-4 text-button' />
            <span className='text-sm font-medium text-button'>
              Populiariausi pasiūlymai
            </span>
          </motion.div>
          <motion.h2
            className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Naujausios kelionių programos
          </motion.h2>
          <motion.p
            className='text-gray-600 max-w-2xl mx-auto text-lg'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Atraskite įspūdingiausias keliones ir nepamirštamus nuotykius su
            mūsų kruopščiai parinktais maršrutais
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id || product._id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <FloatingGlassCard
                product={product}
                onProductClick={handleProductClick}
                onToggleLike={handleToggleLike}
                likedProducts={likedProducts}
                formatPrice={formatPrice}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className='text-center'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.div
            className='inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100'
            whileHover={{
              y: -5,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              transition: { duration: 0.3 },
            }}
          >
            <div className='flex items-center gap-3'>
              <motion.div
                className='w-12 h-12 bg-gradient-to-r from-button to-primary rounded-full flex items-center justify-center'
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles className='w-6 h-6 text-white' />
              </motion.div>
              <div className='text-left'>
                <h3 className='font-semibold text-gray-800'>
                  Daugiau kelionių laukia!
                </h3>
                <p className='text-gray-600 text-sm'>
                  Peržiūrėkite visą katalogą
                </p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href='/keliones'
                className='inline-flex items-center gap-2 bg-button hover:bg-hover3 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg whitespace-nowrap'
              >
                Žiūrėti visas keliones
                <ArrowRight className='w-4 h-4' />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

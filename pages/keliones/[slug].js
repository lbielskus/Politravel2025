'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import sanitizeHtml from 'sanitize-html';
import { NextSeo } from 'next-seo';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  Share2,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import Button from '../../components/Button';
import { findBySlug } from '../../utils/slugify';

// Temporary UI components - replace with your actual UI library
const Badge = ({ children, variant, className }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

const Card = ({ children, className }) => (
  <div
    className={`bg-white overflow-hidden shadow rounded-lg ${className || ''}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const Tabs = ({ children, value, onValueChange, className }) => (
  <div className={className}>{children}</div>
);

const TabsList = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const TabsTrigger = ({ children, value, className, isActive, onClick }) => (
  <button
    className={`${className} ${
      isActive
        ? 'bg-green-100 text-green-800 border-green-200'
        : 'bg-gray-100 text-gray-600 border-gray-200'
    } px-6 py-3 rounded-lg font-medium transition-colors border-2 hover:bg-green-50`}
    onClick={() => onClick && onClick(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeValue, className }) => {
  if (value !== activeValue) return null;
  return <div className={className}>{children}</div>;
};

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const calculatePriceWithTaxes = (price) => {
  const taxRate = 0.21;
  const vat = price * taxRate;
  const total = price + vat;
  return { vat: vat.toFixed(2), total: total.toFixed(2) };
};

export default function ProductPage({ product }) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [expandedDay, setExpandedDay] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleNextImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const toggleDayExpansion = (dayNumber) => {
    setExpandedDay(expandedDay === dayNumber ? null : dayNumber);
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      // Copy failed silently
    }
  };

  if (!product) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            Kelionė nerasta
          </h1>
          <p className='text-gray-600 mb-6'>
            Atsiprašome, bet šios kelionės informacijos nepavyko rasti.
          </p>
          <button
            onClick={() => router.push('/keliones')}
            className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
          >
            Grįžti į keliones
          </button>
        </div>
      </div>
    );
  }

  if (product) {
    const sanitizedShortDescription = sanitizeHtml(
      product.shortDescription || '',
      {
        allowedTags: [],
        allowedAttributes: {},
      }
    );
    const sanitizedDescription = sanitizeHtml(product.description || '', {
      allowedTags: ['b', 'i', 'em', 'strong', 'p', 'ul', 'ol', 'li', 'br'],
      allowedAttributes: {},
    });
    return (
      <>
        <NextSeo
          title={`${product.title}`}
          description={`${product.title} - ${sanitizedDescription}`}
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://politravel.lt/',
            site_name: 'PoliTravel',
            images: [
              {
                url: product.images[currentImageIndex],
                width: 1200,
                height: 630,
                alt: 'Product image',
              },
            ],
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
        <div className='min-h-screen bg-gray-50'>
          {/* Hero Section with Image Gallery */}
          <div className='relative bg-white'>
            <div className='container mx-auto px-4 py-8'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
                {/* Image Gallery */}
                <div className='space-y-4'>
                  {/* Main Image */}
                  <div className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group'>
                    <Image
                      src={
                        product.images[currentImageIndex] || '/placeholder.svg'
                      }
                      alt={product.title}
                      width={800}
                      height={600}
                      className='object-contain transition-transform duration-300 group-hover:scale-105 w-full h-full'
                    />
                    {/* Navigation Arrows */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePreviousImage}
                          className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110'
                        >
                          <ChevronLeft className='w-5 h-5' />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110'
                        >
                          <ChevronRight className='w-5 h-5' />
                        </button>
                      </>
                    )}
                    {/* Image Counter */}
                    {product.images.length > 1 && (
                      <div className='absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm'>
                        {currentImageIndex + 1} / {product.images.length}
                      </div>
                    )}
                    {/* Action Buttons */}
                    <div className='absolute top-4 right-4 flex gap-2'>
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
                          isLiked
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-gray-800 hover:bg-white'
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                        />
                      </button>
                      <div className='relative'>
                        <button
                          onClick={handleShare}
                          className='p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all duration-200'
                        >
                          <Share2 className='w-5 h-5' />
                        </button>
                        {showToast && (
                          <div className='absolute top-12 right-0 bg-green-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg animate-fade-in'>
                            Nukopijuota!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Thumbnail Gallery */}
                  {product.images.length > 1 && (
                    <div className='flex gap-2 overflow-x-auto pb-2'>
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            currentImageIndex === index
                              ? 'border-green-500 ring-2 ring-green-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Image
                            src={image || '/placeholder.svg'}
                            alt={`${product.title} ${index + 1}`}
                            width={80}
                            height={64}
                            className='object-contain'
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Product Info */}
                <div className='space-y-6'>
                  {/* Header */}
                  <div className='space-y-4'>
                    <div className='flex items-center gap-2'>
                      {(product.gender || product.travelType) && (
                        <Badge
                          variant='secondary'
                          className='bg-green-100 text-green-800'
                        >
                          {product.gender || product.travelType}
                        </Badge>
                      )}
                      {product.rating && (
                        <div className='flex items-center gap-1'>
                          <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                          <span className='text-sm font-medium'>
                            {product.rating}
                          </span>
                          <span className='text-sm text-gray-500'>
                            ({product.reviewCount} atsiliepimai)
                          </span>
                        </div>
                      )}
                    </div>
                    <h1 className='text-3xl lg:text-4xl font-bold text-gray-900'>
                      {product.title}
                    </h1>
                    <div className='flex items-center gap-4 text-gray-600'>
                      {(product.brand || product.country) && (
                        <div className='flex items-center gap-1'>
                          <MapPin className='w-4 h-4' />
                          <span className='text-sm'>
                            {product.brand || product.country}
                          </span>
                        </div>
                      )}
                      {(product.colors || product.duration) && (
                        <div className='flex items-center gap-1'>
                          <Clock className='w-4 h-4' />
                          <span className='text-sm'>
                            {product.colors || product.duration}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Price */}
                  <div className='bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-6 border border-green-100'>
                    <div className='flex items-baseline gap-2'>
                      <span className='text-3xl font-bold text-green-600'>
                        €{formatPrice(product.price)}
                      </span>
                      <span className='text-gray-500'>/ asmeniui</span>
                    </div>
                    <p className='text-sm text-gray-600 mt-1'>
                      Kaina gali keistis priklausomai nuo sezono
                    </p>
                  </div>
                  {/* Short Description */}
                  <div className='space-y-3'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      Pagrindinė informacija
                    </h3>
                    <p className='text-gray-700 leading-relaxed'>
                      {sanitizedShortDescription}
                    </p>
                  </div>
                  {/* Quick Info */}
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <h4 className='font-medium text-gray-900'>
                        Lankomi miestai
                      </h4>
                      <p className='text-sm text-gray-600'>
                        {product.sizes || product.cities || 'Nenurodyta'}
                      </p>
                    </div>
                    <div className='space-y-2'>
                      <h4 className='font-medium text-gray-900'>Trukmė</h4>
                      <p className='text-sm text-gray-600'>
                        {product.colors || product.duration || 'Nenurodyta'}
                      </p>
                    </div>
                  </div>
                  {/* CTA Buttons */}
                  <div className='flex justify-center'>
                    <div className='w-full max-w-sm'>
                      <Button
                        title='✉️ Gauti pasiūlymą'
                        type='button'
                        onClick={() => router.push('/kontaktai')}
                        className='bg-button hover:bg-hover3 text-white'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detalus aprašymas */}
          <div className='container mx-auto px-4 py-8'>
            <h2 className='text-2xl font-bold mb-4'>Detalus aprašymas</h2>
            <div
              className='prose max-w-none mb-8'
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />

            {/* Expandable Days */}
            {Array.isArray(product.travelDays) &&
            product.travelDays.length > 0 ? (
              <div className='mb-8'>
                <h3 className='text-xl font-semibold mb-4'>Kelionės dienos</h3>
                <div className='space-y-2'>
                  {product.travelDays.map((day, idx) => (
                    <div
                      key={idx}
                      className='border rounded-lg overflow-hidden'
                    >
                      <button
                        onClick={() => toggleDayExpansion(day.day)}
                        className='w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-green-50 transition-colors font-medium text-left'
                      >
                        <span>{day.title || `${day.day} diena`}</span>
                        {expandedDay === day.day ? (
                          <ChevronUp className='w-5 h-5 text-green-500' />
                        ) : (
                          <ChevronDown className='w-5 h-5 text-green-500' />
                        )}
                      </button>
                      {expandedDay === day.day && (
                        <div className='px-4 py-3 bg-white border border-gray-200 rounded-b-lg'>
                          <p className='text-gray-700 whitespace-pre-line'>
                            {day.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className='mb-8 text-gray-500'>
                Kelionės dienų informacija nerasta.
              </div>
            )}

            {/* Included/Excluded in Price */}
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='bg-green-50 rounded-xl p-6 border border-green-100'>
                <h3 className='text-lg font-semibold mb-4 text-green-600 flex items-center gap-2'>
                  <CheckCircle className='w-5 h-5' /> Į kainą įskaičiuota
                </h3>
                <ul className='space-y-2'>
                  {product.includedinprice?.map((item, index) => (
                    <li key={index} className='flex items-start gap-2'>
                      <CheckCircle className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                      <span className='text-gray-700'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='bg-red-50 rounded-xl p-6 border border-red-100'>
                <h3 className='text-lg font-semibold mb-4 text-red-600 flex items-center gap-2'>
                  <XCircle className='w-5 h-5' /> Į kainą neįskaičiuota
                </h3>
                <ul className='space-y-2'>
                  {product.excludedinprice?.map((item, index) => (
                    <li key={index} className='flex items-start gap-2'>
                      <XCircle className='w-4 h-4 text-red-500 mt-0.5 flex-shrink-0' />
                      <span className='text-gray-700'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Sticky Bottom CTA */}
          <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden'>
            <div className='flex justify-center'>
              <div className='w-full max-w-sm'>
                <Button
                  title='Gauti pasiūlymą'
                  type='button'
                  onClick={() => router.push('/kontaktai')}
                  className='bg-button hover:bg-hover3 text-white'
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const baseUrl = context.req.headers['x-forwarded-proto']
    ? `${context.req.headers['x-forwarded-proto']}://${context.req.headers.host}`
    : `http://${context.req.headers.host}`;

  let product = null;

  try {
    // Fetch all products to find by slug
    const res = await fetch(`${baseUrl}/api/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const allProducts = await res.json();
    product = findBySlug(allProducts, slug);
  } catch (error) {
    // Optionally log error for debugging
    // console.error('SSR error in keliones/[slug]:', error);
    return { notFound: true };
  }

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

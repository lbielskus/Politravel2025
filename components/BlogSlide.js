import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { createSlug } from '../utils/slugify';

// Improved decodeHtml function for all HTML entities
function decodeHtml(html) {
  if (typeof window !== 'undefined') {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  } else {
    // SSR fallback: decode numeric and named entities
    return html
      .replace(/&#(\d+);/g, (m, n) => String.fromCharCode(n))
      .replace(/&([a-zA-Z]+);/g, (match, entity) => {
        const entities = {
          amp: '&',
          lt: '<',
          gt: '>',
          quot: '"',
          apos: "'",
          Scaron: 'Š',
          scaron: 'š',
          ė: 'ė',
          ų: 'ų',
          ū: 'ū',
          ą: 'ą',
          č: 'č',
          ž: 'ž',
          į: 'į',
          Euro: '€',
          ndash: '–',
          mdash: '—',
          hellip: '…',
          copy: '©',
          rsquo: '’',
          lsquo: '‘',
          ldquo: '“',
          rdquo: '”',
          nbsp: ' ', // add more as needed
        };
        return entities[entity] || match;
      });
  }
}

const BlogSlide = ({ posts }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    const intervalId = setInterval(() => {
      setCurrentPostIndex((prevIndex) =>
        prevIndex === posts.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(intervalId);
  }, [posts?.length]);

  const truncateContent = (content, length) => {
    const cleanContent = decodeHtml(content?.replace(/<[^>]*>/g, '') || '');
    return cleanContent.length > length
      ? cleanContent.substring(0, length) + '...'
      : cleanContent;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('lt-LT', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.replace(/<[^>]*>/g, '').split(' ').length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  const nextPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  const currentPost = posts[currentPostIndex];

  return (
    <section className='py-8 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='container mx-auto px-2 sm:px-4'>
        <div className='text-center mb-6 sm:mb-10'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4 drop-shadow-sm'>
            Naujausi straipsniai
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-base sm:text-lg'>
            Sužinokite apie naujausias kelionių tendencijas ir gaukite naudingų
            patarimų
          </p>
        </div>
        <div className='relative max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto'>
          <div className='bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-3xl'>
            <div className='flex flex-col lg:flex-row gap-0'>
              {/* Image Section */}
              <div className='relative aspect-[4/3] w-full min-h-[180px] sm:min-h-[220px] lg:min-h-[320px] lg:w-1/2 overflow-hidden'>
                <Image
                  src={currentPost.image || '/Placeholder.png'}
                  alt={decodeHtml(currentPost.title)}
                  fill
                  className='object-cover w-full h-full transition-transform duration-500 hover:scale-105'
                  sizes='(max-width: 768px) 100vw, 50vw'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
                {/* Navigation arrows */}
                {posts.length > 1 && (
                  <>
                    <button
                      onClick={prevPost}
                      className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200'
                      aria-label='Ankstesnis straipsnis'
                    >
                      <ChevronLeft className='w-5 h-5 text-gray-700' />
                    </button>
                    <button
                      onClick={nextPost}
                      className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200'
                      aria-label='Kitas straipsnis'
                    >
                      <ChevronRight className='w-5 h-5 text-gray-700' />
                    </button>
                  </>
                )}
              </div>
              {/* Content Section */}
              <div className='p-4 sm:p-8 lg:p-10 flex flex-col justify-center min-w-0 lg:w-1/2'>
                {/* Meta info */}
                <div className='flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='w-4 h-4' />
                    <span>
                      {formatDate(currentPost.createdAt || currentPost.date)}
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Clock className='w-4 h-4' />
                    <span>{calculateReadTime(currentPost.content)} min</span>
                  </div>
                </div>
                {/* Title */}
                <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-4 line-clamp-3 drop-shadow-sm'>
                  {decodeHtml(currentPost.title)}
                </h3>
                {/* Excerpt */}
                <p className='text-gray-600 mb-4 sm:mb-6 line-clamp-3 text-base sm:text-lg leading-relaxed'>
                  {truncateContent(currentPost.content, 200)}
                </p>
                {/* CTA Button and Pagination Dots */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-2'>
                  <Link
                    href={`/straipsniai/${createSlug(currentPost.title)}`}
                    className='inline-flex items-center gap-2 bg-button hover:bg-hover3 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.04] hover:shadow-lg text-sm sm:text-base shadow-md'
                  >
                    Skaityti plačiau
                    <ArrowRight className='w-4 h-4' />
                  </Link>
                  {posts.length > 1 && (
                    <div className='flex gap-1 sm:gap-2 mt-2 sm:mt-0'>
                      {/* Show max 5 dots, with ellipsis if more */}
                      {(() => {
                        const maxDots = 5;
                        const total = posts.length;
                        const dots = [];
                        let start = 0;
                        let end = total;
                        if (total > maxDots) {
                          if (currentPostIndex <= 2) {
                            start = 0;
                            end = maxDots;
                          } else if (currentPostIndex >= total - 3) {
                            start = total - maxDots;
                            end = total;
                          } else {
                            start = currentPostIndex - 2;
                            end = currentPostIndex + 3;
                          }
                        }
                        if (start > 0) {
                          dots.push(
                            <span
                              key='start-ellipsis'
                              className='w-2 h-2 text-gray-400 flex items-center justify-center'
                            >
                              ...
                            </span>
                          );
                        }
                        for (let i = start; i < end; i++) {
                          dots.push(
                            <button
                              key={i}
                              onClick={() => setCurrentPostIndex(i)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 mx-0.5 focus:outline-none border-2 ${
                                i === currentPostIndex
                                  ? 'bg-button border-button w-5'
                                  : 'bg-gray-300 border-gray-300 hover:bg-gray-400'
                              }`}
                              aria-label={`Eiti į straipsnį ${i + 1}`}
                            />
                          );
                        }
                        if (end < total) {
                          dots.push(
                            <span
                              key='end-ellipsis'
                              className='w-2 h-2 text-gray-400 flex items-center justify-center'
                            >
                              ...
                            </span>
                          );
                        }
                        return dots;
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSlide;

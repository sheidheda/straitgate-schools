'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { General } from '@/lib/content';

interface HeroSectionProps {
  general: General;
}

export default function HeroSection({ general }: HeroSectionProps) {
  const heroTexts = general?.hero_text || [];
  const heroImages = general?.hero_images?.filter(Boolean) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselLength = heroImages.length || heroTexts.length;

  useEffect(() => {
    if (carouselLength <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselLength);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselLength]);

  const isVideo = general?.hero_media_type?.includes('video');
  const mediaSrc = general?.hero_media_url;
  const activeText = heroTexts.length > 0 ? heroTexts[currentIndex % heroTexts.length] : '';

  const moveCarousel = (direction: number) => {
    setCurrentIndex((prev) => (prev + direction + carouselLength) % carouselLength);
  };

  return (
    <section className="group relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      {heroImages.length > 0 ? (
        <AnimatePresence>
          <motion.div
            key={heroImages[currentIndex % heroImages.length]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImages[currentIndex % heroImages.length]})` }}
          />
        </AnimatePresence>
      ) : mediaSrc && (
        isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={mediaSrc} type={general.hero_media_type!} />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${mediaSrc})` }}
          />
        )
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="min-h-[120px] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              {activeText}
            </motion.h1>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dots — positioned below center content */}
      {carouselLength > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute z-10 bottom-28 left-1/2 -translate-x-1/2 flex gap-2"
        >
          {Array.from({ length: carouselLength }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </motion.div>
      )}

      {heroImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => moveCarousel(-1)}
            aria-label="Previous hero image"
            className="absolute left-4 z-20 rounded-full border border-white/30 bg-black/30 p-3 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/55 group-hover:opacity-100 sm:left-8"
          >
            <ChevronLeftIcon className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={() => moveCarousel(1)}
            aria-label="Next hero image"
            className="absolute right-4 z-20 rounded-full border border-white/30 bg-black/30 p-3 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/55 group-hover:opacity-100 sm:right-8"
          >
            <ChevronRightIcon className="h-7 w-7" />
          </button>
        </>
      )}

      {/* Scroll indicator — pinned to section bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2"
      >

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [6, 20, 6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

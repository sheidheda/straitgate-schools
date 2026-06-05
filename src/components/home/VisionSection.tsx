'use client';

import { motion } from 'framer-motion';

export default function VisionSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
              Our Direction
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-6">Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">Vision statement goes here.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/3] rounded-2xl bg-gray-200"
          />
        </div>
      </div>
    </section>
  );
}

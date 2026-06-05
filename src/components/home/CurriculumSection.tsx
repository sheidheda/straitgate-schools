'use client';

import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { Curriculum } from '@/lib/content';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

interface CurriculumSectionProps {
  curricula: Curriculum[];
}

export default function CurriculumSection({ curricula }: CurriculumSectionProps) {
  if (!curricula?.length) return null;

  return (
    <section className="py-20 lg:py-28 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/20 rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-block text-white/70 text-sm font-semibold tracking-wider uppercase mb-3">
              Christ-Centered Curriculum
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold">
              What Makes Us <span className="text-red-300">Unique?</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {curricula.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.1} direction="up">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center h-full border border-white/10 hover:bg-white/20 transition-colors"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <AcademicCapIcon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{item.content}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

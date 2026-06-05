'use client';

import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import FadeIn from '@/components/FadeIn';
import { HistoryItem } from '@/lib/content';

export default function HistoryPage({ histories }: { histories: HistoryItem[] }) {
  return (
    <>
      <PageHeader title="Our History" subtitle="The journey of Straitgate Schools" />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {histories.length === 0 ? (
            <p className="text-center text-gray-500">No history entries yet.</p>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

              <div className="space-y-12">
                {histories.map((item, i) => (
                  <FadeIn key={item.year} delay={i * 0.1}>
                    <div className="flex gap-6 md:gap-10">
                      {/* Year marker */}
                      <div className="hidden md:flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm z-10"
                        >
                          {item.year}
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-light rounded-2xl overflow-hidden">
                        {item.image && (
                          <div className="aspect-[16/7] overflow-hidden">
                            <img
                              src={item.image}
                              alt={`History ${item.year}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <span className="inline-block md:hidden bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                            {item.year}
                          </span>
                          <div
                            className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

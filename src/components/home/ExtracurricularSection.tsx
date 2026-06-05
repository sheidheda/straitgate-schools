'use client';

import { motion } from 'framer-motion';
import { General } from '@/lib/content';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface ExtracurricularSectionProps {
  general: General;
  /** Render only one half of the section. Omit to render both. */
  section?: 'mission' | 'vision';
}

export default function ExtracurricularSection({ general, section }: ExtracurricularSectionProps) {
  if (!general?.mission && !general?.vision) return null;

  const showMission = section !== 'vision';
  const showVision = section !== 'mission';

  return (
    <>
      {/* Mission */}
      {showMission && general.mission && (
        <section className="py-20 lg:py-28 bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="/images/mission.png"
                  alt="Our mission"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0 }}
                  className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3"
                >
                  Our Purpose
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-3xl lg:text-4xl font-bold text-dark mb-6"
                >
                  Mission
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-3 text-gray-600 text-lg leading-relaxed"
                >
                  {general.mission.split('\n').filter(Boolean).map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Vision & Values */}
      {showVision && (general.vision || general.values) && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                {general.vision && (
                  <div className="mb-10">
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0 }}
                      className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3"
                    >
                      Our Direction
                    </motion.span>
                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                      className="text-3xl lg:text-4xl font-bold text-dark mb-6"
                    >
                      Vision
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="space-y-3 text-gray-600 text-lg leading-relaxed"
                    >
                      {general.vision.split('\n').filter(Boolean).map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </motion.div>
                  </div>
                )}

                {general.values && general.values.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-dark mb-4">Values</h3>
                    <div className="space-y-3">
                      {general.values.map((val, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <CheckCircleIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{val}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="/images/vision.png"
                  alt="Our vision"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

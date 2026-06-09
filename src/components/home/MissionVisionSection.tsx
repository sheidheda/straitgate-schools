'use client';

import { motion } from 'framer-motion';
import { General } from '@/lib/content';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface MissionVisionSectionProps {
  general: General;
  /** Render only one half of the section. Omit to render both. */
  section?: 'mission' | 'vision';
}

export default function MissionVisionSection({ general, section }: MissionVisionSectionProps) {
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
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&q=80"
                  alt="Our mission"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <span className="mb-3 inline-block font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">
                  Our Purpose
                </span>
                <h2 className="mb-6 text-xl font-semibold leading-8 text-dark sm:text-2xl">Mission</h2>
                <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
                  {general.mission.split('\n').filter(Boolean).map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Vision & Values */}
      {showVision && (general.vision || general.values) && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {general.vision && (
                  <div className="mb-10">
                    <h2 className="mb-6 font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">Vision</h2>
                    <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
                      {general.vision.split('\n').filter(Boolean).map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                )}

                {general.values && general.values.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-xl font-semibold leading-8 text-dark sm:text-2xl">Values</h3>
                    <div className="space-y-3">
                      {general.values.map((val, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <CheckCircleIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&q=80"
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

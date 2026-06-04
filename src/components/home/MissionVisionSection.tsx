'use client';

import FadeIn from '@/components/FadeIn';
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
              <FadeIn direction="left">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/mission.png"
                    alt="Our mission"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <div>
                  <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
                    Our Purpose
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-6">Mission</h2>
                  <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
                    {general.mission.split('\n').filter(Boolean).map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* Vision & Values */}
      {showVision && (general.vision || general.values) && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <FadeIn direction="left" delay={0.2}>
                <div>
                  {general.vision && (
                    <div className="mb-10">
                      <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
                        Our Direction
                      </span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-6">Vision</h2>
                      <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
                        {general.vision.split('\n').filter(Boolean).map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {general.values && general.values.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-dark mb-4">Values</h3>
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
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/vision.png"
                    alt="Our vision"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

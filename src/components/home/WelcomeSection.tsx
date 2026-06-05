'use client';

import FadeIn from '@/components/FadeIn';
import { General } from '@/lib/content';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface WelcomeSectionProps {
  general: General;
}

export default function WelcomeSection({ general }: WelcomeSectionProps) {
  if (!general?.welcome_messages?.length) return null;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn direction="left">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/students.png"
                  alt="Straitgate students"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div>
              <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
                Welcome
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-8">
                Welcome to{' '}
                <span className="text-primary">Straitgate</span> Schools
              </h2>

              <div className="space-y-4">
                {general.welcome_messages.map((msg, i) => {
                  const parts = msg.split(':');
                  const key = parts[0];
                  const detail = parts.slice(1).join(':');
                  return (
                    <div key={i} className="flex gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">
                        <span className="font-semibold">{key}:</span>
                        {detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

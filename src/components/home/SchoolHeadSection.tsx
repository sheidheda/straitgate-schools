'use client';

import FadeIn from '@/components/FadeIn';
import Image from 'next/image';

export default function SchoolHeadSection() {
  return (
    <section className="bg-white pt-20 pb-16 lg:pt-28 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <FadeIn direction="right">
            <div className="max-w-2xl">
              <span className="mb-5 inline-block font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">
                Message from the Chairman
              </span>
              <h2 className="text-xl italic leading-8 text-dark sm:text-2xl">
                &quot;We are raising learners who can lead with wisdom, faith, and disciplined imagination.&quot;
              </h2>
              <div className="mt-8 h-1 w-20 bg-primary" />
              <p className="mt-8 text-lg leading-8 text-gray-700">
                At Straitgate Schools, education is more than preparation for examinations. It is the
                careful formation of character, curiosity, confidence, and conviction. Every child is
                known, stretched, and guided to discover the gifts God has placed within them.
              </p>
              <p className="mt-5 text-base leading-7 text-gray-600">
                Our classrooms combine academic rigor with a nurturing Christian community, so pupils
                grow into thoughtful young people who serve, create, and stand for what is right.
              </p>
              <div className="mt-8 border-l-4 border-primary pl-5">
                <p className="font-semibold text-dark">Mr Ade Adetayo</p>
                <p className="mt-1 text-sm uppercase tracking-wider text-gray-500">
                  Chairman, Straitgate Schools
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.15}>
            <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
              <div className="absolute -left-5 -top-5 h-full w-full border-4 border-primary/70" />
              <div className="relative overflow-hidden bg-light shadow-[0_34px_45px_-18px_rgba(0,0,0,0.55)]">
                <div className="aspect-[4/5]">
                  <Image
                    src="/WhatsApp Image 2026-06-05 at 12.22.25.jpeg"
                    alt="Portrait of Mr Ade Adetayo, Chairman of Straitgate Schools"
                    width={900}
                    height={1125}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/80 via-dark/25 to-transparent p-6 pt-24">
                  <p className="text-sm font-semibold uppercase tracking-wider text-white">
                    Leadership Message
                  </p>
                  <p className="mt-2 font-serif text-2xl text-white">Excellence with purpose</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

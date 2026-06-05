'use client';

import { General, School, Curriculum, Testimonial, NewsPost } from '@/lib/content';
import HeroSection from './HeroSection';
import MissionVisionSection from './MissionVisionSection';
import AlumniSection from './AlumniSection';
import NewsSection from './NewsSection';
import TestimonialsSection from './TestimonialsSection';
import MapSection from './MapSection';
import SchoolHeadSection from './SchoolHeadSection';

export interface HomePageData {
  general: General;
  schools: School[];
  curricula: Curriculum[];
  testimonials: Testimonial[];
  featuredPost: NewsPost | null;
  posts: NewsPost[];
}

export default function HomePage({ data }: { data: HomePageData }) {
  return (
    <>
      <HeroSection general={data.general} />
      <div className="sticky top-0 z-10 flex h-screen items-center justify-center overflow-hidden rounded-t-3xl bg-white">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600"
              alt="Coding / ICT Club"
              className="rounded-2xl object-cover h-80 w-full"
              loading="lazy"
            />
            <div>
              <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
                Extracurricular
              </span>
              <h2 className="text-2xl font-bold text-dark mb-4">Coding / ICT Club</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our ICT Club equips students with real-world digital skills — from web design and
                programming to robotics. Students learn to think computationally and build solutions
                that matter.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-20 flex h-screen items-center justify-center overflow-hidden rounded-t-3xl bg-[#f5f0eb]">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <img
              src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600"
              alt="Swimming Club"
              className="rounded-2xl object-cover h-80 w-full"
              loading="lazy"
            />
            <div>
              <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
                Extracurricular
              </span>
              <h2 className="text-2xl font-bold text-dark mb-4">Swimming Club</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our swimming programme builds discipline, endurance, and confidence in the water.
                Coached sessions cater to all levels from beginners to competitive swimmers.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-30 flex h-screen items-center justify-center overflow-hidden rounded-t-3xl bg-white">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600"
              alt="Press Club"
              className="rounded-2xl object-cover h-80 w-full"
              loading="lazy"
            />
            <div>
              <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
                Extracurricular
              </span>
              <h2 className="text-2xl font-bold text-dark mb-4">Press Club</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                The Press Club trains the next generation of communicators. Students learn
                journalism, photography, and public speaking — giving them a voice that reaches
                beyond the classroom.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-40 flex h-screen items-center justify-center overflow-hidden rounded-t-3xl bg-primary">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <img
              src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600"
              alt="Quiz Club"
              className="rounded-2xl object-cover h-80 w-full"
              loading="lazy"
            />
            <div>
              <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
                Extracurricular
              </span>
              <h2 className="text-2xl font-bold text-dark mb-4">Quiz Club</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our Quiz Club sharpens critical thinking and broadens knowledge across subjects.
                Students compete at inter-school and national levels, representing Straitgate with
                excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-50 flex h-screen items-center justify-center overflow-hidden rounded-t-3xl bg-light">
        <AlumniSection schools={data.schools} />
      </div>
      <div className="relative z-50 overflow-hidden rounded-t-3xl bg-white">
        <MissionVisionSection general={data.general} />
        <SchoolHeadSection />
        <MapSection />
        <NewsSection featuredPost={data.featuredPost} posts={data.posts} schools={data.schools} />
        <TestimonialsSection testimonials={data.testimonials} />
      </div>
    </>
  );
}

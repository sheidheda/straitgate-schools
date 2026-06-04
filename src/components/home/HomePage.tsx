'use client';

import { General, School, Curriculum, Testimonial, NewsPost } from '@/lib/content';
import HeroSection from './HeroSection';
import WelcomeSection from './WelcomeSection';
import MissionVisionSection from './MissionVisionSection';
import CurriculumSection from './CurriculumSection';
import AlumniSection from './AlumniSection';
import NewsSection from './NewsSection';
import TestimonialsSection from './TestimonialsSection';
import MapSection from './MapSection';

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
        <WelcomeSection general={data.general} />
      </div>
      <div className="sticky top-0 z-20 flex h-screen items-center justify-center overflow-hidden rounded-t-3xl bg-[#f5f0eb]">
        <MissionVisionSection general={data.general} section="mission" />
      </div>
      <div className="sticky top-0 z-30 flex h-screen items-center justify-center overflow-hidden rounded-t-3xl bg-white">
        <MissionVisionSection general={data.general} section="vision" />
      </div>
      <div className="sticky top-0 z-40 flex h-screen items-center justify-center overflow-hidden rounded-t-3xl bg-primary">
        <CurriculumSection curricula={data.curricula} />
      </div>
      <div className="sticky top-0 z-50 flex h-screen items-center justify-center overflow-hidden rounded-t-3xl bg-light">
        <AlumniSection schools={data.schools} />
      </div>
      <div className="relative z-50 bg-white">
        <MapSection />
        <NewsSection featuredPost={data.featuredPost} posts={data.posts} schools={data.schools} />
        <TestimonialsSection testimonials={data.testimonials} />
      </div>
    </>
  );
}

'use client';

import { General, School, Curriculum, Testimonial, NewsPost } from '@/lib/content';
import HeroSection from './HeroSection';
import MissionVisionSection from './MissionVisionSection';
import AlumniSection from './AlumniSection';
import NewsSection from './NewsSection';
import TestimonialsSection from './TestimonialsSection';
import MapSection from './MapSection';
import SchoolHeadSection from './SchoolHeadSection';
import SponsorsBar from './SponsorsBar';

const activities = [
  {
    title: 'Coding / ICT Club',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    bg: 'bg-white',
    text: 'Our ICT Club equips students with real-world digital skills - from web design and programming to robotics. Students learn to think computationally and build solutions that matter.',
  },
  {
    title: 'Robotics Club',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    bg: 'bg-[#f5f0eb]',
    text: 'Our Robotics Club gives students hands-on experience with design, coding, sensors, and automation. Learners work in teams to build intelligent machines, test ideas, and develop technology confidence.',
  },
  {
    title: 'Swimming Club',
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&q=80',
    bg: 'bg-white',
    text: 'Our swimming programme builds discipline, endurance, and confidence in the water. Coached sessions cater to all levels from beginners to competitive swimmers.',
  },
  {
    title: 'Press Club',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    bg: 'bg-[#f8f7f4]',
    text: 'The Press Club trains the next generation of communicators. Students learn journalism, photography, and public speaking, giving them a clear voice beyond the classroom.',
  },
  {
    title: 'Quiz Club',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80',
    bg: 'bg-white',
    text: 'Our Quiz Club sharpens critical thinking and broadens knowledge across subjects. Students compete at inter-school and national levels, representing Straitgate with excellence.',
  },
  {
    title: 'STEM Club',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    bg: 'bg-light',
    text: 'Our STEM Club inspires students to explore Science, Technology, Engineering and Mathematics through experiments, competitions and real-world problem solving.',
  },
  {
    title: 'Music & Performing Arts',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80',
    bg: 'bg-white',
    text: 'Students grow in confidence through choir, instruments, drama, and stage presentations. The club helps them develop creativity, teamwork, poise, and expressive communication.',
  },
  {
    title: 'Football Academy',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    bg: 'bg-[#f5f0eb]',
    text: 'The football programme builds fitness, discipline, sportsmanship, and tactical awareness through regular coaching, friendly matches, and competitive school fixtures.',
  },
  {
    title: 'Creative Arts Club',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    bg: 'bg-white',
    text: 'Learners explore drawing, painting, crafts, and design projects that sharpen observation, patience, originality, and the confidence to present finished work.',
  },
];

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
      <div className="relative">
        <div className="sticky top-0 z-[80] border-b border-black/10 bg-white/95 px-4 py-5 text-center shadow-sm backdrop-blur sm:px-6">
          <h2 className="font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">
            Extracurricular Activities
          </h2>
        </div>

        {activities.map((activity, index) => (
          <div
            key={activity.title}
            className={`sticky top-0 flex min-h-screen items-start justify-center overflow-hidden rounded-t-3xl pt-28 ${activity.bg}`}
            style={{ zIndex: 10 + index }}
          >
            <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-16">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="h-[320px] w-full rounded-2xl object-cover shadow-xl sm:h-[420px] lg:h-[500px]"
                  loading="lazy"
                />
                <div>
                  <h3 className="mb-5 font-serif text-4xl font-bold leading-tight text-primary md:text-5xl">
                    {activity.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {activity.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-[90] overflow-hidden rounded-t-3xl bg-white">
        <SchoolHeadSection />
        <MissionVisionSection general={data.general} />
        <AlumniSection schools={data.schools} />
        <SponsorsBar />
        <MapSection />
        <NewsSection featuredPost={data.featuredPost} posts={data.posts} schools={data.schools} />
        <TestimonialsSection testimonials={data.testimonials} />
      </div>
    </>
  );
}

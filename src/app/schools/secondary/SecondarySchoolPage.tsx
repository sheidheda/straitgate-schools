'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import {
  AcademicCapIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  BeakerIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  HeartIcon,
  HomeModernIcon,
  MapPinIcon,
  MusicalNoteIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import SecondaryHeadMessages from './SecondaryHeadMessages';
import './secondary.css';

const HIGH_SCHOOL_APPLY = 'https://sghs.educare.school/admission-form';
const COLLEGE_APPLY = 'https://sgc.educare.school/admission-form';

const strengths = [
  { icon: AcademicCapIcon, title: 'Academic excellence', copy: 'Rigorous, world-class teaching' },
  { icon: HeartIcon, title: 'Christ-centred', copy: 'Faith woven through each day' },
  { icon: HomeModernIcon, title: 'Boarding & care', copy: 'Structured, supervised living' },
  { icon: SparklesIcon, title: 'Leadership', copy: 'Confident, purposeful young adults' },
];

const journey = [
  {
    numeral: 'One',
    title: 'Junior Secondary',
    copy: 'A strong transition into deeper study habits, literacy, numeracy, sciences, and responsible independence.',
    image: '/straitgate-high-school1.jpg',
  },
  {
    numeral: 'Two',
    title: 'Senior Secondary',
    copy: 'Focused academic pathways, examination preparation, mentoring, and practical learning for confident readiness.',
    image: '/straitgate-high-school6.jpg',
  },
  {
    numeral: 'Three',
    title: 'Boarding School',
    copy: 'Comfortable boarding accommodation with supervised routines, guided prep, meals, worship, recreation, and pastoral care.',
    image: '/sgpics/college-academic-journey.jpg',
  },
];

const academics = [
  { title: 'STEM Programme', faculty: 'Science Faculty', grade: 'JSS – SS', icon: BeakerIcon, image: '/sgpics/home-stem-club.jpg' },
  { title: 'Language & Literacy', faculty: 'English Faculty', grade: 'JSS – SS', icon: BookOpenIcon, image: '/sgpics/home-press-club.jpg' },
  { title: 'Music & Performing Arts', faculty: 'Arts Faculty', grade: 'JSS – SS', icon: MusicalNoteIcon, image: '/sgpics/home-music-performing-arts.jpg' },
];

const pastoral = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Student care',
    copy: 'Pastoral care, guidance, discipline, mentoring, and daily support for every learner.',
  },
  {
    icon: GlobeAltIcon,
    title: 'A unified journey',
    copy: 'High School and College come together as one clear path across our Magodo and Magboro campuses.',
  },
  {
    icon: BuildingLibraryIcon,
    title: 'Modern facilities',
    copy: 'Laboratories, digital learning, and dedicated faculty prepare students to thrive.',
  },
];

const heads = [
  { name: 'Dr. Caroline Alao', role: 'Head of High School', image: '/high-school-head.jpg', width: 655, height: 1010 },
  { name: 'Mr. Joseph Oyegbile', role: 'Head of College', image: '/schead.jpg', width: 992, height: 1077 },
];

const gallery = [
  { src: '/straitgate-high-school.jpg', alt: 'Straitgate Secondary students at school' },
  { src: '/straitgate-high-school2.jpg', alt: 'Straitgate Secondary classroom life' },
  { src: '/straitgate-high-school4.jpg', alt: 'Students learning at Straitgate Secondary School' },
  { src: '/sgpics/college-campus-drive.jpg', alt: 'Straitgate College campus life' },
  { src: '/sgpics/college-academic-journey.jpg', alt: 'Straitgate students during an academic activity' },
  { src: '/sgpics/home-stem-club.jpg', alt: 'A Straitgate student participating in STEM activities' },
];

export default function SecondarySchoolPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const targets = Array.from(page.querySelectorAll<HTMLElement>('.sec-reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="secondary-school" id="top">
      <section className="sec-hero" aria-labelledby="secondary-hero-title">
        <div className="sec-hero-media" aria-hidden="true">
          <Image
            src="/sgpics/high-school-campus-drive.jpg"
            alt=""
            fill
            preload
            sizes="100vw"
          />
          <div className="sec-hero-shade" />
        </div>
        <div className="sec-container sec-hero-inner">
          <p className="sec-eyebrow"><span /> Straitgate Secondary School</p>
          <h1 id="secondary-hero-title">
            An education shaped by <em>faith, excellence &amp; character.</em>
          </h1>
          <p className="sec-hero-lead">
            Take a tour of Straitgate and discover a secondary school community where learners are known personally,
            challenged academically, and formed spiritually — through High School, College, and boarding.
          </p>
          <div className="sec-actions">
            <a className="sec-button sec-button-primary" href="#journey">
              Explore the school <ArrowRightIcon aria-hidden="true" />
            </a>
            <a className="sec-button sec-button-ghost" href="#admissions">
              Apply now
            </a>
          </div>
          <p className="sec-hero-note">
            <CheckBadgeIcon aria-hidden="true" />
            <span>Christ-centred learning across Magodo &amp; Magboro</span>
          </p>
        </div>
      </section>

      <section className="sec-strengths" aria-label="Secondary School strengths">
        <div className="sec-container sec-strengths-grid">
          {strengths.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <span className="sec-strength-icon"><Icon aria-hidden="true" /></span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="about" className="sec-section sec-about">
        <div className="sec-container sec-about-grid sec-reveal">
          <div className="sec-collage">
            <div className="sec-collage-main">
              <Image
                src="/straitgate-high-school.jpg"
                alt="Straitgate Secondary students at school"
                fill
                sizes="(max-width: 900px) 90vw, 44vw"
              />
            </div>
            <div className="sec-collage-small">
              <Image
                src="/sgpics/college-campus-drive.jpg"
                alt="Straitgate College campus life"
                fill
                sizes="(max-width: 600px) 46vw, 18vw"
              />
            </div>
            <div className="sec-collage-badge">
              <UserGroupIcon aria-hidden="true" />
              <span>Known.<br />Challenged.<br />Formed.</span>
            </div>
          </div>

          <div className="sec-about-copy">
            <p className="sec-kicker">Welcome to Straitgate Secondary</p>
            <h2>High School and College, one clear journey.</h2>
            <p className="sec-lead">
              Straitgate Secondary School brings High School and College into one clear journey: learners are known
              personally, challenged academically, and formed spiritually.
            </p>
            <p>
              We help students build disciplined study habits, confident communication, practical problem-solving,
              service, creativity, and leadership. Across Magodo and Magboro, the experience remains rooted in
              excellence, care, and Christ-centered character.
            </p>
            <a className="sec-text-link" href="#journey">
              Discover the learning journey <ArrowRightIcon aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="journey" className="sec-section sec-journey" aria-labelledby="journey-title">
        <div className="sec-container">
          <div className="sec-section-heading sec-reveal">
            <p className="sec-kicker">The Straitgate journey</p>
            <h2 id="journey-title">A path that grows with every student</h2>
            <p>From the first year of Junior Secondary through to College and boarding, each stage builds on the last.</p>
          </div>
          <div className="sec-journey-grid sec-reveal">
            {journey.map((stage, index) => (
              <article key={stage.title} className="sec-journey-card">
                <div className="sec-journey-image">
                  <Image src={stage.image} alt={stage.title} fill sizes="(max-width: 700px) 92vw, (max-width: 1080px) 46vw, 33vw" />
                  <span className="sec-journey-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="sec-journey-copy">
                  <p className="sec-journey-numeral">{stage.numeral}</p>
                  <h3>{stage.title}</h3>
                  <p>{stage.copy}</p>
                  <a href="#academics">Learn more <ArrowRightIcon aria-hidden="true" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="academics" className="sec-section sec-academics" aria-labelledby="academics-title">
        <div className="sec-container">
          <div className="sec-section-heading sec-reveal">
            <p className="sec-kicker">Academic life</p>
            <h2 id="academics-title">Where curiosity meets high standards</h2>
            <p>Specialist faculties guide students from Junior Secondary through Senior Secondary with depth and care.</p>
          </div>
          <div className="sec-academics-grid sec-reveal">
            {academics.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="sec-academics-card">
                  <div className="sec-academics-image">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 700px) 92vw, (max-width: 1080px) 46vw, 33vw" />
                    <span><Icon aria-hidden="true" /></span>
                  </div>
                  <div className="sec-academics-copy">
                    <h3>{item.title}</h3>
                    <p className="sec-academics-meta">{item.faculty}</p>
                    <p className="sec-academics-meta">Grade: {item.grade}</p>
                    <a href="#admissions">Read more <ArrowRightIcon aria-hidden="true" /></a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec-section sec-pastoral" aria-labelledby="pastoral-title">
        <div className="sec-container">
          <div className="sec-section-heading sec-reveal">
            <p className="sec-kicker sec-kicker-light">Beyond the classroom</p>
            <h2 id="pastoral-title">Care that surrounds every learner</h2>
          </div>
          <div className="sec-pastoral-grid sec-reveal">
            {pastoral.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <span className="sec-pastoral-icon"><Icon aria-hidden="true" /></span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              );
            })}
          </div>
          <div className="sec-pastoral-cta sec-reveal">
            <ShieldCheckIcon aria-hidden="true" />
            <p>Families are warmly welcome to arrange a visit and see a Straitgate school day in action.</p>
            <Link href="/contact" className="sec-text-link sec-text-link-light">
              Arrange a visit <ArrowRightIcon aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="sec-section sec-heads" aria-labelledby="heads-title">
        <div className="sec-container">
          <div className="sec-section-heading sec-reveal">
            <p className="sec-kicker">Meet the team</p>
            <h2 id="heads-title">Our School Heads</h2>
          </div>
          <div className="sec-heads-grid sec-reveal">
            {heads.map((head) => (
              <article key={head.name}>
                <div className="sec-head-image">
                  <Image src={head.image} alt={head.name} width={head.width} height={head.height} sizes="(max-width: 900px) 90vw, 370px" />
                </div>
                <h3>{head.name}</h3>
                <p>{head.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-message" aria-live="polite">
        <SecondaryHeadMessages />
      </section>

      <section id="gallery" className="sec-section sec-gallery" aria-labelledby="gallery-title">
        <div className="sec-container">
          <div className="sec-gallery-heading sec-reveal">
            <div>
              <p className="sec-kicker">Life at Straitgate</p>
              <h2 id="gallery-title">Secondary School life</h2>
            </div>
            <div className="sec-gallery-controls">
              <button type="button" aria-label="Scroll gallery left" onClick={() => galleryRef.current?.scrollBy({ left: -380, behavior: 'smooth' })}>
                <ChevronLeftIcon aria-hidden="true" />
              </button>
              <button type="button" aria-label="Scroll gallery right" onClick={() => galleryRef.current?.scrollBy({ left: 380, behavior: 'smooth' })}>
                <ChevronRightIcon aria-hidden="true" />
              </button>
            </div>
          </div>
          <div ref={galleryRef} className="sec-gallery-track sec-reveal">
            {gallery.map((image, index) => (
              <figure key={image.src} className={index % 3 === 1 ? 'sec-gallery-tall' : ''}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 600px) 78vw, 30vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="admissions" className="sec-admissions" aria-labelledby="admissions-title">
        <div className="sec-container sec-admissions-inner sec-reveal">
          <div className="sec-admissions-copy">
            <p className="sec-kicker sec-kicker-light">Ready to begin?</p>
            <h2 id="admissions-title">Begin your Straitgate journey.</h2>
            <p>Start an application for High School or College and our admissions team will guide the next steps.</p>
          </div>
          <div className="sec-admissions-links">
            <a href={HIGH_SCHOOL_APPLY} target="_blank" rel="noreferrer">
              <AcademicCapIcon aria-hidden="true" />
              <span><strong>Apply to High School</strong><small>Junior &amp; Senior Secondary · Open form</small></span>
              <ArrowUpRightIcon aria-hidden="true" />
            </a>
            <a href={COLLEGE_APPLY} target="_blank" rel="noreferrer">
              <BuildingLibraryIcon aria-hidden="true" />
              <span><strong>Apply to College</strong><small>Examination-focused pathway · Open form</small></span>
              <ArrowUpRightIcon aria-hidden="true" />
            </a>
            <Link href="/contact" className="sec-admissions-contact">
              <MapPinIcon aria-hidden="true" />
              <span><strong>Talk to admissions</strong><small>Questions or a school visit</small></span>
              <ArrowRightIcon aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

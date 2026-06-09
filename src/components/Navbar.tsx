'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRightIcon,
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { AdmissionLink, School } from '@/lib/content';

type MenuSection = 'About Us' | 'Schools' | 'Admissions';

type MenuLink =
  | { label: string; href: string; section?: never }
  | { label: string; section: MenuSection; href?: never };

const menuLinks: MenuLink[] = [
  { label: 'About Us', section: 'About Us' },
  { label: 'Schools', section: 'Schools' },
  { label: 'Admissions', section: 'Admissions' },
  { label: 'News', href: '/#news' },
  { label: 'Contact Us', href: '/contact' },
];

interface NavbarProps {
  schools: School[];
  admissionLinks: AdmissionLink[];
}

export default function Navbar({ schools, admissionLinks }: NavbarProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const activeSchoolSlug = pathSegments[0] === 'schools' ? pathSegments[1] : undefined;
  const activeSchool = schools.find((school) => school.initial === activeSchoolSlug);
  const brandLabel = activeSchool ? activeSchool.name.toUpperCase() : 'STRAITGATE SCHOOLS';
  const isStraitgateCollege = activeSchoolSlug === 'sc';
  const logoSrc = isStraitgateCollege ? '/logosc.png' : '/logos.png';
  const logoAlt = isStraitgateCollege ? 'Straitgate College logo' : 'Straitgate Schools logos';
  const logoWidth = isStraitgateCollege ? 280 : 913;
  const logoHeight = isStraitgateCollege ? 267 : 273;
  const logoClassName = isStraitgateCollege
    ? 'h-14 w-auto object-contain sm:h-20'
    : 'h-11 w-auto object-contain sm:h-20';
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<MenuSection | null>(null);
  const previousScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY < 10 || currentScrollY < previousScrollY.current) {
        setNavVisible(true);
      } else if (currentScrollY > previousScrollY.current && currentScrollY > 80) {
        setNavVisible(false);
      }

      previousScrollY.current = currentScrollY;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenSection(null);
  };

  const openMenu = (section: MenuSection | null = null) => {
    setOpenSection(section);
    setMenuOpen(true);
  };

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (isStraitgateCollege) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.setTimeout(() => window.location.reload(), 250);
      return;
    }

    handleHomeClick(event);
  };

  const toggleSection = (section: MenuSection) => {
    setOpenSection(openSection === section ? null : section);
  };

  const renderSectionContent = (section: MenuSection, compact = false) => (
    <>
      {section === 'About Us' && (
        <>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">About Us</p>
          <Link href="/about/history" onClick={closeMenu} className={`${compact ? 'mt-3 text-lg' : 'mt-6 text-2xl'} block font-semibold transition-colors hover:text-primary`}>
            Our History
          </Link>
        </>
      )}

      {section === 'Schools' && (
        <>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Our Schools</p>
          <ul className={`${compact ? 'mt-2' : 'mt-4'} divide-y divide-white/10`}>
            {schools.map((school) => (
              <li key={school.id}>
                <Link href={`/schools/${school.initial}`} onClick={closeMenu} className={`${compact ? 'py-2.5 text-base' : 'py-3 text-lg'} block font-semibold leading-7 text-white/80 transition-colors hover:text-primary`}>
                  {school.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {section === 'Admissions' && (
        <>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Apply To A School</p>
          <ul className={`${compact ? 'mt-2' : 'mt-4'} divide-y divide-white/10`}>
            {admissionLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${compact ? 'py-2.5 text-base' : 'py-3 text-lg'} group flex items-center justify-between gap-4 font-semibold leading-7 text-white/80 transition-colors hover:text-primary`}
                >
                  {link.name}
                  <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: menuOpen || !navVisible ? '-100%' : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-[999] border-b transition-colors duration-300 ${
          scrolled ? 'border-black/10 bg-white text-black shadow-lg' : 'border-white/15 bg-transparent text-white'
        }`}
      >
        <div className="flex h-20 w-full items-stretch justify-between pl-2 sm:h-24 sm:pl-4 lg:pl-5">
          <Link
            href={isStraitgateCollege ? '/schools/sc/' : '/'}
            onClick={handleBrandClick}
            className="flex items-center gap-3"
            aria-label={isStraitgateCollege ? 'Refresh Straitgate College page' : 'Straitgate Schools home'}
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={logoWidth}
              height={logoHeight}
              className={logoClassName}
              priority
              unoptimized
            />
            <span
              className="hidden text-lg tracking-[0.1em] sm:block lg:text-3xl"
              style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
            >
              {brandLabel}
            </span>
          </Link>

          <div className="flex items-stretch">
            <button
              type="button"
              onClick={() => openMenu('Admissions')}
              className="group flex items-center gap-2 bg-primary px-4 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:bg-primary-dark sm:gap-4 sm:px-7 sm:text-sm"
            >
              Apply
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => openMenu()}
              aria-expanded={menuOpen}
              aria-controls="main-menu"
              className="flex items-center gap-2 bg-[#172554] px-4 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1e3a6d] sm:gap-4 sm:px-7 sm:text-sm"
            >
              <Bars3Icon className="h-6 w-6" />
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="main-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="no-scrollbar fixed inset-0 z-[1000] overflow-y-auto bg-[#080808] text-white"
          >
            <div className="border-b border-white/10">
              <div className="flex h-20 w-full items-center justify-between px-2 sm:h-24 sm:px-4 lg:px-5">
                <Link
                  href={isStraitgateCollege ? '/schools/sc/' : '/'}
                  onClick={handleBrandClick}
                  className="flex items-center gap-3"
                  aria-label={isStraitgateCollege ? 'Refresh Straitgate College page' : 'Straitgate Schools home'}
                >
                  <Image
                    src={logoSrc}
                    alt={logoAlt}
                    width={logoWidth}
                    height={logoHeight}
                    className={logoClassName}
                    unoptimized
                  />
                  <span
                    className="hidden text-lg tracking-[0.1em] sm:block lg:text-3xl"
                    style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                  >
                    {brandLabel}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex items-center gap-3 py-3 text-sm font-bold transition-colors hover:text-primary sm:text-base"
                  aria-label="Close menu"
                >
                  <span>Close</span>
                  <span className="rounded-full border border-white/20 p-2">
                    <XMarkIcon className="h-5 w-5" />
                  </span>
                </button>
              </div>
            </div>

            <div className="grid w-full gap-10 px-2 py-10 sm:px-4 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.7fr)] lg:gap-16 lg:px-5 lg:py-16">
              <nav aria-label="Primary navigation">
                <ul className="divide-y divide-white/10 border-y border-white/10">
                  {menuLinks.map((item) => (
                    <li key={item.label}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={item.href === '/' ? handleHomeClick : closeMenu}
                          className="group flex items-center justify-between py-3 font-serif text-3xl leading-tight transition-colors hover:text-primary sm:py-4 sm:text-5xl lg:text-6xl"
                        >
                          {item.label}
                          <ArrowRightIcon className="h-6 w-6 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                        </Link>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => toggleSection(item.section as MenuSection)}
                            aria-expanded={openSection === item.section}
                            className="flex w-full items-center justify-between py-3 text-left font-serif text-3xl leading-tight transition-colors hover:text-primary sm:py-4 sm:text-5xl lg:text-6xl"
                          >
                            {item.label}
                            <ChevronDownIcon className={`h-6 w-6 transition-transform ${openSection === item.section ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence initial={false}>
                            {openSection === item.section && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden lg:hidden"
                              >
                                <div className="pb-4">
                                  {renderSectionContent(item.section as MenuSection, true)}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="hidden lg:block lg:border-l lg:border-white/10 lg:pl-12">
                <AnimatePresence mode="wait">
                  {!openSection && (
                    <motion.div
                      key="intro"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="max-w-lg"
                    >
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Explore Straitgate</p>
                      <p className="mt-5 text-xl leading-8 text-white/65">
                        Discover our schools, learn about our story, or start an application.
                      </p>
                    </motion.div>
                  )}

                  {openSection === 'About Us' && (
                    <motion.div key="about" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      {renderSectionContent('About Us')}
                    </motion.div>
                  )}

                  {openSection === 'Schools' && (
                    <motion.div key="schools" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      {renderSectionContent('Schools')}
                    </motion.div>
                  )}

                  {openSection === 'Admissions' && (
                    <motion.div key="admissions" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      {renderSectionContent('Admissions')}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

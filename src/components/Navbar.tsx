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
import { navbarSchools } from '@/lib/navigation';

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

export default function Navbar() {
  const pathname = usePathname();
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

  const toggleSection = (section: MenuSection) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: navVisible ? 0 : '-100%' }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 border-b text-white transition-colors duration-300 ${
          scrolled ? 'border-white/10 bg-[#080808]/95 shadow-lg backdrop-blur-md' : 'border-white/15 bg-black/20'
        }`}
      >
        <div className="flex h-20 w-full items-stretch justify-between pl-2 sm:h-24 sm:pl-4 lg:pl-5">
          <Link
            href="/"
            onClick={handleHomeClick}
            className="flex items-center gap-3"
            aria-label="Straitgate Schools home"
          >
            <Image
              src="/logos.png"
              alt="Straitgate Schools logos"
              width={913}
              height={273}
              className="h-11 w-auto object-contain sm:h-20"
              priority
              unoptimized
            />
            <span className="hidden text-lg font-bold tracking-[0.12em] sm:block lg:text-3xl">
              STRAITGATE SCHOOLS
            </span>
          </Link>

          <div className="flex items-stretch">
            <button
              type="button"
              onClick={() => openMenu('Admissions')}
              className="group flex items-center gap-2 bg-primary px-4 text-xs font-extrabold uppercase tracking-[0.12em] transition-colors hover:bg-primary-dark sm:gap-4 sm:px-7 sm:text-sm"
            >
              Apply
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => openMenu()}
              aria-expanded={menuOpen}
              aria-controls="main-menu"
              className="flex items-center gap-2 bg-[#172554] px-4 text-xs font-extrabold uppercase tracking-[0.12em] transition-colors hover:bg-[#1e3a6d] sm:gap-4 sm:px-7 sm:text-sm"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-[#080808] text-white"
          >
            <div className="border-b border-white/10">
              <div className="flex h-20 w-full items-center justify-between px-2 sm:h-24 sm:px-4 lg:px-5">
                <Link
                  href="/"
                  onClick={handleHomeClick}
                  className="flex items-center gap-3"
                  aria-label="Straitgate Schools home"
                >
                  <Image
                    src="/logos.png"
                    alt="Straitgate Schools logos"
                    width={913}
                    height={273}
                    className="h-11 w-auto object-contain sm:h-14"
                    unoptimized
                  />
                  <span className="hidden text-lg font-extrabold tracking-[0.12em] sm:block lg:text-xl">
                    STRAITGATE SCHOOLS
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
                          className="group flex items-center justify-between py-3 font-serif text-4xl leading-tight transition-colors hover:text-primary sm:py-4 sm:text-5xl lg:text-6xl"
                        >
                          {item.label}
                          <ArrowRightIcon className="h-6 w-6 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleSection(item.section as MenuSection)}
                          aria-expanded={openSection === item.section}
                          className="flex w-full items-center justify-between py-3 text-left font-serif text-4xl leading-tight transition-colors hover:text-primary sm:py-4 sm:text-5xl lg:text-6xl"
                        >
                          {item.label}
                          <ChevronDownIcon className={`h-6 w-6 transition-transform ${openSection === item.section ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="lg:border-l lg:border-white/10 lg:pl-12">
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
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">About Us</p>
                      <Link href="/about/history" onClick={closeMenu} className="mt-6 block text-2xl font-semibold transition-colors hover:text-primary">
                        Our History
                      </Link>
                    </motion.div>
                  )}

                  {openSection === 'Schools' && (
                    <motion.div key="schools" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Our Schools</p>
                      <ul className="mt-4 divide-y divide-white/10">
                        {navbarSchools.map((school) => (
                          <li key={school.name} className="py-3 text-lg font-semibold leading-7 text-white/80">
                            {school.name}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {openSection === 'Admissions' && (
                    <motion.div key="admissions" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Apply To A School</p>
                      <ul className="mt-4 divide-y divide-white/10">
                        {navbarSchools.map((school) => (
                          <li key={school.name}>
                            <a
                              href={school.admissionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between gap-4 py-3 text-lg font-semibold leading-7 text-white/80 transition-colors hover:text-primary"
                            >
                              {school.name}
                              <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                            </a>
                          </li>
                        ))}
                      </ul>
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

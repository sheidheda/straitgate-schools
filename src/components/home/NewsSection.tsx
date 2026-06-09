'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { NewsPost, School } from '@/lib/content';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface NewsSectionProps {
  featuredPost: NewsPost | null;
  posts: NewsPost[];
  schools?: School[];
}

function schoolName(initial: string, schools?: School[]) {
  return schools?.find((s) => s.initial === initial)?.name || initial;
}

export default function NewsSection({ featuredPost, posts, schools }: NewsSectionProps) {
  return (
    <section id="news" className="py-20 lg:py-28 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="mb-3 inline-block font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">
              Stay Updated
            </span>
            <h2 className="text-xl font-semibold leading-8 text-dark sm:text-2xl">
              Latest News & <span className="text-primary">Events</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured post */}
          {featuredPost && (
            <FadeIn direction="left" className="lg:col-span-2">
              <Link href={`/news/${featuredPost.slug}`} className="group block">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-full"
                >
                  {featuredPost.featured_image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={featuredPost.featured_image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      Featured
                    </span>
                    <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <CalendarIcon className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          )}

          {/* News list */}
          <FadeIn direction="right" delay={0.2}>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full flex flex-col">
              <div className="bg-primary px-5 py-3">
                <h4 className="text-white font-semibold">News & Events</h4>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[500px] divide-y divide-gray-100">
                {posts.slice(0, 15).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/news/${post.slug}`}
                    className="block px-5 py-4 hover:bg-gray-50 transition-colors group"
                  >
                    <h5 className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h5>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                      <span>{schoolName(post.school, schools)}</span>
                      <span>&middot;</span>
                      <span>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { NewsPost, School } from '@/lib/content';
import { CalendarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface NewsDetailPageProps {
  post: NewsPost;
  schools: School[];
  relatedPosts: NewsPost[];
}

function schoolName(initial: string, schools: School[]) {
  return schools.find((s) => s.initial === initial)?.name || initial;
}

export default function NewsDetailPage({ post, schools, relatedPosts }: NewsDetailPageProps) {
  return (
    <>
      {/* Hero image */}
      {post.featured_image && (
        <section className="relative pt-32">
          <div className="aspect-[21/9] max-h-[450px] overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          </div>
        </section>
      )}

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/#news"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to News
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {post.category && (
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {post.category}
                </span>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold text-dark mb-4">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="text-primary font-medium">
                  {schoolName(post.school, schools)}
                </span>
              </div>

              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </motion.div>
          </FadeIn>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-bold text-dark mb-6">Related Posts</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <FadeIn key={rp.slug}>
                    <Link href={`/news/${rp.slug}`} className="group block">
                      {rp.featured_image && (
                        <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3">
                          <img
                            src={rp.featured_image}
                            alt={rp.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <h4 className="font-semibold text-sm text-dark group-hover:text-primary transition-colors line-clamp-2">
                        {rp.title}
                      </h4>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

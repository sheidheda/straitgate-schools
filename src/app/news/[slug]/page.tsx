import { getNewsPost, getNewsPosts, getSchools } from '@/lib/content';
import NewsDetailPage from './NewsDetailPage';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title };
}

export function generateStaticParams() {
  const posts = getNewsPosts();
  return posts.map((post) => ({ slug: post.slug! }));
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  const schools = getSchools();
  const allPosts = getNewsPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.school === post.school)
    .slice(0, 3);

  return <NewsDetailPage post={post} schools={schools} relatedPosts={relatedPosts} />;
}

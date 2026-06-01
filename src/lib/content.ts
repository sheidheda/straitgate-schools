import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

function readJSON<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function readAllJSON<T>(dir: string): T[] {
  const dirPath = path.join(contentDir, dir);
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith('.json'))
    .map((f) => readJSON<T>(path.join(dirPath, f)));
}

// --- Types ---

export interface General {
  mission: string;
  vision: string;
  email: string;
  phone: string;
  address: string;
  whatsapp_phone: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  footer_message: string;
  welcome_messages: string[];
  values: string[];
  hero_text: string[];
  hero_images?: string[];
  hero_media_url: string;
  hero_media_type: string;
}

export interface School {
  id: number;
  name: string;
  initial: string;
  students_count: number;
  logo: string;
  admission_url: string;
  address: string;
  coords: [number, number];
}

export interface Curriculum {
  id: number;
  title: string;
  content: string;
}

export interface Testimonial {
  name: string;
  role: string;
  review: string;
  logo: string;
  link: string;
}

export interface HistoryItem {
  year: string;
  image: string;
  content: string;
}

export interface NewsPost {
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  school: string;
  category: string;
  is_featured: boolean;
  date: string;
  slug?: string;
}

// --- Loaders ---

export function getGeneral(): General {
  return readJSON<General>(path.join(contentDir, 'general.json'));
}

export function getSchools(): School[] {
  return readJSON<School[]>(path.join(contentDir, 'schools.json'));
}

export function getCurricula(): Curriculum[] {
  return readJSON<Curriculum[]>(path.join(contentDir, 'curricula.json'));
}

export function getTestimonials(): Testimonial[] {
  return readAllJSON<Testimonial>('testimonials');
}

export function getHistory(): HistoryItem[] {
  return readAllJSON<HistoryItem>('history').sort((a, b) =>
    a.year.localeCompare(b.year)
  );
}

export function getNewsPosts(): NewsPost[] {
  const dirPath = path.join(contentDir, 'news');
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const post = readJSON<NewsPost>(path.join(dirPath, f));
      post.slug = f.replace('.json', '');
      return post;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNewsPost(slug: string): NewsPost | null {
  const filePath = path.join(contentDir, 'news', `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const post = readJSON<NewsPost>(filePath);
  post.slug = slug;
  return post;
}

export function getFeaturedPost(): NewsPost | null {
  const posts = getNewsPosts();
  return posts.find((p) => p.is_featured) || posts[0] || null;
}

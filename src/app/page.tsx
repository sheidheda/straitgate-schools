import { getGeneral, getSchools, getCurricula, getTestimonials, getNewsPosts, getFeaturedPost } from '@/lib/content';
import HomePage from '@/components/home/HomePage';

export default function Home() {
  const general = getGeneral();
  const schools = getSchools();
  const curricula = getCurricula();
  const testimonials = getTestimonials();
  const posts = getNewsPosts();
  const featuredPost = getFeaturedPost();

  return (
    <HomePage
      data={{ general, schools, curricula, testimonials, featuredPost, posts }}
    />
  );
}

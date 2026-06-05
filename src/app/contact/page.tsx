import { getGeneral, getSchools } from '@/lib/content';
import ContactPage from './ContactPage';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact Us' };

export default function Contact() {
  const general = getGeneral();
  const schools = getSchools();
  return <ContactPage general={general} schools={schools} />;
}

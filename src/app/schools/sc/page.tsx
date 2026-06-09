import type { Metadata } from 'next';
import { getGeneral, getSchools } from '@/lib/content';
import StraitgateCollegePage from './StraitgateCollegePage';

export const metadata: Metadata = {
  title: 'Straitgate College',
  description:
    'Explore Straitgate College — a Christ-centered college community in Magboro, Ogun State, nurturing academic excellence, character, leadership, and purpose.',
};

export default function StraitgateCollege() {
  const schools = getSchools();
  const general = getGeneral();
  const college = schools.find((school) => school.initial === 'sc') ?? schools.find((school) => school.name.includes('College'));
  const admissionLink = general.admission_links?.find((link) => link.name.toLowerCase().includes('college'));

  return <StraitgateCollegePage school={college} admissionLink={admissionLink} />;
}

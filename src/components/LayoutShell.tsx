'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import { General, School } from '@/lib/content';

interface LayoutShellProps {
  children: React.ReactNode;
  general: General;
  schools: School[];
}

export default function LayoutShell({ children, general, schools }: LayoutShellProps) {
  return (
    <>
      <Navbar schools={schools} admissionLinks={general.admission_links ?? []} />
      <main className="flex-1">{children}</main>
      <Footer general={general} schools={schools} />
    </>
  );
}

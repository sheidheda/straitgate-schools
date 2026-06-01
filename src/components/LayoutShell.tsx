'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import { General } from '@/lib/content';

interface LayoutShellProps {
  children: React.ReactNode;
  general: General;
}

export default function LayoutShell({ children, general }: LayoutShellProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer general={general} />
    </>
  );
}

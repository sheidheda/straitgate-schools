import { getHistory } from '@/lib/content';
import HistoryPage from './HistoryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Our History' };

export default function History() {
  const histories = getHistory();
  return <HistoryPage histories={histories} />;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keeper 정책',
  description: 'Keeper 서비스 정책 안내'
};

export default function PolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-5 py-6">{children}</div>
    </main>
  );
}

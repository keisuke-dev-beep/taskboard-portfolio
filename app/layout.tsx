import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My TaskBoard',
  description: 'シンプルなタスク管理アプリです。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
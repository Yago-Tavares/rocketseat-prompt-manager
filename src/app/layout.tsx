import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Prompt Manager',
  description: 'Gerencie seus prompts',
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased bg-gray-900 text-white`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

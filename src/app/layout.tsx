import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Display and body text
const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Italic accent word in headings
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

// Mono for labels, indices, numbers
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#f4f2ee',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://aryansingh.dev'),
  title: 'Aryan Mukund Singh | Full Stack Developer',
  description:
    'Software Engineer with internship experience in backend development, and full-stack web applications. Proficient in Java, TypeScript, Node.js, React.js, LLM-integrated features and AWS.',
  keywords: [
    'Full Stack Developer',
    'Software Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'AWS',
    'LLM',
    'AI',
  ],
  authors: [{ name: 'Aryan Mukund Singh' }],
  creator: 'Aryan Mukund Singh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aryansingh.dev',
    title: 'Aryan Mukund Singh | Full Stack Developer',
    description:
      'Software Engineer with internship experience in backend development, and full-stack web applications.',
    siteName: 'Aryan Mukund Singh',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Aryan Mukund Singh - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aryan Mukund Singh | Full Stack Developer',
    description:
      'Software Engineer with internship experience in backend development, and full-stack web applications.',
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

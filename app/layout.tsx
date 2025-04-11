import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Product Feedback App',
  description: 'Coding Challenge for Nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

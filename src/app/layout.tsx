import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'interactive-globe',
  description: 'Interactive 3D Globe with Monitoring Gap',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

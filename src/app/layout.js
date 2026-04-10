import './globals.css';

export const metadata = {
  title: 'A&T Solutions — AI Receptionist & Business Automation',
  description: 'Premium AI receptionists and business automation solutions. 24/7 coverage, zero downtime. Automate calls, workflows, and lead qualification with cutting-edge AI.',
  keywords: 'AI receptionist, business automation, AI agents, workflow automation, lead qualification',
  openGraph: {
    title: 'A&T Solutions — AI Receptionist & Business Automation',
    description: 'Your business never sleeps. AI-powered receptionists and automation — 24/7.',
    type: 'website',
  },
};

import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning={true}>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/utils/structuredData';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Horoo - Rental Properties in India | Rooms, Flats, Houses & Commercial Spaces",
  description: "Find verified rental properties across India. Browse rooms, flats, houses, hostels, hotels, and commercial spaces. Connect directly with property owners. Your trusted rental platform.",
  keywords: "rental properties India, rooms for rent, flats for rent, houses for rent, PG accommodation, hostels, hotels, commercial spaces, property rental, verified properties",
  authors: [{ name: "Horoo" }],
  creator: "Horoo",
  publisher: "Horoo",
  metadataBase: new URL('https://horoo.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Horoo - Rental Properties in India",
    description: "Find verified rental properties across India. Connect directly with property owners.",
    url: 'https://horoo.in',
    siteName: 'Horoo',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo/LogoOfHoroo.jpg',
        width: 1200,
        height: 630,
        alt: 'Horoo - Rental Properties in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Horoo - Rental Properties in India",
    description: "Find verified rental properties across India. Connect directly with property owners.",
    images: ['/logo/LogoOfHoroo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
         <SpeedInsights />  
         {/* vecel speed insight to check performance */}
          <Footer />
      </body>
    </html>
  );
}



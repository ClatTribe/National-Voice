import type { Metadata } from "next";
import { cookies } from 'next/headers';
import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllNews } from '../lib/news';

export const metadata: Metadata = {
  title: "National Voice | Latest Breaking News",
  description: "Stay updated with the latest breaking news, politics, world events, sports and business updates.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value || 'hi';
  
  // Fetch top 3 latest news for the breaking news marquee
  const latestNews = await getAllNews(3);

  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Navbar initialLang={lang} breakingNews={latestNews} />
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 w-full max-w-[1400px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

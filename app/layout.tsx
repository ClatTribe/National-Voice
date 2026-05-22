import type { Metadata } from "next";
import "./globals.css";
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: "National Voice | Latest Breaking News",
  description: "Stay updated with the latest breaking news, politics, world events, sports and business updates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 w-full max-w-[1400px]">
          {children}
        </main>
      </body>
    </html>
  );
}

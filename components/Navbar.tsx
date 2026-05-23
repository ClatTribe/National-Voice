'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Globe } from 'lucide-react';

export default function Navbar({ initialLang = 'hi' }: { initialLang?: string }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const setLanguage = (lang: string) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/`;
    window.location.reload();
  };
  
  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { path: '/', labelEn: 'HOME', labelHi: 'होम' },
    { path: '/india', labelEn: 'INDIA', labelHi: 'भारत' },
    { path: '/politics', labelEn: 'POLITICS', labelHi: 'राजनीति' },
    { path: '/world', labelEn: 'WORLD', labelHi: 'दुनिया' },
    { path: '/business', labelEn: 'BUSINESS', labelHi: 'व्यापार' },
    { path: '/sports', labelEn: 'SPORTS', labelHi: 'खेल' },
    { path: '/entertainment', labelEn: 'ENTERTAINMENT', labelHi: 'मनोरंजन' },
  ];

  return (
    <div className="w-full font-sans sticky top-0 z-50 shadow-md">
      {/* Top red breaking news bar with scrolling marquee effect */}
      <div className="bg-primary-red px-4 py-2 flex justify-between items-center text-xs sm:text-sm font-medium tracking-wide text-white">
        <div className="flex items-center gap-4 overflow-hidden w-full relative">
          <span className="font-bold whitespace-nowrap bg-primary-red relative z-10 pr-4">{initialLang === 'hi' ? 'ब्रेकिंग न्यूज़' : 'BREAKING NEWS'}</span>
          <div className="animate-marquee whitespace-nowrap overflow-hidden hidden sm:block">
            Lok Sabha Election Results 2024 Live Updates: NDA crosses 300 mark, BJP set for big win • Heavy rains lash Mumbai; schools remain closed
          </div>
          <span className="truncate sm:hidden">Lok Sabha Election Results 2024 Live...</span>
        </div>
        <Link href="#" className="whitespace-nowrap hover:text-gray-200 transition-colors hidden sm:block">{initialLang === 'hi' ? 'सभी देखें →' : 'View All →'}</Link>
      </div>

      {/* Main navigation */}
      <nav className="bg-dark-navy text-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-heading group">
            <img src="/national-voice-logo.jpg" alt="National Voice" className="h-10 sm:h-12 w-auto object-contain rounded" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-semibold tracking-wide h-full">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`h-full flex items-center border-b-4 transition-colors ${isActive(link.path) ? 'border-primary-red text-white' : 'border-transparent hover:text-primary-red text-gray-300'}`}
              >
                {initialLang === 'hi' ? link.labelHi : link.labelEn}
              </Link>
            ))}
            <button className="h-full flex items-center border-b-4 border-transparent hover:text-primary-red text-gray-300 transition-colors gap-1">
              {initialLang === 'hi' ? 'अधिक' : 'MORE'} <span className="text-[10px]">▼</span>
            </button>
          </div>
          {/* Right Side Actions */}
          <div className="flex items-center gap-5">
            {/* Language Toggle */}
            <div className="hidden sm:flex items-center bg-gray-800 rounded overflow-hidden shadow-sm border border-gray-700">
              <button 
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 text-xs font-bold transition-colors ${initialLang === 'hi' ? 'bg-[#FF0000] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                हिंदी
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-bold transition-colors ${initialLang === 'en' ? 'bg-[#FF0000] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                ENG
              </button>
            </div>

            <button className="hover:text-primary-red transform hover:scale-110 transition-all duration-300">
              <Search className="w-5 h-5" />
            </button>
            
            
            <button 
              className="lg:hidden hover:text-primary-red transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800 flex flex-col px-4 py-4 space-y-4">
            
            {/* Mobile Language Toggle */}
            <div className="flex items-center bg-gray-800 rounded w-max overflow-hidden shadow-sm border border-gray-700 mb-2">
              <button 
                onClick={() => setLanguage('hi')}
                className={`px-4 py-1.5 text-xs font-bold transition-colors ${initialLang === 'hi' ? 'bg-[#FF0000] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                हिंदी
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-4 py-1.5 text-xs font-bold transition-colors ${initialLang === 'en' ? 'bg-[#FF0000] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                ENG
              </button>
            </div>

            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`font-bold ${isActive(link.path) ? 'text-primary-red' : 'text-white'}`}
              >
                {initialLang === 'hi' ? link.labelHi : link.labelEn}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-full font-sans sticky top-0 z-50 shadow-md">
      {/* Top red breaking news bar with scrolling marquee effect */}
      <div className="bg-primary-red px-4 py-2 flex justify-between items-center text-xs sm:text-sm font-medium tracking-wide text-white">
        <div className="flex items-center gap-4 overflow-hidden w-full relative">
          <span className="font-bold whitespace-nowrap bg-primary-red relative z-10 pr-4">BREAKING NEWS</span>
          <div className="animate-marquee whitespace-nowrap overflow-hidden hidden sm:block">
            Lok Sabha Election Results 2024 Live Updates: NDA crosses 300 mark, BJP set for big win • Heavy rains lash Mumbai; schools remain closed
          </div>
          <span className="truncate sm:hidden">Lok Sabha Election Results 2024 Live...</span>
        </div>
        <Link href="#" className="whitespace-nowrap hover:text-gray-200 transition-colors hidden sm:block">View All →</Link>
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
            <Link href="/" className={`h-full flex items-center border-b-4 transition-colors ${isActive('/') ? 'border-primary-red text-white' : 'border-transparent hover:text-primary-red text-gray-300'}`}>HOME</Link>
            <Link href="/india" className={`h-full flex items-center border-b-4 transition-colors ${isActive('/india') ? 'border-primary-red text-white' : 'border-transparent hover:text-primary-red text-gray-300'}`}>INDIA</Link>
            <Link href="/politics" className={`h-full flex items-center border-b-4 transition-colors ${isActive('/politics') ? 'border-primary-red text-white' : 'border-transparent hover:text-primary-red text-gray-300'}`}>POLITICS</Link>
            <Link href="/world" className={`h-full flex items-center border-b-4 transition-colors ${isActive('/world') ? 'border-primary-red text-white' : 'border-transparent hover:text-primary-red text-gray-300'}`}>WORLD</Link>
            <Link href="/business" className={`h-full flex items-center border-b-4 transition-colors ${isActive('/business') ? 'border-primary-red text-white' : 'border-transparent hover:text-primary-red text-gray-300'}`}>BUSINESS</Link>
            <Link href="/sports" className={`h-full flex items-center border-b-4 transition-colors ${isActive('/sports') ? 'border-primary-red text-white' : 'border-transparent hover:text-primary-red text-gray-300'}`}>SPORTS</Link>
            <Link href="/entertainment" className={`h-full flex items-center border-b-4 transition-colors ${isActive('/entertainment') ? 'border-primary-red text-white' : 'border-transparent hover:text-primary-red text-gray-300'}`}>ENTERTAINMENT</Link>
            <button className="h-full flex items-center border-b-4 border-transparent hover:text-primary-red text-gray-300 transition-colors gap-1">MORE <span className="text-[10px]">▼</span></button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-5">
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
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold ${isActive('/') ? 'text-primary-red' : 'text-white'}`}>HOME</Link>
            <Link href="/india" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold ${isActive('/india') ? 'text-primary-red' : 'text-white'}`}>INDIA</Link>
            <Link href="/politics" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold ${isActive('/politics') ? 'text-primary-red' : 'text-white'}`}>POLITICS</Link>
            <Link href="/world" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold ${isActive('/world') ? 'text-primary-red' : 'text-white'}`}>WORLD</Link>
            <Link href="/business" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold ${isActive('/business') ? 'text-primary-red' : 'text-white'}`}>BUSINESS</Link>
            <Link href="/sports" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold ${isActive('/sports') ? 'text-primary-red' : 'text-white'}`}>SPORTS</Link>
          </div>
        )}
      </nav>
    </div>
  );
}

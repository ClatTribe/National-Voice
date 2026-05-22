'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, Tv } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  
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
            <div className="text-2xl font-bold leading-none tracking-tight">
              <span className="group-hover:text-primary-red transition-colors duration-300">NATIONAL</span>{' '}
              <span className="text-primary-red group-hover:text-white transition-colors duration-300">VOICE</span>
            </div>
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
            
            <button className="hidden sm:flex items-center gap-2 bg-primary-red hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(198,40,40,0.5)] text-white px-4 py-1.5 rounded text-sm font-bold tracking-wide">
              <Tv className="w-4 h-4 animate-pulse" /> LIVE TV
            </button>
            
            <button className="lg:hidden hover:text-primary-red transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

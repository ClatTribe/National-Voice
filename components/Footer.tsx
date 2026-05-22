import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-navy text-white pt-16 pb-8 border-t-4 border-primary-red mt-16">
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
          
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="text-2xl font-heading font-bold leading-none tracking-tight">
                <span>NATIONAL</span> <span className="text-primary-red">VOICE</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              National Voice is your trusted source for breaking news, in-depth analysis, and comprehensive coverage of Politics, World events, Business, and Sports. 
            </p>
            <div className="flex gap-4">
              <Link href="https://www.youtube.com/channel/UCxlr8HztjOTxnc9hDVVOW8w/" target="_blank" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#FF0000] transition-colors cursor-pointer flex items-center justify-center">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M21.582 6.186a2.696 2.696 0 00-1.896-1.914C17.973 3.82 12 3.82 12 3.82s-5.973 0-7.686.452A2.696 2.696 0 002.418 6.186C2 7.92 2 12 2 12s0 4.08.418 5.814a2.696 2.696 0 001.896 1.914C5.973 20.18 12 20.18 12 20.18s5.973 0 7.686-.452a2.696 2.696 0 001.896-1.914C22 16.08 22 12 22 12s0-4.08-.418-5.814zM9.912 15.14V8.86L15.412 12l-5.5 3.14z"/></svg>
              </Link>
              <Link href="https://www.facebook.com/ourNationalVoice" target="_blank" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#1877F2] transition-colors cursor-pointer flex items-center justify-center">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-primary-red inline-block"></span> Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-primary-red transition-colors">Home</Link></li>
              <li><Link href="/india" className="hover:text-primary-red transition-colors">India News</Link></li>
              <li><Link href="/politics" className="hover:text-primary-red transition-colors">Politics</Link></li>
              <li><Link href="/world" className="hover:text-primary-red transition-colors">World</Link></li>
              <li><Link href="/business" className="hover:text-primary-red transition-colors">Business</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-primary-red inline-block"></span> Company
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary-red transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary-red transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary-red transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary-red transition-colors">Advertise with Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-primary-red inline-block"></span> Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter to get the latest updates directly in your inbox.</p>
            <div className="flex">
              <input type="email" placeholder="Your email address" className="bg-gray-800 text-white px-4 py-2 w-full text-sm outline-none border border-gray-700 focus:border-primary-red transition-colors" />
              <button className="bg-primary-red px-4 font-bold text-sm hover:bg-red-700 transition-colors">SUBMIT</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} National Voice. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const dynamic = 'force-dynamic';

import { getAllNews, getNewsByCategory, timeAgo } from '../lib/news';
import NewsCard from '../components/NewsCard';
import Link from 'next/link';
import { PlayCircle, Bookmark, ChevronRight } from 'lucide-react';

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
  'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800&q=80',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80',
  'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800&q=80',
  'https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=800&q=80',
  'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
];

export default async function HomePage() {
  const allNews = await getAllNews(20);
  
  const getImg = (id: number) => DEFAULT_IMAGES[(id || 0) % DEFAULT_IMAGES.length];

  // Dummy fallback data if DB is empty
  const dummyNews = {
    id: 999,
    title: 'Welcome to National Voice',
    summary: 'Fetching latest news...',
    category: 'News',
    slug: 'welcome',
    image_url: null,
    published_at: new Date().toISOString(),
    source_name: 'System',
    source_url: '#'
  };

  const heroFeatured = allNews[0] || dummyNews;
  const heroSide = allNews.length > 1 ? allNews.slice(1, 5) : Array(4).fill(dummyNews).map((d, i) => ({...d, id: d.id+i+1}));
  
  const topStories = allNews.slice(5, 7).length ? allNews.slice(5, 7) : [dummyNews];
  const latestUpdates = allNews.slice(7, 12).length ? allNews.slice(7, 12) : [dummyNews];
  
  const politics = allNews.filter(n => n.category.toLowerCase().includes('politic')).slice(0, 1);
  const world = allNews.filter(n => n.category.toLowerCase().includes('world')).slice(0, 1);
  const business = allNews.filter(n => n.category.toLowerCase().includes('business')).slice(0, 1);
  const sports = allNews.filter(n => n.category.toLowerCase().includes('sport')).slice(0, 1);

  const row1 = politics.length ? politics[0] : allNews[12] || { ...dummyNews, id: 101, category: 'Politics' };
  const row2 = world.length ? world[0] : allNews[13] || { ...dummyNews, id: 102, category: 'World' };
  const row3 = business.length ? business[0] : allNews[14] || { ...dummyNews, id: 103, category: 'Business' };
  const row4 = sports.length ? sports[0] : allNews[15] || { ...dummyNews, id: 104, category: 'Sports' };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Main Featured */}
        <Link href={`/article/${heroFeatured.slug}`} className="lg:col-span-7 xl:col-span-8 group relative block overflow-hidden rounded-xl shadow-lg aspect-video lg:aspect-auto lg:h-[480px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={heroFeatured.image_url || getImg(heroFeatured.id)} 
            alt={heroFeatured.title}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
            <span className="bg-primary-red shadow-[0_0_10px_rgba(198,40,40,0.8)] text-white text-xs font-bold px-3 py-1 rounded w-max mb-3 uppercase tracking-wider">
              {heroFeatured.category}
            </span>
            <h1 className="text-white font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 group-hover:text-red-100 transition-colors duration-300">
              {heroFeatured.title}
            </h1>
            <div className="flex items-center text-gray-300 text-sm font-semibold gap-4 opacity-90">
              <span>{timeAgo(heroFeatured.published_at)}</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> 12.4K Reads</span>
            </div>
          </div>
        </Link>

        {/* Side Grid (2x2) */}
        <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:h-[480px]">
          {heroSide.map((article, i) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="group relative block overflow-hidden rounded-xl shadow-lg h-full min-h-[160px] lg:min-h-0" style={{animationDelay: `${i * 100}ms`}}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={article.image_url || getImg(article.id)} 
                alt={article.title}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-3 sm:p-4">
                <span className="bg-primary-red text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded w-max mb-2 uppercase tracking-wide">
                  {article.category}
                </span>
                <h2 className="text-white font-heading font-bold text-xs sm:text-sm leading-snug group-hover:text-red-100 transition-colors duration-300 line-clamp-3">
                  {article.title}
                </h2>
                <div className="text-gray-300 text-[10px] sm:text-xs font-semibold mt-2 opacity-80">
                  {timeAgo(article.published_at)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Now Strip */}
      <div className="bg-gradient-to-r from-dark-navy to-slate-900 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between text-white gap-4 shadow-xl border border-slate-800 transform hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button className="bg-primary-red shadow-[0_0_15px_rgba(198,40,40,0.5)] text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 whitespace-nowrap transform hover:scale-105 transition-transform">
            <span className="animate-pulse bg-white w-2 h-2 rounded-full"></span> LIVE
          </button>
          <div className="flex flex-col">
            <span className="text-primary-red text-xs font-bold uppercase tracking-widest mb-0.5">Live Now</span>
            <span className="font-semibold text-sm sm:text-base truncate">National Voice Ahead - Top Headlines & Expert Analysis</span>
          </div>
        </div>
        <button className="border-2 border-slate-700 hover:border-primary-red hover:bg-primary-red/10 transition-all duration-300 px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center group">
          <PlayCircle className="w-5 h-5 text-primary-red group-hover:text-white transition-colors" /> Watch Now
        </button>
      </div>

      {/* Top Stories & Latest Updates */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Col: Top Stories */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-gray-100 mb-6 pb-2">
            <h2 className="text-primary-red font-heading font-extrabold text-xl uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-6 bg-primary-red rounded-sm"></span> Top Stories
            </h2>
            <div className="flex gap-6 overflow-x-auto text-sm font-bold text-gray-500 pt-4 sm:pt-0" style={{ scrollbarWidth: 'none' }}>
              <span className="text-primary-red border-b-2 border-primary-red pb-2 whitespace-nowrap cursor-pointer">All</span>
              <Link href="/india" className="hover:text-primary-red transition-colors whitespace-nowrap cursor-pointer">India</Link>
              <Link href="/politics" className="hover:text-primary-red transition-colors whitespace-nowrap cursor-pointer">Politics</Link>
              <Link href="/world" className="hover:text-primary-red transition-colors whitespace-nowrap cursor-pointer">World</Link>
              <Link href="/business" className="hover:text-primary-red transition-colors whitespace-nowrap cursor-pointer">Business</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {topStories.map((story) => (
              <div key={story?.id} className="flex flex-col sm:flex-row gap-5 sm:gap-6 group cursor-pointer pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-full sm:w-[300px] h-[180px] flex-shrink-0 rounded-xl overflow-hidden relative shadow-sm">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={story?.image_url || getImg(story?.id || 0)} alt={story?.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col py-1 flex-1">
                  <Link href={`/article/${story?.slug}`}>
                    <h3 className="font-heading font-bold text-gray-900 text-xl sm:text-2xl mb-3 group-hover:text-primary-red transition-colors leading-snug">
                      {story?.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed">
                    {story?.summary}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-gray-500 text-xs sm:text-sm font-semibold">
                    <span className="flex items-center gap-2">{story ? timeAgo(story.published_at) : ''} <span className="w-1 h-1 bg-gray-300 rounded-full"></span> 5.6K Reads</span>
                    <button className="p-2 hover:bg-red-50 hover:text-primary-red rounded-full transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Latest Updates */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="flex items-center justify-between border-b-2 border-gray-100 mb-6 pb-2">
            <h2 className="text-dark-navy font-heading font-extrabold text-xl uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-6 bg-dark-navy rounded-sm"></span> Latest Updates
            </h2>
            <Link href="#" className="text-primary-red text-sm font-bold hover:text-red-700 transition-colors flex items-center">View All <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-5">
            {latestUpdates.map((update) => {
              const d = update ? new Date(update.published_at) : new Date();
              const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
              return (
                <Link href={`/article/${update?.slug}`} key={update?.id} className="flex gap-4 group cursor-pointer relative items-start">
                  <div className="text-gray-500 font-bold text-xs whitespace-nowrap pt-0.5 w-16">{timeStr}</div>
                  <div className="relative pl-5 flex-1 border-l-2 border-gray-100 group-hover:border-primary-red transition-colors">
                    <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-300 group-hover:bg-primary-red transition-colors shadow-sm"></span>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-red transition-colors leading-snug line-clamp-3">
                      {update?.title}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

      </section>

      {/* Category Grid Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-6">
        {[
          { title: 'POLITICS', article: row1 },
          { title: 'WORLD', article: row2 },
          { title: 'BUSINESS', article: row3 },
          { title: 'SPORTS', article: row4 }
        ].map(cat => (
          <div key={cat.title} className="flex flex-col bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h2 className="text-primary-red font-heading font-bold text-base uppercase tracking-wider">{cat.title}</h2>
              <Link href={`/${cat.title.toLowerCase()}`} className="text-gray-900 text-xs font-bold group-hover:text-primary-red transition-colors">View All →</Link>
            </div>
            {cat.article && (
              <Link href={`/article/${cat.article.slug}`} className="flex flex-col h-full">
                <div className="rounded-lg overflow-hidden aspect-[16/9] mb-4 shadow-sm relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.article.image_url || getImg(cat.article.id)} alt={cat.article.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-base mb-3 group-hover:text-primary-red transition-colors line-clamp-2 leading-snug">
                  {cat.article.title}
                </h3>
                <span className="text-gray-500 text-xs font-semibold mt-auto uppercase tracking-wide">
                  {timeAgo(cat.article.published_at)}
                </span>
              </Link>
            )}
          </div>
        ))}
      </section>

    </div>
  );
}

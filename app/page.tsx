export const dynamic = 'force-dynamic';

import { getAllNews, getNewsByCategory, timeAgo } from '../lib/news';
import { getYouTubeVideos } from '../lib/youtube';
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
  const ytVideos = await getYouTubeVideos('UCxlr8HztjOTxnc9hDVVOW8w');
  
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* LEFT COLUMN: Sticky YouTube Sidebar */}
      <aside className="order-last lg:order-first lg:col-span-3 flex flex-col gap-6 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#FF0000] px-4 py-3 flex items-center justify-between">
            <h2 className="text-white font-heading font-bold text-sm tracking-wide flex items-center gap-2 uppercase">
               <PlayCircle className="w-4 h-4" /> Watch Now
            </h2>
          </div>
          <div className="aspect-video w-full bg-black relative">
            {/* UU replaces UC in channel ID to get the uploaded videos playlist */}
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?list=UUxlr8HztjOTxnc9hDVVOW8w" 
              title="National Voice YouTube" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-4 bg-gray-50">
            <h3 className="font-bold text-sm text-gray-900 mb-4 border-b border-gray-200 pb-2">Suggested Videos</h3>
            <div className="flex flex-col gap-4">
               {ytVideos.length > 0 ? ytVideos.map((video, idx) => (
                 <Link href={video.link} target="_blank" key={idx} className="flex gap-3 group cursor-pointer bg-white p-2 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all">
                   <div className="w-20 h-14 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative">
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors z-10">
                       <PlayCircle className="w-6 h-6 text-white opacity-90" />
                     </div>
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={video.thumbnail} alt="Video Thumbnail" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <div className="flex flex-col justify-center">
                     <p className="text-xs font-bold text-gray-900 group-hover:text-primary-red transition-colors line-clamp-2">{video.title}</p>
                     <span className="text-[10px] text-gray-500 mt-1 font-semibold">National Voice</span>
                   </div>
                 </Link>
               )) : (
                 <p className="text-xs text-gray-500 italic">No videos found.</p>
               )}
            </div>
            <Link href="https://www.youtube.com/channel/UCxlr8HztjOTxnc9hDVVOW8w/" target="_blank" className="block w-full text-center mt-5 py-2 rounded border-2 border-[#FF0000] text-[#FF0000] text-xs font-bold hover:bg-[#FF0000] hover:text-white transition-colors uppercase tracking-wider">
              Visit Channel
            </Link>
          </div>
        </div>
      </aside>

      {/* RIGHT COLUMN: Main Content Area */}
      <div className="order-first lg:order-last lg:col-span-9 flex flex-col gap-6 sm:gap-8">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
          {/* Main Featured */}
          <Link href={`/article/${heroFeatured.slug}`} className="xl:col-span-7 group relative block overflow-hidden rounded-xl shadow-lg aspect-video xl:aspect-auto xl:h-[480px]">
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
              <h1 className="text-white font-heading font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4 group-hover:text-red-100 transition-colors duration-300">
                {heroFeatured.title}
              </h1>
              <div className="flex items-center text-gray-300 text-sm font-semibold gap-4 opacity-90">
                <span>{timeAgo(heroFeatured.published_at)}</span>
              </div>
            </div>
          </Link>

          {/* Side Grid (2x2) */}
          <div className="xl:col-span-5 grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 xl:h-[480px]">
            {heroSide.map((article, i) => (
              <Link key={article.id} href={`/article/${article.slug}`} className="group relative block overflow-hidden rounded-xl shadow-lg h-full min-h-[160px] xl:min-h-0" style={{animationDelay: `${i * 100}ms`}}>
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
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Stories & Latest Updates */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Col: Top Stories */}
          <div className="xl:col-span-7 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-gray-100 mb-6 pb-2">
              <h2 className="text-primary-red font-heading font-extrabold text-xl uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-6 bg-primary-red rounded-sm"></span> Top Stories
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {topStories.map((story) => (
                <div key={story?.id} className="flex flex-col sm:flex-row gap-4 group cursor-pointer pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-full sm:w-[220px] h-[140px] flex-shrink-0 rounded-xl overflow-hidden relative shadow-sm">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={story?.image_url || getImg(story?.id || 0)} alt={story?.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col py-1 flex-1">
                    <Link href={`/article/${story?.slug}`}>
                      <h3 className="font-heading font-bold text-gray-900 text-lg sm:text-xl mb-2 group-hover:text-primary-red transition-colors leading-snug">
                        {story?.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {story?.summary}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-gray-500 text-xs font-semibold">
                      <span className="flex items-center gap-2">{story ? timeAgo(story.published_at) : ''}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Latest Updates */}
          <div className="xl:col-span-5 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="flex items-center justify-between border-b-2 border-gray-100 mb-6 pb-2">
              <h2 className="text-dark-navy font-heading font-extrabold text-xl uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-6 bg-dark-navy rounded-sm"></span> Latest Updates
              </h2>
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
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {[
            { title: 'POLITICS', article: row1 },
            { title: 'WORLD', article: row2 },
            { title: 'BUSINESS', article: row3 },
            { title: 'SPORTS', article: row4 }
          ].map(cat => (
            <div key={cat.title} className="flex flex-col bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                <h2 className="text-primary-red font-heading font-bold text-sm uppercase tracking-wider">{cat.title}</h2>
              </div>
              {cat.article && (
                <Link href={`/article/${cat.article.slug}`} className="flex flex-col h-full">
                  <div className="rounded-lg overflow-hidden aspect-[16/9] mb-3 shadow-sm relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cat.article.image_url || getImg(cat.article.id)} alt={cat.article.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 text-sm mb-2 group-hover:text-primary-red transition-colors line-clamp-2 leading-snug">
                    {cat.article.title}
                  </h3>
                </Link>
              )}
            </div>
          ))}
        </section>

        {/* Editor's Picks / More News */}
        <section className="pt-6 border-t-2 border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-extrabold text-gray-900 flex items-center gap-3">
              <span className="w-2 h-5 bg-primary-red rounded-sm"></span> More News
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {allNews.slice(0, 8).map((article, idx) => (
               <NewsCard key={`more-${article.id}-${idx}`} article={article} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

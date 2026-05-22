import Link from 'next/link';
import { timeAgo } from '../lib/news';

export default function NewsCard({ article }: { article: any }) {
  if (!article) return null;
  
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
  const placeholderImg = DEFAULT_IMAGES[(article.id || 0) % DEFAULT_IMAGES.length];
  
  return (
    <Link href={`/article/${article.slug}`} className="block group h-full">
      <div className="bg-white border border-border-color rounded-xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
        <div className="aspect-[16/9] w-full bg-light-gray relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10 pointer-events-none"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={article.image_url || placeholderImg} 
            alt={article.title} 
            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
          />
          <div className="absolute top-3 left-3 bg-primary-red shadow-[0_0_10px_rgba(198,40,40,0.4)] text-white text-[10px] font-extrabold px-2 py-1 rounded uppercase tracking-widest z-20">
            {article.category}
          </div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-heading font-bold text-text-primary text-base sm:text-lg mb-3 group-hover:text-primary-red transition-colors duration-300 line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <div className="flex items-center text-xs font-bold text-text-secondary mt-auto tracking-wide uppercase">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary-red transition-colors"></span>{timeAgo(article.published_at)}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="group-hover:text-primary-red transition-colors">{article.source_name || 'National Voice'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

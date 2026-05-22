export const dynamic = 'force-dynamic';

import { getNewsBySlug, getRelatedNews, timeAgo } from '../../../lib/news';
import NewsCard from '../../../components/NewsCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const article = await getNewsBySlug(resolvedParams.slug);
  if (!article) return { title: 'Article Not Found | National Voice' };

  return {
    title: `${article.title} | National Voice`,
    description: article.summary,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const article = await getNewsBySlug(resolvedParams.slug);
  if (!article) notFound();

  const related = await getRelatedNews(article.category, article.slug, 3);

  const htmlContent = article.content.includes('<')
    ? article.content
    : article.content
        .split('\n\n')
        .map((p: string) => `<p>${p}</p>`)
        .join('');

  return (
    <div className="bg-white border border-border-color rounded-xl shadow-lg p-6 sm:p-10 mb-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-secondary mb-6 flex items-center gap-2 font-semibold tracking-wide">
        <Link href="/" className="hover:text-primary-red transition-colors">Home</Link>
        <span>/</span>
        <Link
          href={`/${article.category.toLowerCase()}`}
          className="hover:text-primary-red transition-colors uppercase"
        >
          {article.category}
        </Link>
      </nav>

      <h1 className="text-3xl md:text-5xl font-heading font-bold text-text-primary leading-tight mb-6">
        {article.title}
      </h1>

      <div className="flex items-center gap-4 text-sm font-semibold text-text-secondary mb-8 pb-6 border-b-2 border-gray-100">
        <span className="bg-primary-red shadow-[0_0_10px_rgba(198,40,40,0.4)] text-white px-3 py-1 rounded-full text-xs uppercase tracking-widest">{article.category}</span>
        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{timeAgo(article.published_at)}</span>
        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>Source: <a href={article.source_url} target="_blank" rel="noreferrer" className="text-primary-red hover:text-red-700 transition-colors hover:underline">{article.source_name || 'National Voice'}</a></span>
      </div>

      <div className="w-full aspect-[16/9] mb-10 rounded-xl overflow-hidden bg-light-gray shadow-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80'} alt={article.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out" />
      </div>

      <p className="text-xl text-text-secondary mb-10 leading-relaxed font-semibold border-l-4 border-primary-red pl-5 bg-red-50/50 py-3 rounded-r-lg">
        {article.summary}
      </p>

      <div
        className={`
          text-text-primary leading-8 text-lg font-sans
          [&>h2]:font-heading [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-8
          [&>p]:mb-6
          [&>ul]:mb-6 [&>ul]:pl-6 [&>ul]:list-disc
          [&_a]:text-primary-red [&_a]:underline hover:[&_a]:text-red-800 transition-colors
        `}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t-2 border-gray-100">
          <h2 className="text-2xl font-heading font-extrabold text-text-primary mb-8 flex items-center gap-3">
            <span className="w-2 h-6 bg-primary-red rounded-sm"></span> Related News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <NewsCard key={r.id} article={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const dynamic = 'force-dynamic';

import { getNewsByCategory, getAllNews } from '../../lib/news';
import NewsCard from '../../components/NewsCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }> | { category: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const cat = resolvedParams.category;
  return {
    title: `${cat.charAt(0).toUpperCase() + cat.slice(1)} News | National Voice`,
    description: `Latest ${cat} news from National Voice.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }> | { category: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const catName = resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1);
  
  // Exclude "article" and "favicon.ico" and other static routes from being treated as categories
  if (['article', 'favicon.ico', '_next'].includes(resolvedParams.category)) {
    notFound();
  }

  // Try to get specific category news, fallback to some general news if none found
  let articles = await getNewsByCategory(catName, 12);
  
  if (articles.length === 0) {
    // If no articles for this exact category exist in the DB, 
    // fetch general news as a fallback so we don't show a 404/empty page
    const fallback = await getAllNews(12);
    // filter roughly by keyword if possible
    const keywordMatch = fallback.filter(a => a.title.toLowerCase().includes(catName.toLowerCase()) || a.category.toLowerCase().includes(catName.toLowerCase()));
    
    if (keywordMatch.length > 0) {
      articles = keywordMatch;
    } else {
      // Just show latest news
      articles = fallback.slice(0, 8);
    }
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between border-b-2 border-border-color pb-4">
        <h1 className="text-3xl font-heading font-extrabold text-dark-navy uppercase tracking-wide flex items-center gap-3">
          <span className="w-2 h-8 bg-primary-red rounded-sm"></span> {catName} News
        </h1>
        <nav className="text-sm text-text-secondary font-semibold">
          <Link href="/" className="hover:text-primary-red transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-primary-red">{catName}</span>
        </nav>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center border border-border-color">
          <h2 className="text-xl font-bold text-text-primary mb-2">No Articles Found</h2>
          <p className="text-text-secondary">Check back soon for the latest {catName} updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

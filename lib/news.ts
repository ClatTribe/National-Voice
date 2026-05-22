import { getSupabaseClient } from './supabase';

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  source_name: string;
  source_url: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
}

export async function getAllNews(limit = 20, offset = 0): Promise<NewsArticle[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('national_voice_news')
    .select('*')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching news:', error);
    return [];
  }
  return data || [];
}

export async function getNewsByCategory(category: string, limit = 5): Promise<NewsArticle[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('national_voice_news')
    .select('*')
    .eq('category', category)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching category news:', error);
    return [];
  }
  return data || [];
}

export function timeAgo(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins || 1} mins ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('national_voice_news')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }
  return data;
}

export async function getRelatedNews(category: string, excludeSlug: string, limit = 4): Promise<NewsArticle[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('national_voice_news')
    .select('*')
    .eq('category', category)
    .neq('slug', excludeSlug)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related news:', error);
    return [];
  }
  return data || [];
}

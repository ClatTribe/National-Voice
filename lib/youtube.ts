export async function getYouTubeVideos(channelId: string) {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    const res = await fetch(apiUrl, { 
      next: { revalidate: 3600 } 
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    if (data.status !== 'ok' || !data.items) return [];
    
    const entries = data.items.slice(0, 3); // get top 3 videos
    
    return entries.map((entry: any) => {
      const title = entry.title || 'Latest National Voice Video';
      const link = entry.link || `https://www.youtube.com/channel/${channelId}`;
      const thumbnail = entry.thumbnail || 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=200&q=80';
      
      const cleanTitle = title
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

      return { title: cleanTitle, link, thumbnail };
    });
  } catch (error) {
    console.error("Failed to fetch YouTube RSS", error);
    return [];
  }
}

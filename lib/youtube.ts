export async function getYouTubeVideos(channelId: string) {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, { 
      next: { revalidate: 3600 } 
    });
    if (!res.ok) return [];
    
    const xml = await res.text();
    const entries = xml.split('<entry>').slice(1, 4); // get top 3 videos
    
    return entries.map(entry => {
      const title = entry.match(/<title>(.*?)<\/title>/)?.[1] || 'Latest National Voice Video';
      const link = entry.match(/<link rel="alternate" href="(.*?)"/)?.[1] || `https://www.youtube.com/channel/${channelId}`;
      const thumbnailMatch = entry.match(/<media:thumbnail url="(.*?)"/);
      const thumbnail = thumbnailMatch ? thumbnailMatch[1] : 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=200&q=80';
      
      // Some XML feeds escape characters like &amp; &quot; &#39;
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

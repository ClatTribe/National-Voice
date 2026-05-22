import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || !GEMINI_API_KEY) {
  console.error("Missing environment variables!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function generateNews() {
  console.log("Fetching news from Gemini...");
  const prompt = `You are a professional news editor for a major publication called "National Voice". 
    Generate 6 realistic, completely different breaking news articles for today.
    Make sure they are incredibly detailed and sound like real news from today.
    Categories should randomly be chosen from: Politics, World, Business, Sports, Entertainment, India.
    
    Return ONLY a valid JSON array of objects with this exact format, without any markdown formatting or extra text:
    [
      {
        "title": "A compelling headline",
        "slug": "a-compelling-headline-slug",
        "summary": "A 2-3 sentence summary of the news.",
        "content": "<p>Full HTML formatted content with at least 3 paragraphs.</p>",
        "category": "One of the categories",
        "source_name": "National Voice",
        "source_url": "https://nationalvoice.com"
      }
    ]`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7 }
        })
      }
    );

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) throw new Error("No text returned from Gemini");
    
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const articles = JSON.parse(text);
    
    console.log(`Successfully generated ${articles.length} articles! Inserting into Supabase...`);
    
    for (const article of articles) {
      const { error } = await supabase
        .from('national_voice_news')
        .insert([{ ...article, tags: ['auto-generated'] }]);
        
      if (error) {
        console.error(`Error inserting ${article.title}:`, error.message);
      } else {
        console.log(`Inserted: ${article.title}`);
      }
    }
    
    console.log("Done!");
  } catch (err) {
    console.error("Error:", err);
  }
}

generateNews();

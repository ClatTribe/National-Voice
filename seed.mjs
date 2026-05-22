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
  console.log("Fetching bulk news from Gemini...");
  
  for (let batch = 1; batch <= 3; batch++) {
    console.log(`Starting Batch ${batch} of 3...`);
    const prompt = `You are a professional news editor for a major publication called "National Voice". 
      Generate 8 completely unique, realistic breaking news articles for today.
      Make sure they are highly detailed and sound like real news from today.
      Do not repeat any previous news. Categories MUST include: Politics, World, Business, Sports, Entertainment, India.
      
      Return ONLY a valid JSON array of objects with this exact format, without any markdown formatting or extra text:
      [
        {
          "title": "A compelling headline",
          "slug": "a-compelling-headline-slug-${Date.now()}-${batch}",
          "summary": "A 2-3 sentence summary of the news.",
          "content": "<p>Full HTML formatted content with at least 3 paragraphs.</p>",
          "category": "Politics",
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
            generationConfig: { temperature: 0.9 }
          })
        }
      );

      const data = await response.json();
      let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        console.error("No text returned from Gemini for this batch");
        continue;
      }
      
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const articles = JSON.parse(text);
      
      console.log(`Successfully generated ${articles.length} articles! Inserting into Supabase...`);
      
      for (let i = 0; i < articles.length; i++) {
        // Ensure slug is unique to avoid DB conflicts
        articles[i].slug = articles[i].slug.toLowerCase().replace(/[^a-z0-9]+/g, '-') + `-${Date.now()}-${i}`;
        
        const { error } = await supabase
          .from('national_voice_news')
          .insert([{ ...articles[i], tags: ['auto-generated'] }]);
          
        if (error) {
          console.error(`Error inserting ${articles[i].title}:`, error.message);
        } else {
          console.log(`Inserted: ${articles[i].title}`);
        }
      }
      
      // small delay to prevent rate limits
      await new Promise(r => setTimeout(r, 2000));
      
    } catch (err) {
      console.error(`Error in batch ${batch}:`, err);
    }
  }
  console.log("Done seeding!");
}

generateNews();

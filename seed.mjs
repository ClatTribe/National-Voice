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
    const prompt = `You are a professional but modern news editor for a major publication called "National Voice". 
      Generate 8 completely unique, realistic breaking news articles for today.
      Make sure they are highly detailed and sound like real news from today.
      Do not repeat any previous news. Categories MUST include: Politics, World, Business, Sports, Entertainment, India.
      
      IMPORTANT: For the Hindi fields, write strictly in Devanagari script (हिंदी) but use everyday spoken Hindi heavily mixed with common English words. DO NOT use formal or translated Hindi words like "कृत्रिम बुद्धिमत्ता", "द्विदलीय", "विनियमित", "अर्थव्यवस्था". Instead, directly transliterate the English words into Devanagari. For example, use "आर्टिफिशियल इंटेलिजेंस" or "AI", "मार्केट", "पॉलिटिक्स", "इन्वेस्टर्स", "क्रैश", "अपडेट", "बिल", "टेंशन", "पार्टी". Keep it extremely casual, punchy, and easy to read for a modern young audience.
      
      Return ONLY a valid JSON array of objects with this exact format, providing BOTH English and accurate Easy Hindi translations for the text fields:
      [
        {
          "title": "A compelling English headline",
          "title_hi": "सेंसेक्स में भारी गिरावट, इन्वेस्टर्स को करोड़ों का नुकसान!",
          "slug": "a-compelling-headline-slug-${Date.now()}-${batch}",
          "summary": "A 2-3 sentence summary in English.",
          "summary_hi": "मार्केट में आज अचानक क्रैश आ गया है, जिससे इन्वेस्टर्स की टेंशन बढ़ गई है। जानिए पूरी अपडेट।",
          "content": "<p>Full HTML formatted content with at least 3 paragraphs in English.</p>",
          "content_hi": "<p>Full HTML formatted content with at least 3 paragraphs using easy spoken Hindi and English words in Devanagari script.</p>",
          "category": "Politics",
          "category_hi": "Politics",
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

import { NextResponse } from 'next/server';
import { getSupabaseClient } from '../../../lib/supabase';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function GET() {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY is not set in environment variables.' }, { status: 500 });
  }

  try {
    const prompt = `You are a professional but modern news editor for a major publication called "National Voice". 
    Generate 12 realistic, completely different breaking news articles for today.
    You MUST cover these exact categories evenly: Politics, World, Business, Sports, Entertainment, India.
    
    IMPORTANT: For the Hindi fields, write strictly in Devanagari script (हिंदी) but use everyday spoken Hindi heavily mixed with common English words. DO NOT use formal or translated Hindi words like "कृत्रिम बुद्धिमत्ता", "द्विदलीय", "विनियमित", "अर्थव्यवस्था". Instead, directly transliterate the English words into Devanagari. For example, use "आर्टिफिशियल इंटेलिजेंस" or "AI", "मार्केट", "पॉलिटिक्स", "इन्वेस्टर्स", "क्रैश", "अपडेट", "बिल", "टेंशन", "पार्टी". Keep it extremely casual, punchy, and easy to read for a modern young audience.
    
    Return ONLY a valid JSON array of objects with this exact format, providing BOTH English and accurate Easy Hindi translations for the text fields:
    [
      {
        "title": "A compelling English headline",
        "title_hi": "सेंसेक्स में भारी गिरावट, इन्वेस्टर्स को करोड़ों का नुकसान!",
        "slug": "a-compelling-headline-slug",
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

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `Gemini API error: ${errText}` }, { status: 500 });
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      return NextResponse.json({ error: 'No text returned from Gemini' }, { status: 500 });
    }

    // Clean markdown JSON formatting if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const articles = JSON.parse(text);
    
    const supabase = getSupabaseClient();
    
    const results = [];
    for (const article of articles) {
      const { data: inserted, error } = await supabase
        .from('national_voice_news')
        .insert([{ ...article, tags: ['auto-generated'] }])
        .select();
        
      if (error) {
        results.push({ title: article.title, status: 'Failed', error: error.message });
      } else {
        results.push({ title: article.title, status: 'Success' });
      }
    }

    return NextResponse.json({ message: 'News generation completed', results });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getSupabaseClient } from '../../../lib/supabase';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function GET() {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY is not set in environment variables.' }, { status: 500 });
  }

  try {
    const prompt = `You are a professional news editor for a major publication called "National Voice". 
    Generate 12 realistic, completely different breaking news articles for today.
    You MUST cover these exact categories evenly: Politics, World, Business, Sports, Entertainment, India.
    
    Return ONLY a valid JSON array of objects with this exact format, providing BOTH English and accurate Hindi (Devanagari) translations for the text fields:
    [
      {
        "title": "A compelling English headline",
        "title_hi": "एक आकर्षक हिंदी शीर्षक",
        "slug": "a-compelling-headline-slug",
        "summary": "A 2-3 sentence summary in English.",
        "summary_hi": "2-3 वाक्यों का हिंदी सारांश।",
        "content": "<p>Full HTML formatted content with at least 3 paragraphs in English.</p>",
        "content_hi": "<p>हिंदी में कम से कम 3 पैराग्राफ के साथ पूर्ण HTML स्वरूपित सामग्री।</p>",
        "category": "Politics",
        "category_hi": "राजनीति",
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

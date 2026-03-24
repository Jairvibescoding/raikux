import Parser from 'rss-parser';

const parser = new Parser();

export const RSS_FEEDS = { 
  ia: [ 
    'https://techcrunch.com/category/artificial-intelligence/feed/', 
    'https://venturebeat.com/category/ai/feed/', 
    'https://www.technologyreview.com/feed/', 
  ], 
  marketing: [ 
    'https://marketing4ecommerce.net/feed/', 
    'https://www.socialmediacol.com/feed/', 
    'https://blogmarketing.es/feed/', 
  ], 
  dev: [ 
    'https://dev.to/feed/tag/ai', 
    'https://dev.to/feed/tag/programming', 
    'https://hackernoon.com/tagged/artificial-intelligence/feed', 
  ] 
}; 

const AI_KEYWORDS = [ 
  'ai', 'artificial intelligence', 'machine learning', 
  'llm', 'gpt', 'claude', 'gemini', 'model', 'openai', 
  'anthropic', 'google', 'microsoft', 'chip', 'neural', 
  'automation', 'robot', 'data', 'startup', 'funding', 
  'marketing', 'seo', 'developer', 'code', 'software' 
]; 

const EXCLUDE_WORDS = [ 
  'wat is', 'zijn de', 'van de', 'het is', 'voor de', 
  'muñeco de nieve', 'snowman', 'robot snowman', 
  'cryptocurrency', 'crypto', 'bitcoin', 'nft', 'blockchain' 
]; 

function isRelevant(title: string): boolean { 
  const lower = title.toLowerCase(); 
  const hasExcluded = EXCLUDE_WORDS.some(word =>  
    lower.includes(word) 
  ); 
  if (hasExcluded) return false; 
  return AI_KEYWORDS.some(keyword => lower.includes(keyword)); 
} 

async function translateToSpanish(text: string): Promise<string> { 
  try { 
    const response = await fetch( 
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|es` 
    ); 
    const data = await response.json(); 
    return data.responseData.translatedText || text; 
  } catch { 
    return text; 
  } 
}

export async function fetchNewsFromRSS(category: keyof typeof RSS_FEEDS, limit = 6) {
  const feeds = RSS_FEEDS[category];
  const allItems: any[] = [];

  for (const feedUrl of feeds) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const filtered = feed.items.filter(item => 
        isRelevant(item.title || '') 
      );
      const items = await Promise.all( 
        filtered.slice(0, 3).map(async item => ({ 
          id: item.guid || item.link || Math.random().toString(), 
          title: await translateToSpanish(item.title || 'Sin título'), 
          category: category.toUpperCase(), 
          time: item.pubDate ? new Date(item.pubDate).toLocaleDateString('es-ES') : 'Reciente', 
          link: item.link || '#', 
          score: Math.floor(Math.random() * 30) + 70, 
        })) 
      );
      allItems.push(...items);
    } catch (error) {
      console.error(`Error fetching ${feedUrl}:`, error);
    }
  }

  return allItems.slice(0, limit);
}

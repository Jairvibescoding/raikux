import { useEffect, useState } from 'react'; 
  
 const RSS_FEEDS = { 
   ia: 'https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/category/artificial-intelligence/feed/', 
   marketing: 'https://api.rss2json.com/v1/api.json?rss_url=https://marketing4ecommerce.net/feed/', 
   dev: 'https://api.rss2json.com/v1/api.json?rss_url=https://dev.to/feed/tag/ai', 
 }; 
  
 const EXCLUDE = ['snowman','muñeco','crypto','bitcoin','nft','blockchain','wat is','zijn de']; 
  
 async function translateToSpanish(text: string): Promise<string> { 
   try { 
     const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|es`); 
     const data = await res.json(); 
     return data.responseData.translatedText || text; 
   } catch { return text; } 
 } 
  
 export default function NewsFeed() { 
   const [news, setNews] = useState<any[]>([]); 
   const [loading, setLoading] = useState(true); 
  
   useEffect(() => { 
     async function loadNews() { 
       const allNews: any[] = []; 
       for (const [cat, url] of Object.entries(RSS_FEEDS)) { 
         try { 
           const res = await fetch(url); 
           const data = await res.json(); 
           const items = data.items || []; 
           const filtered = items.filter((item: any) => { 
             const title = (item.title || '').toLowerCase(); 
             return !EXCLUDE.some(w => title.includes(w)); 
           }); 
           for (const item of filtered.slice(0, 2)) { 
             const translated = await translateToSpanish(item.title); 
             allNews.push({ 
               id: item.guid || item.link, 
               title: translated, 
               category: cat.toUpperCase(), 
               time: new Date(item.pubDate).toLocaleDateString('es-ES'), 
               link: item.link, 
               score: Math.floor(Math.random() * 30) + 70, 
             }); 
           } 
         } catch(e) { console.error(e); } 
       } 
       setNews(allNews); 
       setLoading(false); 
     } 
     loadNews(); 
   }, []); 
  
   if (loading) return ( 
     <div style={{padding: '2rem', textAlign: 'center', color: '#5C5651', fontSize: '14px'}}> 
       Cargando noticias en tiempo real... 
     </div> 
   ); 
  
   return ( 
     <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px'}}> 
       {news.map(item => ( 
         <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" 
           style={{background: '#fff', border: '1px solid rgba(17,17,16,0.07)', borderRadius: '12px', padding: '1.1rem 1.2rem', textDecoration: 'none', display: 'block'}}> 
           <div style={{fontSize: '10px', fontWeight: 500, color: '#E8522A', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '.08em'}}>{item.category}</div> 
           <div style={{fontSize: '14px', fontWeight: 600, color: '#111110', lineHeight: 1.35, marginBottom: '8px', fontFamily: 'Syne, sans-serif'}}>{item.title}</div> 
           <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#B8B0AB', marginBottom: '8px'}}> 
             <span>{item.time}</span><span>{item.score}%</span> 
           </div> 
           <div style={{background: 'rgba(17,17,16,0.07)', borderRadius: '4px', height: '3px'}}> 
             <div style={{background: '#E8522A', height: '3px', borderRadius: '4px', width: `${item.score}%`}}></div> 
           </div> 
         </a> 
       ))} 
     </div> 
   ); 
 } 

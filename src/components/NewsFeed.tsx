import { useEffect, useState } from 'react'; 
  
 const RSS_FEEDS = { 
   ia: 'https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/category/artificial-intelligence/feed/', 
   marketing: 'https://api.rss2json.com/v1/api.json?rss_url=https://marketing4ecommerce.net/feed/', 
   dev: 'https://api.rss2json.com/v1/api.json?rss_url=https://dev.to/feed/tag/ai', 
 }; 
  
 const EXCLUDE = ['snowman','muñeco','crypto','bitcoin','nft','blockchain','wat is','zijn de']; 

 const AI_IMAGES = [ 
   'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=200&fit=crop', 
   'https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=400&h=200&fit=crop',  
   'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop', 
   'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=400&h=200&fit=crop', 
   'https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=400&h=200&fit=crop', 
   'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop', 
 ];
  
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
   const [filter, setFilter] = useState('TODO');
  
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
           for (const [idx, item] of filtered.slice(0, 2).entries()) { 
             const translated = await translateToSpanish(item.title); 
             allNews.push({ 
               id: item.guid || item.link, 
               title: translated, 
               category: cat.toUpperCase(), 
               time: new Date(item.pubDate).toLocaleDateString('es-ES'), 
               link: item.link, 
               score: Math.floor(Math.random() * 30) + 70, 
               image: AI_IMAGES[Math.floor(Math.random() * AI_IMAGES.length)],
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

   const filteredNews = filter === 'TODO' ? news : news.filter(n => n.category === filter);
  
   return ( 
     <div>
       {/* Filter Buttons */}
       <div style={{display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap'}}>
         {['TODO', 'IA', 'MARKETING', 'DEV'].map(f => (
           <button 
             key={f}
             onClick={() => setFilter(f)}
             style={{
               padding: '8px 16px', 
               borderRadius: '20px', 
               border: '1px solid rgba(17,17,16,0.1)',
               cursor: 'pointer',
               fontSize: '12px',
               fontWeight: 600,
               transition: 'all 0.2s',
               background: filter === f ? '#E8522A' : '#ffffff',
               color: filter === f ? '#ffffff' : '#111110'
             }}
           >
             {f}
           </button>
         ))}
       </div>

       <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px'}}> 
         {filteredNews.map(item => ( 
           <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" 
             style={{background: '#fff', border: '1px solid rgba(17,17,16,0.07)', borderRadius: '12px', overflow: 'hidden', textDecoration: 'none', display: 'block'}}> 
             <img src={item.image} alt={item.title} style={{width: '100%', height: '150px', objectFit: 'crop'}} />
             <div style={{padding: '1.1rem 1.2rem'}}>
               <div style={{fontSize: '10px', fontWeight: 500, color: '#E8522A', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '.08em'}}>{item.category}</div> 
               <div style={{fontSize: '14px', fontWeight: 600, color: '#111110', lineHeight: 1.35, marginBottom: '8px', fontFamily: 'Syne, sans-serif'}}>{item.title}</div> 
               <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#B8B0AB', marginBottom: '8px'}}> 
                 <span>{item.time}</span><span>{item.score}%</span> 
               </div> 
               <div style={{background: 'rgba(17,17,16,0.07)', borderRadius: '4px', height: '3px'}}> 
                 <div style={{background: '#E8522A', height: '3px', borderRadius: '4px', width: `${item.score}%`}}></div> 
               </div> 
             </div>
           </a> 
         ))} 
       </div> 
     </div>
   ); 
 } 

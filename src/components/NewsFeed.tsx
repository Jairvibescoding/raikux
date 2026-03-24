import { useEffect, useState } from 'react'; 
  
 const RSS_FEEDS = { 
   ia: 'https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/category/artificial-intelligence/feed/', 
   marketing: 'https://api.rss2json.com/v1/api.json?rss_url=https://marketing4ecommerce.net/feed/', 
   dev: 'https://api.rss2json.com/v1/api.json?rss_url=https://dev.to/feed/tag/ai', 
 }; 
  
 const EXCLUDE = ['snowman','muñeco','crypto','bitcoin','nft','blockchain','wat is','zijn de']; 
  
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
             allNews.push({ 
               id: item.guid || item.link, 
               title: item.title, 
               category: cat.toUpperCase(), 
               time: new Date(item.pubDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }), 
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
     <div className="p-12 text-center text-ink-mid text-sm font-medium animate-pulse"> 
       <div className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
       Sincronizando feed neuronal... 
     </div> 
   ); 
  
   return ( 
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
       {news.map((item, idx) => ( 
         <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" 
           className="glass-panel p-6 group block hover:-translate-y-1 hover:border-orange/40 hover:shadow-2xl hover:shadow-orange/15 transition-all duration-300 animate-fade-up relative overflow-hidden flex flex-col justify-between"
           style={{ animationDelay: `${idx * 150}ms`, minHeight: '220px' }}
         > 
           <div className="absolute inset-0 bg-gradient-to-br from-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
           <div className="relative z-10 flex flex-col h-full">
             <div>
               <div className="text-[0.7rem] font-bold text-orange uppercase tracking-[0.15em] mb-4">{item.category}</div> 
               <div className="font-display text-[1.1rem] font-bold text-white leading-[1.4] mb-6 group-hover:text-orange-light transition-colors line-clamp-3">{item.title}</div> 
             </div>
             <div className="mt-auto pt-4 border-t border-white/5">
               <div className="flex justify-between items-center text-[0.75rem] text-ink-mid mb-3 font-medium"> 
                 <span className="italic">{item.time}</span>
                 <span className="bg-white/5 py-1 px-2 rounded-md font-bold uppercase tracking-wider">{item.score}%</span> 
               </div> 
               <div className="h-1 w-full bg-surface-elevated rounded-full overflow-hidden relative"> 
                 <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange to-orange-deep rounded-full transition-all duration-1000 ease-out group-hover:from-orange-light group-hover:to-orange shadow-[0_0_8px_rgba(232,82,42,0.5)]" style={{width: `${item.score}%`}}></div> 
               </div> 
             </div>
           </div>
         </a> 
       ))} 
     </div> 
   ); 
 }

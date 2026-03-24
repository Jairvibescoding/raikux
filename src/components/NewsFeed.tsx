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
       <div className="w-10 h-10 border-[3px] border-orange border-t-transparent flex items-center justify-center rounded-full animate-spin mx-auto mb-4 shadow-[0_0_15px_rgba(232,82,42,0.5)]"></div>
       Sincronizando fuentes globales... 
     </div> 
   ); 
  
   return ( 
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
       {news.map((item, idx) => ( 
         <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" 
           className="relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 group block hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(232,82,42,0.25)] hover:border-orange/50 transition-all duration-300 ease-out flex flex-col justify-between"
           style={{ minHeight: '220px' }}
           data-animate
         > 
           <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-transparent to-orange-deep/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
           <div className="relative z-10 flex flex-col h-full">
             <div>
               <div className="text-[0.7rem] font-bold text-orange uppercase tracking-[0.15em] mb-4 drop-shadow-md">{item.category}</div> 
               <div className="font-display text-[1.1rem] font-bold text-white leading-[1.4] mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-light group-hover:to-orange transition-colors line-clamp-3">{item.title}</div> 
             </div>
             <div className="mt-auto pt-4 border-t border-white/5 group-hover:border-orange/20 transition-colors">
               <div className="flex justify-between items-center text-[0.75rem] text-ink-mid mb-3 font-medium"> 
                 <span className="italic group-hover:text-white/70 transition-colors">{item.time}</span>
                 <span className="bg-white/5 backdrop-blur-md py-1 px-2.5 rounded-md border border-white/10 font-bold uppercase tracking-wider group-hover:border-orange/30 group-hover:text-orange-light transition-all">{item.score}%</span> 
               </div> 
               <div className="h-1.5 w-full bg-surface-elevated rounded-full overflow-hidden relative ring-1 ring-white/5 group-hover:ring-orange/20 transition-all"> 
                 <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange to-orange-deep rounded-full transition-all duration-1000 ease-out group-hover:from-orange-light group-hover:to-orange shadow-[0_0_12px_rgba(232,82,42,0.8)]" style={{width: `${item.score}%`}}></div> 
               </div> 
             </div>
           </div>
         </a> 
       ))} 
     </div> 
   ); 
 }

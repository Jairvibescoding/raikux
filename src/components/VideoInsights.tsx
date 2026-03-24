import React, { useState } from 'react';

const VIDEOS = [
  {
    id: "J8HgVzNRei0",
    title: "The Next AI Breakthrough (GPT-5)",
    channel: "Two Minute Papers",
    thumb: "https://img.youtube.com/vi/J8HgVzNRei0/maxresdefault.jpg"
  },
  {
    id: "Pj_Hl-gN8w",
    title: "Cursor vs Antigravity in 2026",
    channel: "Matt Wolfe",
    thumb: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&h=900&fit=crop"
  },
  {
    id: "SQRp4YwVxy",
    title: "AGI Timeline Explained",
    channel: "AI Explained",
    thumb: "https://images.unsplash.com/photo-1675557009875-436f522bbdc8?q=80&w=1600&h=900&fit=crop"
  }
];

export default function VideoInsights() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handleOpen = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveVideo(id);
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 relative z-10" data-animate>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-5xl text-white mb-4 tracking-tight drop-shadow-md">
              Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-light to-orange relative">Insights</span>
            </h2>
            <p className="text-ink-mid text-lg max-w-xl">Deep dives y análisis técnico de los canales más relevantes del panorama IA.</p>
          </div>
          <button className="mt-6 md:mt-0 flex items-center gap-2 text-orange font-bold text-sm tracking-widest uppercase hover:text-orange-light transition-colors group">
            Ver todos 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VIDEOS.map((vid, idx) => (
            <div 
              key={idx} 
              className="group cursor-pointer relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-orange/40 transition-all duration-500 hover:shadow-[0_20px_40px_-5px_rgba(232,82,42,0.3)] hover:-translate-y-2 aspect-video flex items-end p-6"
              onClick={(e) => handleOpen(vid.id, e)}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <img src={vid.thumb} alt={vid.title} className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-75">
                <div className="w-16 h-16 rounded-full bg-orange/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(232,82,42,0.8)]">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>

              <div className="relative z-30 w-full transform transition-transform duration-300 group-hover:-translate-y-1">
                <span className="bg-white/10 backdrop-blur-md text-white/90 text-[0.65rem] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-md mb-3 inline-block shadow-md border border-white/5">{vid.channel}</span>
                <h3 className="font-display text-xl text-white font-bold leading-tight drop-shadow-md">{vid.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Video Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={() => setActiveVideo(null)}>
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-fade-in"></div>
          <div className="relative z-10 w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(232,82,42,0.2)] border border-white/10" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute -top-10 right-0 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
              onClick={() => setActiveVideo(null)}
            >
              Cerrar (✕)
            </button>
            <iframe 
              src={`https://www.youtube.com/embed/${activeVideo.length > 5 ? activeVideo : 'dQw4w9WgXcQ'}?autoplay=1&modestbranding=1&rel=0`} 
              title="YouTube video player" 
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

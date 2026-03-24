import React, { useEffect, useState } from 'react';

export interface AIModel {
  rank: number;
  name: string;
  score: number;
  change: number;
}

interface Props {
  data: AIModel[];
}

export const RankingTable: React.FC<Props> = ({ data }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full overflow-x-auto glass-panel border border-white/5 rounded-2xl p-8 animate-fade-up animate-delay-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-6 px-4 label-tag text-ink-faint">Rank</th>
            <th className="py-6 px-4 label-tag text-ink-faint">Modelo</th>
            <th className="py-6 px-4 label-tag text-ink-faint">Score</th>
            <th className="py-6 px-4 label-tag text-ink-faint">Cambio</th>
            <th className="py-6 px-4 label-tag text-ink-faint">Progreso</th>
          </tr>
        </thead>
        <tbody>
          {data.map((model, idx) => (
            <tr key={model.name} className="group border-b border-white/5 hover:bg-white/5 transition-all duration-300">
              <td className={`py-6 px-4 font-display text-[1.1rem] ${model.rank === 1 ? 'text-orange drop-shadow-[0_0_8px_rgba(232,82,42,0.8)]' : 'text-white'}`}>
                #{model.rank}
              </td>
              <td className="py-6 px-4">
                <span className="font-sans text-[1.05rem] font-semibold text-white tracking-tight group-hover:text-orange-light transition-colors">
                  {model.name}
                </span>
              </td>
              <td className="py-6 px-4 font-display text-[1rem] text-white/90">
                {model.score}
              </td>
              <td className="py-6 px-4">
                <div className={`flex items-center gap-1 font-bold text-[0.85rem] ${model.change > 0 ? 'text-green-400' : model.change < 0 ? 'text-red-400' : 'text-ink-mid'}`}>
                  {model.change > 0 ? '↑' : model.change < 0 ? '↓' : '•'}
                  {Math.abs(model.change)}
                </div>
              </td>
              <td className="py-6 px-4 w-48">
                <div className="h-2.5 w-full bg-surface-elevated rounded-full overflow-hidden ring-1 ring-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-light to-orange transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(232,82,42,0.5)]"
                    style={{ 
                      width: animate ? `${model.score}%` : '0%',
                      opacity: animate ? 1 : 0
                    }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;

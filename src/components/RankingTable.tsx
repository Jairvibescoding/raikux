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

function useCountUp(end: number, startDelay: number = 0, duration: number = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      if (elapsed < startDelay) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min((elapsed - startDelay) / duration, 1);
      const easeProg = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setCount(Math.floor(easeProg * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startDelay]);
  return count;
}

const TableRow = ({ model, idx }: { model: AIModel, idx: number }) => {
  const [animate, setAnimate] = useState(false);
  const animatedScore = useCountUp(model.score, idx * 100, 2000);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 150 + idx * 100);
    return () => clearTimeout(timer);
  }, [idx]);

  return (
    <tr className="group border-b border-white/5 hover:bg-white/5 transition-all duration-300">
      <td className={`py-6 px-4 font-display text-[1.1rem] ${model.rank === 1 ? 'text-orange drop-shadow-[0_0_8px_rgba(232,82,42,0.8)]' : 'text-white'}`}>
        #{model.rank}
      </td>
      <td className="py-6 px-4">
        <span className="font-sans text-[1.05rem] font-semibold text-white tracking-tight group-hover:text-orange-light transition-colors">
          {model.name}
        </span>
      </td>
      <td className="py-6 px-4 font-display text-[1.15rem] text-white w-20">
        {animatedScore}
      </td>
      <td className="py-6 px-4">
        <div className={`flex items-center gap-1 font-bold text-[0.85rem] transition-all duration-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${model.change > 0 ? 'text-green-400' : model.change < 0 ? 'text-red-400' : 'text-ink-mid'}`}>
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
  );
};

export const RankingTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto glass-panel border border-white/10 rounded-2xl p-8" data-animate>
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
            <TableRow key={model.name} model={model} idx={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;

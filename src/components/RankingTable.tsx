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
    setAnimate(true);
  }, []);

  return (
    <div class="w-full overflow-x-auto bg-white border border-border rounded-2xl p-8">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-border">
            <th class="py-6 px-4 label-tag text-ink-faint">Rank</th>
            <th class="py-6 px-4 label-tag text-ink-faint">Modelo</th>
            <th class="py-6 px-4 label-tag text-ink-faint">Score</th>
            <th class="py-6 px-4 label-tag text-ink-faint">Cambio</th>
            <th class="py-6 px-4 label-tag text-ink-faint">Progreso</th>
          </tr>
        </thead>
        <tbody>
          {data.map((model) => (
            <tr key={model.name} class="group border-b border-border hover:bg-orange-pale transition-all">
              <td class={`py-6 px-4 font-display text-[0.9rem] ${model.rank === 1 ? 'text-orange' : 'text-ink'}`}>
                #{model.rank}
              </td>
              <td class="py-6 px-4">
                <span class="font-sans text-[0.95rem] font-semibold text-ink tracking-tight group-hover:text-orange transition-colors">
                  {model.name}
                </span>
              </td>
              <td class="py-6 px-4 font-display text-[0.95rem] text-ink">
                {model.score}
              </td>
              <td class="py-6 px-4">
                <div class={`flex items-center gap-1 font-bold text-[0.85rem] ${model.change > 0 ? 'text-green-600' : model.change < 0 ? 'text-red-600' : 'text-ink-faint'}`}>
                  {model.change > 0 ? '↑' : model.change < 0 ? '↓' : '•'}
                  {Math.abs(model.change)}
                </div>
              </td>
              <td class="py-6 px-4 w-40">
                <div class="h-2 w-full bg-border rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-orange transition-all duration-1000 ease-out rounded-full"
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

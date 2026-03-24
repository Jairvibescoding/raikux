import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  data: { name: string; score: number }[];
}

const RankingChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-[400px] glass-panel p-8 mt-12 animate-fade-up">
      <h3 className="font-display text-2xl text-white tracking-tighter mb-8 uppercase leading-none">
        Visualización <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-light to-orange">Estratégica</span>
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis 
            type="category" 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#B8B0AB', fontFamily: 'Syne', fontWeight: 600, fontSize: 13 }}
            width={120}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
            contentStyle={{ 
              backgroundColor: 'rgba(10,10,10,0.85)',
              borderRadius: '16px', 
              border: '1px solid rgba(255,255,255,0.1)', 
              fontFamily: 'DM Sans',
              color: '#fff',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            }}
          />
          <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={28}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === 0 ? '#E8522A' : '#F2724D'} 
                fillOpacity={1 - index * 0.12}
                className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RankingChart;

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  data: { name: string; score: number }[];
}

const RankingChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-[400px] bg-white border border-border rounded-2xl p-8 mt-12">
      <h3 className="font-display text-2xl text-ink tracking-tighter mb-8 uppercase leading-none">
        Visualización <span className="text-orange">Estratégica</span>
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis 
            type="category" 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#111110', fontFamily: 'Syne', fontWeight: 600, fontSize: 12 }}
            width={120}
          />
          <Tooltip 
            cursor={{ fill: '#FEF3EF' }}
            contentStyle={{ 
              borderRadius: '12px', 
              border: '1px solid rgba(17,17,16,0.07)', 
              fontFamily: 'DM Sans',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === 0 ? '#E8522A' : '#F2724D'} 
                fillOpacity={1 - index * 0.08}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RankingChart;

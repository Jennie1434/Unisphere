import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const colors = ['var(--eugenia-burgundy)', 'var(--eugenia-pink)', 'var(--eugenia-yellow)', '#671324', '#E91E63'];

export default function PopularActionsChart({ data }) {
  // S'assurer que data est un tableau
  const dataArray = Array.isArray(data) ? data : [];

  if (!dataArray || dataArray.length === 0) {
    return (
      <div className="admin-card">
        <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--eugenia-burgundy)' }}>
          🎯 Actions les Plus Populaires
        </h3>
        <p className="text-gray-500 text-center py-8">Aucune donnée disponible</p>
      </div>
    );
  }

  const chartData = dataArray.map((item, index) => ({
    name: `${item.emoji || ''} ${item.type}`,
    count: item.count,
    color: colors[index % colors.length],
  }));

  return (
    <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_#DBA12D] transition-all">
      <h3 className="text-xl font-black mb-6 flex items-center gap-3 font-serif italic text-black uppercase">
        <span className="text-2xl not-italic">🎯</span> ACTIONS POPULAIRES
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#00000010" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="#000"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 10, fontWeight: 'bold', fill: 'black', textTransform: 'uppercase' }}
          />
          <YAxis stroke="#000" tick={{ fontSize: 10, fontWeight: 'bold', fill: 'black' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '2px solid #000',
              borderRadius: '0px',
              boxShadow: '4px 4px 0px #000'
            }}
            itemStyle={{ color: 'black', fontWeight: 'bold' }}
            cursor={{ fill: '#00000010' }}
          />
          <Bar dataKey="count" fill="black" radius={[0, 0, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


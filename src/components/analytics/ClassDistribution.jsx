import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#671324', '#E91E63', '#DBA12D', '#8B1A3D', '#F06292', '#FFC107'];

export default function ClassDistribution({ data }) {
  // S'assurer que data est un tableau
  const dataArray = Array.isArray(data) ? data : [];

  if (!dataArray || dataArray.length === 0) {
    return (
      <div className="admin-card">
        <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--eugenia-burgundy)' }}>
          🏫 Répartition par Classe
        </h3>
        <p className="text-gray-500 text-center py-8">Aucune donnée disponible</p>
      </div>
    );
  }

  const chartData = dataArray.map(item => ({
    name: item.class,
    value: item.count,
    percentage: item.percentage,
  }));

  const onlyOneClass = dataArray.length === 1;

  return (
    <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_#DBA12D] transition-all">
      <h3 className="text-xl font-black mb-6 flex items-center gap-3 font-serif italic text-black uppercase">
        <span className="text-2xl not-italic">🏫</span> RÉPARTITION PROMOS
      </h3>
      {onlyOneClass && (
        <div className="mb-4 p-3 border-2 border-black bg-[#DBA12D] text-black font-bold text-xs uppercase tracking-widest">
          ⚠️ Seulement 1 classe active ({dataArray[0].class})
        </div>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percentage }) => `${name}: ${percentage}%`}
            outerRadius={100}
            fill="#000"
            dataKey="value"
            stroke="black"
            strokeWidth={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'black' : (index % 3 === 0 ? '#DBA12D' : '#fff')} stroke="black" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '2px solid #000',
              borderRadius: '0px',
              boxShadow: '4px 4px 0px #000'
            }}
            itemStyle={{ color: 'black', fontWeight: 'bold' }}
            formatter={(value, name, props) => [
              `${value} actions (${props.payload.percentage}%)`,
              name,
            ]}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '10px' }}
            iconType="square"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}


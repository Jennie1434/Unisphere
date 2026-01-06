import React from 'react';

export default function TopStudentsTable({ students }) {
  // S'assurer que students est un tableau
  const studentsArray = Array.isArray(students) ? students : [];

  if (!studentsArray || studentsArray.length === 0) {
    return (
      <div className="bg-white border-2 border-black p-12 text-center shadow-[10px_10px_0px_black]">
        <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-black">
          🏆 Top 10 Étudiants Actifs
        </h3>
        <p className="text-black/50 text-sm font-bold uppercase tracking-widest py-8">Aucune donnée disponible</p>
      </div>
    );
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="bg-white border-2 border-black p-8 shadow-[10px_10px_0px_black]">
      <h3 className="text-2xl font-black uppercase tracking-tight mb-8 text-black">
        🏆 Top 10 Étudiants Actifs
      </h3>
      <div className="overflow-x-auto">
        <table className="admin-table w-full">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="px-4 py-4 text-left font-black uppercase tracking-widest text-xs">Position</th>
              <th className="px-4 py-4 text-left font-black uppercase tracking-widest text-xs">Nom</th>
              <th className="px-4 py-4 text-left font-black uppercase tracking-widest text-xs">Classe</th>
              <th className="px-4 py-4 text-right font-black uppercase tracking-widest text-xs">Actions</th>
              <th className="px-4 py-4 text-right font-black uppercase tracking-widest text-xs">Points</th>
            </tr>
          </thead>
          <tbody>
            {studentsArray.map((student) => (
              <tr key={student.rank} className="border-b border-black/5 hover:bg-black hover:text-white transition-all group">
                <td className="px-4 py-4 font-black">{getRankIcon(student.rank)}</td>
                <td className="px-4 py-4 font-bold uppercase">
                  {student.firstName} {student.lastName}
                </td>
                <td className="px-4 py-4 font-mono text-sm">{student.class}</td>
                <td className="px-4 py-4 text-right font-mono">{student.actionsCount}</td>
                <td className="px-4 py-4 text-right font-black group-hover:text-[#DBA12D]">
                  {student.points} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


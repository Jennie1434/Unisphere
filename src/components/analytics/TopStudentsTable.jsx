import React from 'react';
import { Link } from 'react-router-dom';

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
    if (rank === 1) return { icon: '🥇', color: '#FFD700' };
    if (rank === 2) return { icon: '🥈', color: '#C0C0C0' };
    if (rank === 3) return { icon: '🥉', color: '#CD7F32' };
    return { icon: `#${rank}`, color: 'inherit' };
  };

  return (
    <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_#DBA12D] transition-all">
      <h3 className="text-xl font-black mb-6 flex items-center gap-3 font-serif italic text-black uppercase">
        <span className="text-2xl not-italic">🏆</span> TOP 10 ÉTUDIANTS
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-4 border-black">
              <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider">Rang</th>
              <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider">Étudiant</th>
              <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider">Classe</th>
              <th className="px-4 py-4 text-right text-xs font-black uppercase tracking-wider">Actions</th>
              <th className="px-4 py-4 text-right text-xs font-black uppercase tracking-wider">Points</th>
            </tr>
          </thead>
          <tbody>
            {studentsArray.map((student) => (
              <tr key={student.rank} className="border-b border-black/10 hover:bg-black/5 transition-colors">
                <td className="px-4 py-3 font-black text-lg" style={{ color: getRankIcon(student.rank).color }}>
                  {getRankIcon(student.rank).icon}
                </td>
                <td className="px-4 py-3 font-bold uppercase text-sm">
                  <Link
                    to={`/profile/${student.firstName?.toLowerCase()}-${student.lastName?.toLowerCase()}`}
                    className="hover:underline hover:text-[#DBA12D] transition-colors"
                  >
                    {student.firstName} {student.lastName}
                  </Link>
                </td>
                <td className="px-4 py-3 font-bold text-xs text-black/60">{student.class}</td>
                <td className="px-4 py-3 text-right font-mono text-xs">{student.actionsCount}</td>
                <td className="px-4 py-3 text-right font-black text-[#DBA12D]">
                  {student.points} PTS
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


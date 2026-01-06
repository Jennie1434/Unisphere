import React, { useState } from 'react';
import { formatDateTime } from '../../utils/analyticsHelpers';

export default function RecentActionsTable({ actions, onStatusChange }) {
  const [statusFilter, setStatusFilter] = useState('all');

  // S'assurer que actions est un tableau
  const actionsArray = Array.isArray(actions) ? actions : [];

  if (!actionsArray || actionsArray.length === 0) {
    return (
      <div className="admin-card">
        <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--eugenia-burgundy)' }}>
          📋 Dernières Actions (24h)
        </h3>
        <div className="empty-state text-center py-8">
          <p className="text-gray-500 mb-2">📊 Aucune action pour cette période</p>
          <p className="text-sm text-gray-400">Les actions soumises dans les dernières 24h apparaîtront ici</p>
        </div>
      </div>
    );
  }

  const filteredActions = statusFilter === 'all'
    ? actionsArray
    : actionsArray.filter(a => a.status === statusFilter);

  return (
    <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_#DBA12D] transition-all">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black flex items-center gap-3 font-serif italic text-black uppercase">
          <span className="text-2xl not-italic">📋</span> DERNIÈRES ACTIONS (24H)
        </h3>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border-2 border-black bg-white text-xs font-bold uppercase tracking-widest focus:outline-none focus:bg-black focus:text-white transition-all cursor-pointer"
        >
          <option value="all">Toutes</option>
          <option value="validated">Validées</option>
          <option value="rejected">Refusées</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-4 border-black">
              <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider">Date/Heure</th>
              <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider">Étudiant</th>
              <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider">Type</th>
              <th className="px-4 py-4 text-right text-xs font-black uppercase tracking-wider">Points</th>
              <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wider">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredActions.map((action) => (
              <tr key={action.id} className="border-b border-black/10 hover:bg-black/5 transition-colors">
                <td className="px-4 py-3 text-xs font-bold text-black/60 font-mono">{formatDateTime(action.created_at)}</td>
                <td className="px-4 py-3 text-sm font-bold">{action.student_name}</td>
                <td className="px-4 py-3 text-xs font-bold uppercase tracking-tight">
                  {action.emoji} {action.action_type}
                </td>
                <td className="px-4 py-3 text-right font-black text-[#DBA12D]">{action.points || 0} PTS</td>
                <td className="px-4 py-3 text-center">
                  {action.status === 'validated' ? (
                    <span className="inline-block px-2 py-1 bg-black text-[#DBA12D] text-[10px] font-black uppercase tracking-widest">VALIDÉ</span>
                  ) : (
                    <span className="inline-block px-2 py-1 border-2 border-black text-black text-[10px] font-black uppercase tracking-widest">REFUSÉ</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


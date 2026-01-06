import { useState, useEffect } from 'react';
import { SCHOOL_EMAIL_DOMAINS } from '../../constants/routes';
import ConfirmModal from './ConfirmModal';

export default function ReportsQueue({ school = 'eugenia' }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, resolved, in_progress
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportToDelete, setReportToDelete] = useState(null);

  useEffect(() => {
    loadReports();
  }, [school]);

  const loadReports = async () => {
    try {
      const emailDomain = SCHOOL_EMAIL_DOMAINS[school];
      const API_URL = import.meta.env.VITE_API_URL;

      if (API_URL) {
        const response = await fetch(`${API_URL}/reports`);
        if (response.ok) {
          const data = await response.json();
          const allReports = Array.isArray(data) ? data : [];
          // Filtrer par école (basé sur l'email de l'auteur du signalement)
          const filteredReports = allReports.filter(report => {
            const email = report.studentEmail || report.email;
            if (!email) return false;
            return email.toLowerCase().includes(emailDomain);
          });
          setReports(filteredReports);
        }
      } else {
        // Fallback: localStorage
        const stored = localStorage.getItem('reports');
        const allReports = stored ? JSON.parse(stored) : [];
        // Filtrer par école
        const filteredReports = allReports.filter(report => {
          const email = report.studentEmail || report.email;
          if (!email) return false;
          return email.toLowerCase().includes(emailDomain);
        });
        setReports(filteredReports);
      }
    } catch (error) {
      console.error('Error loading reports:', error);
      // Fallback: localStorage
      const stored = localStorage.getItem('reports');
      setReports(stored ? JSON.parse(stored) : []);
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (reportId, newStatus) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      if (API_URL) {
        const response = await fetch(`${API_URL}/reports/${reportId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
          loadReports();
        }
      } else {
        // Fallback: localStorage
        const stored = JSON.parse(localStorage.getItem('reports') || '[]');
        const updated = stored.map(r =>
          r.id === reportId ? { ...r, status: newStatus } : r
        );
        localStorage.setItem('reports', JSON.stringify(updated));
        setReports(updated);
      }
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  const deleteReport = (reportId) => {
    setReportToDelete(reportId);
  };

  const confirmDeleteReport = async () => {
    if (!reportToDelete) return;
    const reportId = reportToDelete;
    setReportToDelete(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      if (API_URL) {
        const response = await fetch(`${API_URL}/reports/${reportId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          loadReports();
        }
      } else {
        // Fallback: localStorage
        const stored = JSON.parse(localStorage.getItem('reports') || '[]');
        const updated = stored.filter(r => r.id !== reportId);
        localStorage.setItem('reports', JSON.stringify(updated));
        setReports(updated);
      }
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const filteredReports = filter === 'all'
    ? reports
    : reports.filter(r => r.status === filter);

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
      in_progress: { label: 'En cours', color: 'bg-blue-100 text-blue-800' },
      resolved: { label: 'Résolu', color: 'bg-green-100 text-green-800' }
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      materiel: '🛠',
      nettoyage: '✦',
      securite: '🛡',
      technique: '⚡',
      autre: '📌'
    };
    return emojis[category] || '📌';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Signalements
          </h2>
          <p className="text-gray-600">
            {reports.length} signalement{reports.length > 1 ? 's' : ''} au total
          </p>
        </div>

        {/* Filtres */}
        <div className="flex gap-2">
          {['all', 'pending', 'in_progress', 'resolved'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 border-2 text-[10px] font-black uppercase tracking-widest transition-all ${filter === status
                ? 'bg-black border-black text-white shadow-[4px_4px_0px_rgba(0,0,0,0.1)]'
                : 'bg-white border-black text-black hover:bg-black hover:text-white'
                }`}
            >
              {status === 'all' ? 'TOUS' :
                status === 'pending' ? 'EN ATTENTE' :
                  status === 'in_progress' ? 'EN COURS' : 'RÉSOLUS'}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des signalements */}
      {filteredReports.length === 0 ? (
        <div className="bg-white border-2 border-black p-12 text-center shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
          <div className="text-6xl mb-4 text-gray-300 font-thin">—</div>
          <p className="text-xl text-black font-bold uppercase tracking-wide">
            Aucun signalement {filter !== 'all' ? `avec le statut "${filter}"` : ''}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports
            .sort((a, b) => new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id))
            .map(report => (
              <div key={report.id} className="bg-white border-2 border-black p-6 transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_black] group">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Photo */}
                  {report.photo && (
                    <div className="md:w-48 flex-shrink-0">
                      <img
                        src={report.photo}
                        alt="Photo du problème"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Contenu */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{getCategoryEmoji(report.category)}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {report.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Par {report.studentName || 'Anonyme'} • {report.location}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(report.status || 'pending')}
                    </div>

                    <p className="text-gray-700 mb-4">{report.description}</p>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => updateReportStatus(report.id, 'in_progress')}
                        className="btn btn-outline btn-sm"
                        disabled={report.status === 'in_progress'}
                      >
                        ➤ En cours
                      </button>
                      <button
                        onClick={() => updateReportStatus(report.id, 'resolved')}
                        className="btn btn-success btn-sm"
                        disabled={report.status === 'resolved'}
                      >
                        ✓ Résolu
                      </button>
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="btn btn-outline btn-sm"
                      >
                        ↗ Voir détails
                      </button>
                      <button
                        onClick={() => deleteReport(report.id)}
                        className="btn btn-danger btn-sm"
                      >
                        ✕ Supprimer
                      </button>
                    </div>

                    {report.createdAt && (
                      <p className="text-xs text-gray-500 mt-2">
                        Signalé le {new Date(report.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Modal détails */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedReport(null)}>
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <span className="text-5xl">{getCategoryEmoji(selectedReport.category)}</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedReport.title}</h3>
                  <p className="text-gray-600">{selectedReport.location}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {selectedReport.photo && (
              <div className="mb-6">
                <img
                  src={selectedReport.photo}
                  alt="Photo du problème"
                  className="w-full max-h-96 object-contain rounded-lg border-2 border-gray-300"
                />
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{selectedReport.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Signalé par</h4>
                  <p className="text-gray-700">{selectedReport.studentName || 'Anonyme'}</p>
                  <p className="text-sm text-gray-600">{selectedReport.studentEmail}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Statut</h4>
                  {getStatusBadge(selectedReport.status || 'pending')}
                </div>
              </div>

              {selectedReport.createdAt && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Date</h4>
                  <p className="text-gray-700">
                    {new Date(selectedReport.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  updateReportStatus(selectedReport.id, 'in_progress');
                  setSelectedReport(null);
                }}
                className="btn btn-outline flex-1"
                disabled={selectedReport.status === 'in_progress'}
              >
                ➤ Marquer en cours
              </button>
              <button
                onClick={() => {
                  updateReportStatus(selectedReport.id, 'resolved');
                  setSelectedReport(null);
                }}
                className="btn btn-success flex-1"
                disabled={selectedReport.status === 'resolved'}
              >
                ✓ Marquer résolu
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={!!reportToDelete}
        onClose={() => setReportToDelete(null)}
        onConfirm={confirmDeleteReport}
        title="Supprimer le signalement"
        message="Êtes-vous sûr de vouloir supprimer ce signalement ? Cette action est irréversible."
        confirmText="Supprimer"
        isDanger={true}
      />
    </div>
  );
}


import { useState, useEffect } from 'react';
import { getLeaderboard, updateLeaderboardUser, deleteLeaderboardUser, bulkImportStudents } from '../../services/googleSheets';
import BulkImportStudents from './BulkImportStudents';
import { SCHOOL_EMAIL_DOMAINS } from '../../constants/routes';
import ConfirmModal from './ConfirmModal';

export default function LeaderboardConfig({ school = 'eugenia' }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    loadLeaderboard();
  }, [school]);

  const loadLeaderboard = async () => {
    try {
      const emailDomain = SCHOOL_EMAIL_DOMAINS[school];
      const data = await getLeaderboard(school);
      // Filtrer par école
      const filteredData = data.filter(user =>
        user.email && user.email.toLowerCase().includes(emailDomain)
      );
      setLeaderboard(filteredData);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setShowAddForm(false);
  };

  const handleAdd = () => {
    setEditingUser({
      firstName: '',
      lastName: '',
      email: '',
      classe: 'B1',
      totalPoints: 0,
      actionsCount: 0
    });
    setShowAddForm(true);
  };

  const handleSave = async () => {
    if (!editingUser.email || !editingUser.firstName) {
      alert('Veuillez remplir email et prénom');
      return;
    }

    const result = await updateLeaderboardUser(editingUser);

    if (result.success) {
      await loadLeaderboard();
      setEditingUser(null);
      setShowAddForm(false);
    } else {
      alert('Erreur lors de la sauvegarde: ' + (result.error || 'Erreur inconnue'));
    }
  };

  const handleDelete = (email) => {
    setStudentToDelete(email);
  };

  const confirmDeleteStudent = async () => {
    if (!studentToDelete) return;
    const email = studentToDelete;
    setStudentToDelete(null);

    const result = await deleteLeaderboardUser(email);

    if (result.success) {
      await loadLeaderboard();
    } else {
      alert('Erreur lors de la suppression: ' + (result.error || 'Erreur inconnue'));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          🏆 Configuration Leaderboard
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowImport(!showImport)}
            className={`px-4 py-2 border-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${showImport
              ? 'bg-black text-white hover:bg-white hover:text-black border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none'
              : 'bg-white text-black hover:bg-black hover:text-white border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none'
              }`}
          >
            {showImport ? '← Retour à la liste' : '📥 Import en masse'}
          </button>
          {!showImport && (
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              ➕ Ajouter un étudiant
            </button>
          )}
        </div>
      </div>

      {/* Import en masse */}
      {showImport && (
        <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_black]">
          <BulkImportStudents onImportComplete={loadLeaderboard} />
        </div>
      )}

      {/* Liste des étudiants - Masquée si import actif */}
      {!showImport && (
        <>
          {/* Liste des étudiants */}
          {/* Liste des étudiants */}
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_black]">
            <h3 className="text-xl font-black uppercase tracking-tight mb-6">
              Étudiants ({leaderboard.length})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Rang</th>
                    <th className="text-left py-3 px-4 font-semibold">Prénom</th>
                    <th className="text-left py-3 px-4 font-semibold">Nom</th>
                    <th className="text-left py-3 px-4 font-semibold">Classe</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Points</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    <th className="text-right py-3 px-4 font-semibold">Opérations</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user, index) => (
                    <tr key={user.email} className="border-b border-black/10 hover:bg-black/5 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-black text-black">
                          {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${user.rank}`}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold">{user.firstName}</td>
                      <td className="py-3 px-4 font-semibold">{user.lastName}</td>
                      <td className="py-3 px-4 text-gray-600">{user.classe || '-'}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-eugenia-yellow">{user.totalPoints}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.actionsCount}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all text-xs"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(user.email)}
                            className="p-2 border-2 border-black hover:bg-red-600 hover:text-white transition-all text-xs ml-2"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Formulaire d'édition */}
          {/* Formulaire d'édition */}
          {editingUser && (
            <div className="bg-white border-2 border-black p-8 shadow-[15px_15px_0px_rgba(0,0,0,0.2)] scroll-mt-20" id="edit-form">
              <h3 className="text-xl font-black uppercase tracking-tight mb-6">
                {showAddForm ? '➕ Ajouter un étudiant' : '✏️ Modifier l\'étudiant'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">Prénom *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser.firstName}
                    onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                    placeholder="Jean"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser.lastName}
                    onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                    placeholder="Dupont"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Classe</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser.classe}
                    onChange={(e) => setEditingUser({ ...editingUser, classe: e.target.value })}
                    placeholder="B1"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    placeholder="jean.dupont@eugeniaschool.com"
                    disabled={!showAddForm}
                  />
                  {!showAddForm && (
                    <p className="text-xs text-gray-500 mt-1">L'email ne peut pas être modifié</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold mb-2">Points</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editingUser.totalPoints}
                    onChange={(e) => setEditingUser({ ...editingUser, totalPoints: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Nombre d'actions</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editingUser.actionsCount}
                    onChange={(e) => setEditingUser({ ...editingUser, actionsCount: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button onClick={handleSave} className="btn btn-success flex-1">
                  💾 Enregistrer
                </button>
                <button
                  onClick={() => {
                    setEditingUser(null);
                    setShowAddForm(false);
                  }}
                  className="btn btn-secondary flex-1"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <ConfirmModal
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onConfirm={confirmDeleteStudent}
        title="Supprimer l'étudiant"
        message="Êtes-vous sûr de vouloir supprimer cet étudiant ? Cette action est irréversible et supprimera tout son historique."
        confirmText="Supprimer"
        isDanger={true}
      />
    </div>
  );
}


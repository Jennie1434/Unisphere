import { useState, useEffect } from 'react';
import { getActionsToValidate, getAllActions, deleteAction, invalidateCache } from '../../services/googleSheets';
import { getActionTypes } from '../../services/configService';
import ActionDetailModal from './ActionDetailModal';
import { SCHOOL_EMAIL_DOMAINS } from '../../constants/routes';

export default function ValidationQueue({ school = 'eugenia' }) {
  const [pendingActions, setPendingActions] = useState([]);
  const [validatedActions, setValidatedActions] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionTypes, setActionTypes] = useState([]);
  const [deletingIds, setDeletingIds] = useState(new Set());

  useEffect(() => {
    loadData();
  }, [school]);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('📥 Loading data...');

      const emailDomain = SCHOOL_EMAIL_DOMAINS[school];

      const [actions, types, allActions] = await Promise.all([
        getActionsToValidate(school),
        getActionTypes(),
        getAllActions(school)
      ]);

      // Filtrer par école
      const filteredActions = actions.filter(a =>
        a.email && a.email.toLowerCase().includes(emailDomain)
      );
      const filteredAllActions = allActions.filter(a =>
        a.email && a.email.toLowerCase().includes(emailDomain)
      );

      console.log('📥 Loaded pending actions:', filteredActions.length);
      console.log('📥 Loaded all actions:', filteredAllActions.length);

      setPendingActions(filteredActions);
      setActionTypes(types);

      // Filtrer les actions validées ou refusées
      const validated = filteredAllActions.filter(a =>
        a.status === 'validated' || a.status === 'rejected' || a.decision === 'validated' || a.decision === 'rejected'
      );

      console.log('📥 Filtered validated actions:', validated.length);
      setValidatedActions(validated);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPendingActions = async () => {
    try {
      const emailDomain = SCHOOL_EMAIL_DOMAINS[school];
      const actions = await getActionsToValidate(school);
      // Filtrer par école
      const filteredActions = actions.filter(a =>
        a.email && a.email.toLowerCase().includes(emailDomain)
      );
      setPendingActions(filteredActions);
    } catch (error) {
      console.error('Error loading pending actions:', error);
    }
  };

  const handleActionClick = (action) => {
    setSelectedAction(action);
  };

  const handleCloseModal = () => {
    setSelectedAction(null);
    loadPendingActions();
    loadData(); // Refresh toutes les données
  };

  const handleDeleteAction = async (actionId, e) => {
    e.stopPropagation(); // Empêcher l'ouverture du modal

    if (!window.confirm('Êtes-vous sûr de vouloir supprimer définitivement cette action ? Cette action est irréversible.')) {
      return;
    }

    setDeletingIds(prev => new Set(prev).add(actionId));

    try {
      console.log('🗑️ Deleting action:', actionId);

      // Invalider le cache AVANT la suppression
      invalidateCache('actions_pending');
      invalidateCache('actions_all');
      invalidateCache('leaderboard');

      const result = await deleteAction(actionId);
      console.log('🗑️ Delete result:', result);

      // Vérifier si la suppression a réussi (vérifier aussi response.ok si data n'est pas défini)
      const success = result?.success === true || (result && !result.error);

      if (success) {
        // Invalider le cache à nouveau après la suppression
        invalidateCache('actions_pending');
        invalidateCache('actions_all');
        invalidateCache('leaderboard');

        // Attendre un peu pour que le cache soit invalidé
        await new Promise(resolve => setTimeout(resolve, 200));

        // Recharger les données sans utiliser le cache
        console.log('🔄 Reloading data after delete...');
        await loadData();
      } else {
        alert('Erreur lors de la suppression : ' + (result?.error || 'Erreur inconnue'));
      }
    } catch (error) {
      console.error('Error deleting action:', error);
      alert('Erreur lors de la suppression : ' + error.message);
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(actionId);
        return newSet;
      });
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Il y a quelques instants';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) {
      return 'Il y a quelques instants';
    } else if (diffMins < 60) {
      return `Il y a ${diffMins}min`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) {
        return `Il y a ${diffHours}h`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        return `Il y a ${diffDays}j`;
      }
    }
  };

  const getActionTypeLabel = (typeId) => {
    const type = actionTypes.find(t => t.id === typeId);
    return type ? `${type.emoji || ''} ${type.label}` : typeId;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eugenia-yellow"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Section Nouvelles Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--eugenia-burgundy)' }}>
            Nouvelles actions en attente
            {pendingActions.length > 0 && (
              <span className="badge badge-admin-danger ml-2">{pendingActions.length}</span>
            )}
          </h2>
          <button
            onClick={loadPendingActions}
            className="px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            🔄 Rafraîchir
          </button>
        </div>

        {pendingActions.length === 0 ? (
          <div className="bg-white border-2 border-black p-12 text-center shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-black text-lg font-bold uppercase tracking-wide">
              Aucune action en attente de validation !
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingActions.map((action) => {
              if (!action || !action.email) return null;
              const emailParts = action.email.split('@')[0].split('.');
              const firstName = emailParts[0] || 'User';
              const lastName = emailParts[1] || '';
              const fullName = `${firstName} ${lastName}`;

              return (
                <div
                  key={action.id}
                  className="bg-white border-2 border-black p-6 transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_black] cursor-pointer group"
                  onClick={() => handleActionClick(action)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">🔴</div>
                      <div>
                        <div className="font-bold text-xl text-gray-900">
                          {fullName}
                        </div>
                        <div className="text-gray-600 text-lg">
                          {getActionTypeLabel(action.type)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          🕐 {formatTimeAgo(action.date)}
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-green-600 transition-colors">
                      Voir détails
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section Anciennes Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--eugenia-burgundy)' }}>
            Anciennes actions (validées/refusées)
            {validatedActions.length > 0 && (
              <span className="badge badge-admin-info ml-2">{validatedActions.length}</span>
            )}
          </h2>
          <button
            onClick={loadData}
            className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            🔄 Rafraîchir
          </button>
        </div>

        {validatedActions.length === 0 ? (
          <div className="bg-white border-2 border-black p-12 text-center shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-black text-lg font-bold uppercase tracking-wide">
              Aucune action validée ou refusée pour le moment.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {validatedActions.map((action) => {
              if (!action || !action.email) return null;
              const emailParts = action.email.split('@')[0].split('.');
              const firstName = emailParts[0] || 'User';
              const lastName = emailParts[1] || '';
              const fullName = `${firstName} ${lastName}`;
              const isValidated = action.status === 'validated' || action.decision === 'validated';
              const isRejected = action.status === 'rejected' || action.decision === 'rejected';

              return (
                <div
                  key={action.id}
                  className={`bg-white border-2 border-black p-6 transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_black] ${isValidated ? 'border-l-[6px] border-l-green-500' :
                      isRejected ? 'border-l-[6px] border-l-red-500' : ''
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-4xl">
                        {isValidated ? '✅' : isRejected ? '❌' : '📋'}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-xl text-gray-900">
                          {fullName}
                        </div>
                        <div className="text-gray-600 text-lg">
                          {getActionTypeLabel(action.type)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {isValidated && action.points > 0 && (
                            <span className="text-green-600 font-semibold">+{action.points} pts</span>
                          )}
                          {isValidated && action.points === 0 && (
                            <span className="text-gray-500">0 pts</span>
                          )}
                          {isRejected && (
                            <span className="text-red-600">Refusé</span>
                          )}
                          {' • '}
                          🕐 {formatDate(action.validatedAt || action.date)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleActionClick(action)}
                        className="btn btn-admin-secondary"
                      >
                        Voir détails
                      </button>
                      <button
                        onClick={(e) => handleDeleteAction(action.id, e)}
                        disabled={deletingIds.has(action.id)}
                        className="btn btn-admin-danger"
                        title="Supprimer définitivement"
                      >
                        {deletingIds.has(action.id) ? '⏳' : '🗑️'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedAction && (
        <ActionDetailModal
          action={selectedAction}
          onClose={handleCloseModal}
          onActionComplete={handleCloseModal}
        />
      )}
    </div>
  );
}


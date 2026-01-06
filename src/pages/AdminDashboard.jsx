import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getActionsToValidate, getLeaderboard, getAllActions } from '../services/googleSheets';
import { SCHOOL_EMAIL_DOMAINS, SCHOOL_NAMES } from '../constants/routes';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, Users, Trophy, CheckCircle, XCircle, Clock, ArrowRight, Activity, Filter } from 'lucide-react';

export default function AdminDashboard({ school = 'eugenia' }) {
  const [stats, setStats] = useState({
    pendingActions: 0,
    totalActions: 0,
    totalUsers: 0,
    totalPoints: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [allActivity, setAllActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [activityFilter, setActivityFilter] = useState('all');
  const [alerts, setAlerts] = useState([]);

  const primaryColor = school === 'eugenia' ? '#671324' : '#1E40AF';
  const accentColor = school === 'eugenia' ? '#DBA12D' : '#60A5FA';

  useEffect(() => {
    loadStats();
    loadRecentActivity();
    loadAlerts();
  }, [school]);

  useEffect(() => {
    applyActivityFilter();
  }, [activityFilter, allActivity]);

  const loadStats = async () => {
    try {
      const pending = await getActionsToValidate(school);
      const leaderboard = await getLeaderboard(school);
      const actionsList = await getAllActions(school);

      const emailDomain = SCHOOL_EMAIL_DOMAINS[school];
      const filteredPending = pending.filter(action =>
        action.email && action.email.toLowerCase().includes(emailDomain)
      );
      const filteredLeaderboard = leaderboard.filter(user =>
        user.email && user.email.toLowerCase().includes(emailDomain)
      );
      const filteredActions = actionsList.filter(action =>
        action.email && action.email.toLowerCase().includes(emailDomain)
      );

      const totalPoints = filteredLeaderboard.reduce((sum, user) => sum + (user.totalPoints || 0), 0);

      setStats({
        pendingActions: filteredPending.length,
        totalActions: filteredActions.length,
        totalUsers: filteredLeaderboard.length,
        totalPoints
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadRecentActivity = async () => {
    try {
      setLoadingActivity(true);
      const allActions = await getAllActions(school);

      const emailDomain = SCHOOL_EMAIL_DOMAINS[school];
      const filteredActions = allActions.filter(action =>
        action.email && action.email.toLowerCase().includes(emailDomain)
      );

      const sorted = filteredActions.sort((a, b) => {
        const dateA = new Date(a.date || a.validatedAt || 0);
        const dateB = new Date(b.date || b.validatedAt || 0);
        return dateB - dateA;
      });

      setAllActivity(sorted);
    } catch (error) {
      console.error('Error loading activity:', error);
    } finally {
      setLoadingActivity(false);
    }
  };

  const applyActivityFilter = () => {
    let filtered = [...allActivity];

    if (activityFilter === 'manual') {
      filtered = allActivity.filter(action => action.validatedBy && action.validatedBy !== 'system');
    } else if (activityFilter === 'auto') {
      filtered = allActivity.filter(action => action.validatedBy === 'system' || action.autoValidated);
    }

    setRecentActivity(filtered.slice(0, 10));
  };

  const loadAlerts = async () => {
    try {
      const allActions = await getAllActions(school);
      const alertsList = [];
      const emailDomain = SCHOOL_EMAIL_DOMAINS[school];

      const filteredActions = allActions.filter(action =>
        action.email && action.email.toLowerCase().includes(emailDomain)
      );

      filteredActions.forEach((action, index) => {
        if (action.email && !action.email.toLowerCase().includes(emailDomain)) {
          alertsList.push({
            id: `alert-email-${index}`,
            type: 'warning',
            icon: '📧',
            title: 'Email invalide',
            message: `${action.email} n'est pas un email ${emailDomain}`,
            actionId: action.id,
            severity: 'medium'
          });
        }

        if (action.data && action.data.date) {
          const actionDate = new Date(action.data.date);
          const now = new Date();
          if (actionDate > now) {
            alertsList.push({
              id: `alert-date-future-${index}`,
              type: 'error',
              icon: '📅',
              title: 'Date future',
              message: `L'action a une date dans le futur: ${action.data.date}`,
              actionId: action.id,
              severity: 'high'
            });
          }
        }

        if (!action.data || Object.keys(action.data).length === 0) {
          alertsList.push({
            id: `alert-no-data-${index}`,
            type: 'warning',
            icon: '⚠️',
            title: 'Données manquantes',
            message: `L'action ${action.type} n'a pas de données`,
            actionId: action.id,
            severity: 'medium'
          });
        }
      });

      const actionsByEmailAndType = {};
      filteredActions.forEach(action => {
        const key = `${action.email}-${action.type}`;
        if (!actionsByEmailAndType[key]) {
          actionsByEmailAndType[key] = [];
        }
        actionsByEmailAndType[key].push(action);
      });

      Object.entries(actionsByEmailAndType).forEach(([key, actions]) => {
        if (actions.length > 3) {
          alertsList.push({
            id: `alert-duplicate-${key}`,
            type: 'warning',
            icon: '🔁',
            title: 'Nombre d\'actions suspect',
            message: `${actions[0].email} a ${actions.length} actions de type ${actions[0].type}`,
            actionId: actions[0].id,
            severity: 'medium'
          });
        }
      });

      setAlerts(alertsList);
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'À l\'instant';

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min`;
    if (diffHours < 24) return `${diffHours} h`;
    return `${diffDays} j`;
  };

  const getActionTypeLabel = (type) => {
    const labels = {
      'linkedin-post': 'Post LinkedIn',
      'jpo-participation': 'Participation JPO',
      'temoignage-etudiant': 'Témoignage',
      'parrainage-elite': 'Parrainage',
      'competition-hackathon': 'Hackathon',
      'edito-blog': 'Article Blog'
    };
    return labels[type] || type || 'Action';
  };

  const statsCards = [
    {
      title: 'Actions en attente',
      value: stats.pendingActions,
      icon: AlertCircle,
      color: stats.pendingActions > 0 ? 'text-red-600' : 'text-green-600',
      bgColor: stats.pendingActions > 0 ? 'bg-red-50' : 'bg-green-50',
      link: '/admin/validate',
      badge: stats.pendingActions > 0 ? 'Action Requise' : 'À jour'
    },
    {
      title: 'Total actions',
      value: stats.totalActions,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: null
    },
    {
      title: 'Participants',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: null
    },
    {
      title: 'Points distribués',
      value: stats.totalPoints,
      icon: Trophy,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      link: null
    }
  ];

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-serif mb-2">
            Dashboard
          </h1>
          <p className="text-gray-500 font-medium">
            Vue d'ensemble de l'activité {SCHOOL_NAMES[school]}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wide text-gray-600">
            Système synchronisé
          </span>
        </div>
      </motion.div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          const CardWrapper = card.link ? Link : 'div';
          const cardProps = card.link ? { to: card.link } : {};

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CardWrapper
                {...cardProps}
                className="block h-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${card.bgColor} ${card.color} transition-transform group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {card.badge && (
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${card.color === 'text-red-600' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                      {card.badge}
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {card.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    {card.title}
                  </div>
                </div>
              </CardWrapper>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ACTIVITY FEED */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-bold text-gray-900">Activité Récente</h2>
            </div>
            <div className="flex gap-2">
              {['all', 'manual', 'auto'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActivityFilter(filter)}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-colors ${activityFilter === filter
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                >
                  {filter === 'all' ? 'Tout' : filter === 'manual' ? 'Manuel' : 'Auto'}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {loadingActivity ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Chargement...</span>
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-sm font-medium">
                Aucune activité récente
              </div>
            ) : (
              recentActivity.map((action) => (
                <div
                  key={action.id}
                  className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4 group"
                >
                  <div className="shrink-0">
                    {action.status === 'validated' ? (
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    ) : action.status === 'rejected' ? (
                      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-red-600" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-yellow-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-gray-900 text-sm truncate">
                        {getActionTypeLabel(action.type)}
                      </span>
                      {action.status === 'validated' && (
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${action.validatedBy === 'system' || action.autoValidated
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-purple-50 text-purple-600'
                          }`}>
                          {action.validatedBy === 'system' || action.autoValidated ? 'Auto' : 'Manuel'}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {action.email || 'Email inconnu'}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                      {formatTimeAgo(action.date || action.validatedAt)}
                    </div>
                    {action.status === 'validated' && action.points > 0 && (
                      <div className="text-sm font-bold text-green-600">
                        +{action.points} pts
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <Link
              to={`/admin/actions`}
              className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500 hover:text-black transition-colors"
            >
              Voir tout l'historique
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>

        {/* ALERTS SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-fit"
        >
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-gray-900">
              Alertes <span className="text-gray-400 font-normal text-sm ml-1">({alerts.length})</span>
            </h2>
          </div>

          <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                Aucune alerte détectée ✨
              </div>
            ) : (
              alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border ${alert.severity === 'high'
                      ? 'bg-red-50 border-red-100'
                      : 'bg-amber-50 border-amber-100'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-xl">{alert.icon}</div>
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-wide mb-1 ${alert.severity === 'high' ? 'text-red-800' : 'text-amber-800'
                        }`}>
                        {alert.title}
                      </div>
                      <div className={`text-xs ${alert.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                        }`}>
                        {alert.message}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

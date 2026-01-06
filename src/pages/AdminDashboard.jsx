import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getActionsToValidate, getLeaderboard, getAllActions } from '../services/googleSheets';
import { SCHOOL_EMAIL_DOMAINS, SCHOOL_NAMES } from '../constants/routes';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, Users, Trophy, CheckCircle, XCircle, Clock } from 'lucide-react';

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

  const primaryColor = school === 'eugenia' ? '#671324' : '#3461FF';
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
    if (!dateString) return 'Il y a quelques instants';

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    return `Il y a ${diffDays}j`;
  };

  const getActionTypeLabel = (type) => {
    const labels = {
      'linkedin-post': '📱 Post LinkedIn',
      'jpo-participation': '🎓 JPO',
      'temoignage-etudiant': '💬 Témoignage',
      'parrainage-elite': '🤝 Parrainage',
      'competition-hackathon': '🏆 Hackathon',
      'edito-blog': '✍️ Blog'
    };
    return labels[type] || type || '📋 Action';
  };

  const statsCards = [
    {
      title: 'Actions en attente',
      value: stats.pendingActions,
      icon: AlertCircle,
      color: stats.pendingActions > 0 ? '#EF4444' : '#10B981',
      link: '/admin/validate',
      badge: stats.pendingActions > 0 ? 'ACTION REQUISE' : 'À JOUR'
    },
    {
      title: 'Total actions',
      value: stats.totalActions,
      icon: TrendingUp,
      color: primaryColor,
      link: null
    },
    {
      title: 'Participants',
      value: stats.totalUsers,
      icon: Users,
      color: '#10B981',
      link: null
    },
    {
      title: 'Points distribués',
      value: stats.totalPoints,
      icon: Trophy,
      color: accentColor,
      link: null
    }
  ];

  return (
    <div className="space-y-12">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[3px] w-16 bg-black" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">
            ADMIN CONTROL PANEL
          </span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
          Dashboard <span className="italic" style={{ color: primaryColor }}>Admin.</span>
        </h1>
        <p className="text-sm font-bold text-black/40 uppercase tracking-wide">
          {SCHOOL_NAMES[school]} — Vue d'ensemble du système
        </p>
      </motion.div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          const CardWrapper = card.link ? Link : 'div';
          const cardProps = card.link ? { to: card.link } : {};

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CardWrapper
                {...cardProps}
                className="group bg-white border-2 border-black p-8 hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[15px_15px_0px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {card.badge && (
                    <span
                      className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-none"
                      style={{
                        backgroundColor: card.color === '#EF4444' ? '#FEE2E2' : '#D1FAE5',
                        color: card.color
                      }}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>
                <div className="text-5xl font-black mb-3" style={{ color: card.color }}>
                  {card.value}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-black/40">
                  {card.title}
                </div>
              </CardWrapper>
            </motion.div>
          );
        })}
      </div>

      {/* ALERTS */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border-2 border-black p-10"
        >
          <div className="flex items-center gap-4 mb-8">
            <AlertCircle className="w-8 h-8" style={{ color: primaryColor }} />
            <h2 className="text-3xl font-black" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              Alertes & Anomalies <span style={{ color: accentColor }}>({alerts.length})</span>
            </h2>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-4" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: `${accentColor} #f3f4f6`
          }}>
            {alerts.map(alert => (
              <div
                key={alert.id}
                className={`p-5 border-2 ${alert.severity === 'high' ? 'bg-red-50 border-red-300' : 'bg-yellow-50 border-yellow-300'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{alert.icon}</div>
                  <div className="flex-1">
                    <div className="font-black text-black text-sm uppercase tracking-wide mb-1">{alert.title}</div>
                    <div className="text-xs text-black/60 font-medium">{alert.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ACTIVITY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border-2 border-black p-10"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
            Activité <span className="italic" style={{ color: primaryColor }}>récente.</span>
          </h2>
          <div className="flex gap-3">
            {['all', 'manual', 'auto'].map(filter => (
              <button
                key={filter}
                onClick={() => setActivityFilter(filter)}
                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all border-2 border-black ${activityFilter === filter
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-black/5'
                  }`}
              >
                {filter === 'all' ? 'TOUTES' : filter === 'manual' ? 'MANUELLES' : 'AUTO'}
              </button>
            ))}
          </div>
        </div>

        {loadingActivity ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-6" style={{ borderTopColor: accentColor }} />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black/30">CHARGEMENT...</span>
          </div>
        ) : recentActivity.length === 0 ? (
          <div className="text-center py-20 text-black/30 text-sm font-bold uppercase">
            Aucune activité récente
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((action) => (
              <div
                key={action.id}
                className="flex items-center justify-between p-5 bg-black/[0.02] border border-black/10 hover:border-black/30 transition-all group"
              >
                <div className="flex items-center gap-5 flex-1">
                  <div className="text-3xl">
                    {action.status === 'validated' ? <CheckCircle className="w-6 h-6 text-green-600" /> :
                      action.status === 'rejected' ? <XCircle className="w-6 h-6 text-red-600" /> :
                        <Clock className="w-6 h-6 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-black text-black text-sm">
                        {getActionTypeLabel(action.type)}
                      </span>
                      {action.status === 'validated' && (
                        <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-wide ${action.validatedBy === 'system' || action.autoValidated
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                          }`}>
                          {action.validatedBy === 'system' || action.autoValidated ? '🤖 AUTO' : '👤 MANUEL'}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-black/40 font-medium uppercase tracking-wide">
                      {action.email || 'Email inconnu'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-black/30 font-black uppercase tracking-widest mb-1">
                    {formatTimeAgo(action.date || action.validatedAt)}
                  </div>
                  {action.status === 'validated' && action.points > 0 && (
                    <div className="text-sm font-black" style={{ color: accentColor }}>
                      +{action.points} PTS
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

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
    if (!dateString) return 'Il y a un instant';

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
      'jpo-participation': '🎓 Participation JPO',
      'temoignage-etudiant': '💬 Témoignage',
      'parrainage-elite': '🤝 Parrainage',
      'competition-hackathon': '🏆 Hackathon',
      'edito-blog': '✍️ Article Blog'
    };
    return labels[type] || type || '📋 Action';
  };

  const statsCards = [
    {
      title: 'Actions en attente',
      value: stats.pendingActions,
      icon: AlertCircle,
      color: stats.pendingActions > 0 ? '#EF4444' : '#10B981',
      link: school === 'eugenia' ? '/eugenia-school/admin/validate' : '/albert-school/admin/validate',
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
      color: '#8B5CF6',
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
    <div className="space-y-16">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[2px] w-12 bg-black" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">
            ADMIN CONTROL PANEL
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              Dashboard <span className="italic" style={{ color: primaryColor }}>Admin.</span>
            </h1>
            <p className="text-sm font-bold text-black/40 uppercase tracking-[0.2em]">
              {SCHOOL_NAMES[school]} — Vue d'ensemble du système
            </p>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 border-2 border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.05)]">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Système Synchronisé</span>
          </div>
        </div>
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
              className="h-full"
            >
              <CardWrapper
                {...cardProps}
                className="group flex flex-col h-full bg-white border-2 border-black p-8 relative overflow-hidden hover:translate-x-[-8px] hover:translate-y-[-8px] hover:shadow-[15px_15px_0px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {card.badge && (
                    <span
                      className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 border border-black/10 shrink-0"
                      style={{
                        backgroundColor: card.color === '#EF4444' ? '#FEE2E2' : '#D1FAE5',
                        color: card.color
                      }}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>
                <div className="mt-auto relative z-10">
                  <div className="text-6xl font-black mb-2 tracking-tighter" style={{ color: card.color }}>
                    {card.value}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 truncate">
                    {card.title}
                  </div>
                </div>
                {/* Decorative background element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-black/[0.02] rounded-full -z-0 group-hover:scale-150 transition-transform duration-700" />
              </CardWrapper>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* ACTIVITY */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white border-2 border-black p-10 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6" style={{ color: primaryColor }} />
              <h2 className="text-3xl font-black" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                Activité <span className="italic" style={{ color: primaryColor }}>récente.</span>
              </h2>
            </div>
            <div className="flex gap-2">
              {['all', 'manual', 'auto'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActivityFilter(filter)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all border-2 border-black shadow-[4px_4px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${activityFilter === filter
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-black/5'
                    }`}
                >
                  {filter === 'all' ? 'TOUTES' : filter === 'manual' ? 'MANUELLES' : 'AUTO'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {loadingActivity ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-6" style={{ borderTopColor: accentColor }} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Chargement des données...</span>
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-black/10 text-black/30 text-xs font-black uppercase tracking-[0.2em]">
                Aucune activité trouvée
              </div>
            ) : (
              recentActivity.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between p-6 bg-white border-2 border-black hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_black] transition-all group cursor-default"
                >
                  <div className="flex items-center gap-6 flex-1 min-w-0">
                    <div className="shrink-0">
                      {action.status === 'validated' ? <CheckCircle className="w-6 h-6 text-green-600" /> :
                        action.status === 'rejected' ? <XCircle className="w-6 h-6 text-red-600" /> :
                          <Clock className="w-6 h-6 text-amber-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 overflow-hidden">
                        <span className="font-black text-black text-sm uppercase tracking-wide truncate">
                          {getActionTypeLabel(action.type)}
                        </span>
                        {action.status === 'validated' && (
                          <span className={`text-[8px] px-2 py-0.5 font-black uppercase tracking-widest shrink-0 ${action.validatedBy === 'system' || action.autoValidated
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                            }`}>
                            {action.validatedBy === 'system' || action.autoValidated ? '🤖 AUTO' : '👤 MANUEL'}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-black/40 font-bold uppercase tracking-widest truncate">
                        {action.email || 'Email non renseigné'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-4">
                    <div className="text-[9px] text-black/30 font-black uppercase tracking-widest mb-1">
                      {formatTimeAgo(action.date || action.validatedAt)}
                    </div>
                    {action.status === 'validated' && action.points > 0 && (
                      <div className="text-base font-black" style={{ color: accentColor }}>
                        +{action.points} PTS
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-10 pt-10 border-t-2 border-black/5 flex justify-center">
            <Link to={school === 'eugenia' ? '/eugenia-school/admin/validate' : '/albert-school/admin/validate'} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-black transition-colors group">
              Voir tout l'historique d'activité <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* ALERTS */}
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-black p-10 h-fit"
          >
            <div className="flex items-center gap-3 mb-10">
              <AlertCircle className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-black" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                Alertes <span className="text-black/20 italic">({alerts.length})</span>
              </h2>
            </div>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-5 border-2 ${alert.severity === 'high' ? 'bg-red-50 border-red-300' : 'bg-amber-50 border-amber-300'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl shrink-0">{alert.icon}</div>
                    <div>
                      <div className="font-black text-black text-[10px] uppercase tracking-widest mb-1">{alert.title}</div>
                      <div className="text-[11px] text-black/70 font-medium leading-relaxed">{alert.message}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

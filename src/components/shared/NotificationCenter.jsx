import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

import { Bell, Check, Trash2, X } from 'lucide-react';

export default function NotificationCenter({ studentEmail, school }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const schoolColor = school === 'eugenia' ? '#671324' : '#1E40AF';

  useEffect(() => {
    if (studentEmail) {
      loadNotifications();
      const interval = setInterval(loadNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [studentEmail]);

  const loadNotifications = async () => {
    try {
      const stored = localStorage.getItem(`notifications_${studentEmail}`);
      if (stored) {
        const notifs = JSON.parse(stored);
        setNotifications(notifs);
        setUnreadCount(notifs.filter(n => !n.read).length);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const markAsRead = (notificationId) => {
    const updated = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem(`notifications_${studentEmail}`, JSON.stringify(updated));
    setUnreadCount(updated.filter(n => !n.read).length);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem(`notifications_${studentEmail}`, JSON.stringify(updated));
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId) => {
    const updated = notifications.filter(n => n.id !== notificationId);
    setNotifications(updated);
    localStorage.setItem(`notifications_${studentEmail}`, JSON.stringify(updated));
    setUnreadCount(updated.filter(n => !n.read).length);
  };

  if (!studentEmail) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative p-2 rounded-full transition-all duration-300
          ${isOpen ? 'text-white' : 'text-black/40 hover:text-black hover:bg-black/5'}
        `}
        style={{ backgroundColor: isOpen ? schoolColor : 'transparent' }}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 stroke-[1.5px]" />
        {unreadCount > 0 && (
          <span
            className="absolute top-1 right-1 w-4 h-4 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#F7F7F5] shadow-sm"
            style={{ backgroundColor: schoolColor }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-3 w-[400px] bg-white rounded-[32px] shadow-2xl shadow-black/10 border border-black/5 z-[110] overflow-hidden flex flex-col max-h-[600px] animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="p-6 border-b border-black/5 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-black text-xs uppercase tracking-widest text-black/30">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-opacity"
                >
                  Tout marquer lu
                </button>
              )}
            </div>

            <div className="overflow-y-auto flex-1 custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-16 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-black/5" />
                  </div>
                  <p className="text-xs font-bold text-black/20 uppercase tracking-widest">Silence radio</p>
                </div>
              ) : (
                <div className="divide-y divide-black/5">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-6 hover:bg-black/[0.02] transition-colors relative group`}
                      style={{
                        backgroundColor: !notif.read && schoolColor ? `rgba(${parseInt(schoolColor.slice(1, 3), 16)}, ${parseInt(schoolColor.slice(3, 5), 16)}, ${parseInt(schoolColor.slice(5, 7), 16)}, 0.05)` : 'transparent'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-2xl mt-0.5">{notif.emoji || '✨'}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-black text-sm truncate pr-8">
                            {notif.title}
                          </h4>
                          <p className="text-xs text-black/50 mt-1 leading-relaxed">
                            {notif.message}
                          </p>
                          <p className="text-[10px] font-bold text-black/20 uppercase tracking-tight mt-3">
                            {new Date(notif.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>

                        <div className="absolute top-6 right-6 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notif.read && (
                            <button
                              onClick={() => markAsRead(notif.id)}
                              className="p-1.5 text-black/20 hover:opacity-100 transition-colors"
                              style={{ color: !notif.read ? schoolColor : '' }}
                              title="Marquer comme lu"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            className="p-1.5 text-black/20 hover:text-red-500 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="p-4 bg-gray-50/50 border-t border-black/5 text-center">
                <button className="text-[10px] font-black uppercase tracking-widest text-black/30 hover:text-black transition-colors">
                  Voir tout l'historique
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Helper function pour créer une notification
 */
export function createNotification(studentEmail, title, message, emoji = '🔔', type = 'info') {
  const notification = {
    id: Date.now().toString(),
    title,
    message,
    emoji,
    type,
    read: false,
    createdAt: new Date().toISOString()
  };

  const stored = localStorage.getItem(`notifications_${studentEmail}`);
  const notifications = stored ? JSON.parse(stored) : [];
  notifications.unshift(notification);

  // Garder seulement les 50 dernières
  const limited = notifications.slice(0, 50);
  localStorage.setItem(`notifications_${studentEmail}`, JSON.stringify(limited));

  // Afficher une notification browser si permission accordée
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body: message,
      icon: '/logo.png',
      badge: '/logo.png'
    });
  }

  return notification;
}








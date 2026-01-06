import { ChevronRight } from 'lucide-react';

export default function EventsListWeek({ events = [], school = 'eugenia' }) {
    const isEugenia = school === 'eugenia';
    const hoverBgClass = isEugenia ? 'hover:bg-eugenia-yellow/10' : 'hover:bg-blue-50';
    const groupHoverTextClass = isEugenia ? 'group-hover:text-eugenia-burgundy' : 'group-hover:text-blue-700';
    const iconHoverClass = isEugenia ? 'group-hover:text-eugenia-burgundy' : 'group-hover:text-blue-500';
    // Get current dates for this week
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleDateString('fr-FR', { month: 'short' });
        return `${day} ${month}`;
    };

    const getDayName = (date) => {
        const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        return days[date.getDay()];
    };

    const days = [
        { name: 'Aujourd\'hui', date: formatDate(today), events: events.slice(0, 2) },
        { name: 'Demain', date: formatDate(tomorrow), events: events.slice(2, 3) },
        { name: getDayName(dayAfterTomorrow), date: formatDate(dayAfterTomorrow), events: [] },
    ];

    const schoolPath = isEugenia ? '/eugenia-school' : '/albert-school';

    return (
        <div className="bg-white rounded-none shadow-[8px_8px_0px_black] border-2 border-black p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black uppercase tracking-tight" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>🗓️ AGENDA.</h3>
                <a
                    href={`${schoolPath}/associations/agenda`}
                    className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                >
                    Voir tout
                </a>
            </div>

            <div className="space-y-6">
                {days.map((day, i) => (
                    <div key={i} className="relative">
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="text-sm font-bold text-black">{day.name}</span>
                            <span className="text-xs font-medium text-black/40">{day.date}</span>
                        </div>

                        {day.events.length > 0 ? (
                            <div className="space-y-3 pl-4 border-l-2 border-dashed border-gray-100">
                                {day.events.map((evt, j) => (
                                    <div key={j} className={`group flex items-center justify-between p-3 rounded-xl bg-gray-50 transition-colors cursor-pointer ${hoverBgClass}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="text-xl">{evt.associationEmoji || '📅'}</div>
                                            <div>
                                                <div className={`text-sm font-bold text-black transition-colors ${groupHoverTextClass}`}>{evt.title}</div>
                                                <div className="text-xs text-black/50">{evt.time || '18:00'} • {evt.location || 'Campus'}</div>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 text-black/20 transition-colors ${iconHoverClass}`} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="pl-4 text-xs text-black/30 italic">Aucun événement prévu.</div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}

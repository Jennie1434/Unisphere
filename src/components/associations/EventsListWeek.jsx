import { ChevronRight } from 'lucide-react';

export default function EventsListWeek({ events = [], school = 'eugenia' }) {
    const isEugenia = school === 'eugenia';
    const hoverBgClass = isEugenia ? 'hover:bg-eugenia-yellow/10' : 'hover:bg-blue-50';
    const groupHoverTextClass = isEugenia ? 'group-hover:text-eugenia-burgundy' : 'group-hover:text-blue-700';
    const iconHoverClass = isEugenia ? 'group-hover:text-eugenia-burgundy' : 'group-hover:text-blue-500';
    // Mock grouping for demo if events not grouped
    const days = [
        { name: 'Aujourd\'hui', date: '5 Oct', events: events.slice(0, 2) },
        { name: 'Demain', date: '6 Oct', events: events.slice(2, 3) },
        { name: 'Vendredi', date: '7 Oct', events: [] },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold font-serif">Cette semaine</h3>
                <button className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">
                    Voir tout
                </button>
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

            <button className="w-full mt-6 py-3 rounded-xl border-2 border-dashed border-black/5 text-xs font-bold text-black/40 hover:border-black/20 hover:text-black transition-all">
                + Ajouter un événement
            </button>
        </div>
    );
}

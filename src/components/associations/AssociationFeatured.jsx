import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Users, ArrowRight } from 'lucide-react';

export default function AssociationFeatured({ school = 'eugenia' }) {
    const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';

    // Theme colors based on school
    const accentColor = school === 'eugenia' ? '#DBA12D' : '#3461FF';
    const isEugenia = school === 'eugenia';

    const cards = [
        {
            id: 1,
            type: 'recruiting',
            label: 'Recrute maintenant',
            icon: Users,
            title: 'Junior Entreprise',
            desc: 'Rejoins le pôle commercial et lance ta carrière.',
            action: 'Postuler',
            link: `${schoolPath}/associations/1`,
            bg: 'bg-black',
            text: 'text-white'
        },
        {
            id: 2,
            type: 'event',
            label: 'Événement cette semaine',
            icon: Calendar,
            title: 'Hackathon IA',
            desc: '24h pour créer une solution innovante. Inscriptions ouvertes !',
            action: 'Voir l\'agenda',
            link: `${schoolPath}/associations/agenda`,
            bg: 'bg-white',
            text: 'text-black'
        },
        {
            id: 3,
            type: 'new',
            label: 'Nouvelle Association',
            icon: Sparkles,
            title: 'Eugenia Green',
            desc: 'Le club développement durable débarque sur le campus.',
            action: 'Découvrir',
            link: `${schoolPath}/associations/2`,
            bg: 'bg-gray-50',
            text: 'text-black'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <Link
                        key={card.id}
                        to={card.link}
                        className={`relative overflow-hidden rounded-[24px] p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group border border-black/5 ${card.bg}`}
                    >
                        {/* Glow effect for dark cards */}
                        {card.text === 'text-white' && (
                            <div
                                className="absolute top-0 right-0 w-32 h-32 blur-[50px] rounded-full pointer-events-none opacity-20"
                                style={{ backgroundColor: accentColor }}
                            />
                        )}

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span
                                        className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full flex items-center gap-1"
                                        style={card.text === 'text-white' ? {
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                            color: 'white'
                                        } : {
                                            backgroundColor: school === 'eugenia' ? 'rgba(219,161,45,0.1)' : 'rgba(52,97,255,0.1)',
                                            color: accentColor
                                        }}>
                                        {card.type === 'recruiting' && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />}
                                        {card.label}
                                    </span>
                                </div>

                                <h3 className={`text-2xl font-bold mb-2 ${card.text}`}>{card.title}</h3>
                                <p className={`text-sm opacity-80 mb-6 leading-relaxed ${card.text}`}>{card.desc}</p>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                                <span style={{ color: card.text === 'text-white' ? accentColor : 'black' }}>
                                    {card.action}
                                </span>
                                <ArrowRight className="w-4 h-4" style={{ color: card.text === 'text-white' ? accentColor : 'black' }} />
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

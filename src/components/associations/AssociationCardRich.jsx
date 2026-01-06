import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export default function AssociationCardRich({ association, school = 'eugenia' }) {
    const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';

    // Strict Green Theme
    const accentColor = '#10B981';
    const textHoverClass = 'group-hover:text-black';

    // Buttons
    const btnClass = 'bg-black text-white hover:bg-gray-800';
    const textPrimaryClass = 'text-black';
    const borderPrimaryClass = 'border-black/10 hover:bg-black/5';
    const tagClass = 'bg-black/[0.03] text-black/50';

    const isRecruiting = association.isRecruiting || true;
    const nextEvent = association.nextEvent || { title: 'Afterwork de rentrée', date: 'Jeu. 14 Oct' };

    return (
        <div className="group bg-white rounded-[24px] border border-black/5 overflow-hidden hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">

            {/* Recruiting Badge */}
            {isRecruiting && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm shadow-sm rounded-full flex items-center gap-1.5 border border-black/5">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#10B981]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#10B981]">Recrute</span>
                </div>
            )}

            {/* Cover / Logo Area */}
            <div className="h-24 bg-gradient-to-br from-gray-50 to-gray-100 relative">
                <div className="absolute -bottom-6 left-6 w-16 h-16 rounded-[20px] bg-white shadow-lg flex items-center justify-center text-3xl border border-black/5 transform group-hover:scale-110 transition-transform duration-300">
                    {association.emoji || '🤝'}
                </div>
            </div>

            <div className="p-6 pt-10 flex-1 flex flex-col">
                {/* Header */}
                <div className="mb-4">
                    <h3 className={`text-xl font-bold mb-1 transition-colors ${textHoverClass} text-black`}>
                        {association.name}
                    </h3>
                    <p className="text-sm text-black/60 line-clamp-2 min-h-[40px]">
                        {association.description || "Une association dynamique pour les étudiants passionnés."}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {association.category && (
                        <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${tagClass}`}>
                            {association.category}
                        </span>
                    )}
                    {/* Mock Tags */}
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${tagClass}`}>
                        Actif
                    </span>
                </div>

                {/* Next Event Mini-Block */}
                <div className="mt-auto mb-6 p-3 rounded-xl bg-gray-50 border border-black/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex flex-col items-center justify-center text-center border border-black/5">
                        <span className="text-[8px] font-black uppercase text-black/40 leading-none">OCT</span>
                        <span className="text-sm font-bold text-black leading-none">14</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold uppercase text-black/40 mb-0.5">Prochain événement</div>
                        <div className="text-xs font-bold text-black truncate">{nextEvent.title}</div>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <Link
                        to={`${schoolPath}/associations/${association.id}`}
                        className={`py-2.5 rounded-xl border text-xs font-bold text-center transition-colors ${borderPrimaryClass} ${textPrimaryClass}`}
                    >
                        Voir
                    </Link>
                    <button className={`py-2.5 rounded-xl text-xs font-bold transition-colors shadow-lg shadow-black/10 ${btnClass}`}>
                        Rejoindre
                    </button>
                </div>
            </div>
        </div>
    );
}

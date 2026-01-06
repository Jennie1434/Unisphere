import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export default function AssociationCardRich({ association, school = 'eugenia' }) {
    const navigate = useNavigate();
    const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';

    // Theme colors based on school
    const accentColor = school === 'eugenia' ? '#DBA12D' : '#3461FF';

    const isRecruiting = association.isRecruiting || true;
    const nextEvent = association.nextEvent || { title: 'Afterwork de rentrée', date: 'Jeu. 14 Oct' };

    return (
        <div className="group bg-white rounded-none border-2 border-black overflow-hidden hover:shadow-[12px_12px_0px_#DBA12D] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">

            {/* Recruiting Badge */}
            {isRecruiting && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-white border-2 border-black flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>Recrute</span>
                </div>
            )}

            {/* Cover / Logo Area */}
            <div className="h-24 bg-black relative">
                <div className="absolute -bottom-6 left-6 w-16 h-16 rounded-none bg-white shadow-[4px_4px_0px_black] flex items-center justify-center text-3xl border-2 border-black transform group-hover:scale-110 transition-transform duration-300">
                    {association.emoji || '🤝'}
                </div>
            </div>

            <div className="p-6 pt-10 flex-1 flex flex-col">
                {/* Header */}
                <div className="mb-4">
                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight text-black">
                        {association.name}
                    </h3>
                    <p className="text-sm text-black/60 line-clamp-2 min-h-[40px] font-medium">
                        {association.description || "Une association dynamique pour les étudiants passionnés."}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {association.category && (
                        <span className="px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded-none bg-black text-white border border-black">
                            {association.category}
                        </span>
                    )}
                    <span className="px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded-none bg-white text-black border border-black">
                        Actif
                    </span>
                </div>

                {/* Next Event Mini-Block */}
                <div className="mt-auto mb-6 p-3 rounded-none bg-white border-2 border-black flex items-center gap-3">
                    <div className="w-10 h-10 rounded-none bg-black text-white shadow-sm flex flex-col items-center justify-center text-center border-2 border-black">
                        <span className="text-[8px] font-black uppercase text-white/60 leading-none">OCT</span>
                        <span className="text-sm font-black text-white leading-none">14</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-black uppercase text-black/40 mb-0.5">Prochain événement</div>
                        <div className="text-xs font-black text-black truncate uppercase">{nextEvent.title}</div>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <Link
                        to={`${schoolPath}/associations/${association.id}`}
                        className="py-3 rounded-none border-2 border-black text-xs font-black text-center transition-colors hover:bg-black hover:text-white uppercase tracking-widest"
                    >
                        Voir
                    </Link>
                    <button
                        onClick={() => navigate(`${schoolPath}/associations/${association.id}`)}
                        className="py-3 rounded-none text-xs font-black transition-colors shadow-[4px_4px_0px_black] bg-black text-white hover:bg-[#DBA12D] hover:text-black uppercase tracking-widest"
                    >
                        Rejoindre
                    </button>
                </div>
            </div>
        </div>
    );
}

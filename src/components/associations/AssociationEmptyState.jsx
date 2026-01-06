import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';

export default function AssociationEmptyState({ school = 'eugenia', searchQuery, onShowQuiz }) {
    const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';

    // Theme colors based on school
    const accentColor = school === 'eugenia' ? '#DBA12D' : '#3461FF';
    const accentColorRgb = school === 'eugenia' ? '219,161,45' : '52,97,255';
    const textPrimaryClass = 'text-black';

    return (
        <div className="bg-white rounded-[32px] p-12 text-center shadow-sm border border-black/5 max-w-2xl mx-auto my-12">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 relative">
                <Search className="w-8 h-8 text-black/20" />
                <div
                    className="absolute top-0 right-0 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs animate-bounce"
                    style={{ backgroundColor: accentColor }}>
                    ?
                </div>
            </div>

            <h3 className="text-2xl font-bold font-serif mb-3 text-black">
                Aucune association trouvée
            </h3>

            <p className="text-black/60 mb-8 max-w-md mx-auto">
                {searchQuery
                    ? `Aucun résultat pour "${searchQuery}". Essayez d'autres mots-clés ou parcourez les catégories.`
                    : "Il n'y a pas encore d'association correspondant à ces critères."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <button
                    onClick={onShowQuiz}
                    className="p-4 rounded-xl border transition-colors text-left group"
                    style={{
                        backgroundColor: `rgba(${accentColorRgb}, 0.05)`,
                        borderColor: `rgba(${accentColorRgb}, 0.1)`
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `rgba(${accentColorRgb}, 0.1)`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `rgba(${accentColorRgb}, 0.05)`}
                >
                    <span className="block text-xs font-black uppercase mb-1 group-hover:tracking-wider transition-all" style={{ color: accentColor }}>Je suis perdu</span>
                    <span className={`block font-bold ${textPrimaryClass}`}>Trouver mon asso idéale &rarr;</span>
                </button>

                <Link
                    to={`${schoolPath}/associations/create`}
                    className="p-4 rounded-xl bg-gray-50 border border-black/5 transition-colors text-left group hover:bg-black hover:text-white"
                >
                    <span className="block text-xs font-black uppercase text-black/40 group-hover:text-white/60 mb-1">J'ai une idée</span>
                    <span className={`block font-bold group-hover:text-white ${textPrimaryClass}`}>Créer une association &rarr;</span>
                </Link>
            </div>

        </div>
    );
}

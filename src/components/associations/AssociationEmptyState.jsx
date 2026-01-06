import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';

export default function AssociationEmptyState({ school = 'eugenia', searchQuery, onShowQuiz }) {
    const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';

    // Theme colors based on school
    const accentColor = school === 'eugenia' ? '#DBA12D' : '#3461FF';

    return (
        <div className="bg-white rounded-none p-12 text-center shadow-[12px_12px_0px_black] border-4 border-black max-w-2xl mx-auto my-12">
            <div className="w-20 h-20 rounded-none bg-black flex items-center justify-center mx-auto mb-6 relative border-2 border-black">
                <Search className="w-8 h-8 text-white" />
                <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-black font-black text-xs animate-bounce border-2 border-black"
                    style={{ backgroundColor: accentColor }}>
                    ?
                </div>
            </div>

            <h3 className="text-3xl font-black uppercase mb-3 text-black tracking-tight" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                Aucune association trouvée
            </h3>

            <p className="text-black/60 mb-8 max-w-md mx-auto font-medium">
                {searchQuery
                    ? `Aucun résultat pour "${searchQuery}". Essayez d'autres mots-clés ou parcourez les catégories.`
                    : "Il n'y a pas encore d'association correspondant à ces critères."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <button
                    onClick={onShowQuiz}
                    className="p-4 rounded-none border-2 border-black transition-all text-left group hover:shadow-[6px_6px_0px_black] hover:-translate-y-1"
                    style={{ backgroundColor: accentColor }}
                >
                    <span className="block text-xs font-black uppercase mb-1 text-black/60">Je suis perdu</span>
                    <span className="block font-black text-black uppercase text-sm tracking-tight">Trouver mon asso idéale &rarr;</span>
                </button>

                <Link
                    to={`${schoolPath}/associations/create`}
                    className="p-4 rounded-none bg-white border-2 border-black transition-all text-left group hover:bg-black hover:text-white hover:shadow-[6px_6px_0px_black] hover:-translate-y-1"
                >
                    <span className="block text-xs font-black uppercase text-black/40 group-hover:text-white/60 mb-1">J'ai une idée</span>
                    <span className="block font-black group-hover:text-white text-black uppercase text-sm tracking-tight">Créer une association &rarr;</span>
                </Link>
            </div>

        </div>
    );
}

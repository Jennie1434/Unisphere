import { useState } from 'react';
import PortfolioLayout from '../../components/portfolio/PortfolioLayout';
import { Upload, Link as LinkIcon, Plus, X } from 'lucide-react';

export default function SubmitProjectPage() {
    const school = 'eugenia';
    const schoolColor = '#671324';

    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && currentTag && tags.length < 5) {
            e.preventDefault();
            setTags([...tags, currentTag]);
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <PortfolioLayout
            school={school}
            showBack={true}
            title="Publier un projet"
            subtitle="Partage tes créations avec la communauté en quelques minutes."
        >
            <div className="max-w-2xl mx-auto bg-white rounded-[32px] p-8 md:p-12 shadow-2xl shadow-black/[0.03] border border-black/5">
                <form className="space-y-8">

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-black/40">Titre du projet</label>
                        <input
                            type="text"
                            placeholder="Ex: Redesign de l'application..."
                            className="w-full text-2xl font-bold border-b-2 border-black/10 pb-2 focus:outline-none focus:border-black transition-colors placeholder:text-black/20"
                        />
                    </div>

                    {/* Cover Upload */}
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-black/40">Image de couverture</label>
                        <div className="w-full aspect-video border-2 border-dashed border-black/10 rounded-2xl flex flex-col items-center justify-center text-black/30 hover:bg-black/[0.02] hover:border-black/20 transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-black/[0.05] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold">Glisse une image ou clique ici</span>
                            <span className="text-xs mt-1 opacity-60">1920x1080 recommandé</span>
                        </div>
                    </div>

                    {/* Pitch */}
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-black/40">Le pitch (max 280 car.)</label>
                        <textarea
                            rows="3"
                            placeholder="En une phrase, quel est l'objectif de ce projet ?"
                            className="w-full p-4 bg-gray-50 rounded-xl border border-black/5 focus:outline-none focus:ring-2 focus:ring-black/5 font-medium resize-none placeholder:text-black/30"
                        />
                    </div>

                    {/* Tags */}
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-black/40">Compétences / Outils (Max 5)</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-black/[0.05] text-black font-bold text-xs rounded-full flex items-center gap-2">
                                    {tag} <button onClick={() => removeTag(tag)}><X className="w-3 h-3 hover:text-red-500" /></button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={handleAddTag}
                            placeholder="Ajoute un tag + Entrée (ex: Figma, React...)"
                            className="w-full p-4 bg-gray-50 rounded-xl border border-black/5 focus:outline-none focus:ring-2 focus:ring-black/5 font-medium placeholder:text-black/30"
                            disabled={tags.length >= 5}
                        />
                    </div>

                    {/* Link */}
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-black/40">Lien principal</label>
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30" />
                            <input
                                type="url"
                                placeholder="https://github.com/..."
                                className="w-full pl-12 p-4 bg-gray-50 rounded-xl border border-black/5 focus:outline-none focus:ring-2 focus:ring-black/5 font-medium placeholder:text-black/30"
                            />
                        </div>
                    </div>

                    {/* Submit Action */}
                    <div className="pt-4 flex items-center justify-end gap-6">
                        <button type="button" className="text-sm font-bold text-black/40 hover:text-black transition-colors">
                            Annuler
                        </button>
                        <button
                            type="button"
                            className="px-8 py-4 text-white font-black uppercase tracking-widest text-xs rounded-full shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                            style={{ backgroundColor: schoolColor, boxShadow: `0 10px 20px ${schoolColor}40` }}
                        >
                            Publier le projet
                        </button>
                    </div>

                </form>
            </div>
        </PortfolioLayout>
    );
}

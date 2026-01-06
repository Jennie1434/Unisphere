import { useState, useEffect } from 'react';
import { getAllBadges, getBadgeInfo, saveBadgesConfig } from '../../services/gamificationService';
import { Award, Save, RefreshCw, Plus, Trash2 } from 'lucide-react';

export default function GamificationConfig() {
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        loadBadges();
    }, []);

    const loadBadges = () => {
        setLoading(true);
        const badgeIds = getAllBadges();
        const loadedBadges = badgeIds.map(id => getBadgeInfo(id));
        setBadges(loadedBadges);
        setLoading(false);
    };

    const handleUpdateBadge = (id, field, value) => {
        setBadges(prev => prev.map(badge =>
            badge.id === id ? { ...badge, [field]: value } : badge
        ));
        setHasChanges(true);
    };

    const handleSave = () => {
        // Convert array back to object keyed by ID
        const config = badges.reduce((acc, badge) => {
            acc[badge.id] = badge;
            return acc;
        }, {});

        saveBadgesConfig(config);
        setHasChanges(false);
        alert('Configuration sauvegardée !');
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-black mb-2" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                        Gamification.
                    </h2>
                    <p className="text-gray-500 font-medium">Configurez les badges et les récompenses.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={loadBadges}
                        className="p-3 rounded-full border-2 border-black hover:bg-gray-100 transition-colors"
                        title="Rafraîchir"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className={`px-6 py-3 bg-black text-white font-black uppercase tracking-widest border-2 border-black flex items-center gap-2 transition-all ${hasChanges ? 'hover:bg-[#671324] hover:shadow-[4px_4px_0px_#DBA12D]' : 'opacity-50 cursor-not-allowed'
                            }`}
                    >
                        <Save className="w-4 h-4" />
                        Enregistrer
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges.map((badge) => (
                    <div key={badge.id} className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.1)] transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-50 border-2 border-black flex items-center justify-center text-2xl">
                                {badge.icon}
                            </div>
                            <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                {badge.id}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest mb-1 text-gray-400">Nom du badge</label>
                                <input
                                    type="text"
                                    value={badge.name}
                                    onChange={(e) => handleUpdateBadge(badge.id, 'name', e.target.value)}
                                    className="w-full p-2 border-b-2 border-gray-200 focus:border-black outline-none font-bold bg-transparent transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest mb-1 text-gray-400">Condition d'obtention</label>
                                <input
                                    type="text"
                                    value={badge.criteria || ''}
                                    onChange={(e) => handleUpdateBadge(badge.id, 'criteria', e.target.value)}
                                    placeholder="Ex: Top 10 classement"
                                    className="w-full p-2 border-b-2 border-gray-200 focus:border-black outline-none font-medium text-sm bg-transparent transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest mb-1 text-gray-400">Description</label>
                                <textarea
                                    value={badge.description}
                                    onChange={(e) => handleUpdateBadge(badge.id, 'description', e.target.value)}
                                    className="w-full p-2 border-2 border-gray-100 rounded-lg focus:border-black outline-none text-sm bg-gray-50 min-h-[80px] transition-colors resize-none"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-[10px] font-black uppercase tracking-widest mb-1 text-gray-400">Emoji</label>
                                    <input
                                        type="text"
                                        value={badge.icon}
                                        onChange={(e) => handleUpdateBadge(badge.id, 'icon', e.target.value)}
                                        className="w-full p-2 border-b-2 border-gray-200 focus:border-black outline-none font-bold text-center bg-transparent transition-colors"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[10px] font-black uppercase tracking-widest mb-1 text-gray-400">Couleur (Hex)</label>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded border border-gray-200" style={{ backgroundColor: badge.color }}></div>
                                        <input
                                            type="text"
                                            value={badge.color}
                                            onChange={(e) => handleUpdateBadge(badge.id, 'color', e.target.value)}
                                            className="w-full p-2 border-b-2 border-gray-200 focus:border-black outline-none font-mono text-xs bg-transparent transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

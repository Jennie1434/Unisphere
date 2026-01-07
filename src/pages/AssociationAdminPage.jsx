import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/shared/PageLayout';
import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp, Trophy, Plus, Settings } from 'lucide-react';

export default function AssociationAdminPage({ school = 'eugenia' }) {
    const { id } = useParams();
    const [association, setAssociation] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, members, events
    const [showApplicationsModal, setShowApplicationsModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);
    const [showManageEventModal, setShowManageEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [pendingApplications, setPendingApplications] = useState([
        { id: 1, name: 'Marie Dupont', email: 'mdupont@eugeniaschool.com', message: 'Je suis passionnée par le consulting et je voudrais développer mes compétences.', date: '2026-01-06' },
        { id: 2, name: 'Lucas Martin', email: 'lmartin@eugeniaschool.com', message: 'Ancien stagiaire chez BCG, je veux continuer dans cette voie !', date: '2026-01-05' }
    ]);

    useEffect(() => {
        // Mock data fetch
        setAssociation({
            id: id,
            name: 'Eugenia Consulting',
            emoji: '💼',
            description: 'Junior Entreprise de l\'école.',
            memberCount: 6,
            eventCount: 3,
            impactScore: 850,
            members: [
                { id: 1, name: 'Jennie Ansellem', role: 'Président', email: 'jansellem@eugeniaschool.com' },
                { id: 2, name: 'Clément Cochod', role: 'Trésorier', email: 'ccochod@eugeniaschool.com' },
                { id: 3, name: 'Walid Bouzidane', role: 'Membre', email: 'wbouzidane@eugeniaschool.com' },
                { id: 4, name: 'Sarah Cohen', role: 'Secrétaire', email: 'scohen@eugeniaschool.com' },
                { id: 5, name: 'Thomas Bernard', role: 'Membre', email: 'tbernard@eugeniaschool.com' },
                { id: 6, name: 'Léa Dubois', role: 'Membre', email: 'ldubois@eugeniaschool.com' },
            ],
            events: [
                { id: 1, name: 'Atelier Stratégie', date: '2026-02-15', participants: 12 },
                { id: 2, name: 'Conférence Finance', date: '2026-03-01', participants: 45 },
                { id: 3, name: 'Afterwork Pro', date: '2026-03-10', participants: 30 },
            ]
        });
    }, [id]);

    if (!association) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

    return (
        <PageLayout school={school} minimalFooter={true}>
            <div className="min-h-screen bg-white text-black font-sans pb-20">

                {/* Header */}
                <div className="pt-32 px-6 lg:px-20 max-w-[1800px] mx-auto mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="text-8xl mb-4">{association.emoji}</div>
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                                Admin <br />
                                <span className="text-[#DBA12D]">{association.name}</span>
                            </h1>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowSettingsModal(true)}
                                className="px-6 py-3 bg-black text-white hover:bg-[#DBA12D] hover:text-black transition-colors font-black uppercase text-xs tracking-widest border-2 border-black"
                            >
                                <Settings className="w-4 h-4 mr-2 inline" />
                                Paramètres
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="px-6 lg:px-20 max-w-[1800px] mx-auto mb-12 border-b-2 border-black/5">
                    <div className="flex gap-8 overflow-x-auto pb-1">
                        {['dashboard', 'members', 'events'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-black uppercase tracking-widest transition-colors relative ${activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-black'
                                    }`}
                            >
                                {tab === 'dashboard' && 'Tableau de bord'}
                                {tab === 'members' && 'Membres'}
                                {tab === 'events' && 'Événements'}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 w-full h-[3px] bg-black"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="px-6 lg:px-20 max-w-[1800px] mx-auto">

                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-12">
                            {/* KPIs */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-black text-white p-8 border-2 border-black hover:shadow-[10px_10px_0px_#DBA12D] transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <Users className="w-6 h-6 text-[#DBA12D]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Membres</span>
                                    </div>
                                    <div className="text-5xl font-black">{association.memberCount}</div>
                                    <div className="text-xs text-[#DBA12D] mt-2 font-bold">+2 cette semaine</div>
                                </div>
                                <div className="bg-white text-black p-8 border-2 border-black hover:shadow-[10px_10px_0px_black] transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <Trophy className="w-6 h-6" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black/50">Impact Score</span>
                                    </div>
                                    <div className="text-5xl font-black">{association.impactScore}</div>
                                    <div className="text-xs text-green-600 mt-2 font-bold">Top 3 Associations</div>
                                </div>
                                <div className="bg-white text-black p-8 border-2 border-black hover:shadow-[10px_10px_0px_black] transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <Calendar className="w-6 h-6" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black/50">Événements</span>
                                    </div>
                                    <div className="text-5xl font-black">{association.eventCount}</div>
                                    <div className="text-xs text-gray-400 mt-2 font-bold">Prochain dans 4 jours</div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="border-2 border-black p-8 bg-[#F7F7F5]">
                                    <h3 className="text-xl font-black uppercase mb-6">Actions Rapides</h3>
                                    <div className="flex flex-col gap-4">
                                        <button
                                            onClick={() => setActiveTab('events')}
                                            className="flex items-center justify-between p-4 bg-white border border-black hover:bg-black hover:text-white transition-all group"
                                        >
                                            <span className="font-bold">Créer un événement</span>
                                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                        </button>
                                        <button
                                            onClick={() => setShowApplicationsModal(true)}
                                            className="flex items-center justify-between p-4 bg-white border border-black hover:bg-black hover:text-white transition-all group"
                                        >
                                            <span className="font-bold">Valider une inscription</span>
                                            <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-black">{pendingApplications.length}</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="border-2 border-black p-8">
                                    <h3 className="text-xl font-black uppercase mb-6">Activité Récente</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <span className="font-bold">Walid B.</span> a rejoint l'association
                                            <span className="text-gray-400 text-xs ml-auto">Il y a 2h</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <span className="font-bold">Nouvel événement</span> "Atelier CV" créé
                                            <span className="text-gray-400 text-xs ml-auto">Hier</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* EVENTS TAB */}
                    {activeTab === 'events' && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-black">Vos Événements</h2>
                                <button
                                    onClick={() => setShowCreateEventModal(true)}
                                    className="px-6 py-3 bg-black text-white hover:bg-[#DBA12D] hover:text-black transition-colors font-black uppercase text-xs tracking-widest"
                                >
                                    + Créer
                                </button>
                            </div>
                            <div className="grid gap-6">
                                {association.events.map(event => (
                                    <div key={event.id} className="border-2 border-black p-6 flex flex-col md:flex-row items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                                            <div className="w-16 h-16 bg-black text-white flex flex-col items-center justify-center font-black leading-none">
                                                <span className="text-xl">{event.date.split('-')[2]}</span>
                                                <span className="text-[10px] uppercase">FÉV</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black uppercase">{event.name}</h3>
                                                <p className="text-sm font-bold text-gray-500">{event.participants} participants inscrits</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => {
                                                    setSelectedEvent(event);
                                                    setShowManageEventModal(true);
                                                }}
                                                className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors text-xs font-black uppercase"
                                            >
                                                Gérer
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedEvent(event);
                                                    if (confirm(`Êtes-vous sûr de vouloir annuler l'événement "${event.name}" ?`)) {
                                                        // Handle event cancellation
                                                        console.log('Event cancelled:', event.id);
                                                    }
                                                }}
                                                className="px-4 py-2 border border-black hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors text-xs font-black uppercase"
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* MEMBERS TAB */}
                    {activeTab === 'members' && (
                        <div>
                            <h2 className="text-3xl font-black mb-8">Membres ({association.memberCount})</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {association.members.map(member => (
                                    <div key={member.id} className="border-2 border-black p-6 flex items-center gap-4 hover:shadow-[5px_5px_0px_black] transition-all">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 border border-black flex items-center justify-center text-lg font-black">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-black uppercase text-sm">{member.name}</div>
                                            <div className="text-xs text-gray-500 font-bold">{member.role}</div>
                                        </div>
                                        <button
                                            onClick={() => console.log('Manage member:', member.id)}
                                            className="ml-auto text-gray-400 hover:text-black transition-colors"
                                        >
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* Settings Modal */}
                {showSettingsModal && (
                    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                        <div className="bg-white border-4 border-black shadow-[16px_16px_0px_black] max-w-md w-full p-8">
                            <h3 className="text-2xl font-black uppercase mb-6">Paramètres</h3>
                            <div className="space-y-4 mb-8">
                                <button className="w-full text-left p-4 border-2 border-black hover:bg-gray-50 font-bold">
                                    ⚙️ Modifier le nom/description
                                </button>
                                <button className="w-full text-left p-4 border-2 border-black hover:bg-gray-50 font-bold">
                                    🔐 Gérer les permissions
                                </button>
                                <button className="w-full text-left p-4 border-2 border-red-600 hover:bg-red-50 font-bold text-red-600">
                                    🗑️ Supprimer l'association
                                </button>
                            </div>
                            <button
                                onClick={() => setShowSettingsModal(false)}
                                className="w-full px-6 py-3 bg-black text-white hover:bg-[#DBA12D] hover:text-black transition-colors font-black uppercase text-xs tracking-widest"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                )}

                {/* Create Event Modal */}
                {showCreateEventModal && (
                    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                        <div className="bg-white border-4 border-black shadow-[16px_16px_0px_black] max-w-md w-full p-8">
                            <h3 className="text-2xl font-black uppercase mb-6">Créer un événement</h3>
                            <div className="space-y-4 mb-8">
                                <input type="text" placeholder="Titre" className="w-full p-3 border-2 border-black font-bold" />
                                <input type="date" className="w-full p-3 border-2 border-black font-bold" />
                                <textarea placeholder="Description" className="w-full p-3 border-2 border-black font-bold h-24"></textarea>
                                <input type="text" placeholder="Lieu" className="w-full p-3 border-2 border-black font-bold" />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowCreateEventModal(false)}
                                    className="flex-1 px-6 py-3 border-2 border-black hover:bg-gray-50 transition-colors font-black uppercase text-xs tracking-widest"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={() => {
                                        console.log('Event created');
                                        setShowCreateEventModal(false);
                                    }}
                                    className="flex-1 px-6 py-3 bg-black text-white hover:bg-[#DBA12D] hover:text-black transition-colors font-black uppercase text-xs tracking-widest"
                                >
                                    Créer
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Manage Event Modal */}
                {showManageEventModal && selectedEvent && (
                    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                        <div className="bg-white border-4 border-black shadow-[16px_16px_0px_black] max-w-md w-full p-8">
                            <h3 className="text-2xl font-black uppercase mb-6">Gérer: {selectedEvent.name}</h3>
                            <div className="space-y-4 mb-8">
                                <button className="w-full text-left p-4 border-2 border-black hover:bg-gray-50 font-bold">
                                    ✏️ Modifier les détails
                                </button>
                                <button className="w-full text-left p-4 border-2 border-black hover:bg-gray-50 font-bold">
                                    👥 Voir les participants ({selectedEvent.participants})
                                </button>
                                <button className="w-full text-left p-4 border-2 border-black hover:bg-gray-50 font-bold">
                                    📧 Envoyer un rappel
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    setShowManageEventModal(false);
                                    setSelectedEvent(null);
                                }}
                                className="w-full px-6 py-3 bg-black text-white hover:bg-[#DBA12D] hover:text-black transition-colors font-black uppercase text-xs tracking-widest"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                )}

                {/* Applications Modal */}
                {showApplicationsModal && (
                    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                        <div className="bg-white border-4 border-black shadow-[16px_16px_0px_black] max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto">
                            <h3 className="text-2xl font-black uppercase mb-6">Candidatures en attente ({pendingApplications.length})</h3>
                            {pendingApplications.length === 0 ? (
                                <p className="text-center text-gray-500 py-8 font-bold">Aucune candidature en attente</p>
                            ) : (
                                <div className="space-y-4 mb-8">
                                    {pendingApplications.map(application => (
                                        <div key={application.id} className="border-2 border-black p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h4 className="text-lg font-black">{application.name}</h4>
                                                    <p className="text-sm text-gray-600 font-bold">{application.email}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{application.date}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm mb-4 italic">"{application.message}"</p>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => {
                                                        setPendingApplications(prev => prev.filter(a => a.id !== application.id));
                                                        alert(`${application.name} a été accepté(e) !`);
                                                    }}
                                                    className="flex-1 px-4 py-2 bg-black text-white hover:bg-[#DBA12D] hover:text-black transition-colors font-black uppercase text-xs tracking-widest"
                                                >
                                                    ✓ Accepter
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setPendingApplications(prev => prev.filter(a => a.id !== application.id));
                                                        alert(`${application.name} a été refusé(e).`);
                                                    }}
                                                    className="flex-1 px-4 py-2 border-2 border-black hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors font-black uppercase text-xs tracking-widest"
                                                >
                                                    ✗ Refuser
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button
                                onClick={() => setShowApplicationsModal(false)}
                                className="w-full px-6 py-3 bg-black text-white hover:bg-[#DBA12D] hover:text-black transition-colors font-black uppercase text-xs tracking-widest"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </PageLayout>
    );
}

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageLayout from '../components/shared/PageLayout';
import { getAssociationById, getAssociationMembers, getAssociationEvents, applyToAssociation } from '../services/associationsApi';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { useSchoolTheme } from '../hooks/useSchoolTheme';
import AssociationApplicationForm from '../components/student/AssociationApplicationForm';

export default function AssociationDetailPage({ school = 'eugenia' }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { student } = useStudentAuth();
  // const theme = useSchoolTheme(school); // Removed for consistent Green Branding
  const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';
  const isEugenia = school === 'eugenia';
  const accentColor = isEugenia ? '#DBA12D' : '#007AFF';
  const textAccentClass = isEugenia ? 'text-eugenia-yellow' : 'text-blue-500';
  const btnPrimaryClass = isEugenia
    ? 'bg-[#671324] text-white hover:bg-[#DBA12D] hover:text-[#671324]'
    : 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white';
  const borderActiveTab = isEugenia ? 'border-eugenia-yellow text-black' : 'border-blue-500 text-blue-700';

  const [association, setAssociation] = useState(null);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [assoData, membersData, eventsData] = await Promise.all([
          getAssociationById(id),
          getAssociationMembers(id),
          getAssociationEvents(id)
        ]);

        setAssociation(assoData);
        setMembers(Array.isArray(membersData) ? membersData : (membersData?.members || []));
        setEvents(Array.isArray(eventsData) ? eventsData : (eventsData?.events || []));
      } catch (err) {
        console.error('Error fetching association data:', err);
        setError(err.message || 'Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <PageLayout school={school}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="text-gray-500">Chargement...</div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !association) {
    return (
      <PageLayout school={school}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur</h2>
            <p className="text-gray-600 mb-6">{error || 'Association introuvable'}</p>
            <Link
              to={`${schoolPath}/associations`}
              className={`inline-block px-6 py-3 font-semibold rounded-xl transition-all shadow-lg ${btnPrimaryClass}`}
            >
              Retour aux associations
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const isMember = members.some(m => m.email === student?.email && m.status === 'active');
  const isAdmin = members.some(m => m.email === student?.email && m.role === 'admin');

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'members', label: 'Membres' },
    { id: 'events', label: 'Événements' }
  ];

  return (
    <PageLayout school={school}>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Brutalist */}
        <section className="bg-white py-12 px-4 text-black border-b-4 border-black">
          <div className="max-w-7xl mx-auto">
            <Link
              to={`${schoolPath}/associations`}
              className="inline-flex items-center gap-2 text-black/60 hover:text-black mb-6 transition-colors font-black uppercase text-xs tracking-widest"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              Retour
            </Link>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 rounded-none bg-white border-4 border-black shadow-[8px_8px_0px_black] flex items-center justify-center text-6xl">
                {association.emoji || '🤝'}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{association.name}</h1>
                {association.description && (
                  <p className="text-lg text-black/70 mb-4 font-medium">{association.description}</p>
                )}

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  {association.category && (
                    <span className="px-4 py-2 bg-black text-white rounded-none text-xs font-black uppercase tracking-widest border-2 border-black">
                      {association.category}
                    </span>
                  )}
                  <span className="px-4 py-2 bg-white border-2 border-black rounded-none text-xs font-black uppercase flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {association.membersCount || members.length}
                  </span>
                  {events.length > 0 && (
                    <span className="px-4 py-2 bg-white border-2 border-black rounded-none text-xs font-black uppercase flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {events.length}
                    </span>
                  )}
                  {association.isRecruiting && (
                    <span className="px-4 py-2 bg-[#DBA12D] text-black rounded-none text-xs font-black uppercase tracking-widest border-2 border-black flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                      Recrute
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                  {isAdmin && (
                    <Link
                      to={`${schoolPath}/associations/${id}/manage`}
                      className="px-6 py-3 bg-white border-2 border-black font-black rounded-none hover:bg-black hover:text-white transition-all flex items-center gap-2 uppercase text-xs tracking-widest shadow-[4px_4px_0px_black]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Gérer
                    </Link>
                  )}
                  {isMember ? (
                    <button
                      disabled
                      className="px-6 py-3 bg-[#DBA12D] text-black border-2 border-black font-black rounded-none shadow-[4px_4px_0px_black] flex items-center gap-2 uppercase text-xs tracking-widest cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Rejoint
                    </button>
                  ) : student ? (
                    <button
                      onClick={() => setActiveTab('apply')}
                      className="px-6 py-3 bg-black text-white border-2 border-black font-black rounded-none hover:bg-[#DBA12D] hover:text-black transition-all shadow-[4px_4px_0px_black] flex items-center gap-2 uppercase text-xs tracking-widest"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Rejoindre
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contenu */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Onglets */}
          <div className="bg-white rounded-none shadow-[8px_8px_0px_black] mb-6 border-2 border-black">
            <div className="flex gap-2 border-b-2 border-black p-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-black uppercase text-xs tracking-widest transition-colors border-b-4 ${activeTab === tab.id
                    ? 'border-[#DBA12D] text-black'
                    : 'border-transparent text-black/40 hover:text-black'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Contenu des onglets */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {association.description && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">À propos</h3>
                      <p className="text-gray-700 leading-relaxed">{association.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Membres
                      </h4>
                      <p className={`text-3xl font-bold ${textAccentClass}`}>
                        {association.membersCount || members.length}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">membres actifs</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Événements
                      </h4>
                      <p className={`text-3xl font-bold ${textAccentClass}`}>
                        {events.length}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">événements à venir</p>
                    </div>
                  </div>

                  {members.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Administrateurs</h3>
                      <div className="flex flex-wrap gap-3">
                        {members
                          .filter(m => m.role === 'admin')
                          .slice(0, 5)
                          .map(member => (
                            <div
                              key={member.id}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full"
                            >
                              <span className="text-lg">👤</span>
                              <span className="text-sm font-medium text-gray-700">
                                {member.firstName} {member.lastName}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'members' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Membres ({members.filter(m => m.status === 'active').length})
                  </h3>
                  {members.filter(m => m.status === 'active').length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      Aucun membre pour le moment
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {members
                        .filter(m => m.status === 'active')
                        .map(member => (
                          <div
                            key={member.id}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900">
                                  {member.firstName} {member.lastName}
                                </div>
                                <div className="text-sm text-gray-600">{member.email}</div>
                                {member.role && (
                                  <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${member.role === 'admin'
                                    ? (isEugenia ? 'bg-[#671324] text-white' : 'bg-[#007AFF] text-white')
                                    : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {member.role === 'admin' && (
                                      <svg className={`w-3 h-3 ${textAccentClass}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    )}
                                    {member.role === 'admin' ? 'Admin' : 'Membre'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'events' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Événements ({events.length})
                  </h3>
                  {events.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      Aucun événement prévu pour le moment
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {events.map(event => (
                        <div
                          key={event.id}
                          className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-2xl flex-shrink-0">
                              {event.associationEmoji || association.emoji || '📅'}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h4>
                              {event.description && (
                                <p className="text-gray-600 mb-3">{event.description}</p>
                              )}
                              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                {event.date && (
                                  <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                                  </div>
                                )}
                                {event.time && (
                                  <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{event.time}</span>
                                  </div>
                                )}
                                {event.location && (
                                  <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{event.location}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'apply' && (
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 rounded-full bg-gray-50 mx-auto flex items-center justify-center text-5xl mb-4 shadow-inner">
                        {association.emoji || '✍️'}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Candidater chez {association.name}
                      </h3>
                      <p className="text-gray-500 mt-2">
                        Envoyez votre motivation pour rejoindre l'équipe.
                      </p>
                    </div>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const msg = e.target.message.value;
                        if (!student) return alert("Veuillez vous connecter.");

                        try {
                          // Simple visual feedback
                          const btn = e.target.submitBtn;
                          const originalText = btn.innerText;
                          btn.innerText = "Envoi en cours...";
                          btn.disabled = true;

                          await applyToAssociation(association.id, student.email, msg);

                          // Success state
                          btn.innerText = "Candidature envoyée !";
                          btn.classList.remove(...btnPrimaryClass.split(' '));
                          btn.classList.add('bg-green-600', 'text-white');

                          setTimeout(() => {
                            alert("Félicitations ! Votre candidature a été transmise au bureau de l'association.");
                            setActiveTab('overview');
                            e.target.reset();
                          }, 1500);
                        } catch (err) {
                          alert("Erreur: " + err.message);
                          btn.innerText = originalText;
                          btn.disabled = false;
                        }
                      }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Message de motivation <span className="text-gray-400 font-normal">(Optionnel)</span>
                        </label>
                        <textarea
                          name="message"
                          rows="6"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none font-medium"
                          placeholder={`Bonjour, je suis très intéressé par ${association.name} car...`}
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setActiveTab('overview')}
                          className="flex-1 px-6 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors uppercase tracking-wider text-xs"
                        >
                          Annuler
                        </button>
                        <button
                          name="submitBtn"
                          type="submit"
                          className={`flex-1 px-6 py-4 font-bold rounded-xl shadow-lg transition-all transform active:scale-95 uppercase tracking-wider text-xs ${btnPrimaryClass}`}
                        >
                          Envoyer ma candidature
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/shared/PageLayout';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { Wrench, Sparkles, ShieldAlert, MonitorX, FileText, Camera } from 'lucide-react';

export default function ReportIssuePage({ school = 'eugenia' }) {
  const { student } = useStudentAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    photo: null,
    photoPreview: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const categories = [
    { value: 'materiel', label: 'Matériel cassé', icon: Wrench },
    { value: 'nettoyage', label: 'Nettoyage nécessaire', icon: Sparkles },
    { value: 'securite', label: 'Problème de sécurité', icon: ShieldAlert },
    { value: 'technique', label: 'Problème technique', icon: MonitorX },
    { value: 'autre', label: 'Autre', icon: FileText }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'La photo est trop grande (max 5MB)' });
        return;
      }

      // Vérifier le type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Veuillez sélectionner une image' });
        return;
      }

      setFormData(prev => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validation
    if (!formData.title.trim()) {
      setMessage({ type: 'error', text: 'Veuillez indiquer un titre' });
      return;
    }

    if (!formData.description.trim()) {
      setMessage({ type: 'error', text: 'Veuillez décrire le problème' });
      return;
    }

    if (!formData.location.trim()) {
      setMessage({ type: 'error', text: 'Veuillez indiquer la localisation' });
      return;
    }

    if (!formData.category) {
      setMessage({ type: 'error', text: 'Veuillez sélectionner une catégorie' });
      return;
    }

    setSubmitting(true);

    try {
      // Convertir la photo en base64
      let photoBase64 = null;
      if (formData.photo) {
        photoBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(formData.photo);
        });
      }

      const API_URL = import.meta.env.VITE_API_URL;

      if (!API_URL) {
        console.warn('VITE_API_URL n\'est pas définie, utilisation du fallback localStorage');
      }

      if (API_URL) {
        const response = await fetch(`${API_URL}/reports`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            location: formData.location,
            category: formData.category,
            photo: photoBase64,
            studentEmail: student?.email || 'anonymous@eugeniaschool.com',
            studentName: student ? `${student.firstName} ${student.lastName}` : 'Anonyme'
          })
        });

        // Lire la réponse même en cas d'erreur
        let result;
        try {
          result = await response.json();
        } catch (e) {
          // Si la réponse n'est pas du JSON, lire le texte
          const text = await response.text();
          throw new Error(`Erreur serveur (${response.status}): ${text || response.statusText}`);
        }

        if (!response.ok) {
          const errorMessage = result?.error || result?.message || `Erreur ${response.status}: ${response.statusText}`;
          throw new Error(errorMessage);
        }

        if (result.success) {
          setMessage({
            type: 'success',
            text: 'Signalement envoyé avec succès ! Il sera traité par l\'administration.'
          });

          // Reset form
          setFormData({
            title: '',
            description: '',
            location: '',
            category: '',
            photo: null,
            photoPreview: null
          });

          // Rediriger après 2 secondes
          const basePath = school === 'albert' ? '/albert-school' : '/eugenia-school';
          setTimeout(() => {
            navigate(basePath);
          }, 2000);
        } else {
          throw new Error(result.error || result.message || 'Erreur lors de l\'envoi');
        }
      } else {
        // Fallback: sauvegarder dans localStorage
        const reports = JSON.parse(localStorage.getItem('reports') || '[]');
        const newReport = {
          id: `report_${Date.now()}`,
          ...formData,
          photo: photoBase64,
          studentEmail: student?.email || 'anonymous@eugeniaschool.com',
          studentName: student ? `${student.firstName} ${student.lastName}` : 'Anonyme',
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        reports.push(newReport);
        localStorage.setItem('reports', JSON.stringify(reports));

        setMessage({
          type: 'success',
          text: 'Signalement enregistré localement !'
        });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      let errorMessage = 'Une erreur est survenue lors de l\'envoi du signalement';

      if (error.message) {
        errorMessage = error.message;
      } else if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet et réessayez.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setMessage({
        type: 'error',
        text: `Erreur: ${errorMessage}`
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout school={school} minimalFooter={true}>
      <div className="min-h-screen bg-white text-black selection:bg-[#DBA12D] selection:text-black font-sans">

        {/* Kinetic Hero Section */}
        <section className="relative pt-32 pb-20 px-6 lg:px-20 max-w-[1700px] mx-auto overflow-hidden">
          <header className="flex flex-col lg:flex-row items-end justify-between gap-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-10 overflow-hidden">
                <div className="h-[2px] w-10 bg-black" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">
                  EU — QUALITY CONTROL
                </span>
              </div>

              <h1 className="text-7xl md:text-[100px] font-black tracking-tighter leading-[0.85] mb-8" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                <span className="block">AMÉLIORER</span>
                <span className="block italic text-[#671324]" style={{ textShadow: '0 0 60px rgba(103,19,36,0.1)' }}>
                  L'EXPÉRIENCE.
                </span>
              </h1>

              <p className="text-xl text-black/60 max-w-2xl font-medium leading-relaxed">
                Contribuez à l'excellence du campus. Signalez un incident ou proposez une amélioration pour maintenir notre standard de qualité.
              </p>
            </div>
          </header>

          {/* Background Glow Effect */}
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-[#671324]/5 blur-[200px] -z-10" />
        </section>

        <div className="max-w-[1700px] mx-auto px-6 lg:px-20 pb-40">
          <div className="flex flex-col lg:flex-row gap-20">

            {/* Sidebar Context */}
            <div className="lg:w-1/3 space-y-12">
              <div className="bg-black text-white p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#DBA12D]/10 rounded-full blur-2xl group-hover:bg-[#DBA12D]/20 transition-all" />
                <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span className="text-[#DBA12D]">NOTICE</span>
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  Chaque signalement est traité directement par l'administration. Soyez précis dans vos descriptions pour une intervention rapide.
                </p>
                <div className="h-[1px] w-full bg-white/20 mb-6" />
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#DBA12D]">
                  <span>Délai moyen</span>
                  <span className="w-1 h-1 bg-[#DBA12D] rounded-full" />
                  <span>24H</span>
                </div>
              </div>

              <div className="border-l-2 border-black pl-8 py-4">
                <h4 className="font-bold text-lg mb-2">Catégories Prioritaires</h4>
                <ul className="space-y-3 text-sm text-black/60">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#671324]" /> Sécurité du campus</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#671324]" /> Matériel pédagogique</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#671324]" /> Propreté des espaces</li>
                </ul>
              </div>
            </div>

            {/* Main Form */}
            <div className="lg:w-2/3">
              <div className="bg-white border-2 border-black p-8 md:p-12 relative shadow-[20px_20px_0px_rgba(0,0,0,0.05)]">

                <form onSubmit={handleSubmit} className="space-y-12">

                  {/* Section: Category */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-6">
                      01 — Nature du problème
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {categories.map(cat => {
                        const IconComponent = cat.icon;
                        return (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                            className={`group p-6 border-2 transition-all duration-300 relative overflow-hidden flex flex-col items-center gap-3 ${formData.category === cat.value
                              ? 'border-[#671324] bg-[#671324] text-white'
                              : 'border-black hover:bg-black hover:text-white'
                              }`}
                          >
                            <IconComponent className={`w-8 h-8 relative z-10 ${formData.category === cat.value ? 'text-[#DBA12D]' : 'group-hover:text-[#DBA12D]'}`} />
                            <div className={`text-xs font-black uppercase tracking-widest relative z-10 text-center ${formData.category === cat.value ? 'text-[#DBA12D]' : 'group-hover:text-[#DBA12D]'
                              }`}>
                              {cat.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section: Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-3">
                        02 — Identification
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="w-full px-0 py-4 border-b-2 border-black/10 focus:border-[#671324] bg-transparent text-xl font-bold placeholder-black/20 focus:outline-none transition-colors"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Titre du signalement"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-3">
                        03A — Localisation
                      </label>
                      <input
                        type="text"
                        name="location"
                        className="w-full px-0 py-4 border-b-2 border-black/10 focus:border-[#671324] bg-transparent text-lg font-medium placeholder-black/20 focus:outline-none transition-colors"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Ex: Salle 101..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-3">
                        03B — Preuve Photo
                      </label>
                      <div className="relative group cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`w-full py-3.5 border-b-2 ${formData.photoPreview ? 'border-[#DBA12D] text-[#DBA12D]' : 'border-black/10 text-black/40'} flex items-center justify-between group-hover:border-black transition-colors`}>
                          <span className="font-bold text-sm uppercase tracking-wide truncate pr-4">
                            {formData.photo ? 'Photo sélectionnée' : 'Ajouter une photo'}
                          </span>
                          <Camera className="w-5 h-5" />
                        </div>
                      </div>
                      {formData.photoPreview && (
                        <div className="mt-4 relative inline-block border-2 border-black">
                          <img
                            src={formData.photoPreview}
                            alt="Preview"
                            className="h-24 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, photo: null, photoPreview: null }))}
                            className="absolute -top-3 -right-3 bg-[#671324] text-white w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform"
                          >
                            X
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-3">
                      04 — Description détaillée
                    </label>
                    <textarea
                      name="description"
                      className="w-full p-6 bg-gray-50 border-none focus:ring-2 focus:ring-[#671324] text-gray-900 min-h-[150px] text-sm font-medium leading-relaxed resize-none"
                      rows="4"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Décrivez précisément le problème rencontré..."
                      required
                    />
                  </div>

                  {/* Message Feedback */}
                  {message.text && (
                    <div className={`p-6 border-l-4 ${message.type === 'success'
                      ? 'border-[#DBA12D] bg-[#DBA12D]/10 text-black'
                      : 'border-[#671324] bg-[#671324]/10 text-[#671324]'
                      }`}>
                      <p className="flex items-center gap-3 font-bold text-sm uppercase tracking-wide">
                        <span>{message.type === 'success' ? 'SUCCESS' : 'ERROR'} —</span>
                        {message.text}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-black/10">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full group bg-black text-white py-6 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em] group-hover:text-[#DBA12D] transition-colors">
                        {submitting ? 'Transmission...' : 'Soumettre le rapport'}
                        <span className="text-lg">→</span>
                      </span>
                      <div className="absolute inset-0 bg-[#671324] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </button>
                    <p className="text-center text-[10px] text-black/30 mt-4 uppercase tracking-widest">
                      EUGENIA — Internal Tracking System v2.4
                    </p>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}


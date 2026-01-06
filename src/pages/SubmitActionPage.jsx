import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getActionTypes } from '../services/configService';
import { submitAction } from '../services/googleSheets';
import PageLayout from '../components/shared/PageLayout';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function SubmitActionPage({ school = 'eugenia' }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type');

  const { student } = useStudentAuth();
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [actionTypes, setActionTypes] = useState([]);

  useEffect(() => {
    if (!student) {
      const loginPath = school === 'albert' ? '/albert-school/login' : '/eugenia-school/login';
      navigate(loginPath);
    }
  }, [student, navigate, school]);

  useEffect(() => {
    loadActionTypes();
  }, []);

  const loadActionTypes = async () => {
    const types = await getActionTypes();
    setActionTypes(types);
    if (initialType) {
      const target = types.find(t => t.id.toLowerCase().includes(initialType.toLowerCase()));
      if (target) {
        setSelectedType(target.id);
      }
    }
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setFormData({});
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!student || !student.email) {
      setMessage({ type: 'error', text: 'Vous devez être connecté.' });
      return;
    }

    if (!selectedType) {
      setMessage({ type: 'error', text: 'Sélectionnez un type d\'action.' });
      return;
    }

    setSubmitting(true);

    try {
      const result = await submitAction({
        email: student.email,
        type: selectedType,
        data: formData
      });

      if (result.success) {
        setMessage({
          type: 'success',
          text: 'Votre action a été soumise avec succès !'
        });

        setSelectedType('');
        setFormData({});

        setTimeout(() => {
          const basePath = school === 'albert' ? '/albert-school' : '/eugenia-school';
          navigate(basePath);
        }, 2000);
      } else {
        setMessage({
          type: 'error',
          text: result.message || 'Erreur lors de la soumission'
        });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Une erreur est survenue.' });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedActionType = actionTypes.find(t => t.id === selectedType);

  // Theme colors based on school
  const accentColor = school === 'eugenia' ? '#DBA12D' : '#3461FF';
  const successColor = school === 'eugenia' ? '#DBA12D' : '#3461FF';

  return (
    <PageLayout school={school} minimalFooter={true}>
      <div className="min-h-screen bg-white text-black selection:bg-[#DBA12D] selection:text-black font-sans py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Navigation Breadcrumb */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-black/40 hover:text-black transition-colors mb-8 font-black text-[10px] uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>

          <header className="mb-12">
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              SOUMETTRE <br />
              <span className="text-[#DBA12D] italic">UNE ACTION.</span>
            </h1>
            <p className="text-black/60 font-bold text-lg max-w-2xl uppercase tracking-tight">
              Remplissez le formulaire ci-dessous pour valider vos points. Chaque soumission est vérifiée par l'administration.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border-2 border-black p-8 md:p-10 shadow-[20px_20px_0px_rgba(0,0,0,1)] hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[25px_25px_0px_#DBA12D] transition-all duration-300">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Action Type Selection */}
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-black">
                      Catégorie d'action
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-6 py-4 rounded-none bg-white border-2 border-black text-black font-bold uppercase tracking-wider focus:outline-none focus:bg-black focus:text-white transition-all appearance-none cursor-pointer"
                        value={selectedType}
                        onChange={handleTypeChange}
                        required
                      >
                        <option value="">Sélectionnez une catégorie...</option>
                        {actionTypes.map(type => (
                          <option key={type.id} value={type.id}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Fields */}
                  {selectedActionType && (
                    <div className="space-y-8 pt-8 border-t-2 border-black/5">
                      {selectedActionType.fields.map(field => (
                        <div key={field.name} className="space-y-4">
                          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-black">
                            {field.label} {field.required && <span className="text-[#671324]">*</span>}
                          </label>
                          {field.type === 'textarea' ? (
                            <textarea
                              className="w-full px-6 py-4 rounded-none bg-black/[0.02] border-2 border-black text-black font-medium focus:outline-none focus:bg-white focus:shadow-[8px_8px_0px_#DBA12D] transition-all min-h-[150px] placeholder:text-black/20"
                              value={formData[field.name] || ''}
                              onChange={(e) => handleFieldChange(field.name, e.target.value)}
                              placeholder={field.placeholder}
                              required={field.required}
                            />
                          ) : (
                            <input
                              type={field.type}
                              className="w-full px-6 py-4 rounded-none bg-black/[0.02] border-2 border-black text-black font-medium focus:outline-none focus:bg-white focus:shadow-[8px_8px_0px_#DBA12D] transition-all placeholder:text-black/20"
                              value={formData[field.name] || ''}
                              onChange={(e) => handleFieldChange(field.name, e.target.value)}
                              placeholder={field.placeholder}
                              required={field.required}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Feedback Message */}
                  {message.text && (
                    <div
                      className="p-6 border-2 border-black flex items-center gap-4 bg-[#DBA12D]"
                      style={message.type === 'error' ? { backgroundColor: '#671324', color: 'white', borderColor: 'black' } : {}}
                    >
                      {message.type === 'success' ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <AlertCircle className="w-6 h-6 shrink-0" />}
                      <p className="font-black text-sm uppercase tracking-wider">{message.text}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting || !selectedType}
                    className="w-full py-5 bg-black border-2 border-black text-white font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 transition-all hover:bg-[#671324] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[10px_10px_0px_rgba(0,0,0,0.2)]"
                  >
                    {submitting ? (
                      <Clock className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Envoyer ma soumission <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Side Info */}
            <div className="space-y-8">
              <div className="bg-white border-2 border-black p-8 shadow-[10px_10px_0px_rgba(0,0,0,1)]">
                <div className="w-12 h-12 bg-black flex items-center justify-center mb-6 border-2 border-black">
                  <Sparkles className="w-6 h-6 text-[#DBA12D]" />
                </div>
                <h4 className="text-2xl font-black mb-6 tracking-tighter" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>VALIDATION.</h4>
                <ul className="space-y-4">
                  {[
                    "Soyez précis dans vos descriptions",
                    "Ajoutez des liens vers vos preuves",
                    "Vérifiez l'orthographe",
                    "Les points sont attribués sous 48h"
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-4 text-xs font-bold text-black leading-relaxed uppercase tracking-tight">
                      <div className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-[#DBA12D] rounded-full" />
                      </div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-black text-white p-8 border-2 border-black shadow-[10px_10px_0px_#DBA12D]">
                <h4 className="text-2xl font-black mb-4 tracking-tighter italic" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>IDÉES ?</h4>
                <p className="text-xs text-white/60 font-medium leading-relaxed mb-8 uppercase tracking-wide">
                  Si vous pensez qu'une action manque à la liste, proposez-la directement.
                </p>
                <button
                  onClick={() => navigate(`/${school}-school/report`)}
                  className="w-full py-4 border-2 border-[#DBA12D] text-[#DBA12D] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#DBA12D] hover:text-black transition-all"
                >
                  Suggérer une nouvelle action
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

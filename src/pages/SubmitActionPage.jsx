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

  // Theme Overrides (Black/Green)
  const accentColor = '#000000';
  const greenAccent = '#10B981';

  return (
    <PageLayout school={school} minimalFooter={true}>
      <div className="min-h-screen bg-[#F7F7F5] py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Navigation Breadcrumb */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-black/40 hover:text-black transition-colors mb-8 font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-4">
              Soumettre une action
            </h1>
            <p className="text-gray-500 font-medium text-lg">
              Remplissez le formulaire ci-dessous pour valider vos points. Chaque soumission est vérifiée par l'administration.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-xl shadow-black/5 border border-black/5">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Action Type Selection */}
                  <div className="space-y-4">
                    <label className="block text-xs font-black uppercase tracking-widest text-black/30">
                      Catégorie d'action
                    </label>
                    <select
                      className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-black/5 text-black font-bold focus:ring-2 focus:ring-black/10 transition-all appearance-none cursor-pointer outline-none"
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
                  </div>

                  {/* Dynamic Fields */}
                  {selectedActionType && (
                    <div className="space-y-8 pt-4 border-t border-black/5">
                      {selectedActionType.fields.map(field => (
                        <div key={field.name} className="space-y-4">
                          <label className="block text-xs font-black uppercase tracking-widest text-black/30">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          {field.type === 'textarea' ? (
                            <textarea
                              className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-black/5 text-black font-medium focus:ring-2 focus:ring-black/10 transition-all min-h-[150px] outline-none"
                              value={formData[field.name] || ''}
                              onChange={(e) => handleFieldChange(field.name, e.target.value)}
                              placeholder={field.placeholder}
                              required={field.required}
                            />
                          ) : (
                            <input
                              type={field.type}
                              className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-black/5 text-black font-medium focus:ring-2 focus:ring-black/10 transition-all outline-none"
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
                    <div className={`p-6 rounded-2xl flex items-center gap-4 border ${message.type === 'success'
                      ? 'bg-green-50 border-green-100 text-green-800'
                      : 'bg-red-50 border-red-100 text-red-800'
                      }`}>
                      {message.type === 'success' ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <AlertCircle className="w-6 h-6 shrink-0" />}
                      <p className="font-bold text-sm tracking-tight">{message.text}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting || !selectedType}
                    className="w-full py-5 rounded-xl text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:bg-gray-800 active:scale-95 disabled:opacity-50 disabled:hover:bg-black shadow-xl"
                    style={{
                      backgroundColor: 'black'
                    }}
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
            <div className="space-y-6">
              <div className="bg-white rounded-[32px] p-8 border border-black/5 shadow-lg shadow-black/5">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-[#10B981]" />
                </div>
                <h4 className="text-black font-bold mb-3 tracking-tight">Conseils de validation</h4>
                <ul className="space-y-4">
                  {[
                    "Soyez précis dans vos descriptions",
                    "Ajoutez des liens vers vos preuves",
                    "Vérifiez l'orthographe",
                    "Les points sont attribués sous 48h"
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-3 text-xs font-bold text-black/60 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-[32px] p-8 border border-black/5">
                <h4 className="text-black font-bold mb-3 tracking-tight">Besoin d'aide ?</h4>
                <p className="text-xs text-black/40 font-medium leading-relaxed mb-6">
                  Si vous ne trouvez pas la catégorie correspondante, contactez le support.
                </p>
                <button
                  onClick={() => navigate(`/${school}-school/support`)}
                  className="w-full py-4 border border-black/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  Contacter le support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

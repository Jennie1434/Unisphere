import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageLayout from '../components/shared/PageLayout';
import { createAssociation } from '../services/associationsApi';
import { useStudentAuth } from '../contexts/StudentAuthContext';

export default function CreateAssociationPage({ school = 'eugenia' }) {
    const navigate = useNavigate();
    const { student } = useStudentAuth();
    const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';

    const [formData, setFormData] = useState({
        name: '',
        emoji: '🤝',
        description: '',
        category: 'Autre'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            if (!formData.name) {
                throw new Error('Le nom est requis');
            }

            await createAssociation({
                ...formData,
                createdBy: student.email
            });

            // Rediriger vers la liste des associations
            navigate(`${schoolPath}/associations`);
        } catch (err) {
            console.error('Error creating association:', err);
            setError(err.message || 'Erreur lors de la création');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout school={school}>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Créer une association
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Lancez votre club et fédérez les étudiants
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}

                        <div className="space-y-4 rounded-md shadow-sm">
                            <div>
                                <label htmlFor="emoji" className="block text-sm font-medium text-gray-700 mb-1">
                                    Emoji
                                </label>
                                <input
                                    id="emoji"
                                    name="emoji"
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#DBA12D] focus:border-[#DBA12D] sm:text-sm text-center text-4xl h-16"
                                    placeholder="🤝"
                                    value={formData.emoji}
                                    onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom de l'association
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#DBA12D] focus:border-[#DBA12D] sm:text-sm"
                                    placeholder="Ex: Club Tech, BDE, ..."
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Catégorie
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#DBA12D] focus:border-[#DBA12D] sm:text-sm"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Autre">Autre</option>
                                    <option value="Sport">Sport</option>
                                    <option value="Culture">Culture</option>
                                    <option value="Tech">Tech & Innovation</option>
                                    <option value="Humanitaire">Humanitaire</option>
                                    <option value="BDE">Vie idéale (BDE)</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#DBA12D] focus:border-[#DBA12D] sm:text-sm"
                                    placeholder="Décrivez votre association en quelques mots..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                to={`${schoolPath}/associations`}
                                className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DBA12D]"
                            >
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DBA12D]"
                            >
                                {loading ? 'Création...' : 'Créer'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
}

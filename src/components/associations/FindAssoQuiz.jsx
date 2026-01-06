import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { getAllAssociations } from '../../services/associationsApi';
import { Link } from 'react-router-dom';

export default function FindAssoQuiz({ school = 'eugenia', onClose }) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [allAssociations, setAllAssociations] = useState([]);

    const isEugenia = school === 'eugenia';
    const accentColor = isEugenia ? '#DBA12D' : '#007AFF';
    const textAccentClass = isEugenia ? 'text-eugenia-yellow' : 'text-blue-500';
    const borderHoverClass = isEugenia ? 'hover:border-eugenia-yellow' : 'hover:border-blue-500';
    const groupHoverTextClass = isEugenia ? 'group-hover:text-eugenia-yellow' : 'group-hover:text-blue-500';
    const groupHoverBgClass = isEugenia ? 'hover:bg-eugenia-yellow/5' : 'hover:bg-blue-500/5';
    const bgAccentLight = isEugenia ? 'bg-eugenia-yellow/10' : 'bg-blue-500/10';
    const buttonClass = isEugenia
        ? 'bg-[#671324] text-white hover:bg-[#DBA12D] hover:text-[#671324]'
        : 'bg-blue-600 text-white hover:bg-blue-700';

    const textPrimaryClass = isEugenia ? 'text-[#671324]' : 'text-black';

    const questions = [
        {
            id: 'interest',
            question: "Qu'est-ce qui te motive le plus ?",
            options: [
                { label: "L'impact social & BDE", value: ['Humanitaire', 'BDE', 'Business'] },
                { label: "La tech & l'innovation", value: ['Tech'] },
                { label: "Le sport & la compétition", value: ['Sport'] },
                { label: "L'art & la culture", value: ['Culture'] }
            ]
        },
        {
            id: 'time',
            question: "Quel temps peux-tu y consacrer ?",
            options: [
                { label: "Quelques heures par mois", value: 'low' },
                { label: "Une soirée par semaine", value: 'medium' },
                { label: "Je veux m'investir à fond !", value: 'high' }
            ]
        },
        {
            id: 'work',
            question: "Tu préfères travailler comment ?",
            options: [
                { label: "En équipe sur le terrain", value: 'team' },
                { label: "Tranquille derrière mon ordi", value: 'solo' },
                { label: "Je veux leader des projets", value: 'lead' }
            ]
        }
    ];

    useEffect(() => {
        getAllAssociations().then(data => {
            const list = Array.isArray(data) ? data : (data?.associations || []);
            setAllAssociations(list);
        });
    }, []);

    const handleOptionClick = (value) => {
        const currentQuestion = questions[step];
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            calculateResults(newAnswers);
        }
    };

    const calculateResults = (finalAnswers) => {
        // Simple matching logic based on 'interest' mapping to category
        const preferredCategories = finalAnswers.interest || [];

        const matched = allAssociations.filter(asso =>
            preferredCategories.includes(asso.category)
        );

        // Fallback: if no match, show top 2 associations or random
        const finalResults = matched.length > 0 ? matched : allAssociations.slice(0, 2);

        // Take top 2
        setResults(finalResults.slice(0, 2));
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-none w-full max-w-lg overflow-hidden shadow-[16px_16px_0px_black] border-4 border-black relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-none bg-black text-white hover:bg-red-600 transition-colors z-10 border-2 border-black"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 md:p-12">
                    {!results ? (
                        <>
                            <div className="mb-8">
                                <span className="text-xs font-black uppercase tracking-widest mb-2 block" style={{ color: accentColor }}>
                                    Question {step + 1}/{questions.length}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                                    {questions[step].question}
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {questions[step].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleOptionClick(opt.value)}
                                        className="w-full text-left p-5 rounded-none border-2 border-black transition-all hover:shadow-[6px_6px_0px_black] hover:-translate-y-1 bg-white hover:bg-[#DBA12D]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-black uppercase text-sm tracking-tight text-black">{opt.label}</span>
                                            <ArrowRightIcon className="w-5 h-5 text-black" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center animate-in slide-in-from-bottom-4 fade-in">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${bgAccentLight} ${textAccentClass}`}>
                                <Check className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">On a trouvé ton match !</h2>
                            <p className="text-black/60 mb-8">Basé sur tes réponses, voici {results.length} association(s) pour toi.</p>

                            <div className="bg-gray-50 rounded-2xl p-4 border border-black/5 text-left mb-8 space-y-4">
                                {results.map(asso => (
                                    <Link
                                        to={`${school === 'eugenia' ? '/eugenia-school' : '/albert-school'}/associations/${asso.id}`}
                                        key={asso.id}
                                        className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer block"
                                        onClick={onClose}
                                    >
                                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                                            {asso.emoji || '✨'}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{asso.name}</div>
                                            <div className="text-xs text-black/40">{asso.category} • {asso.memberCount || 0} membres</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <button
                                onClick={onClose}
                                className={`w-full py-4 rounded-xl font-bold transition-colors ${buttonClass}`}
                            >
                                Voir toutes les associations
                            </button>
                        </div>
                    )}
                </div>

                {/* Progress Bar */}
                {!results && (
                    <div className="h-2 w-full bg-gray-200 border-t-2 border-black">
                        <div
                            className="h-full transition-all duration-500 ease-out bg-black"
                            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function ArrowRightIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

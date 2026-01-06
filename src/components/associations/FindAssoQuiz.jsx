import { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function FindAssoQuiz({ school = 'eugenia', onClose }) {
    const [step, setStep] = useState(0);
    const [results, setResults] = useState(null);

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
            question: "Qu'est-ce qui te motive le plus ?",
            options: [
                { label: "L'impact social", value: 'humanitaire' },
                { label: "La tech & l'innovation", value: 'tech' },
                { label: "Le sport & la compétition", value: 'sport' },
                { label: "L'art & la culture", value: 'art' }
            ]
        },
        {
            question: "Quel temps peux-tu y consacrer ?",
            options: [
                { label: "Quelques heures par mois", value: 'low' },
                { label: "Une soirée par semaine", value: 'medium' },
                { label: "Je veux m'investir à fond !", value: 'high' }
            ]
        },
        {
            question: "Tu préfères travailler comment ?",
            options: [
                { label: "En équipe sur le terrain", value: 'team' },
                { label: "Tranquille derrière mon ordi", value: 'solo' },
                { label: "Je veux leader des projets", value: 'lead' }
            ]
        }
    ];

    const handleOptionClick = (value) => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // Fake logic to show results
            setResults(true);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 md:p-12">
                    {!results ? (
                        <>
                            <div className="mb-8">
                                <span className={`text-xs font-black uppercase tracking-widest mb-2 block ${textAccentClass}`}>
                                    Question {step + 1}/{questions.length}
                                </span>
                                <h2 className={`text-2xl md:text-3xl font-bold font-serif ${textPrimaryClass}`}>
                                    {questions[step].question}
                                </h2>
                            </div>

                            <div className="space-y-3">
                                {questions[step].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleOptionClick(opt.value)}
                                        className={`w-full text-left p-5 rounded-xl border border-black/5 transition-all group group-hover:scale-[1.02] ${borderHoverClass} ${groupHoverBgClass}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className={`font-bold transition-colors ${groupHoverTextClass} ${textPrimaryClass}`}>{opt.label}</span>
                                            <ArrowRightIcon className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 ${textAccentClass}`} />
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
                            <p className="text-black/60 mb-8">Basé sur tes réponses, voici 2 associations faites pour toi.</p>

                            <div className="bg-gray-50 rounded-2xl p-4 border border-black/5 text-left mb-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">🌱</div>
                                    <div>
                                        <div className="font-bold">Eugenia Green</div>
                                        <div className="text-xs text-black/40">Engagement • Terrain</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">🤖</div>
                                    <div>
                                        <div className="font-bold">Tech Club</div>
                                        <div className="text-xs text-black/40">Tech • Projets</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className={`w-full py-4 rounded-xl font-bold transition-colors ${buttonClass}`}
                            >
                                Découvrir ces assos
                            </button>
                        </div>
                    )}
                </div>

                {/* Progress Bar */}
                {!results && (
                    <div className="h-1.5 w-full bg-gray-100">
                        <div
                            className="h-full transition-all duration-500 ease-out"
                            style={{ width: `${((step + 1) / questions.length) * 100}%`, backgroundColor: accentColor }}
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

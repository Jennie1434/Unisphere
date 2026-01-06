import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project, school = 'eugenia', isOwner = false }) {
    // Strict Eugenia Green
    const accentColor = '#10B981';
    const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';

    // Mock Status for owner view (if not present in data)
    const status = project.status || (project.id % 2 === 0 ? 'published' : 'draft');

    // Status Badge Configuration
    const statusConfig = {
        published: { label: 'Publié', bg: 'bg-[#10B981]/10', text: 'text-[#10B981]', border: 'border-[#10B981]/20' },
        draft: { label: 'Brouillon', bg: 'bg-gray-100', text: 'text-gray-500', border: 'border-gray-200' },
        pending: { label: 'En attente', bg: 'bg-orange-50', text: 'text-orange-500', border: 'border-orange-100' }
    };

    const currentStatus = statusConfig[status] || statusConfig.published;

    return (
        <div className="group relative h-full flex flex-col">
            <Link
                to={isOwner ? `${schoolPath}/portfolio/submit?edit=${project.id}` : `${schoolPath}/portfolio/project/${project.id}`}
                className={`block bg-white rounded-[20px] overflow-hidden border transition-all duration-300 relative h-full flex flex-col ${isOwner ? 'border-dashed border-gray-300 hover:border-[#10B981]' : 'border-black/5 hover:border-[#10B981]/40 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] hover:-translate-y-1'
                    }`}
            >
                {/* Cover Image - Fixed Aspect Ratio */}
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                    {project.coverUrl ? (
                        <img
                            src={project.coverUrl}
                            alt={project.title}
                            className={`w-full h-full object-cover transition-transform duration-700 ${isOwner ? 'opacity-80 group-hover:opacity-100' : 'group-hover:scale-105'}`}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50">
                            <div className="w-12 h-12 rounded-full bg-gray-100 mb-2" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">No Cover</span>
                        </div>
                    )}

                    {/* Owner Status Badge (Absolute Top Left) */}
                    {isOwner && (
                        <div className="absolute top-3 left-3 z-10">
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}>
                                {currentStatus.label}
                            </span>
                        </div>
                    )}

                    {/* Overlay Action - Only appears on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className={`px-5 py-2.5 bg-white rounded-full text-xs font-bold text-black flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-lg ${isOwner ? 'hover:bg-[#10B981] hover:text-white' : ''}`}>
                            {isOwner ? (
                                <>Modifier <ArrowUpRight className="w-3 h-3" /></>
                            ) : (
                                <>Voir le projet <ArrowUpRight className="w-3 h-3 text-[#10B981]" /></>
                            )}
                        </span>
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-5 flex flex-col flex-1 relative">
                    {/* Header: Title + Author */}
                    <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                            {project.featured && !isOwner && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-[#10B981]/10 text-[#10B981] mb-2 border border-[#10B981]/20">
                                    Sélection
                                </span>
                            )}
                            {/* Social Links (Mocked) - Hide for owner, irrelevant */}
                            {!isOwner && (
                                <div className="flex gap-2 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-colors">
                                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </div>
                                    <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    </div>
                                </div>
                            )}
                        </div>

                        <h3 className="font-bold text-[17px] leading-snug text-black mb-1.5 group-hover:text-[#10B981] transition-colors line-clamp-2">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-2">
                            {!isOwner && (
                                <div className="w-5 h-5 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-500">
                                        {project.author?.initials || 'ST'}
                                    </div>
                                </div>
                            )}
                            <p className="text-sm font-medium text-gray-500">
                                {isOwner ? 'Modifié il y a 2j' : (
                                    <>
                                        {project.author?.name} <span className="text-gray-300">•</span> <span className="text-xs font-bold text-black bg-gray-100 px-1 rounded">{project.author?.promo || 'M1'}</span>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Footer: Tags + Arrow */}
                    <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                            {project.tags?.slice(0, 3).map(tag => (
                                <span
                                    key={tag}
                                    className="px-1.5 py-0.5 bg-white text-gray-400 text-[9px] font-bold uppercase tracking-wide rounded border border-gray-100 group-hover:border-[#10B981]/30 group-hover:text-gray-600 transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <span
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 text-gray-300 group-hover:bg-[#10B981] group-hover:text-white transition-all transform group-hover:rotate-45"
                        >
                            <ArrowUpRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

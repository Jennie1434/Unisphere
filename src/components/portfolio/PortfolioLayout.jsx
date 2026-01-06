import { Link } from 'react-router-dom';
import PageLayout from '../shared/PageLayout';
import { ArrowLeft } from 'lucide-react';

export default function PortfolioLayout({ children, school = 'eugenia', showBack = false, title, subtitle, actions }) {
    // Portfolio uses strict Neutral + Green (#10B981) theme, surpassing school colors.
    const accentColor = '#10B981';
    const schoolName = school === 'eugenia' ? 'Eugenia School' : 'Albert School';

    return (
        <PageLayout school={school} minimalFooter={true}>
            <div className="relative min-h-screen pb-20 px-6 lg:px-12 pt-8 bg-[#F9FAFB]">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        {showBack && (
                            <Link to={`/${school}-school/portfolio`} className="inline-flex items-center gap-2 text-black/40 hover:text-black mb-6 transition-colors text-sm font-bold">
                                <ArrowLeft className="w-4 h-4" /> Retour
                            </Link>
                        )}

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span
                                        className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border bg-white"
                                        style={{
                                            borderColor: `${accentColor}33`,   // 20% opacity
                                            color: accentColor
                                        }}
                                    >
                                        Portfolio — {schoolName}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight mb-2">
                                    {title || 'Explore les projets.'}
                                </h1>
                                {subtitle && (
                                    <p className="text-[#6B7280] font-medium text-lg max-w-xl">
                                        {subtitle}
                                    </p>
                                )}
                            </div>

                            {actions && (
                                <div className="flex items-center gap-3">
                                    {actions}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

import PortfolioLayout from '../../components/portfolio/PortfolioLayout';
import ProjectCard from '../../components/portfolio/ProjectCard';
import { MapPin, Link as LinkIcon, Linkedin, Award, Share2, Plus, Github, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

// Logic synced with PortfolioHome mock
const CURRENT_USER_ID = 101;
const MOCK_PROJECTS = [
    {
        id: 101,
        title: "Mon Projet Innovant",
        author: { name: "Moi", initials: "JD", promo: "M1" },
        authorId: CURRENT_USER_ID,
        tags: ["Next.js", "AI"],
        coverUrl: "https://images.unsplash.com/photo-1531297420497-0b86953ec049",
        featured: false,
        type: "dev",
        status: "published"
    },
    {
        id: 102,
        title: "Brouillon Design System",
        author: { name: "Moi", initials: "JD", promo: "M1" },
        authorId: CURRENT_USER_ID,
        tags: ["Figma", "WIP"],
        coverUrl: null,
        featured: false,
        type: "design",
        status: "draft"
    }
];

export default function StudentProfilePage() {
    return (
        <PortfolioLayout school="eugenia" showBack={true} title="Mon Profil">
            <div className="max-w-5xl mx-auto">

                {/* Profile Header */}
                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 mb-12 relative overflow-hidden">
                    {/* Green Accent Background */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-[#10B981]/5 border-b border-[#10B981]/10" />

                    <div className="relative flex flex-col md:flex-row items-end gap-8 pt-12">
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gray-50 overflow-hidden flex items-center justify-center text-3xl font-bold text-gray-300">
                            JD
                        </div>

                        <div className="flex-1 mb-2">
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-black mb-2">
                                John Doe
                            </h1>
                            <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500 mb-6">
                                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#10B981]" /> M1 Data Science</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#10B981]" /> Paris, France</span>
                            </div>

                            {/* Skills */}
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-gray-50 rounded-lg text-xs font-bold text-gray-600 border border-gray-100">Python</span>
                                <span className="px-3 py-1 bg-gray-50 rounded-lg text-xs font-bold text-gray-600 border border-gray-100">React</span>
                                <span className="px-3 py-1 bg-gray-50 rounded-lg text-xs font-bold text-gray-600 border border-gray-100">TensorFlow</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mb-2">
                            <button className="p-3 rounded-full border border-gray-200 hover:border-[#10B981] hover:text-[#10B981] transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </button>
                            <button className="p-3 rounded-full border border-gray-200 hover:border-[#10B981] hover:text-[#10B981] transition-colors">
                                <Github className="w-5 h-5" />
                            </button>
                            <button className="p-3 rounded-full border border-gray-200 hover:border-[#10B981] hover:text-[#10B981] transition-colors">
                                <Globe className="w-5 h-5" />
                            </button>
                            <button className="px-6 py-3 rounded-full bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-[#10B981] transition-colors flex items-center gap-2 shadow-lg">
                                <Share2 className="w-4 h-4" /> Partager
                            </button>
                        </div>
                    </div>
                </div>

                {/* Projects Section */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-serif font-bold text-black flex items-center gap-3">
                            Mes Projets <span className="text-sm font-sans font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full">{MOCK_PROJECTS.length}</span>
                        </h2>
                        <Link to="/eugenia-school/portfolio/submit" className="text-sm font-bold text-[#10B981] hover:underline">
                            + Nouveau projet
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_PROJECTS.map(proj => (
                            <ProjectCard key={proj.id} project={proj} school="eugenia" isOwner={true} />
                        ))}

                        {/* Add New Card Placeholder */}
                        <Link to="/eugenia-school/portfolio/submit" className="group flex flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-gray-200 hover:border-[#10B981]/50 hover:bg-[#10B981]/5 transition-all aspect-[4/3] md:aspect-auto">
                            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                                <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#10B981]" />
                            </div>
                            <span className="text-sm font-bold text-gray-900">Publier un projet</span>
                        </Link>
                    </div>
                </div>

            </div>
        </PortfolioLayout>
    );
}

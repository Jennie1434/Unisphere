import { useParams } from 'react-router-dom';
import PortfolioLayout from '../../components/portfolio/PortfolioLayout';
import ProjectCard from '../../components/portfolio/ProjectCard'; // For "Similar Projects"
import { Share2, Heart, ExternalLink, Github, Figma, Calendar, Users, Eye, Trophy } from 'lucide-react';

export default function ProjectDetailsPage() {
    const { id } = useParams();
    const school = 'eugenia'; // Dynamic
    const schoolColor = '#671324';

    // Mock Data
    const project = {
        id,
        title: "EcoTrack Mobile App",
        tagline: "Une application mobile pour suivre et réduire son empreinte carbone au quotidien.",
        coverUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        tags: ["UX/UI", "Figma", "React Native"],
        author: { name: "Sarah Meyer", role: "Product Designer", avatar: null },
        team: [
            { name: "Tom R.", role: "Dev" },
            { name: "Léa P.", role: "Data" }
        ],
        date: "Dec 2025",
        views: 1240,
        likes: 85,
        description: {
            objective: "Sensibiliser les étudiants à l'impact écologique de leurs choix de consommation via une interface ludique.",
            whatIDid: [
                "Recherche utilisateur et personas",
                "Wireframing et prototypage haute-fidélité sur Figma",
                "Design System et composants React Native"
            ],
            results: "MVP testé par 50 étudiants, note moyenne de 4.8/5. Réduction estimée de 10% CO2/étudiant.",
            stack: ["Figma", "React Native", "Firebase", "Node.js"]
        },
        links: {
            github: "#",
            figma: "#",
            live: "#"
        }
    };

    return (
        <PortfolioLayout
            school={school}
            showBack={true}
            title={null} // Custom header inside content
        >
            <div className="max-w-4xl mx-auto">
                {/* Project Header */}
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-black/[0.03] text-black/60 text-[10px] font-black uppercase tracking-widest rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-tight mb-6">
                        {project.title}
                    </h1>
                    <p className="text-xl text-black/60 font-medium max-w-2xl mx-auto leading-relaxed">
                        {project.tagline}
                    </p>
                </div>

                {/* Cover Image */}
                <div className="aspect-video w-full bg-gray-100 rounded-[32px] overflow-hidden shadow-2xl shadow-black/5 mb-12 relative border border-black/5">
                    <img src={project.coverUrl} alt={project.title} className="w-full h-full object-cover" />

                    {/* Floating Actions */}
                    <div className="absolute top-6 right-6 flex gap-2">
                        <button className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform text-black">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform text-red-500">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    {/* Left Column: Details */}
                    <div className="md:col-span-8 space-y-12">

                        <section>
                            <h3 className="text-2xl font-bold font-serif text-black mb-4">Objectif</h3>
                            <p className="text-lg text-black/70 leading-relaxed">
                                {project.description.objective}
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold font-serif text-black mb-4">Ce que j'ai fait</h3>
                            <ul className="space-y-3">
                                {project.description.whatIDid.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-black/70 text-lg">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="bg-black/[0.02] rounded-[24px] p-8 border border-black/5">
                            <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-[#DBA12D]" /> Résultats & Impact
                            </h3>
                            <p className="text-black/70 font-medium">
                                {project.description.results}
                            </p>
                        </section>

                    </div>

                    {/* Right Column: Metadata */}
                    <div className="md:col-span-4 space-y-8">
                        {/* Author */}
                        <div className="p-6 rounded-[24px] border border-black/5 bg-white shadow-lg shadow-black/[0.02]">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-[#671324]/10 rounded-full flex items-center justify-center text-[#671324] font-bold">
                                    SM
                                </div>
                                <div>
                                    <div className="font-bold text-black">{project.author.name}</div>
                                    <div className="text-xs text-black/40">{project.author.role}</div>
                                </div>
                            </div>
                            <button
                                className="w-full py-3 rounded-xl border border-black/10 text-xs font-black uppercase tracking-widest hover:bg-black text-black hover:text-white transition-colors"
                            >
                                Voir le profil
                            </button>
                        </div>

                        {/* Team */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-black/40 mb-4">Équipe</h4>
                            <div className="flex -space-x-3">
                                {project.team.map((member, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-black/40" title={`${member.name} - ${member.role}`}>
                                        {member.name.charAt(0)}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-black/40 mb-4">Liens</h4>
                            <div className="space-y-3">
                                <a href={project.links.github} className="flex items-center gap-3 text-sm font-bold text-black hover:text-[#671324] transition-colors">
                                    <Github className="w-5 h-5" /> Code Source
                                </a>
                                <a href={project.links.figma} className="flex items-center gap-3 text-sm font-bold text-black hover:text-[#671324] transition-colors">
                                    <Figma className="w-5 h-5" /> Maquettes Figma
                                </a>
                                <a href={project.links.live} className="flex items-center gap-3 text-sm font-bold text-black hover:text-[#671324] transition-colors">
                                    <ExternalLink className="w-5 h-5" /> Voir le site
                                </a>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-black/5">
                            <div>
                                <span className="block text-[10px] font-black uppercase text-black/30 mb-1">Publié</span>
                                <span className="text-sm font-bold flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.date}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-black uppercase text-black/30 mb-1">Vues</span>
                                <span className="text-sm font-bold flex items-center gap-1"><Eye className="w-3 h-3" /> {project.views}</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </PortfolioLayout>
    );
}

// Importing Trophy icon which was missing in imports

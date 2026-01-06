import CanvasScene from './CanvasScene';

export default function CanvasRevealSection() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#F7F7F5]">
            {/* Text content underneath the canvas */}
            <div className="relative z-0 text-center px-8 max-w-6xl">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-black leading-tight">
                    UniSphere centralise tout :{' '}
                    <span className="text-[#10B981]">projets visibles</span>,{' '}
                    <span className="text-black">assos organisées</span>,{' '}
                    <span className="text-[#10B981]">engagement tracé</span>,{' '}
                    <span className="text-black">portfolio collectif</span>.
                </h2>
                <p className="text-xl md:text-2xl text-black/70 max-w-3xl mx-auto">
                    Révélez la solution en bougeant votre souris
                </p>
            </div>

            {/* Canvas overlay that erases on mouse move */}
            <CanvasScene />
        </section>
    );
}

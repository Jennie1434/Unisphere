export default function ImpactSection() {
  const metrics = [
    {
      value: '500+',
      label: 'Projets réalisés avec succès',
      description: 'Nous créons des sites web et expériences numériques à fort impact pour aider les startups et entreprises à se développer rapidement'
    },
    {
      value: '240%',
      label: 'Augmentation du taux de conversion',
      description: 'Des expériences numériques sur mesure qui valorisent les marques et augmentent les taux de conversion à chaque point de contact.'
    },
    {
      value: '$100M+',
      label: 'Financement seed + série A',
      description: 'Grâce au design stratégique, au marketing et à l\'optimisation des conversions, nous avons aidé les entreprises à se développer plus rapidement.'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-red-600 text-2xl font-bold">//</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Impact</h2>
            <span className="text-red-600 text-2xl font-bold">//</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            CampusPlatform rend les choses simples,
          </h3>
          <p className="text-4xl md:text-5xl font-bold text-gray-600">
            et génère des résultats.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
                {metric.value}
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-4">
                {metric.label}
              </div>
              <p className="text-gray-600 leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


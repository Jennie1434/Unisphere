export default function SuccessStoriesSection() {
  const stories = [
    {
      metric: '2.3x',
      metricLabel: 'augmentation des conversions de leads',
      quote: 'CampusPlatform a complètement redéfini notre présence numérique. Leur approche stratégique du design et leur attention au comportement des utilisateurs ont considérablement boosté notre taux de conversion. Nous sommes passés d\'un simple joli site à un véritable atout performant.',
      author: {
        name: 'Sarah Coleman',
        role: 'Directrice Marketing',
        avatar: '👩'
      },
      logo: 'Google'
    },
    {
      metric: '45%',
      metricLabel: 'Réduction du taux de rebond',
      quote: 'L\'équipe de CampusPlatform ne nous a pas seulement créé une belle plateforme—ils l\'ont rendue rapide, intelligente et incroyablement intuitive. Leurs insights UX et optimisations de performance ont fait une énorme différence pour garder les utilisateurs engagés.',
      author: {
        name: 'Marcus Levine',
        role: 'Cofondateur',
        avatar: '👨'
      },
      logo: 'Startup'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Ils nous font confiance.
          </h2>
          <p className="text-4xl md:text-5xl font-bold text-gray-600">
            Que des success stories.
          </p>
        </div>

        {/* Stories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              {/* Metric */}
              <div className="mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {story.metric}
                </div>
                <div className="text-lg text-gray-600">
                  {story.metricLabel}
                </div>
              </div>

              {/* Quote Icon */}
              <div className="text-red-600 text-6xl mb-6">"</div>

              {/* Quote Text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {story.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                  {story.author.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {story.author.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {story.author.role}
                  </div>
                </div>
                {/* Logo placeholder */}
                <div className="ml-auto text-gray-400 text-sm">
                  {story.logo}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


import React from 'react';

export default function InsightsCards({ insights }) {
  if (!insights) return null;

  const insightCards = [
    {
      icon: '🔥',
      title: 'Momentum du moment',
      text: insights.momentum?.actionType && insights.momentum?.actionType !== 'N/A'
        ? `Les actions "${insights.momentum.actionType}" ont ${insights.momentum.increase > 0 ? 'augmenté' : 'diminué'} de ${Math.abs(insights.momentum.increase || 0)}% cette semaine !`
        : 'Pas assez de données pour calculer le momentum',
      color: 'var(--eugenia-pink)',
    },
    {
      icon: '📅',
      title: 'Jour le plus actif',
      text: insights.busiestDay?.day && insights.busiestDay?.day !== 'N/A'
        ? `${insights.busiestDay.day} est le jour le plus actif (${insights.busiestDay.percentage || 0}% des actions)`
        : 'Pas assez de données pour déterminer le jour le plus actif',
      color: 'var(--eugenia-yellow)',
    },
    {
      icon: '⏰',
      title: 'Heure de pointe',
      text: insights.peakHours?.start
        ? `La majorité des actions sont soumises entre ${insights.peakHours.start}h-${insights.peakHours.end}h`
        : 'Pas assez de données pour déterminer l\'heure de pointe',
      color: 'var(--eugenia-burgundy)',
    },
    {
      icon: '🎓',
      title: 'Classe championne',
      text: insights.topClass?.name && insights.topClass?.name !== 'N/A'
        ? `La classe ${insights.topClass.name} domine avec ${insights.topClass.count || 0} actions ce mois`
        : 'Pas assez de données pour déterminer la classe championne',
      color: 'var(--eugenia-pink)',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {insightCards.map((insight, index) => (
        <div
          key={index}
          className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_#DBA12D] transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl border-2 border-black w-16 h-16 flex items-center justify-center bg-black/5">
              {insight.icon}
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-black mb-2 font-serif italic text-black uppercase tracking-tight">
                {insight.title}
              </h4>
              <p className="text-xs font-bold text-black/60 uppercase tracking-wide leading-relaxed">
                {insight.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


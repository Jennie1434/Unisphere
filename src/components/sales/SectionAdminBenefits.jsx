import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  {
    icon: '📊',
    title: 'Participation',
    value: '+340%',
    description: 'Average engagement increase'
  },
  {
    icon: '👁️',
    title: 'Visibility',
    value: '2.5x',
    description: 'More campus events discovered'
  },
  {
    icon: '⏱️',
    title: 'Time saved',
    value: '15h/week',
    description: 'On manual tracking & coordination'
  }
];

export default function SectionAdminBenefits() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ color: '#0B1220' }}
        >
          For Universities
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center border transition-all"
              style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}
            >
              <div className="text-5xl mb-4">{metric.icon}</div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#2563EB' }}>
                {metric.value}
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0B1220' }}>
                {metric.title}
              </h3>
              <p className="text-gray-600">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}









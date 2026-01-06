import React from 'react';
import { motion } from 'framer-motion';

export default function SectionAssociations() {
  const associations = [
    { emoji: '🎭', name: 'Theater Club' },
    { emoji: '🎵', name: 'Music Society' },
    { emoji: '⚽', name: 'Sports Union' },
    { emoji: '🎨', name: 'Art Collective' },
    { emoji: '🤝', name: 'Volunteer Network' },
    { emoji: '💡', name: 'Innovation Hub' }
  ];

  return (
    <section id="students" className="py-20 px-4" style={{ backgroundColor: '#F7FAFF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mock Associations Board */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
              <h3 className="text-lg font-semibold mb-6" style={{ color: '#0B1220' }}>Campus Associations</h3>
              <div className="grid grid-cols-2 gap-4">
                {associations.map((asso, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-gray-50 rounded-lg border cursor-pointer transition-all"
                    style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}
                  >
                    <div className="text-3xl mb-2">{asso.emoji}</div>
                    <div className="text-sm font-semibold" style={{ color: '#0B1220' }}>{asso.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0B1220' }}>
              Associations Hub
            </h2>
            <ul className="space-y-4 mb-8">
              {[
                "Dedicated profile for each association",
                "Event calendar and announcements",
                "Student recruitment and membership",
                "Centralized campus life directory"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <svg className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="/select-school"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-white text-black border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Explore associations
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}









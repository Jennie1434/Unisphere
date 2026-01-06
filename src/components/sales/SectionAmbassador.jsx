import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SectionAmbassador() {
  const [points, setPoints] = useState(0);
  const targetPoints = 1250;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetPoints / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetPoints) {
        setPoints(targetPoints);
        clearInterval(timer);
      } else {
        setPoints(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="universities" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0B1220' }}>
              Ambassador Program
            </h2>
            <ul className="space-y-4 mb-8">
              {[
                "Create and assign missions (JPO, events, content)",
                "Track points and validate submissions",
                "Real-time leaderboards and rankings",
                "Gamification with levels and rewards"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <svg className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="inline-block px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Request access
            </motion.a>
          </motion.div>

          {/* Mock Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 border"
            style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg" style={{ color: '#0B1220' }}>Dashboard</h3>
                <div className="px-3 py-1 bg-blue-50 rounded-full">
                  <span className="text-sm font-semibold text-blue-600">{points} pts</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { name: "Mission: JPO Spring 2025", points: "+50 pts", status: "completed" },
                { name: "Social Post: Campus Life", points: "+25 pts", status: "completed" },
                { name: "Event Support: Tech Fair", points: "+75 pts", status: "pending" }
              ].map((mission, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className={`p-4 rounded-lg border ${
                    mission.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm" style={{ color: '#0B1220' }}>
                      {mission.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-600">{mission.points}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(15, 23, 42, 0.08)' }}>
              <div className="text-sm text-gray-600 mb-2">Leaderboard Rank</div>
              <div className="text-2xl font-bold" style={{ color: '#0B1220' }}>#12</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}









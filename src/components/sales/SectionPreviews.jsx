import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import GlassCard from '../ui/GlassCard';

const previews = [
  {
    title: "Mission templates",
    description: "Pre-built templates for JPO, events, and content creation",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    title: "Ambassador toolkit",
    description: "Resources, guidelines, and mission tracking in one place",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    title: "Association profiles & events",
    description: "Modern profiles with event calendars and recruitment tools",
    gradient: "from-green-500 to-green-600"
  }
];

export default function SectionPreviews() {
  return (
    <Section background="default">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 tracking-tight"
        style={{ color: 'var(--glass-text-primary)' }}
      >
        See UniSphere in action
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {previews.map((preview, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <GlassCard className="overflow-hidden p-0 h-full">
              {/* Preview Label */}
              <div className="absolute top-4 right-4 z-10">
                <span className="glass-pill text-xs font-semibold">
                  Preview
                </span>
              </div>

              {/* Blurred Preview Area */}
              <div className={`h-64 bg-gradient-to-br ${preview.gradient} relative overflow-hidden`}>
                {/* Simulated UI elements with blur */}
                <div className="absolute inset-0 p-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-3 h-12"></div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 mb-2 h-8 w-3/4"></div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 mb-2 h-8 w-2/3"></div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 h-16"></div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 h-16"></div>
                  </div>
                </div>
                {/* Blur overlay */}
                <div className="absolute inset-0 backdrop-blur-md bg-white/10"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--glass-text-primary)' }}>
                  {preview.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--glass-text-secondary)' }}>
                  {preview.description}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

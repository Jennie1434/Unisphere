import React from 'react';
import { motion } from 'framer-motion';

export default function Pill({
  children,
  className = '',
  active = false,
  onClick,
  index = 0,
  ...props
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        px-5 py-2.5 rounded-full
        text-sm font-bold
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-eugenia-green focus:ring-offset-2
        ${active
          ? 'bg-eugenia-green text-black shadow-lg'
          : 'bg-eugenia-green/10 text-black border border-eugenia-green/20 hover:bg-eugenia-green/20 hover:border-eugenia-green/40'
        }
        ${className}
      `}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={!active ? { y: -1 } : {}}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

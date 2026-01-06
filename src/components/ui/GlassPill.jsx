import React from 'react';
import { motion } from 'framer-motion';

export default function GlassPill({ 
  children, 
  className = '',
  ...props 
}) {
  return (
    <motion.div
      className={`glass-pill ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}





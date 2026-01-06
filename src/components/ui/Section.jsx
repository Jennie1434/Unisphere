import React from 'react';
import { motion } from 'framer-motion';
import Container from './Container';

export default function Section({ 
  children, 
  id,
  className = '',
  background = 'default',
  containerSize = 'xl',
  ...props 
}) {
  const backgroundClasses = {
    default: 'bg-[var(--color-bg-paper)]',
    white: 'bg-white',
    transparent: 'bg-transparent'
  };

  return (
    <motion.section
      id={id}
      className={`py-24 md:py-32 ${backgroundClasses[background]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </motion.section>
  );
}

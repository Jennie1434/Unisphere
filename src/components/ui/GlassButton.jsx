import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function GlassButton({ 
  children, 
  variant = 'primary',
  href,
  to,
  onClick,
  className = '',
  ...props 
}) {
  const baseClasses = 'glass-button inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'glass-button-primary',
    secondary: 'glass-button-secondary',
    glass: 'glass-button-glass'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const buttonContent = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative z-10"
    >
      {children}
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {buttonContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {buttonContent}
    </button>
  );
}





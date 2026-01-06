import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  className = '',
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-[var(--eugenia-green)] text-black hover:opacity-90 shadow-md hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-white text-[var(--premium-text-primary)] border border-[var(--color-border)] hover:bg-[#F7F7F5] shadow-sm hover:shadow-md',
    ghost: 'text-[var(--premium-text-primary)] hover:text-[var(--eugenia-green)] hover:bg-[#F7F7F5]'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const buttonContent = (
    <motion.span
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
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





import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'fill' | 'outline' | 'ghost';
  color?: 'primary' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'fill',
  color = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const variants = {
    fill: {
      primary: "bg-secondary text-white hover:bg-secondary/90", // Using secondary (pink) for primary actions usually
      white: "bg-white text-heading hover:bg-gray-100",
      dark: "bg-heading text-white hover:bg-heading/90",
    },
    outline: {
      primary: "border-2 border-secondary text-secondary hover:bg-secondary/10",
      white: "border-2 border-white/30 text-white hover:bg-white/10",
      dark: "border-2 border-heading/30 text-heading hover:bg-heading/10",
    },
    ghost: {
      primary: "text-secondary hover:bg-secondary/10",
      white: "text-white hover:bg-white/10",
      dark: "text-heading hover:bg-heading/10",
    },
  };

  return (
    <button
      className={clsx(
        baseStyles,
        sizes[size],
        variants[variant][color],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-action text-white hover:bg-action-hover': variant === 'primary',
          'border-2 border-gray-200 text-primary hover:border-action hover:text-action': variant === 'outline',
          'text-primary hover:text-action': variant === 'ghost',
          
          'px-6 py-2 text-sm': size === 'sm',
          'px-8 py-3 text-lg': size === 'md',
          'px-10 py-4 text-xl': size === 'lg',
          
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
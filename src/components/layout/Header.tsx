import React from 'react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-50 py-6 px-4 md:px-8 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-heading tracking-tight">Startup 3</Link>
      
      <nav className="hidden md:flex gap-8 text-lg font-medium text-heading">
        <Link to="/" className="hover:text-action transition-colors">Home</Link>
        <Link to="/post" className="hover:text-action transition-colors">Features</Link>
        <a href="#" className="hover:text-action transition-colors">Pricing</a>
        <a href="#" className="hover:text-action transition-colors">Blog</a>
        <a href="#" className="hover:text-action transition-colors">Behance</a>
      </nav>

      <div className="flex gap-4">
        <Link to="/login" className="text-heading font-medium hover:text-action py-2 px-4">Sign In</Link>
        <Button size="sm">Sign Up</Button>
      </div>
    </header>
  );
};
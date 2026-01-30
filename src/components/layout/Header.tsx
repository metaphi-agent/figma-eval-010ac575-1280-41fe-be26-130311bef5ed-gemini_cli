import React from 'react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-50 py-8 px-4 sm:px-8 lg:px-20 flex justify-between items-center text-white">
      <Link to="/" className="text-2xl font-bold tracking-tight">Startup 3</Link>
      
      <nav className="hidden md:flex gap-8 text-lg font-medium opacity-80">
        <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
        <Link to="/page-2" className="hover:opacity-100 transition-opacity">Features</Link>
        <a href="#" className="hover:opacity-100 transition-opacity">Pricing</a>
        <a href="#" className="hover:opacity-100 transition-opacity">Blog</a>
        <a href="#" className="hover:opacity-100 transition-opacity">Behance</a>
      </nav>

      <div className="flex gap-4">
        <Button variant="ghost" color="white" size="sm" className="hidden sm:inline-flex">Sign In</Button>
        <Button variant="fill" color="primary" size="sm" className="rounded-full !bg-blue-500 hover:!bg-blue-600">Purchase</Button>
      </div>
    </header>
  );
};

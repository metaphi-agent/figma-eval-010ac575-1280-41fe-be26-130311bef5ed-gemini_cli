import React from 'react';
import { FaTwitter, FaFacebookF, FaGoogle } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-20 px-4 md:px-8 border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-heading font-bold text-2xl">Startup 3</div>
        
        <div className="text-primary/60 text-center md:text-left">
          © 2026 Designmodo. All rights reserved.
        </div>
        
        <div className="flex gap-6 items-center">
          <a href="#" className="text-heading font-medium hover:text-action">Privacy Policy</a>
          <a href="#" className="text-heading font-medium hover:text-action">Terms</a>
          <div className="flex gap-4 ml-4">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-primary hover:bg-action hover:text-white transition-colors"><FaTwitter size={14} /></a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-primary hover:bg-action hover:text-white transition-colors"><FaFacebookF size={14} /></a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-primary hover:bg-action hover:text-white transition-colors"><FaGoogle size={14} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
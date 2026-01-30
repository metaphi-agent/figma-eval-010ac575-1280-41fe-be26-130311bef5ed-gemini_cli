import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-20 px-4 sm:px-8 lg:px-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-heading font-bold text-2xl">Startup 3</div>
        
        <div className="text-text-light text-center md:text-left">
          © 2026 Designmodo. All rights reserved.
        </div>
        
        <div className="flex gap-6 text-heading font-medium">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">tw</span>
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">fb</span>
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">gl</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

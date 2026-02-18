import React from 'react';
import { Link } from 'react-router-dom';

interface MiniPostProps {
  title: string;
  date: string;
  image: string;
}

export const MiniPost: React.FC<MiniPostProps> = ({ title, date, image }) => (
  <Link to="/" className="flex items-center space-x-4 mb-6 group cursor-pointer">
    <div className="w-24 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
    </div>
    <div>
      <h5 className="font-bold text-heading leading-tight mb-1 group-hover:text-action transition-colors line-clamp-2">{title}</h5>
      <div className="text-xs text-gray-400 uppercase tracking-wider">{date}</div>
    </div>
  </Link>
);
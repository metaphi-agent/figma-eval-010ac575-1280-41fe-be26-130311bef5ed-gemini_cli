import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <div className="relative bg-primary min-h-[800px] flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-b-[40px]">
        <Header />
        
        {/* Background Mask/Blob */}
        <div className="absolute inset-0 bg-primary z-0"></div>
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 transform origin-top-right"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto pt-20">
          <h5 className="text-white/70 tracking-widest uppercase font-bold text-sm mb-6">STARTUP 3</h5>
          <h1 className="text-white text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Forget About Code
          </h1>
          <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Startup Framework gives you complete freedom over your creative process — you don't have to think about any technical aspects. There are no limits and absolutely no coding.
          </p>
          <Button variant="fill" color="primary" size="lg" className="rounded-full !bg-[#482BE7] px-12 text-lg shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1">
            Create an Account
          </Button>
        </div>

        {/* User Card - Floating Element */}
        <div className="relative z-10 mt-20 bg-white rounded-xl shadow-2xl p-6 flex items-center gap-6 max-w-md mx-auto transform rotate-[-2deg]">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
             {/* Placeholder for user image */}
             <div className="w-full h-full bg-gray-300"></div>
          </div>
          <div className="text-left">
            <div className="text-heading font-bold text-lg">Gene Whitfield</div>
            <div className="text-text-light text-sm">@genewhitfield</div>
          </div>
          <div className="ml-auto text-primary font-bold">
             Follow
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-24 px-4 sm:px-8 lg:px-20 max-w-7xl mx-auto">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
               <h3 className="text-secondary font-bold uppercase tracking-wider mb-4">FREE SAMPLE</h3>
               <h2 className="text-heading text-4xl font-bold mb-6">Powerful Generator and Free Figma Sources</h2>
               <p className="text-text-light text-lg mb-8 leading-relaxed">
                  Startup Framework contains components and complex blocks which can easily be integrated into almost any design. All of the components are made in the same style, and can easily be integrated into projects, allowing you to create hundreds of solutions.
               </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
               <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full mb-6 flex items-center justify-center text-primary">
                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
                  </div>
                  <h4 className="text-heading font-bold text-xl mb-2">Components</h4>
                  <p className="text-text-light">Lots of components for every taste and color.</p>
               </div>
               <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow mt-8">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full mb-6 flex items-center justify-center text-secondary">
                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
                  </div>
                  <h4 className="text-heading font-bold text-xl mb-2">Complex</h4>
                  <p className="text-text-light">Many complex blocks for different purposes.</p>
               </div>
            </div>
         </div>
      </div>

      <Footer />
    </div>
  );
};

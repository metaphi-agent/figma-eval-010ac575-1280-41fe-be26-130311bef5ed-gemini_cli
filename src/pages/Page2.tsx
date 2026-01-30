import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';

export const Page2: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
       {/* Dark Header Background for Page 2 */}
      <div className="bg-primary pb-32">
        <Header />
        <div className="pt-32 pb-10 text-center text-white px-4">
           <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest Updates</h1>
           <p className="opacity-80 text-lg max-w-2xl mx-auto">Stay up to date with the newest features and releases from Startup Framework.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 -mt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-8">
             {/* Featured Article */}
             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 w-full relative">
                   <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">Technology</div>
                </div>
                <div className="p-8">
                   <h2 className="text-2xl font-bold text-heading mb-4 hover:text-primary transition-colors cursor-pointer">
                      Startup Framework is the best way to start your project
                   </h2>
                   <p className="text-text-light mb-6 leading-relaxed">
                      We haven't forgotten about responsive layout. With Startup Framework, you can create a website that looks great on any device.
                   </p>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                         <div className="text-sm">
                            <div className="text-heading font-bold">Rupert Doan</div>
                            <div className="text-text-light">10 min read</div>
                         </div>
                      </div>
                      <Button variant="ghost" color="primary" size="sm">Read more</Button>
                   </div>
                </div>
             </div>

             {/* Secondary Articles */}
             <div className="grid md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                   <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-6">
                         <h3 className="text-xl font-bold text-heading mb-3 line-clamp-2">
                            Better, faster and more beautiful
                         </h3>
                         <p className="text-text-light text-sm mb-4 line-clamp-3">
                            Many complex blocks for different purposes.
                         </p>
                         <Button variant="outline" color="dark" size="sm" className="w-full">Read</Button>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
             {/* Subscribe Form */}
             <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-heading font-bold text-xl mb-2">Subscribe</h3>
                <p className="text-text-light text-sm mb-6">Get the latest news and updates.</p>
                <div className="space-y-4">
                   <input type="email" placeholder="Your email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                   <Button variant="fill" color="primary" fullWidth>Subscribe</Button>
                </div>
             </div>

             {/* Last Seen / Top Posts */}
             <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-heading font-bold text-xl mb-6">Most Popular</h3>
                <div className="space-y-6">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4 group cursor-pointer">
                         <div className="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0"></div>
                         <div>
                            <h4 className="text-heading font-bold text-sm mb-1 group-hover:text-primary transition-colors">7 Rules of Effective Web Design</h4>
                            <span className="text-text-light text-xs">2 hours ago</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

        </div>
      </div>
      <div className="h-20"></div>
      <Footer />
    </div>
  );
};

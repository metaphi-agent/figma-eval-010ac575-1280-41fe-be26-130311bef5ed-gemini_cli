import React from 'react';
import { FaTwitter, FaFacebookF, FaMediumM, FaDotCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BlogPost = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section / Header */}
      <div className="relative pt-20 pb-10 px-4 md:px-0">
         <div className="max-w-4xl mx-auto text-center">
            <div className="text-sm font-bold tracking-widest text-white uppercase mb-4 bg-action inline-block px-3 py-1 rounded-full">
              Splashproof Design
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-heading leading-tight mb-8">
              How To Protect Computer.<br />Very Useful Tips
            </h1>
            
            {/* Author Block */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src="./assets/images/user-avatar.png" 
                  alt="Author" 
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="text-left">
                  <div className="text-heading font-bold text-xl">Noah Buscher</div>
                  <div className="text-gray-400 text-sm">Product Designer</div>
                </div>
              </div>
              
              <div className="flex space-x-4 text-gray-300">
                <a href="#" className="hover:text-action transition-colors"><FaTwitter /></a>
                <a href="#" className="hover:text-action transition-colors"><FaFacebookF /></a>
                <a href="#" className="hover:text-action transition-colors"><FaMediumM /></a>
              </div>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 md:px-0">
        <h3 className="text-4xl font-bold text-heading mb-6 mt-12">Branding</h3>
        
        <p className="text-primary/60 text-lg leading-relaxed mb-8">
          This sounded nonsense to Alice, so she said nothing, but set off at once toward the Red Queen. To her surprise, she lost sight of her in a moment, and found herself walking in at the front-door again.
        </p>

        <p className="text-primary/60 text-lg leading-relaxed mb-8">
          For some minutes Alice stood without speaking, looking out in all directions over the country - and a most curious country it was. There were a number of tiny little brooks running straight across it from side to side, and the ground between was divided up into squares by a number of little.
        </p>

        <h3 className="text-2xl font-bold text-heading mb-4 mt-12">Perfect for Your</h3>
        
        <p className="text-primary/60 text-lg leading-relaxed mb-8">
          She gave my mother such a turn, that I have always been convinced I am indebted to Miss Betsey for having been born on a Friday. The word was appropriate to the moment.
        </p>

        <div className="my-12">
          <img 
            src="./assets/images/article-hero.png" 
            alt="Workspace" 
            className="w-full h-auto rounded-lg shadow-md"
            loading="lazy"
          />
        </div>

        <h3 className="text-sm font-bold tracking-widest text-primary/40 uppercase mb-4 mt-12">
          There have not been any since
        </h3>
        
        <h3 className="text-2xl font-bold text-heading mb-4">The Fall Report</h3>

        <p className="text-primary/60 text-lg leading-relaxed mb-8">
          This sounded nonsense to Alice, so she said nothing, but set off at once toward the Red Queen. To her surprise, she lost sight of her in a moment, and found herself walking in at the front-door again.
        </p>

        {/* List items with icons */}
        <div className="space-y-6 mb-8">
            <div className="flex items-start">
                <FaDotCircle className="text-heading mt-1.5 mr-4 flex-shrink-0" />
                <p className="text-lg font-medium text-heading">
                    Thus much I thought proper to tell you in relation to yourself, and to the trust I reposed in you.
                </p>
            </div>
            <div className="flex items-start">
                <FaDotCircle className="text-heading mt-1.5 mr-4 flex-shrink-0" />
                <p className="text-lg font-medium text-heading">
                    So saying he unbuckled his baldric with the bugle, took a feather from his cap, and gave them to Wamba.
                </p>
            </div>
        </div>
        
         <p className="text-primary/60 text-lg leading-relaxed mb-8">
          She gave my mother such a turn, that I have always been convinced I am indebted to Miss Betsey for having been born on a Friday. The word was appropriate to the moment.
        </p>

      </div>
    </div>
  );
};

export default BlogPost;

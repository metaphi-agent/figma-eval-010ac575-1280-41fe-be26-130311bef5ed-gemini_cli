import React from 'react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const MiniPost = ({ title, date }: { title: string; date: string }) => (
  <div className="flex items-center space-x-4 mb-6 group cursor-pointer">
    <div className="w-24 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
        <img src="https://placehold.co/100x80/e2e8f0/1e0e62?text=Post" alt="Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
    </div>
    <div>
      <h5 className="font-bold text-heading leading-tight mb-1 group-hover:text-action transition-colors">{title}</h5>
      <div className="text-xs text-gray-400 uppercase tracking-wider">{date}</div>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="bg-white min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content (Left Column) */}
          <div className="lg:w-2/3">
            <article className="mb-20">
                <div className="flex items-center space-x-2 text-sm font-bold tracking-widest text-primary/40 uppercase mb-4">
                    <span>20 December</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-heading leading-tight mb-8">
                    <Link to="/post" className="hover:text-action transition-colors">
                        To these in the morning I sent the lead who was to enter the hole
                    </Link>
                </h2>
                
                <div className="prose prose-lg text-primary/60 mb-8">
                    <p className="mb-6">
                        This sounded nonsense to Alice, so she said nothing, but set off at once toward the Red Queen. To her surprise, she lost sight of her in a moment, and found herself walking in at the front-door again.
                    </p>
                    <p className="mb-6">
                        For some minutes Alice stood without speaking, looking out in all directions over the country - and a most curious country it was.
                    </p>
                </div>

                <h3 className="text-2xl font-bold text-heading mb-4">Perfect for Your</h3>
                <p className="text-primary/60 text-lg mb-8">
                    The method is this: in an acre of ground you bury, at six inches distance and eight deep, a quantity of acorns, dates, chestnuts, and other mast or vegetables, whereof these animals are fondest then you drive.
                </p>

                <figure className="mb-10">
                    <img src="./assets/images/post-image-2.png" alt="Article visual" className="w-full rounded-lg shadow-sm mb-2" />
                    <figcaption className="text-sm text-gray-400">photo by Denis</figcaption>
                </figure>

                <p className="text-primary/60 text-lg mb-8">
                    The tattered remains of a checked curtain were drawn round the bed's head, to exclude the wind, which, however, made its way into the comfortless room through the numerous chinks in the door.
                </p>

                <figure className="mb-10">
                    <img src="./assets/images/post-image-1.png" alt="Article visual" className="w-full rounded-lg shadow-sm mb-2" />
                    <figcaption className="text-sm text-gray-400">photo by Denis</figcaption>
                </figure>

                <p className="text-primary/60 text-lg mb-8">
                    When the last 'natural' had been declared, and the profit and loss account of fish and sixpences adjusted, to the satisfaction of all parties, Mr. Bob Sawyer rang for supper, and the visitors squeezed.
                </p>
            </article>

            {/* Pagination / Load More */}
            <div className="flex justify-center">
                <Button variant="primary" size="lg" className="rounded-full">Load More</Button>
            </div>
          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:w-1/3 space-y-16">
            
            {/* Last Seen */}
            <div>
                <h4 className="text-sm font-bold tracking-widest text-primary/40 uppercase mb-8">Last Seen</h4>
                <div className="space-y-2">
                    <MiniPost title="There have not been any since we left" date="20 Dec" />
                    <MiniPost title="Whatever the case may be, I am not" date="18 Dec" />
                    <MiniPost title="It was a long difficult week for me" date="15 Dec" />
                    <MiniPost title="We have a lot of things to do" date="12 Dec" />
                    <MiniPost title="I have been working on this for a long time" date="10 Dec" />
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-50 p-8 rounded-2xl border-2 border-gray-100">
                <h4 className="text-xl font-bold text-heading mb-2">Newsletter</h4>
                <p className="text-primary/60 mb-6">Get our news earlier, let’s get in touch.</p>
                
                <div className="flex gap-2">
                    <input 
                        type="email" 
                        placeholder="Your email" 
                        className="flex-1 bg-white border-2 border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-action transition-colors"
                    />
                    <Button size="sm" className="!px-6">Join</Button>
                </div>
            </div>

            {/* Most Popular */}
            <div>
                <h4 className="text-sm font-bold tracking-widest text-primary/40 uppercase mb-8">Most Popular</h4>
                <div className="space-y-2">
                    <MiniPost title="There have not been any since we left" date="20 Dec" />
                    <MiniPost title="Whatever the case may be, I am not" date="18 Dec" />
                    <MiniPost title="It was a long difficult week for me" date="15 Dec" />
                    <MiniPost title="We have a lot of things to do" date="12 Dec" />
                    <MiniPost title="I have been working on this for a long time" date="10 Dec" />
                </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

function App() {
  return (
    <Router basename="./">
      <div className="min-h-screen bg-white font-dm-sans text-primary flex flex-col">
        <Header />
        <main className="flex-grow pt-20">
            <Suspense fallback={<div className="flex h-[50vh] items-center justify-center">Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<BlogPost />} />
            </Routes>
            </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Page2 } from './pages/Page2';

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page-2" element={<Page2 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import ToolPage from './pages/ToolPage.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Privacy from './pages/Privacy.tsx';
import Sitemap from './pages/Sitemap.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/sitemap" element={<Sitemap />} />
          {/* Flat URL structure for tools */}
          <Route path="/:toolId" element={<ToolPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
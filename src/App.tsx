import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './layout/Layout';
import About from './pages/About';
import Contact from './pages/Contact';
import Posters from './pages/Posters/PostersPage'
import PosterDetailPage from './pages/PosterDetail/PosterDetailPage'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/posters" element={<Layout><Posters /></Layout>} />
        <Route path="/posters/:designName" element={<Layout><PosterDetailPage /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './layout/Layout';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Posters from './pages/posters/PostersPage'
import PosterDetailPage from './pages/posterDetail/PosterDetailPage'
import CheckoutPage from './pages/checkout/CheckoutPage';
import { Bounce, ToastContainer } from 'react-toastify';
const App: React.FC = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/posters" element={<Layout><Posters /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posters/:designId" element={<Layout><PosterDetailPage /></Layout>} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
    <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
    </>
  );
};

export default App;
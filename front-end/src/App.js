import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import About from './pages/About';
import Artists from './pages/Artists';
import ArtistApply from "./pages/ArtistApply";
import Guests from './pages/Guests';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artist-apply" element={<ArtistApply />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

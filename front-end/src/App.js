import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Artists from './pages/Artists';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import ArtistApply from "./pages/ArtistApply";
import Guests from './pages/Guests';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Shop from './pages/Shop';
import PaintingDetail from './pages/PaintingDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import EventDetail from './pages/EventDetail';
import ArtistDetail from './pages/ArtistDetail';
import GuestDetail from './pages/GuestDetail';

import './index.css';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!isAdminPath && <Navbar />}
      <div className={isAdminPath ? "admin-content" : "main-content"}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/artists" element={<PageWrapper><Artists /></PageWrapper>} />
            <Route path="/artists/:id" element={<PageWrapper><ArtistDetail /></PageWrapper>} />
            <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
            <Route path="/events/:id" element={<PageWrapper><EventDetail /></PageWrapper>} />
            <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
            <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
            <Route path="/shop/:id" element={<PageWrapper><PaintingDetail /></PageWrapper>} />
            <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
            <Route path="/order-confirmation" element={<PageWrapper><OrderConfirmation /></PageWrapper>} />
            <Route path="/artist-apply" element={<PageWrapper><ArtistApply /></PageWrapper>} />
            <Route path="/guests" element={<PageWrapper><Guests /></PageWrapper>} />
            <Route path="/guests/:id" element={<PageWrapper><GuestDetail /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </AnimatePresence>
      </div>
      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;

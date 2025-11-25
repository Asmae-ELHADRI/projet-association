import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <a href="/">
          <img src="/images/logo1.png" alt="L’Orientale Espace" className="logo-image" />
        </a>
      </div>

      <ul className="navbar-links">
        <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Accueil</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>À propos</NavLink></li>
        <li><NavLink to="/artists" className={({ isActive }) => isActive ? "active-link" : ""}>Nos artistes</NavLink></li>
        <li><NavLink to="/guests" className={({ isActive }) => isActive ? "active-link" : ""}>Nos invités</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contactez-nous</NavLink></li>
      </ul>

      <div className="navbar-admin">
        <Link to="/admin">Se connecter</Link>
      </div>
    </nav>
  );
};

export default Navbar;

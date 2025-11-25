import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        if (window.scrollY > 50) {
          footerRef.current.classList.add('scrolled');
        } else {
          footerRef.current.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">
        {/* Contact */}
        <div className="footer-column">
          <h4 className="footer-title">Contact</h4>
          <p>L’Orientale Espace – Berkane</p>
          <p>Email : <a href="mailto:Orientalespace@gmail.com">Orientalespace@gmail.com</a></p>
          <p>Téléphone : <a href="tel:+21270123434">+212 70 12 34 34</a></p>
        </div>


        {/* Navigation */}
        <div className="footer-column">
          <h4 className="footer-title">Navigation</h4>
          <ul className="footer-links">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Accueil</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>À propos</NavLink></li>
            <li><NavLink to="/artists" className={({ isActive }) => isActive ? "active-link" : ""}>Nos artistes</NavLink></li>
            <li><NavLink to="/guests" className={({ isActive }) => isActive ? "active-link" : ""}>Nos invités</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contactez-nous</NavLink></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div className="footer-column social-icons">
          <h4 className="footer-title">Suivez-nous</h4>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
        </div>
      </div>

      <div className="footer-copy">© 2025 L’Orientale Espace. Tous droits réservés.</div>
    </footer>
  );
};

export default Footer;

import { Link, NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Mail, MapPin, Phone } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/images/logo1.png" alt="L’Orientale Espace" className="footer-logo" />
          <p>L'Orientale Espace est un carrefour culturel dédié à la promotion des arts et à l'épanouissement de la créativité à Berkane.</p>
          <div className="social-links">
            <a href="#" className="social-link"><FaFacebookF /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
            <a href="#" className="social-link"><FaTwitter /></a>
            <a href="#" className="social-link"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Navigation</h4>
          <ul>
            <li><NavLink to="/">Accueil</NavLink></li>
            <li><NavLink to="/about">À propos</NavLink></li>
            <li><NavLink to="/artists">Nos artistes</NavLink></li>
            <li><NavLink to="/guests">Nos invités</NavLink></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Communauté</h4>
          <ul>
            <li><NavLink to="/artist-apply">Rejoindre l'association</NavLink></li>
            <li><NavLink to="/contact">Contactez-nous</NavLink></li>
            <li><NavLink to="/admin">Espace Admin</NavLink></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p><MapPin size={20} /> Avenue Mohammed V, Berkane, Maroc</p>
          <p><Mail size={20} /> contact@orientale-espace.ma</p>
          <p><Phone size={20} /> +212 5 36 61 XX XX</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} L’Orientale Espace. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  User,
  Palette,
  Calendar,
  Image as ImageIcon,
  Info,
  Mail,
  Users
} from 'lucide-react';
import { cn } from '../lib/utils';
import { getCart } from '../services/cart';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update cart count on mount and periodically (or you could use an event emitter/context)
  useEffect(() => {
    const updateCount = () => {
      const items = getCart();
      const count = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(count);
    };
    updateCount();
    // In a real app, use a Context or Redux. Here we just poll or rely on navigation.
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const navLinks = [
    { name: 'Accueil', path: '/', exact: true },
    {
      name: 'L\'Exposition',
      dropdown: true,
      items: [
        { name: 'Galerie Digitale', path: '/gallery', icon: ImageIcon },
        { name: 'Boutique Collection', path: '/shop', icon: ShoppingBag },
        { name: 'Événements & Vernissages', path: '/events', icon: Calendar },
      ]
    },
    {
      name: 'Communauté',
      dropdown: true,
      items: [
        { name: 'Nos Artistes', path: '/artists', icon: Users },
        { name: 'Artistes Invités', path: '/guests', icon: User },
        { name: 'Devenir Membre', path: '/artist-apply', icon: Palette },
      ]
    },
    { name: 'À Propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "navbar",
        scrolled ? "scrolled" : "",
        isHome ? "on-home" : ""
      )}
    >
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/images/logo1.png" alt="L’Orientale Espace" />
          <div className="logo-text-premium secondary">L'Orientale <span>Espace</span></div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex navbar-links">
          {navLinks.map((link, index) => (
            <li key={index}
              className="relative group"
              onMouseEnter={() => !link.dropdown && setActiveDropdown(null)}
            >
              {link.dropdown ? (
                <div
                  className="dropdown-trigger"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className={cn("nav-link flex items-center gap-1", activeDropdown === link.name ? "active" : "")}>
                    {link.name}
                    <ChevronDown size={14} className={cn("transition-transform", activeDropdown === link.name ? "rotate-180" : "")} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="dropdown-menu-premium"
                      >
                        <div className="dropdown-glow"></div>
                        {link.items.map((item, idx) => (
                          <NavLink
                            key={idx}
                            to={item.path}
                            className="dropdown-item-premium"
                          >
                            <div className="icon-box-premium">
                              {item.icon && <item.icon size={18} />}
                            </div>
                            <div className="item-text-premium">
                              <span className="it-title">{item.name}</span>
                            </div>
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) => cn("nav-link", isActive ? "active" : "")}
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="navbar-actions">
          <NavLink to="/cart" className="action-btn-premium cart-btn">
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="cart-badge-premium">{cartCount}</span>
            )}
          </NavLink>

          <Link to="/admin" className="action-btn-premium admin-btn">
            <User size={22} strokeWidth={1.5} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle-premium"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="mobile-menu"
          >
            <div className="mobile-menu-inner">
              <ul className="mobile-links">
                {navLinks.map((link, index) => (
                  <li key={index} className="mobile-item">
                    {link.dropdown ? (
                      <div className="mobile-dropdown-premium">
                        <button
                          onClick={() => toggleDropdown(link.name)}
                          className={cn("mobile-link serif", activeDropdown === link.name ? "active" : "")}
                        >
                          {link.name}
                          <ChevronDown size={24} className={cn("transition-transform", activeDropdown === link.name ? "rotate-180" : "")} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mobile-dropdown-content-premium"
                            >
                              {link.items.map((item, idx) => (
                                <NavLink key={idx} to={item.path} className="mobile-sublink-premium">
                                  {item.icon && <item.icon size={18} />}
                                  <span>{item.name}</span>
                                </NavLink>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <NavLink to={link.path} className="mobile-link serif">
                        {link.name}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mobile-menu-footer">
                <div className="footer-line mb-4"></div>
                <p className="text-muted small">© 2026 L'Orientale Espace. Tous droits réservés.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

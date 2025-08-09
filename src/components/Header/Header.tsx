import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="container">
        <nav className="nav" role="navigation" aria-label="Main navigation">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="logo"
          >
            <a href="#hero" onClick={() => handleNavClick('#hero')} aria-label="Go to top of page">
              <span className="logo-text">Frontend</span>
              <span className="logo-accent">Dev</span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="nav-list hide-mobile"
            role="menubar"
          >
            {navItems.map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                role="none"
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="nav-link"
                  role="menuitem"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button hide-desktop"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Mobile Navigation */}
          <motion.div
            className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
            id="mobile-menu"
            initial={false}
            animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="mobile-nav-list" role="menu">
              {navItems.map((item) => (
                <li key={item.href} role="none">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="mobile-nav-link"
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

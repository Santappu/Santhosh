import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/santhosh-achary-354975a1/',
      icon: '💼',
      ariaLabel: 'Visit my LinkedIn profile'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Santappu',
      icon: '💻',
      ariaLabel: 'Visit my GitHub profile'
    },
    {
      name: 'Email',
      url: 'mailto:santappumac@gmail.com',
      icon: '📧',
      ariaLabel: 'Send me an email'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleQuickLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="brand-content"
              >
                <h3 className="brand-title">
                  <span className="brand-text">Frontend</span>
                  <span className="brand-accent">Dev</span>
                </h3>
                <p className="brand-tagline">
                  Crafting accessible and performant web experiences with 12+ years of expertise.
                </p>
              </motion.div>
            </div>

            <div className="footer-links">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="links-section"
              >
                <h4>Quick Links</h4>
                <nav aria-label="Footer navigation">
                  <ul className="quick-links">
                    {quickLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleQuickLinkClick(link.href);
                          }}
                          className="footer-link"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="links-section"
              >
                <h4>Connect</h4>
                <div className="social-links" role="list" aria-label="Social media links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target={social.name !== 'Email' ? '_blank' : undefined}
                      rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                      className="social-link"
                      aria-label={social.ariaLabel}
                      role="listitem"
                    >
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-name">{social.name}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="footer-bottom"
          >
            <div className="footer-info">
              <p className="copyright">
                © {currentYear} Frontend Developer Portfolio. All rights reserved.
              </p>
              <p className="built-with">
                Built with React, TypeScript & lots of ☕
              </p>
            </div>

            <div className="footer-actions">
              <button
                onClick={handleScrollToTop}
                className="scroll-to-top"
                aria-label="Scroll to top of page"
              >
                <span className="scroll-icon">↑</span>
                <span className="scroll-text">Back to Top</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Accessibility Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="accessibility-statement"
        >
          <p>
            This website is built with accessibility in mind, following WCAG 2.1 AA guidelines. 
            If you encounter any accessibility issues, please{' '}
            <a href="mailto:hello@frontenddev.com" className="accessibility-link">
              contact me
            </a>
            {' '}and I'll address them promptly.
          </p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="footer-decoration">
        <div className="decoration-line"></div>
        <div className="decoration-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

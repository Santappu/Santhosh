import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero: React.FC = () => {
  const codeSnippets = [
    {
      language: 'jsx',
      code: `const Portfolio = () => {
  const [skills] = useState([
    'React', 'TypeScript', 'Node.js'
  ]);
  
  return (
    <div className="developer">
      {skills.map(skill => (
        <Skill key={skill} name={skill} />
      ))}
    </div>
  );
};`
    },
    {
      language: 'css',
      code: `.responsive-design {
  display: grid;
  grid-template-columns: 
    repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}`
    },
    {
      language: 'ts',
      code: `interface Developer {
  name: string;
  experience: number;
  skills: Technology[];
  passion: 'frontend' | 'fullstack';
}

const me: Developer = {
  name: 'Frontend Developer',
  experience: 12,
  skills: ['React', 'Vue', 'Angular'],
  passion: 'frontend'
};`
    }
  ];

  return (
    <section id="hero" className="hero" role="banner">
      <div className="container">
        <div className="hero-content">
          {/* Left side - Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-left"
          >
            <div className="portrait-container">
              <div className="portrait-placeholder">
                {/* <div className="face-outline">
                  <div className="eye left-eye"></div>
                  <div className="eye right-eye"></div>
                  <div className="nose"></div>
                  <div className="mouth"></div>
                </div> */}
              </div>
              <div className="portrait-glow"></div>
            </div>
          </motion.div>

          {/* Right side - Code and Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-right"
          >
            <div className="hero-text">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Frontend Developer
                <span className="highlight"> with 12 Years</span>
                <br />
                of Experience
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="hero-description"
              >
                Crafting accessible, performant, and beautiful web experiences 
                with modern technologies and best practices.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="hero-actions"
              >
                {/* <a 
                  href="#projects" 
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  aria-label="View my projects"
                >
                  View My Work
                </a> */}
                <a 
                  href="#contact" 
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  aria-label="Get in touch with me"
                >
                  Get In Touch
                </a>
              </motion.div>
            </div>

            {/* Code Snippets */}
            <div className="code-display">
              {codeSnippets.map((snippet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.2 + index * 0.3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    repeatDelay: 4
                  }}
                  className={`code-snippet snippet-${index + 1}`}
                  style={{
                    animationDelay: `${index * 2}s`
                  }}
                >
                  <div className="code-header">
                    <div className="code-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                    <span className="code-language">{snippet.language}</span>
                  </div>
                  <pre className="code-content">
                    <code>{snippet.code}</code>
                  </pre>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="scroll-indicator"
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span className="scroll-text">Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;

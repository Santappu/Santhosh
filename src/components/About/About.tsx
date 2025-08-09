import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="about-content"
        >
          <motion.div variants={itemVariants} className="about-header">
            <h2>About Me</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="about-grid">
            <motion.div variants={itemVariants} className="about-text">
              <p>
                With over 12 years of experience in frontend development, I specialize in 
                creating accessible, performant, and user-centric web applications. My journey 
                began with HTML and CSS, and has evolved to encompass modern frameworks like 
                React, Vue, and Angular.
              </p>
              <p>
                I'm passionate about web accessibility and believe that great user experiences 
                should be available to everyone. I follow WCAG guidelines religiously and 
                implement semantic HTML, proper ARIA labels, and keyboard navigation in all 
                my projects.
              </p>
              <p>
                When I'm not coding, you'll find me mentoring junior developers, contributing 
                to open-source projects, or exploring the latest web technologies. I believe 
                in continuous learning and staying current with industry best practices.
              </p>

              <div className="about-highlights">
                <div className="highlight-item">
                  <h4>12+ Years</h4>
                  <p>Professional Experience</p>
                </div>
                <div className="highlight-item">
                  <h4>50+ Projects</h4>
                  <p>Successfully Delivered</p>
                </div>
                <div className="highlight-item">
                  <h4>WCAG 2.1 AA</h4>
                  <p>Accessibility Compliance</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="about-image">
              <div className="image-placeholder">
                <div className="tech-icons">
                  <div className="tech-icon react">
                    <span>⚛️</span>
                    <label>React</label>
                  </div>
                  <div className="tech-icon typescript">
                    <span>📘</span>
                    <label>TypeScript</label>
                  </div>
                  <div className="tech-icon accessibility">
                    <span>♿</span>
                    <label>A11y</label>
                  </div>
                  <div className="tech-icon performance">
                    <span>⚡</span>
                    <label>Performance</label>
                  </div>
                  <div className="tech-icon responsive">
                    <span>📱</span>
                    <label>Responsive</label>
                  </div>
                  <div className="tech-icon testing">
                    <span>🧪</span>
                    <label>Testing</label>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="about-values">
            <h3>Core Values & Approach</h3>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🎯</div>
                <h4>User-Centric Design</h4>
                <p>Every decision is made with the end user in mind, ensuring intuitive and accessible experiences.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🔧</div>
                <h4>Clean Code</h4>
                <p>Writing maintainable, well-documented code that follows industry standards and best practices.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🚀</div>
                <h4>Performance First</h4>
                <p>Optimizing for speed and efficiency to deliver fast, responsive web applications.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">♿</div>
                <h4>Accessibility</h4>
                <p>Building inclusive web experiences that work for users of all abilities and assistive technologies.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main id="main-content" role="main">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default App;

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Projects.css';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A fully responsive e-commerce platform with advanced filtering and accessibility features.',
      longDescription: 'Built with React and TypeScript, featuring real-time inventory management, advanced search and filtering, secure payment processing, and comprehensive accessibility compliance. Includes admin dashboard for product management.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
      githubUrl: 'https://github.com/example/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      featured: true
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team features.',
      longDescription: 'Developed using Vue.js with Vuex for state management, featuring drag-and-drop functionality, real-time collaboration, file attachments, and detailed analytics. Fully accessible with keyboard navigation and screen reader support.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'Vuex', 'Express', 'PostgreSQL', 'WebSocket', 'AWS S3'],
      githubUrl: 'https://github.com/example/taskmanager',
      liveUrl: 'https://taskmanager-demo.com',
      featured: true
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard with location-based forecasts and data visualization.',
      longDescription: 'Created with Angular and Chart.js, providing detailed weather information, interactive charts, location search, and weather alerts. Features offline functionality with service workers and responsive design for all devices.',
      image: '/api/placeholder/600/400',
      technologies: ['Angular', 'Chart.js', 'PWA', 'OpenWeather API', 'SCSS', 'RxJS'],
      githubUrl: 'https://github.com/example/weather',
      liveUrl: 'https://weather-dashboard-demo.com',
      featured: false
    },
    {
      id: '4',
      title: 'Portfolio Website',
      description: 'A modern, accessible portfolio website showcasing frontend development skills.',
      longDescription: 'Built with React and Framer Motion, featuring smooth animations, dark mode toggle, contact form with validation, and perfect Lighthouse scores. Fully compliant with WCAG 2.1 AA accessibility standards.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Framer Motion', 'CSS Grid', 'Netlify', 'EmailJS'],
      githubUrl: 'https://github.com/example/portfolio',
      liveUrl: 'https://portfolio-demo.com',
      featured: false
    },
    {
      id: '5',
      title: 'Learning Management System',
      description: 'An educational platform with course management and progress tracking features.',
      longDescription: 'Comprehensive LMS built with Next.js and Prisma, featuring course creation, video streaming, quiz system, progress tracking, and user management. Includes responsive design and accessibility features for inclusive learning.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe', 'Mux', 'Tailwind CSS'],
      githubUrl: 'https://github.com/example/lms',
      liveUrl: 'https://lms-demo.com',
      featured: false
    },
    {
      id: '6',
      title: 'Social Media Dashboard',
      description: 'A comprehensive dashboard for managing multiple social media accounts.',
      longDescription: 'Built with React and Redux Toolkit, providing unified social media management, analytics visualization, post scheduling, and engagement tracking. Features real-time updates and responsive design for mobile and desktop use.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Redux Toolkit', 'D3.js', 'Node.js', 'Social APIs'],
      githubUrl: 'https://github.com/example/social-dashboard',
      liveUrl: 'https://social-dashboard-demo.com',
      featured: false
    }
  ];

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

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="projects-content"
        >
          {/* <motion.div variants={itemVariants} className="projects-header">
            <h2>Featured Projects</h2>
            <div className="section-divider"></div>
            <p className="projects-subtitle">
              A showcase of my recent work and technical expertise
            </p>
          </motion.div>

          {/* Featured Projects */}
          {/* <div className="featured-projects">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="featured-project"
              >
                <div className="project-image">
                  <div className="image-placeholder">
                    <div className="project-preview">
                      <div className="preview-header">
                        <div className="preview-dots">
                          <span className="dot red"></span>
                          <span className="dot yellow"></span>
                          <span className="dot green"></span>
                        </div>
                        <div className="preview-url">{project.liveUrl}</div>
                      </div>
                      <div className="preview-content">
                        <div className="preview-text">
                          <h3>{project.title}</h3>
                          <p>Interactive Demo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="project-overlay">
                    <div className="overlay-content">
                      <h3>{project.title}</h3>
                      <p>{project.longDescription}</p>
                      <div className="project-actions">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          Live Demo
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          aria-label={`View source code for ${project.title} on GitHub`}
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-technologies" role="list" aria-label="Technologies used">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag" role="listitem">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <span className="link-icon">🔗</span>
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label={`View source code for ${project.title} on GitHub`}
                    >
                      <span className="link-icon">💻</span>
                      Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div> */}

          {/* Other Projects */}
          <motion.div variants={itemVariants} className="other-projects-header">
            <h3>Notable Projects</h3>
          </motion.div>

          <div className="other-projects">
            {otherProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="project-card"
              >
                <div className="card-header">
                  <h4>{project.title}</h4>
                  <div className="card-links">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      🔗
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${project.title} on GitHub`}
                    >
                      💻
                    </a>
                  </div>
                </div>
                <p>{project.longDescription}</p>
                <div className="card-technologies" role="list" aria-label="Technologies used">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag small" role="listitem">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

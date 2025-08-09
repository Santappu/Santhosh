import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Experience.css';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  technologies: string[];
}

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Sample experience data - in real implementation, this would come from PDF parsing
  const experiences: ExperienceItem[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'CSG International',
      location: 'Bengaluru, India',
      duration: 'May 2019 - Present',
      description: [
        'Mentored and coached a team of 5 junior developers, improving productivity and fostering professional growth',
        'Designed and developed next-generation integration platforms for internal applications, reducing development time by 30%',
        'Prototyped new data processing capabilities to validate integration feasibility into existing systems, improving system efficiency by 30%',
        'Analyzed workflows and generated logic for new systems, procedures, and tests, enhancing system reliability by 40%'
      ],
      technologies: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Agile', 'Docker', 'Kubernetes', 'CI/CD']
    },
    {
      id: '2',
      title: 'Senior Engineer',
      company: 'Ciber Global',
      location: 'Bengaluru, India',
      duration: 'Jan 2018 - May 2019',
      description: [
        'Converted wireframes into web applications using Angular 2, reducing development cycles',
        'Architected UI solutions and developed responsive web interfaces using HTML5 and CSS3, improving load times by 60%'
      ],
      technologies: ['Angular', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript']
    },
    {
      id: '3',
      title: 'Senior Software Engineer',
      company: 'HARMAN International India Pvt. Ltd',
      location: 'Bengaluru, India',
      duration: 'Jun 2016 - Jan 2018',
      description: [
        'Developed custom visualizers using amCharts, enabling clients to interpret business data graphically and reducing analysis time by 30%',
        'Automated report updates linked to optimization processes, saving 100 hours of manual effort'
      ],
      technologies: ['amCharts', 'JavaScript', 'HTML5', 'CSS3']
    },
    {
      id: '4',
      title: 'Presentation Layer Developer',
      company: 'Razorfish Technologies India',
      location: 'Bengaluru, India',
      duration: 'Oct 2015 - Jun 2016',
      description: [
        'Collaborated with cross-functional teams to integrate new features into systems, improving feature delivery speed by 60%',
        'Engineered software solutions for desktop and mobile operating systems, enhancing user experience and functionality'
      ],
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Responsive Design']
    },
    {
      id: '5',
      title: 'Web Developer',
      company: 'Thomson Reuters',
      location: 'Bengaluru, India',
      duration: 'Dec 2012 - Oct 2015',
      description: [
        'Developed websites using HTML, CSS, JavaScript, and jQuery, reducing deployment errors by 60%',
        'Converted mockups into functional web presences using HTML, JavaScript, AJAX, and JSON, accelerating project delivery by 2 weeks'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'AJAX', 'JSON']
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="experience-content"
        >
          <motion.div variants={itemVariants} className="experience-header">
            <h2>Professional Experience</h2>
            <div className="section-divider"></div>
            <p className="experience-subtitle">
              12+ years of building exceptional web experiences
            </p>
          </motion.div>

          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="timeline-item"
              >
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  {index < experiences.length - 1 && <div className="timeline-line"></div>}
                </div>
                
                <div className="timeline-content">
                  <div className="experience-card">
                    <div className="card-header">
                      <div className="job-info">
                        <h3 className="job-title">{exp.title}</h3>
                        <div className="company-info">
                          <span className="company">{exp.company}</span>
                          <span className="location">{exp.location}</span>
                        </div>
                      </div>
                      <div className="duration">{exp.duration}</div>
                    </div>
                    
                    <div className="card-body">
                      <ul className="responsibilities">
                        {exp.description.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                      
                      <div className="technologies">
                        <h4>Technologies Used:</h4>
                        <div className="tech-tags" role="list" aria-label="Technologies used">
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="tech-tag" role="listitem">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Skills.css';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
  icon: string;
}

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories: SkillCategory[] = [
    {
      name: 'Frontend Technologies',
      icon: '🎨',
      skills: [
        { name: 'React', level: 95, category: 'Framework' },
        { name: 'TypeScript', level: 90, category: 'Language' },
        { name: 'JavaScript', level: 95, category: 'Language' },
        { name: 'Vue.js', level: 85, category: 'Framework' },
        { name: 'Angular', level: 80, category: 'Framework' },
        { name: 'Next.js', level: 88, category: 'Framework' },
        { name: 'HTML5', level: 98, category: 'Markup' },
        { name: 'CSS3', level: 95, category: 'Styling' },
        { name: 'SASS/SCSS', level: 90, category: 'Styling' },
        { name: 'Tailwind CSS', level: 92, category: 'Framework' }
      ]
    },
    {
      name: 'Development Tools',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 90, category: 'Version Control' },
        { name: 'Webpack', level: 85, category: 'Build Tool' },
        { name: 'Vite', level: 88, category: 'Build Tool' },
        { name: 'ESLint', level: 85, category: 'Linting' },
        { name: 'Prettier', level: 90, category: 'Formatting' },
        { name: 'Jest', level: 80, category: 'Testing' },
        { name: 'Cypress', level: 75, category: 'Testing' },
        { name: 'Storybook', level: 82, category: 'Documentation' }
      ]
    },
    {
      name: 'Backend & Database',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 85, category: 'Runtime' },
        { name: 'Express', level: 80, category: 'Framework' },
        { name: 'MongoDB', level: 75, category: 'Database' },
        { name: 'PostgreSQL', level: 70, category: 'Database' },
        { name: 'Redis', level: 78, category: 'Cache' },
        { name: 'GraphQL', level: 72, category: 'API' },
        { name: 'REST APIs', level: 88, category: 'API' }
      ]
    },
    {
      name: 'Design & UX',
      icon: '🎯',
      skills: [
        { name: 'Responsive Design', level: 95, category: 'Design' },
        { name: 'Web Accessibility', level: 92, category: 'A11y' },
        { name: 'UI/UX Design', level: 80, category: 'Design' },
        { name: 'Figma', level: 75, category: 'Tool' },
        { name: 'Adobe XD', level: 70, category: 'Tool' },
        { name: 'Performance Optimization', level: 88, category: 'Optimization' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="skills-content"
        >
          <motion.div variants={itemVariants} className="skills-header">
            <h2>Technical Skills</h2>
            <div className="section-divider"></div>
            <p className="skills-subtitle">
              A comprehensive toolkit built over 12 years of development experience
            </p>
          </motion.div>

          <div className="skills-grid">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="skill-category"
              >
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <h3>{category.name}</h3>
                </div>

                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      className="skill-item"
                    >
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-progress"
                          variants={progressVariants}
                          initial="hidden"
                          animate={inView ? "visible" : "hidden"}
                          custom={skill.level}
                          style={{
                            animationDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s`
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills Summary */}
          <motion.div variants={itemVariants} className="skills-summary">
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-icon">📚</div>
                <h4>Continuous Learning</h4>
                <p>Always staying up-to-date with the latest technologies and best practices in frontend development.</p>
              </div>
              <div className="summary-item">
                <div className="summary-icon">🤝</div>
                <h4>Collaboration</h4>
                <p>Experienced in working with cross-functional teams, designers, and backend developers.</p>
              </div>
              <div className="summary-item">
                <div className="summary-icon">⚡</div>
                <h4>Performance Focus</h4>
                <p>Committed to building fast, efficient applications with optimal user experience.</p>
              </div>
              <div className="summary-item">
                <div className="summary-icon">♿</div>
                <h4>Accessibility First</h4>
                <p>Ensuring all applications are inclusive and accessible to users with diverse abilities.</p>
              </div>
            </div>
          </motion.div>

          {/* Technology Tags */}
          <motion.div variants={itemVariants} className="tech-showcase">
            <h3>Technology Expertise</h3>
            <div className="tech-tags" role="list" aria-label="Technology expertise">
              {skillCategories.flatMap(category => 
                category.skills.filter(skill => skill.level >= 85)
              ).map((skill) => (
                <motion.span
                  key={skill.name}
                  className="tech-showcase-tag"
                  role="listitem"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

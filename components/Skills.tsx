import type { Skill } from '../types';
import { motion } from 'framer-motion';

const skillsHeader = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const skillsGrid = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const skillCard = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function Skills() {
  const skills: Skill[] = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'JavaScript', icon: '🟨' },
    { name: 'HTML/CSS', icon: '🎨' },
    { name: 'Python', icon: '🐍' },
    { name: 'Vite', icon: '⚡' },
    { name: 'Node.js', icon: '🌿' },
    { name: 'Git', icon: '📦' },
    { name: 'Tailwind CSS', icon: '💨' },
    { name: 'Supabase', icon: '🗄️' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'REST APIs', icon: '🔌' },
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          variants={skillsHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <h2>Technical Skills</h2>
          <p>Technologies I work with to bring ideas to life</p>
        </motion.div>
        <motion.div
          className="skills-grid"
          variants={skillsGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              className="skill-card"
              key={skill.name}
              variants={skillCard}
              style={{ transitionDelay: `${index * 0.05}s` }}
              whileHover={{ y: -6, scale: 1.04 }}
            >
              <span className="skill-icon">{skill.icon}</span>
              <span className="skill-name">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
import type { Skill } from '../types';

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
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <h2>Technical Skills</h2>
          <p>Technologies I work with to bring ideas to life</p>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card reveal" key={skill.name} style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="skill-icon">{skill.icon}</span>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
function Projects() {
  const projects = [
    {
      title: "Pine City Zoo",
      description: "A vibrant, interactive zoo website showcasing animals and attractions with modern CSS animations and responsive design.",
      link: "https://pine-city-zoo-murex.vercel.app/",
      tags: ["HTML", "CSS", "Responsive"],
      icon: "🦁"
    },
    {
      title: "Avengers App",
      description: "Interactive React application exploring Marvel characters with dynamic profiles, search functionality, and sleek UI.",
      link: "https://example.com/avengers-app",
      tags: ["React", "API", "UI/UX"],
      icon: "🦸"
    },
    {
      title: "Resume Screener",
      description: "AI-powered resume analysis tool that automates candidate ranking using NLP and machine learning algorithms.",
      link: "https://example.com/resume-screener",
      tags: ["Python", "NLP", "Automation"],
      icon: "📄"
    }
  ];

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <h2>Featured Projects</h2>
          <p>Some of my recent work and experiments</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card reveal" key={project.title} style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="project-image">{project.icon}</div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link"
                >
                  Live Demo →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
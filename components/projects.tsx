function Projects() {
  return (
    <section className="projects">

      <h2>My Projects</h2>

      <div className="project-grid">

        <div className="card">
          <h3><a href="https://pine-city-zoo-murex.vercel.app/" target="_blank" rel="noopener noreferrer">Pine City Zoo</a></h3>
          <p>HTML & CSS zoo website project.</p>
          <a href="https://pine-city-zoo-murex.vercel.app/" className="project-link" target="_blank" rel="noopener noreferrer">View Project</a>
        </div>

        <div className="card">
          <h3><a href="https://example.com/avengers-app" target="_blank" rel="noopener noreferrer">Avengers App</a></h3>
          <p>A web app showcasing Avengers characters.</p>
          <a href="https://example.com/avengers-app" className="project-link" target="_blank" rel="noopener noreferrer">View Project</a>
        </div>

        <div className="card">
          <h3><a href="https://example.com/resume-screener" target="_blank" rel="noopener noreferrer">Resume Screener</a></h3>
          <p>A Python tool that automatically screens resumes.</p>
          <a href="https://example.com/resume-screener" className="project-link" target="_blank" rel="noopener noreferrer">View Project</a>
        </div>

      </div>

    </section>
  )
}

export default Projects
function Projects() {
  return (
    <section id="projects" className="projects">

      <h2>My Projects</h2>

      <div className="project-grid">

        <div className="card">
          <h3>Pine City Zoo</h3>

          <p>
            A zoo themed website built using
            HTML and CSS showcasing animals,
            locations and information pages.
          </p>

          <a
            href="https://pine-city-zoo-murex.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            Live Demo
          </a>

        </div>

        <div className="card">
          <h3>Avengers App</h3>

          <p>
            A web application displaying
            Avengers characters with their
            profiles and information.
          </p>

          <a
            href="https://example.com/avengers-app"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            View Project
          </a>

        </div>

        <div className="card">
          <h3>Resume Screener</h3>

          <p>
            A Python application that analyzes
            resumes and ranks candidates using
            automated screening.
          </p>

          <a
            href="https://example.com/resume-screener"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            View Project
          </a>

        </div>

      </div>

    </section>
  )
}

export default Projects
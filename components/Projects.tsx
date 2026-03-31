import { useMemo, useState } from "react";

type Project = {
  title: string;
  description: string;
  link: string;
  tags: string[];
  icon: string;
};

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
  ] as Project[];

  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"default" | "title">("default");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return ["All", ...Array.from(tags)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    let nextProjects = projects.filter((project) => {
      const tagMatch = activeTag === "All" || project.tags.includes(activeTag);
      const textMatch =
        !normalizedQuery ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery) ||
        project.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return tagMatch && textMatch;
    });

    if (sortOrder === "title") {
      nextProjects = [...nextProjects].sort((a, b) => a.title.localeCompare(b.title));
    }

    return nextProjects;
  }, [activeTag, searchQuery, sortOrder, projects]);

  const handleReset = () => {
    setActiveTag("All");
    setSearchQuery("");
    setSortOrder("default");
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <h2>Featured Projects</h2>
          <p>Some of my recent work and experiments</p>
        </div>

        <div className="project-controls reveal" aria-label="Project filters">
          <div className="project-control-row">
            <input
              className="project-search"
              type="search"
              placeholder="Search by title, description, or tech..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Search projects"
            />

            <select
              className="project-sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as "default" | "title")}
              aria-label="Sort projects"
            >
              <option value="default">Sort: Default</option>
              <option value="title">Sort: Title A-Z</option>
            </select>

            <button type="button" className="btn btn-secondary project-reset" onClick={handleReset}>
              Reset
            </button>
          </div>

          <div className="tag-filters" role="tablist" aria-label="Filter by technology">
            {allTags.map((tag) => (
              <button
                type="button"
                key={tag}
                className={`tag-filter ${activeTag === tag ? "active" : ""}`}
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>

          <p className="project-results" aria-live="polite">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
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

          {filteredProjects.length === 0 && (
            <div className="projects-empty reveal">
              <h3>No matches yet</h3>
              <p>Try another keyword or switch the technology filter.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
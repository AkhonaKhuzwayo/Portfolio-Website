import { useMemo, useState } from "react";
import type { Project } from '../types';

function Projects() {
  const projects = [
    {
      title: "Pine City Zoo",
      description: "A vibrant, interactive zoo website showcasing animals and attractions with modern CSS animations and responsive design.",
      link: "https://pine-city-zoo-xtnc.vercel.app",
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
      title: "Promoter Management Hub",
      description: "A modern web application for managing promoters and their activities. Built with React, TypeScript, and Vite, featuring Supabase backend integration for real-time data management, Cloudinary for image hosting, and PDF export capabilities.",
      link: "https://promoter-management-hub.vercel.app",
      tags: ["React", "TypeScript", "Vite", "Supabase", "Tailwind CSS", "Cloudinary", "PDF Export"],
      icon: "📊"
    },
    {
      title: "Resume Screener",
      description: "AI-powered resume analysis tool that automates candidate ranking using NLP and machine learning algorithms.",
      link: "https://example.com/resume-screener",
      tags: ["Python", "NLP", "Automation"],
      icon: "📄"
    }
  ] satisfies Project[];

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
  }, [projects, activeTag, searchQuery, sortOrder]);

  const resetFilters = () => {
    setActiveTag("All");
    setSearchQuery("");
    setSortOrder("default");
  };

  const isFiltered = activeTag !== "All" || searchQuery.trim() !== "" || sortOrder !== "default";

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <h2>Projects</h2>
          <p>A selection of work I've built and shipped</p>
        </div>

        <div className="project-controls reveal">
          <div className="project-control-row">
            <input
              className="project-search"
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects"
            />
            <select
              className="project-sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "default" | "title")}
              aria-label="Sort projects"
            >
              <option value="default">Sort: Default</option>
              <option value="title">Sort: A → Z</option>
            </select>
            {isFiltered && (
              <button className="btn btn-secondary project-reset" onClick={resetFilters}>
                Reset
              </button>
            )}
          </div>

          <div className="tag-filters" role="group" aria-label="Filter by tag">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-filter ${activeTag === tag ? "active" : ""}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <p className="project-results">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div className="project-card reveal" key={project.title}>
                <div className="project-image">
                  <span>{project.icon}</span>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="projects-empty">
            <h3>No projects found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;

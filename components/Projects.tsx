import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { Project } from '../types';

const projectsHeader = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const projectsControls = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.04,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
  disableParallax: boolean;
}

function ProjectCard({ project, index, disableParallax }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.25,
  });

  const frameY = useTransform(smoothProgress, [0, 1], disableParallax ? [0, 0] : [-16, 16]);
  const contentY = useTransform(smoothProgress, [0, 1], disableParallax ? [0, 0] : [-28, 28]);

  return (
    <motion.div
      ref={cardRef}
      className="project-card project-card-lux"
      style={{ transitionDelay: `${index * 0.12}s` }}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <motion.div
        className="project-icon-badge"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        whileHover={{ scale: 1.15, rotate: 5 }}
      >
        {project.icon}
      </motion.div>

      <div className="project-parallax-shell">
        <motion.div
          className="project-layer project-layer-middle pointer-events-none"
          style={{ y: frameY }}
          aria-hidden="true"
        >
          <div className="project-wireframe" />
        </motion.div>

        <motion.div className="project-layer project-layer-front" style={{ y: contentY }}>
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
        </motion.div>
      </div>
    </motion.div>
  );
}

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');

    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

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
        <motion.div
          className="section-header"
          variants={projectsHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <h2>Projects</h2>
          <p>A selection of work I've built and shipped</p>
        </motion.div>

        <motion.div
          className="project-controls"
          variants={projectsControls}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
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
        </motion.div>

        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                disableParallax={isMobile}
              />
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

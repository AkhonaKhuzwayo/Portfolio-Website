import { useEffect, useMemo, useRef, useState } from "react";
import type { GitHubRepo } from "../types";

const GITHUB_USERNAME = "AkhonaKhuzwayo";

function GitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);

  // Re-run the reveal observer whenever repos change (async load means
  // App.tsx's one-time observer has already run before these elements exist)
  useEffect(() => {
    if (loading || !sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    sectionRef.current.querySelectorAll(".reveal").forEach((el) => {
      if (!el.classList.contains("active")) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [repos, loading]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API responded with status ${res.status}`);
        return res.json() as Promise<GitHubRepo[]>;
      })
      .then((data) => {
        setRepos(data.filter((r) => !r.fork));
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name !== "AbortError") {
          setError("Failed to load repositories. Please try again later.");
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const languages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return ["All", ...Array.from(langs).sort()];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (activeLanguage === "All") return repos;
    return repos.filter((r) => r.language === activeLanguage);
  }, [repos, activeLanguage]);

  return (
    <section className="github-repos" id="github" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <h2>GitHub Repositories</h2>
          <p>Open source work fetched live from GitHub</p>
        </div>

        {loading && (
          <div className="repos-loading">
            <div className="repos-spinner" />
            <p>Fetching repositories…</p>
          </div>
        )}

        {error && (
          <div className="projects-empty">
            <h3>Could not load repositories</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="tag-filters reveal" role="group" aria-label="Filter by language">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={`tag-filter ${activeLanguage === lang ? "active" : ""}`}
                  onClick={() => setActiveLanguage(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>

            <p className="project-results repos-count">
              Showing {filteredRepos.length} of {repos.length} repositories
            </p>

            {filteredRepos.length > 0 ? (
              <div className="repos-grid">
                {filteredRepos.map((repo, index) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    className="repo-card reveal"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ transitionDelay: `${index * 0.08}s` }}
                  >
                    <div className="repo-card-header">
                      <span className="repo-icon">📁</span>
                      <h3 className="repo-name">{repo.name}</h3>
                    </div>

                    <p className="repo-description">
                      {repo.description ?? "No description provided."}
                    </p>

                    <div className="repo-meta">
                      {repo.language && (
                        <span className="repo-lang">
                          <span className="repo-lang-dot" />
                          {repo.language}
                        </span>
                      )}
                      <span className="repo-stat">⭐ {repo.stargazers_count}</span>
                      <span className="repo-stat">🍴 {repo.forks_count}</span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="projects-empty">
                <h3>No repositories found</h3>
                <p>Try a different language filter.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default GitHubRepos;

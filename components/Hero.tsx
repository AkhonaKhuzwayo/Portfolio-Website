import CodeBackground from './CodeBackground';

function Hero() {
  const scrollToSection = (id: string) => {  // <-- Add ': string' type
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <CodeBackground />
      <div className="hero-content">
        <h1>Building Digital Experiences</h1>
        <p className="subtitle">Full Stack Developer</p>
        <p className="hero-description">
          I craft elegant solutions to complex problems. Specializing in modern web technologies 
          and user-centric design.
        </p>
        <div className="hero-buttons hero-cta-cluster">
          <button onClick={() => scrollToSection('projects')} className="btn btn-primary hero-btn-main">
            Explore Projects
          </button>
          <button onClick={() => scrollToSection('certifications')} className="btn btn-secondary hero-btn-alt">
            View Certifications
          </button>
          <button onClick={() => scrollToSection('contact')} className="btn hero-btn-ghost">
            Let's Talk
          </button>
        </div>
      </div>
      <button
        className="hero-scroll"
        aria-label="Scroll to skills"
        onClick={() => scrollToSection('skills')}
      >
        <span className="hero-scroll-inner" aria-hidden="true">▾</span>
      </button>
    </section>
  );
}

export default Hero;
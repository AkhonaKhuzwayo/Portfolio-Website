function Hero() {
  const scrollToSection = (id: string) => {  // <-- Add ': string' type
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1>Building Digital Experiences</h1>
        <p className="subtitle">Full Stack Developer</p>
        <p className="hero-description">
          I craft elegant solutions to complex problems. Specializing in modern web technologies 
          and user-centric design.
        </p>
        <div className="hero-buttons">
          <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
            View My Work
          </button>
          <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
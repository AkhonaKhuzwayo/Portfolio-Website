import { motion } from 'framer-motion';

const headingText = 'Building Digital Experiences';

const headingContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.08,
    },
  },
};

const headingLetter = {
  hidden: { y: 26, opacity: 1 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <motion.h1
          className="hero-title-lux"
          variants={headingContainer}
          initial="hidden"
          animate="visible"
          aria-label={headingText}
        >
          {headingText.split('').map((char, index) => {
            // Replace the space after "Digital" (index 16) with a line break
            if (index === 16) return <br key="line-break" />;
            return (
              <motion.span
                key={`${char}-${index}`}
                variants={headingLetter}
                className="hero-letter"
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            );
          })}
        </motion.h1>
        <p className="subtitle">Full Stack Developer</p>
        <p className="hero-description">
          I craft elegant solutions to complex problems. Specializing in modern web technologies
          and user-centric design.
        </p>
        <div className="hero-buttons hero-cta-cluster">
          <button
            onClick={() => scrollToSection('projects')}
            className="btn btn-primary hero-btn-main hero-btn-main--lux"
          >
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
        <motion.span
          className="hero-scroll-inner"
          aria-hidden="true"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
        >
          ▾
        </motion.span>
      </button>
    </section>
  );
}

export default Hero;
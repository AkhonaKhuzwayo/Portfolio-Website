import type { Certification } from '../types';
import { motion } from 'framer-motion';

const certHeader = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const certGrid = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const certCard = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function Certifications() {
  const certifications: Certification[] = [
    {
      title: 'Full Stack Development',
      issuer: 'FNB',
      icon: '🏦',
      year: '2025',
    },
    {
      title: 'AI Fundamentals',
      issuer: 'IBM',
      icon: '🤖',
      year: '2026',
    },
  ];

  return (
    <section className="certifications" id="certifications">
      <div className="container">
        <motion.div
          className="section-header"
          variants={certHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <h2>Certifications</h2>
          <p>Credentials and achievements I've earned</p>
        </motion.div>
        <motion.div
          className="certs-grid certs-grid-lux"
          variants={certGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {certifications.map((cert, index) => (
            <motion.div
              className="cert-card cert-card-lux"
              key={cert.title}
              variants={certCard}
              style={{ transitionDelay: `${index * 0.15}s` }}
              whileHover={{ y: -6 }}
            >
              <div className="cert-gold-frame pointer-events-none" aria-hidden="true" />
              <div className="cert-icon cert-icon-lux">{cert.icon}</div>
              <div className="cert-info">
                <h3 className="cert-title">{cert.title}</h3>
                <span className="cert-issuer">{cert.issuer}</span>
                <span className="cert-year">{cert.year}</span>
              </div>
              <div className="cert-badge">✓ Certified</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Certifications;

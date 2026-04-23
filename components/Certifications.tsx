import type { Certification } from '../types';

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
        <div className="section-header reveal">
          <h2>Certifications</h2>
          <p>Credentials and achievements I've earned</p>
        </div>
        <div className="certs-grid">
          {certifications.map((cert, index) => (
            <div
              className="cert-card reveal-scale"
              key={cert.title}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="cert-icon">{cert.icon}</div>
              <div className="cert-info">
                <h3 className="cert-title">{cert.title}</h3>
                <span className="cert-issuer">{cert.issuer}</span>
                <span className="cert-year">{cert.year}</span>
              </div>
              <div className="cert-badge">✓ Certified</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;

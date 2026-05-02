import { useEffect, useState } from 'react';

function About() {
	const [lightboxOpen, setLightboxOpen] = useState(false);

	useEffect(() => {
		if (!lightboxOpen) return;
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setLightboxOpen(false);
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, [lightboxOpen]);

	return (
		<section className="about" id="about">
			<div className="container">
				<div className="section-header reveal">
					<h2>About Me</h2>
					<p>The person behind the code</p>
				</div>
				<div className="about-content">
					<div className="about-avatar reveal-left">
						<div
							className="avatar-placeholder avatar-clickable"
							onClick={() => setLightboxOpen(true)}
							title="Click to view photo"
						>
							<img
								src="/Profile-pic.jpeg"
								alt="Akhona Khuzwayo profile photo"
								className="avatar-photo"
							/>
						</div>

						{lightboxOpen && (
							<div
								className="avatar-lightbox"
								onClick={() => setLightboxOpen(false)}
								role="dialog"
								aria-modal="true"
								aria-label="Profile photo enlarged"
							>
								<img
									src="/Profile-pic.jpeg"
									alt="Akhona Khuzwayo profile photo"
									className="lightbox-img"
									onClick={(e) => e.stopPropagation()}
								/>
								<button
									className="lightbox-close"
									onClick={() => setLightboxOpen(false)}
									aria-label="Close"
								>
									✕
								</button>
							</div>
						)}
						<div className="about-location">
							<span className="location-icon">📍</span>
							<span>South Africa</span>
						</div>
					</div>
					<div className="about-text reveal-right">
						<p>
							I'm a final-year <strong>ICT: Business Analysis</strong> student and <strong> Certified Software
							Developer </strong> with a focus on bridging the gap between complex technical systems and
							strategic business goals. My approach combines rigorous academic training with a
							proactive commitment to emerging technologies.
						</p>
						<p>
							Currently, I serve as a <strong>Brand Promoter for Google Play</strong>, translating
							digital product value into user growth. Beyond that, I'm an active innovator,
							participating in the <strong>DUT EPIP Challenge</strong> and running a freelance
							branding service that helps professionals articulate their technical value.
						</p>
						<p>
							I specialize in identifying operational bottlenecks and building digital solutions to
							solve them. I'm driven by the belief that the best technology doesn't just work,
							it <em>optimizes</em> the way we live and do business.
						</p>
						<div className="about-links">
							<a
								href="https://www.linkedin.com/in/akhona-khuzwayo-996201239"
								target="_blank"
								rel="noopener noreferrer"
								className="about-link-btn"
							>
								<span>🔗</span> LinkedIn
							</a>
							<a
								href="https://github.com/AkhonaKhuzwayo"
								target="_blank"
								rel="noopener noreferrer"
								className="about-link-btn"
							>
								<span>💻</span> GitHub
							</a>
							<a
								href="/Akhona-Khuzwayo-CV.pdf"
								download
								className="about-link-btn about-link-btn--gold"
							>
								<span>⬇</span> Download CV
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default About;

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const textContainer = {
	hidden: { opacity: 0, y: 28 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.55,
			ease: [0.22, 1, 0.36, 1] as const,
			staggerChildren: 0.16,
		},
	},
};

const textItem = {
	hidden: { opacity: 0, y: 26 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.48,
			ease: [0.22, 1, 0.36, 1] as const,
		},
	},
};

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
						<div className="avatar-halo-wrap">
							<motion.div
								className="about-gold-halo pointer-events-none"
								animate={{ rotate: 360 }}
								transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
							/>
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
						</div>

						<AnimatePresence>
							{lightboxOpen && (
								<motion.div
									className="avatar-lightbox"
									onClick={() => setLightboxOpen(false)}
									role="dialog"
									aria-modal="true"
									aria-label="Profile photo enlarged"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
										<motion.img
											src="/Profile-pic.jpeg"
											alt="Akhona Khuzwayo profile photo"
											className="lightbox-img"
											initial={{ scale: 0.5, opacity: 0.75 }}
											animate={{ scale: 1, opacity: 1 }}
											exit={{ scale: 0.7, opacity: 0 }}
											transition={{ type: 'spring', stiffness: 260, damping: 20 }}
										/>
										<button
											className="lightbox-close"
											onClick={() => setLightboxOpen(false)}
											aria-label="Close"
										>
											✕
										</button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
						<div className="about-location">
							<span className="location-icon">📍</span>
							<span>South Africa</span>
						</div>
					</div>
					<motion.div
						className="about-text reveal-right"
						variants={textContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
					>
						<motion.p variants={textItem}>
							I'm a final-year <strong>ICT: Business Analysis</strong> student and <strong> Certified Software
								Developer </strong> with a focus on bridging the gap between complex technical systems and
							strategic business goals. My approach combines rigorous academic training with a
							proactive commitment to emerging technologies.
						</motion.p>
						<motion.p variants={textItem}>
							Currently, I serve as a <strong>Brand Promoter for Google Play</strong>, translating
							digital product value into user growth. Beyond that, I'm an active innovator,
							participating in the <strong>DUT EPIP Challenge</strong> and running a freelance
							branding service that helps professionals articulate their technical value.
						</motion.p>
						<motion.p variants={textItem}>
							I specialize in identifying operational bottlenecks and building digital solutions to
							solve them. I'm driven by the belief that the best technology doesn't just work,
							it <em>optimizes</em> the way we live and do business.
						</motion.p>
						<motion.div className="about-links" variants={textItem}>
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
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

export default About;

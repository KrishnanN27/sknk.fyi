import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import headshot from "../assets/images/about/headshot.jpeg";
import cvFile from "../assets/pdf/CV.pdf";

/* ---------------- animations ---------------- */

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const skillVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const honorVariant = {
  hidden: { opacity: 0, y: 20, rotateX: -15 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ---------------- helpers ---------------- */

const sections = [
  { id: "intro", label: "Introduction" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "honors", label: "Honors" },
];

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const sectionStyle = {
  scrollMarginTop: "110px",
};

/* ---------------- data ---------------- */

const experiences = [
  {
    company: "G4 Lab, Colorado School of Mines",
    role: "Research Assistant",
    period: "Aug 2025 – Present",
    status: "current",
    highlights: [
      "Developed ML-driven surrogate models for PDE systems.",
      "Built Python pipelines for simulation and inverse problems.",
      "Translated mathematical models into scalable research software.",
    ],
  },
  {
    company: "Colorado School of Mines",
    role: "Teaching Assistant",
    period: "Aug 2025 – May 2026",
    status: "current",
    highlights: [
      "Mentored graduate students on ML design and optimization.",
      "Supported labs, grading, and evaluations.",
    ],
  },
  {
    company: "Data-Driven CPS Lab",
    role: "Research Assistant",
    period: "Aug 2023 – May 2025",
    highlights: [
      "Designed FlowSHACL, a DAG-based SHACL engine.",
      "Implemented dependency-aware execution optimizations.",
      "Built benchmarking pipelines on RDF datasets.",
    ],
  },
  {
    company: "Sloan Foundation Energy Project",
    role: "Full Stack Engineer",
    period: "Jan 2023 – May 2025",
    highlights: [
      "Built backend services for high-frequency energy data.",
      "Deployed containerized services using Docker.",
    ],
  },
  {
    company: "NCompass Tech Studio Pvt. Ltd.",
    role: "Software Engineer",
    period: "May 2021 – May 2022",
    highlights: [
      "Developed Android and Flutter applications.",
      "Led UI redesign resulting in 1,000+ downloads.",
    ],
  },
];

const skills = [
  { category: "Programming", items: ["Python", "C", "Java", "JavaScript"] },
  { category: "Machine Learning", items: ["PyTorch", "scikit-learn"] },
  { category: "Scientific Computing", items: ["PDEs", "numerical methods"] },
  { category: "Systems & Tools", items: ["Linux", "Docker", "REST APIs"] },
  { category: "Cloud & DevOps", items: ["AWS", "GCP", "CI/CD"] },
];

const honors = [
  { title: "Best Poster Presentation", org: "CMAPP Honors", year: "2025" },
  { title: "Hackathon Winner", org: "Echoes of Equality", year: "2022" },
  { title: "Undergraduate Research Symposium Judge", org: "", year: "2024" },
  { title: "Best Presentation", org: "ECUBE, Anna University", year: "2022" },
];

/* ---------------- component ---------------- */

const Portfolio = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("intro");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px", // center-based trigger
        threshold: 0,
      },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="about-wrapper" ref={containerRef}>
      {/* Animated background gradient */}
      <div
        className="bg-gradient"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      />

      {/* -------- DESKTOP NAV -------- */}
      <aside className="about-nav">
        {sections.map((s) => (
          <motion.button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={activeSection === s.id ? "active" : ""}
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="nav-label">{s.label}</span>
            {activeSection === s.id && (
              <motion.div
                className="nav-indicator"
                layoutId="nav-indicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </aside>

      {/* -------- CONTENT -------- */}
      <main className="about-content">
        {/* INTRO */}
        <motion.section
          id="intro"
          style={sectionStyle}
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="about-intro"
        >
          <div className="intro-grid">
            <motion.div
              className="headshot-container"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img
                src={headshot}
                alt="Sowndarya Krishnan"
                className="about-headshot"
              />
            </motion.div>

            <div className="intro-text">
              <motion.h1
                className="intro-name"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Sowndarya Krishnan NK
              </motion.h1>

              <motion.p
                className="intro-meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Golden, CO, USA ·{" "}
                <a href="mailto:sknkfyi@gmail.com">sknkfyi@gmail.com</a>
              </motion.p>

              <motion.p
                className="intro-desc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Ph.D. student in Computer Science working on hybrid quantum–AI
                methods for scientific computing and physics-based modeling.
              </motion.p>

              <motion.p
                className="intro-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Focused on developing computational methods that extend
                classical simulation limits using quantum computing and AI.
              </motion.p>

              <motion.div
                className="intro-actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <a
                  href={cvFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-button"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  View CV
                </a>
                <a
                  href="https://calendar.app.google/QECW5xXxB1YGAGnu9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="schedule-button"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Schedule a Meeting
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* EXPERIENCE */}
        <motion.section
          id="experience"
          style={sectionStyle}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="section-header">
            <h2 className="section-title">Experience</h2>
            <div className="section-line" />
          </div>

          <div className="experience-timeline">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className="experience-item"
                variants={itemVariant}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glassmorphic card */}
                <div className="experience-card">
                  <div className="experience-header">
                    <div className="experience-title-group">
                      <h3 className="experience-company">{exp.company}</h3>
                      <p className="experience-role">{exp.role}</p>
                    </div>
                    <div className="experience-meta">
                      <span className="experience-period">{exp.period}</span>
                      {exp.status === "current" && (
                        <motion.div
                          className="status-badge"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
                        >
                          <span className="status-pulse" />
                          Current
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <ul className="experience-highlights">
                    {exp.highlights.map((highlight, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 0.8, x: 0 }}
                        transition={{ delay: i * 0.1 + j * 0.05 + 0.3 }}
                      >
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Timeline connector */}
                <div className="timeline-connector">
                  <motion.div
                    className="timeline-dot"
                    animate={{
                      scale: hoveredIndex === i ? 1.4 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  {i < experiences.length - 1 && (
                    <div className="timeline-line" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* EDUCATION */}
        <motion.section
          id="education"
          style={sectionStyle}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="section-header">
            <h2 className="section-title">Education</h2>
            <div className="section-line" />
          </div>

          <motion.div className="education-item" variants={itemVariant}>
            <div className="education-card">
              <p className="education-degree">
                <strong>Ph.D. Computer Science</strong>
              </p>
              <p className="education-school">Colorado School of Mines</p>
              <p className="muted">Advisor: Prof. Pejman Tahmasebi</p>
            </div>
          </motion.div>

          <motion.div className="education-item" variants={itemVariant}>
            <div className="education-card">
              <p className="education-degree">
                <strong>M.S. Computer Science</strong>
              </p>
              <p className="education-school">Colorado School of Mines</p>
              <p className="muted">
                GPA: 3.7 / 4.0 · Advisor: Prof. Gabe Fierro
              </p>
            </div>
          </motion.div>

          <motion.div className="education-item" variants={itemVariant}>
            <div className="education-card">
              <p className="education-degree">
                <strong>B.E. Electronics & Communication Engineering</strong>
              </p>
              <p className="education-school">Anna University</p>
              <p className="muted">
                GPA: 8.56 / 10 · First Class with Distinction
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* SKILLS */}
        <motion.section
          id="skills"
          style={sectionStyle}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="section-header">
            <h2 className="section-title">Skills</h2>
            <div className="section-line" />
          </div>

          <div className="skills-grid">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                className="skill-card"
                variants={skillVariant}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="skill-category">{skill.category}</h3>
                <div className="skill-items">
                  {skill.items.map((item, j) => (
                    <span key={j} className="skill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* HONORS */}
        <motion.section
          id="honors"
          style={sectionStyle}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="section-header">
            <h2 className="section-title">Honors & Awards</h2>
            <div className="section-line" />
          </div>

          <div className="honors-grid">
            {honors.map((honor, i) => (
              <motion.div
                key={i}
                className="honor-card"
                variants={honorVariant}
                whileHover={{ scale: 1.03, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="honor-year">{honor.year}</div>
                <h3 className="honor-title">{honor.title}</h3>
                {honor.org && <p className="honor-org">{honor.org}</p>}
                <div className="honor-shine" />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <style>{`
			 :root {
		--text: #ffffff;
		--bg: #000000;
		--card-bg: rgba(255, 255, 255, 0.03);
		--card-bg-hover: rgba(255, 255, 255, 0.05);
		--border-color: rgba(255, 255, 255, 0.15);
		--border-color-hover: rgba(255, 255, 255, 0.25);
	}

	:root[data-theme="light"] {
		--text: #1e2329;
		--bg: #f3f1ee;
		--card-bg: rgba(255, 255, 255, 0.5);
		--card-bg-hover: rgba(255, 255, 255, 0.7);
		--border-color: rgba(0, 0, 0, 0.2);
		--border-color-hover: rgba(0, 0, 0, 0.3);
	}

	/* GLASS EFFECT OVERRIDES - PUT THIS RIGHT HERE */
	.experience-card,
	.education-card,
	.skill-card,
	.honor-card {
		background: rgba(255, 255, 255, 0.03) !important;
		backdrop-filter: blur(20px) !important;
		border: 1px solid rgba(255, 255, 255, 0.15) !important;
	}

	.experience-card:hover,
	.education-card:hover,
	.skill-card:hover,
	.honor-card:hover {
		background: rgba(255, 255, 255, 0.05) !important;
		border-color: rgba(255, 255, 255, 0.25) !important;
	}

	:root[data-theme="light"] .experience-card,
	:root[data-theme="light"] .education-card,
	:root[data-theme="light"] .skill-card,
	:root[data-theme="light"] .honor-card {
		background: rgba(255, 255, 255, 0.4) !important;
		border: 1px solid rgba(0, 0, 0, 0.1) !important;
	}

	:root[data-theme="light"] .experience-card:hover,
	:root[data-theme="light"] .education-card:hover,
	:root[data-theme="light"] .skill-card:hover,
	:root[data-theme="light"] .honor-card:hover {
		background: rgba(255, 255, 255, 0.6) !important;
		border-color: rgba(0, 0, 0, 0.2) !important;
	}

	.intro-actions {
		margin-top: 1.5rem;
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

.cv-button,
.schedule-button {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.75rem 1.5rem;
	background: transparent;
	color: inherit;
	text-decoration: none;
	border: 1px solid currentColor;
	border-radius: 8px;
	font-weight: 500;
	font-size: 0.95rem;
	transition: all 0.3s ease;
	opacity: 0.8;
}

.cv-button:hover,
.schedule-button:hover {
	opacity: 1;
	transform: translateY(-2px);
	background: rgba(255, 255, 255, 0.05);
}

.cv-button svg,
.schedule-button svg {
	flex-shrink: 0;
	opacity: 0.9;
}

				.about-wrapper {
					max-width: 1200px;
					margin: 0 auto;
					padding: 9rem 2rem 6rem;
					position: relative;
					overflow: hidden;
				}

				/* Animated background */
				.bg-gradient {
					position: fixed;
					top: -50%;
					left: -50%;
					width: 200%;
					height: 200%;
					background: radial-gradient(
						circle at 50% 50%,
						rgba(59, 130, 246, 0.08) 0%,
						rgba(139, 92, 246, 0.08) 25%,
						rgba(236, 72, 153, 0.08) 50%,
						transparent 70%
					);
					pointer-events: none;
					transition: transform 0.3s ease;
					z-index: -1;
				}

				/* DESKTOP FIXED NAV */
				.about-nav {
					position: fixed;
					top: 9rem;
					left: max(2rem, calc(50% - 600px));
					width: 200px;
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
					z-index: 10;
				}

				.about-nav button {
					background: transparent;
					backdrop-filter: none;
					border: none;
					border-radius: 12px;
					padding: 0.85rem 1rem;
					text-align: left;
					cursor: pointer;
					font-size: 0.95rem;
					opacity: 0.6;
					color: var(--text);
					transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
					position: relative;
					display: flex;
					align-items: center;
					gap: 0.75rem;
				}

				.about-nav button:hover {
					opacity: 1;
				}

				.about-nav button.active {
					opacity: 1;
				}

				.nav-label {
					flex: 1;
				}

				.nav-indicator {
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					width: 3px;
					background: linear-gradient(to bottom,
						rgba(59, 130, 246, 1),
						rgba(139, 92, 246, 1)
					);
					border-radius: 0 4px 4px 0;
				}
				.about-content {
					margin-left: 260px;
					max-width: 760px;
					display: flex;
					flex-direction: column;
					gap: 8rem;
				}

				/* Section headers */
				.section-header {
					margin-bottom: 3rem;
					position: relative;
				}

				.section-title {
					font-size: 2.2rem;
					font-weight: 700;
					letter-spacing: -0.03em;
					position: relative;
				}

				.section-line {
					position: absolute;
					bottom: -1rem;
					left: 0;
					height: 2px;
					width: 80px;
					background: linear-gradient(to right,
						rgba(59, 130, 246, 1),
						transparent
					);
				}

				/* -------- INTRO -------- */

				.about-intro {
					max-width: 100%;
				}

				.intro-grid {
					display: flex;
					align-items: center;
					gap: 3rem;
				}

				.headshot-container {
					position: relative;
					flex-shrink: 0;
				}

				.about-headshot {
					width: 140px;
					height: 140px;
					border-radius: 50%;
					object-fit: cover;
					position: relative;
					z-index: 2;
					border: 3px solid var(--border-color);
				}

				.intro-text {
					max-width: 560px;
				}

			 .intro-name {
					font-size: clamp(2rem, 3.5vw, 2.6rem);
					font-weight: 700;
					letter-spacing: -0.03em;
					margin-bottom: 0.75rem;
					color: inherit;
				}

				.intro-meta {
					font-size: 1rem;
					opacity: 0.7;
					margin-bottom: 1.5rem;
				}

				.intro-meta a {
					color: rgba(59, 130, 246, 0.9);
					text-decoration: none;
					transition: color 0.2s ease;
				}

				.intro-meta a:hover {
					color: rgba(59, 130, 246, 1);
					text-decoration: underline;
				}

				.intro-desc {
					font-size: 1.1rem;
					line-height: 1.6;
					margin-bottom: 1rem;
				}

				.intro-muted {
					font-size: 1rem;
					opacity: 0.65;
					line-height: 1.6;
				}

				/* -------- EXPERIENCE -------- */

				.experience-timeline {
					display: flex;
					flex-direction: column;
					gap: 2rem;
					position: relative;
				}

				.experience-item {
					display: grid;
					grid-template-columns: 1fr 40px;
					gap: 2rem;
					position: relative;
				}

				.experience-card {
					background: var(--card-bg);
					backdrop-filter: blur(20px);
					border: 1px solid var(--border-color);
					border-radius: 20px;
					padding: 2rem;
					position: relative;
					overflow: hidden;
					transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
				}

				.experience-card:hover {
					background: var(--card-bg-hover);
					border-color: var(--border-color-hover);
					transform: translateY(-4px);
					box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
				}

				.status-badge {
					background: rgba(16, 185, 129, 0.15);
					border: 1px solid rgba(16, 185, 129, 0.3);
					border-radius: 20px;
					padding: 0.35rem 0.85rem;
					font-size: 0.75rem;
					font-weight: 600;
					color: rgba(16, 185, 129, 1);
					display: flex;
					align-items: center;
					gap: 0.5rem;
					text-transform: uppercase;
					letter-spacing: 0.05em;
					white-space: nowrap;
				}

				.status-pulse {
					width: 6px;
					height: 6px;
					border-radius: 50%;
					background: rgba(16, 185, 129, 1);
					animation: pulse 2s ease-in-out infinite;
				}

				@keyframes pulse {
					0%, 100% { opacity: 1; transform: scale(1); }
					50% { opacity: 0.5; transform: scale(1.2); }
				}

				.experience-header {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					gap: 2rem;
					margin-bottom: 1.5rem;
				}

				.experience-title-group {
					flex: 1;
					min-width: 0;
				}

				.experience-meta {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					gap: 0.75rem;
					flex-shrink: 0;
				}

				.experience-company {
					font-size: 1.3rem;
					font-weight: 600;
					letter-spacing: -0.02em;
					margin-bottom: 0.5rem;
					transition: color 0.3s ease;
				}

				// .experience-card:hover .experience-company {
				// 	color: rgba(255, 255, 255, 1);
				// }

				.experience-role {
					font-size: 1rem;
					opacity: 0.7;
					font-style: italic;
					margin: 0;
				}

				.experience-period {
					font-size: 0.85rem;
					opacity: 0.5;
					font-variant-numeric: tabular-nums;
					white-space: nowrap;
					background: rgba(255, 255, 255, 0.05);
					padding: 0.4rem 0.75rem;
					border-radius: 8px;
					flex-shrink: 0;
				}

				.experience-highlights {
					list-style: none;
					padding: 0;
					margin: 0;
					display: flex;
					flex-direction: column;
					gap: 0.75rem;
				}

				.experience-highlights li {
					position: relative;
					padding-left: 1.75rem;
					font-size: 0.95rem;
					line-height: 1.6;
					opacity: 0.8;
				}

				.experience-highlights li::before {
					content: '▸';
					position: absolute;
					left: 0;
					opacity: 0.5;
					font-size: 1.1rem;
					transition: all 0.3s ease;
				}

				.experience-card:hover .experience-highlights li::before {
					opacity: 1;
					transform: translateX(4px);
				}

				/* Timeline */
				.timeline-connector {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding-top: 2rem;
				}

				.timeline-dot {
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background: rgba(255, 255, 255, 0.3);
					border: 2px solid var(--border-color);
					flex-shrink: 0;
					z-index: 2;
					transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
				}

				.experience-item:hover .timeline-dot {
					background: rgba(255, 255, 255, 0.6);
					border-color: var(--border-color-hover);
					box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
				}

				.timeline-line {
					width: 2px;
					flex: 1;
					background: linear-gradient(to bottom,
						var(--border-color),
						rgba(255, 255, 255, 0.05)
					);
					margin-top: 1rem;
				}

				/* -------- EDUCATION -------- */

				.education-item {
					margin-bottom: 1.5rem;
				}

				.education-card {
					background: var(--card-bg);
					backdrop-filter: blur(20px);
					border: 1px solid var(--border-color);
					border-radius: 16px;
					padding: 1.75rem;
					transition: all 0.3s ease;
				}

				.education-card:hover {
					background: var(--card-bg-hover);
					border-color: var(--border-color-hover);
					transform: translateX(8px);
				}

				.education-degree {
					font-size: 1.1rem;
					margin-bottom: 0.35rem;
				}

				.education-school {
					font-size: 1rem;
					opacity: 0.8;
					margin-bottom: 0.5rem;
				}

				.muted {
					opacity: 0.6;
					font-size: 0.9rem;
					margin: 0;
				}

				/* -------- SKILLS -------- */

				.skills-grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
					gap: 1.25rem;
				}

				.skill-card {
					background: var(--card-bg);
					backdrop-filter: blur(20px);
					border: 1px solid var(--border-color);
					border-radius: 18px;
					padding: 1.75rem;
					transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
					position: relative;
					overflow: hidden;
				}

				.skill-card::before {
					content: '';
					position: absolute;
					inset: 0;
					background: linear-gradient(135deg,
						rgba(59, 130, 246, 0.1),
						transparent
					);
					opacity: 0;
					transition: opacity 0.3s ease;
				}

				.skill-card:hover::before {
					opacity: 1;
				}

				.skill-card:hover {
					background: var(--card-bg-hover);
					border-color: var(--border-color-hover);
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
				}

				.skill-category {
					font-size: 1.1rem;
					font-weight: 600;
					margin-bottom: 1rem;
					letter-spacing: -0.01em;
				}

				.skill-items {
					display: flex;
					flex-wrap: wrap;
					gap: 0.5rem;
				}

				.skill-tag {
					background: rgba(255, 255, 255, 0.08);
					border: 1px solid var(--border-color);
					border-radius: 8px;
					padding: 0.35rem 0.75rem;
					font-size: 0.85rem;
					opacity: 0.8;
					transition: all 0.2s ease;
				}

				.skill-tag:hover {
					background: rgba(255, 255, 255, 0.12);
					opacity: 1;
					transform: translateY(-2px);
				}

				/* -------- HONORS -------- */

				.honors-grid {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
					gap: 1.25rem;
				}

				.honor-card {
					position: relative;
					padding: 1.5rem;
					background: var(--card-bg);
					border: 1px solid var(--border-color);
					border-radius: 8px;
					transition: all 0.3s ease;
				}

				.honor-card:hover {
					background: var(--card-bg-hover);
					border-color: var(--border-color-hover);
				}

				.honor-year {
					font-size: 0.85rem;
					opacity: 0.6;
					margin-bottom: 0.5rem;
					font-weight: 500;
				}

				.honor-title {
					font-size: 1.1rem;
					font-weight: 600;
					margin-bottom: 0.5rem;
					line-height: 1.4;
				}

				.honor-org {
					font-size: 0.9rem;
					opacity: 0.7;
					margin: 0;
					line-height: 1.5;
				}

				.honor-shine {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.03), transparent);
					pointer-events: none;
					opacity: 0;
					transition: opacity 0.3s ease;
				}

				.honor-card:hover .honor-shine {
					opacity: 1;
				}


				/* -------- MOBILE & TABLET -------- */

				@media (max-width: 1024px) {
					.about-wrapper {
						padding: 7rem 1.5rem 5rem;
					}

					.about-content {
						margin-left: 0;
						gap: 6rem;
					}

					.about-nav {
						display: none;
					}
				}

				@media (max-width: 768px) {
					.about-wrapper {
						padding: 6rem 1.25rem 4rem;
					}

					.about-content {
						gap: 5rem;
					}

					.intro-grid {
						flex-direction: column;
						align-items: flex-start;
						gap: 2rem;
					}

					.about-headshot {
						width: 110px;
						height: 110px;
					}

					.intro-text {
						max-width: 100%;
					}

					.section-title {
						font-size: 1.8rem;
					}

					.experience-item {
						grid-template-columns: 1fr;
						gap: 0;
					}

					.timeline-connector {
						display: none;
					}

					.experience-header {
						flex-direction: column;
						gap: 0.75rem;
						margin-bottom: 1.25rem;
					}

					.experience-meta {
						align-items: flex-start;
						flex-direction: row;
						width: 100%;
						justify-content: space-between;
					}

					.experience-card {
						padding: 1.5rem;
					}

					.skills-grid {
						grid-template-columns: 1fr;
					}

					.honors-grid {
						grid-template-columns: 1fr;
					}

					.honor-year {
						font-size: 1.5rem;
						top: 0.75rem;
						right: 0.75rem;
					}

					.status-badge {
						font-size: 0.7rem;
						padding: 0.3rem 0.7rem;
					}
				}

				@media (max-width: 480px) {
					.about-wrapper {
						padding: 5rem 1rem 3rem;
					}

					.section-header {
						margin-bottom: 2rem;
					}

					.section-title {
						font-size: 1.6rem;
					}

					.experience-card,
					.education-card,
					.skill-card,
					.honor-card {
						padding: 1.25rem;
					}

					.experience-company {
						font-size: 1.15rem;
					}

					.skill-category {
						font-size: 1rem;
					}
				}
			`}</style>
    </section>
  );
};

export default Portfolio;

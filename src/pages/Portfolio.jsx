import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import headshot from "../assets/images/about/headshot.jpeg";
import cvFile from "../assets/pdf/CV.pdf";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const sections = [
  { id: "intro", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "honors", label: "Honors" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:sknkfyi@gmail.com",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
];

const experiences = [
  {
    company: "G4 Lab, Colorado School of Mines",
    role: "Research Assistant",
    period: "Aug 2025 — Present",
    status: "current",
    highlights: [
      "ML-driven surrogate models for PDE systems.",
      "Python pipelines for simulation and inverse problems.",
      "Translated mathematical models into scalable research software.",
    ],
  },
  {
    company: "Colorado School of Mines",
    role: "Teaching Assistant",
    period: "Aug 2025 — May 2026",
    status: "current",
    highlights: [
      "Mentored graduate students on ML design and optimization.",
      "Supported labs, grading, and evaluations.",
    ],
  },
  {
    company: "Data-Driven CPS Lab",
    role: "Research Assistant",
    period: "Aug 2023 — May 2025",
    highlights: [
      "Designed FlowSHACL, a DAG-based SHACL engine.",
      "Dependency-aware execution optimizations.",
      "Benchmarking pipelines on large RDF datasets.",
    ],
  },
  {
    company: "Sloan Foundation Energy Project",
    role: "Full Stack Engineer",
    period: "Jan 2023 — May 2025",
    highlights: [
      "Backend services for high-frequency energy data.",
      "Containerized deployment via Docker.",
    ],
  },
  {
    company: "NCompass Tech Studio",
    role: "Software Engineer",
    period: "May 2021 — May 2022",
    highlights: [
      "Android and Flutter application development.",
      "UI redesign — 1,000+ new downloads.",
    ],
  },
];

const education = [
  {
    degree: "Ph.D., Computer Science",
    school: "Colorado School of Mines",
    advisor: "Advisor: Prof. Pejman Tahmasebi",
    status: "current",
  },
  {
    degree: "M.S., Computer Science",
    school: "Colorado School of Mines",
    gpa: "3.7 / 4.0",
    advisor: "Advisor: Prof. Gabe Fierro",
  },
  {
    degree: "B.E., Electronics & Communication",
    school: "Anna University",
    gpa: "8.56 / 10",
    distinction: "First Class with Distinction",
  },
];

const skills = [
  { category: "Programming", items: ["Python", "C", "Java", "JavaScript"] },
  { category: "Machine Learning", items: ["PyTorch", "scikit-learn"] },
  { category: "Scientific Computing", items: ["PDEs", "Numerical Methods"] },
  { category: "Systems & Tools", items: ["Linux", "Docker", "REST APIs"] },
  { category: "Cloud & DevOps", items: ["AWS", "GCP", "CI/CD"] },
];

const honors = [
  { title: "Best Poster Presentation", org: "CMAPP Honors", year: "2025" },
  { title: "Hackathon Winner", org: "Echoes of Equality", year: "2022" },
  {
    title: "Research Symposium Judge",
    org: "Colorado School of Mines",
    year: "2024",
  },
  { title: "Best Presentation", org: "ECUBE, Anna University", year: "2022" },
];

/* ─────────────────────────────────────────
   VARIANTS
───────────────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.02 } },
};
const up = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─────────────────────────────────────────
   EXPERIENCE CARD
───────────────────────────────────────── */
const ExpCard = ({ exp }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className={`exp-card${exp.status === "current" ? " exp-card-live" : ""}`}
      variants={up}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {exp.status === "current" && <div className="exp-live-bar" />}

      <div className="exp-top">
        <div className="exp-top-left">
          <div className="exp-role-row">
            <span className="exp-role">{exp.role}</span>
            {exp.status === "current" && (
              <span className="exp-badge">
                <span className="exp-badge-dot" />
                Now
              </span>
            )}
          </div>
          <p className="exp-company">{exp.company}</p>
        </div>
        <span className="exp-period">{exp.period}</span>
      </div>

      <button
        className="exp-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{open ? "Hide details" : "Show details"}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <ul className="exp-bullets">
          {exp.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -6 }}
              transition={{ delay: i * 0.055 + 0.04 }}
            >
              {h}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   SECTION QUICK-NAV — left-side vertical
───────────────────────────────────────── */
const SectionNav = ({ active, onNav }) => (
  <div className="sec-nav-wrap">
    {sections.map(({ id, label }) => (
      <button
        key={id}
        className={`sec-nav-btn${active === id ? " active" : ""}`}
        onClick={() => onNav(id)}
      >
        <span className="sec-nav-line" />
        <span className="sec-nav-label">{label}</span>
      </button>
    ))}
  </div>
);

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
const Portfolio = () => {
  const [active, setActive] = useState("intro");

  /* Active section tracking */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-38% 0px -38% 0px", threshold: 0 },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="pf-root">
      <style>{CSS}</style>

      {/* Section quick-nav — always visible left sidebar */}
      <SectionNav active={active} onNav={scrollTo} />

      <div className="pf-page">
        {/* ══ INTRO ══ */}
        <section
          id="intro"
          className="pf-section"
          style={{ scrollMarginTop: "108px" }}
        >
          {/* Action buttons */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "2.25rem" }}
          >
            <motion.a
              href="https://calendar.app.google/QECW5xXxB1YGAGnu9"
              target="_blank"
              rel="noopener noreferrer"
              className="schedule-pill"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="schedule-icon-wrap">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <span>Schedule a call</span>
              <span className="schedule-arrow-wrap">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </motion.a>
            <motion.a
              href={cvFile}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-pill"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="16" y2="17" />
                <line x1="8" y1="9" x2="10" y2="9" />
              </svg>
              View CV
            </motion.a>
          </motion.div>

          {/* Photo + name — single row */}
          <div className="hero-name-row">
            <motion.div
              className="pf-photo-wrap"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={headshot}
                alt="Sowndarya Krishnan"
                className="pf-photo"
              />
            </motion.div>

            <div className="pf-clip">
              <motion.h1
                className="pf-name"
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.1,
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Sowndarya <span className="pf-name-dim">Krishnan NK</span>
              </motion.h1>
            </div>
          </div>

          {/* Subtitle + location */}
          <motion.div
            className="hero-sub-row"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
          >
            <span className="hero-subtitle">
              Ph.D. Student · Computer Science · Colorado School of Mines
            </span>
            <span className="hero-location">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Golden, CO
            </span>
          </motion.div>

          {/* Social pills */}
          <motion.div
            className="hero-socials"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
          >
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {s.icon}
                {s.label}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="hero-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.52, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.p
            className="pf-bio"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55 }}
          >
            Hybrid quantum–AI methods for scientific computing and physics-based
            modeling — extending classical simulation limits through
            computational innovation.
          </motion.p>
        </section>

        {/* ══ EXPERIENCE ══ */}
        <section
          id="experience"
          className="pf-section"
          style={{ scrollMarginTop: "108px" }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2 className="pf-sec-title" variants={up}>
              Experience
            </motion.h2>
            <div className="exp-list">
              {experiences.map((exp, i) => (
                <ExpCard key={i} exp={exp} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══ EDUCATION ══ */}
        <section
          id="education"
          className="pf-section"
          style={{ scrollMarginTop: "108px" }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2 className="pf-sec-title" variants={up}>
              Education
            </motion.h2>
            <div className="edu-list">
              {education.map((edu, i) => (
                <motion.div key={i} className="edu-card" variants={up}>
                  <div className="edu-card-body">
                    <div className="edu-card-top">
                      <div>
                        <p className="edu-degree">{edu.degree}</p>
                        <p className="edu-school">{edu.school}</p>
                      </div>
                      {edu.status === "current" && (
                        <span className="edu-badge">
                          <span className="exp-badge-dot" />
                          In Progress
                        </span>
                      )}
                    </div>
                    <div className="edu-meta-row">
                      {edu.gpa && (
                        <span className="edu-pill">GPA {edu.gpa}</span>
                      )}
                      {edu.advisor && (
                        <span className="edu-pill">{edu.advisor}</span>
                      )}
                      {edu.distinction && (
                        <span className="edu-pill">{edu.distinction}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══ SKILLS ══ */}
        <section
          id="skills"
          className="pf-section"
          style={{ scrollMarginTop: "108px" }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2 className="pf-sec-title" variants={up}>
              Skills
            </motion.h2>
            <div className="bento">
              {skills.map((s, i) => (
                <motion.div
                  key={i}
                  className={`bento-card bento-${i}`}
                  variants={up}
                  whileHover={{ y: -3, borderColor: "var(--pf-border-hi)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <p className="bento-cat">{s.category}</p>
                  <div className="bento-tags">
                    {s.items.map((item, j) => (
                      <span key={j} className="pf-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══ HONORS ══ */}
        <section
          id="honors"
          className="pf-section pf-section-last"
          style={{ scrollMarginTop: "108px" }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2 className="pf-sec-title" variants={up}>
              Honors & Awards
            </motion.h2>
            <div className="honors-grid">
              {honors.map((h, i) => (
                <motion.div
                  key={i}
                  className="honor-card"
                  variants={up}
                  whileHover={{ y: -3, borderColor: "var(--pf-border-hi)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <span className="honor-year">{h.year}</span>
                  <h3 className="honor-title">{h.title}</h3>
                  {h.org && <p className="honor-org">{h.org}</p>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   CSS
───────────────────────────────────────── */
const CSS = `
  .pf-root {
    --pf-border:    var(--glass-border);
    --pf-border-hi: rgba(var(--text-rgb, 229,231,235), 0.28);
    --pf-card:      var(--glass-bg);
    --pf-green:     #34d399;
    --pf-green-bg:  rgba(52,211,153,0.07);
    --pf-green-br:  rgba(52,211,153,0.22);

    /* Adjust this to match your Navbar's actual height */
    --navbar-h: 64px;
  }

  .pf-root *, .pf-root *::before, .pf-root *::after { box-sizing: border-box; }
  .pf-root { color: var(--text); min-height: 100vh; }

  /* ═══════════════════════════════════
     SECTION QUICK-NAV — left vertical
  ═══════════════════════════════════ */
  .sec-nav-wrap {
    position: fixed;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 40;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .sec-nav-btn {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: none; border: none; cursor: pointer;
    padding: 0.2rem 0;
    text-align: left;
  }

  .sec-nav-line {
    display: block;
    width: 18px; height: 1.5px;
    background: var(--text);
    border-radius: 2px;
    opacity: 0.2;
    transition: width 0.22s ease, opacity 0.22s ease;
    flex-shrink: 0;
  }

  .sec-nav-label {
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--text);
    opacity: 0.25;
    white-space: nowrap;
    transition: opacity 0.18s ease;
  }

  .sec-nav-btn:hover .sec-nav-line  { width: 26px; opacity: 0.45; }
  .sec-nav-btn:hover .sec-nav-label { opacity: 0.55; }

  .sec-nav-btn.active .sec-nav-line  { width: 28px; opacity: 0.9; }
  .sec-nav-btn.active .sec-nav-label { opacity: 0.88; }

  /* ═══════════════════════
     PAGE LAYOUT
  ═══════════════════════ */
  .pf-page {
    max-width: 760px;
    margin: 0 auto;
    /* Top padding accounts for Navbar + small breathing room */
    padding: calc(var(--navbar-h) + 3rem) 2rem 10rem;
    display: flex;
    flex-direction: column;
    gap: 7rem;
  }

  .pf-section      { position: relative; }
  .pf-section-last { padding-bottom: 2rem; }

  .pf-sec-title {
    font-family: "Playfair Display", serif;
    font-size: clamp(1.75rem, 3.2vw, 2.2rem);
    font-weight: 700; letter-spacing: -0.03em;
    opacity: 0.9; margin-bottom: 1.75rem;
  }

  /* ═══════════════════════
     HERO
  ═══════════════════════ */
  /* ═══════════════════════
     HERO ACTIONS
  ═══════════════════════ */
  .hero-actions {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    flex-wrap: wrap;
  }

  .schedule-pill {
    display: inline-flex; align-items: center; gap: 0.6rem;
    padding: 0.36rem 0.5rem 0.36rem 0.62rem;
    background: var(--glass-bg); border: 1px solid var(--pf-border);
    border-radius: 999px;
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.86rem; font-weight: 700;
    color: var(--text); text-decoration: none;
    letter-spacing: 0.02em; backdrop-filter: blur(12px);
    opacity: 0.72; transition: opacity 0.2s, border-color 0.2s;
  }
  .schedule-pill:hover { opacity: 1; border-color: var(--pf-border-hi); }

  .schedule-icon-wrap {
    display: flex; align-items: center; justify-content: center;
    width: 26px; height: 26px;
    background: rgba(var(--text-rgb,229,231,235),0.07);
    border: 1px solid var(--pf-border); border-radius: 50%;
  }
  .schedule-arrow-wrap {
    display: flex; align-items: center; justify-content: center;
    width: 24px; height: 24px;
    background: rgba(var(--text-rgb,229,231,235),0.07);
    border: 1px solid var(--pf-border); border-radius: 50%;
    transition: background 0.18s;
  }
  .schedule-pill:hover .schedule-arrow-wrap {
    background: rgba(var(--text-rgb,229,231,235),0.13);
  }

  .cv-pill {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: none; border: none; padding: 0;
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.86rem; font-weight: 800;
    color: var(--text); text-decoration: none;
    letter-spacing: 0.04em;
    opacity: 0.65;
    border-bottom: 1.5px solid currentColor;
    padding-bottom: 1px;
    transition: opacity 0.18s;
  }
  .cv-pill:hover { opacity: 1; }

  .hero-name-row {
    display: flex; align-items: center;
    gap: 1rem; margin-bottom: 1rem;
  }
  .pf-photo-wrap { flex-shrink: 0; }
  .pf-photo {
    width: 62px; height: 62px; border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 0 1px var(--pf-border), 0 4px 16px rgba(0,0,0,0.14);
    filter: saturate(0.88); display: block;
  }
  .pf-clip { overflow: hidden; }
  .pf-name {
    font-family: "Playfair Display", serif;
    font-size: clamp(2.1rem, 5.5vw, 3.8rem);
    font-weight: 700; letter-spacing: -0.04em;
    line-height: 1; opacity: 0.95;
    display: block; margin: 0; white-space: nowrap;
  }
  .pf-name-dim { opacity: 0.38; }

  .hero-sub-row {
    display: flex; align-items: center;
    gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;
  }
  .hero-subtitle { font-size: 0.87rem; font-weight: 400; opacity: 0.42; letter-spacing: 0.01em; }
  .hero-location {
    display: inline-flex; align-items: center; gap: 0.3rem;
    font-size: 0.82rem; opacity: 0.26; letter-spacing: 0.02em;
  }

  .hero-socials { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.85rem; }

  .social-pill {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.34rem 0.8rem;
    background: var(--glass-bg); border: 1px solid var(--pf-border);
    border-radius: 999px;
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.79rem; font-weight: 700;
    color: var(--text); text-decoration: none;
    opacity: 0.52; letter-spacing: 0.02em;
    backdrop-filter: blur(8px);
    transition: opacity 0.18s, border-color 0.18s;
  }
  .social-pill:hover { opacity: 1; border-color: var(--pf-border-hi); }

  .hero-divider {
    height: 1px; background: var(--pf-border);
    margin-bottom: 1.5rem; transform-origin: left;
  }
  .pf-bio {
    font-size: 1rem; font-weight: 300;
    line-height: 1.8; opacity: 0.56; margin: 0;
  }

  /* ═══════════════════════
     EXPERIENCE CARDS
  ═══════════════════════ */
  .exp-list { display: flex; flex-direction: column; gap: 0.75rem; }

  .exp-card {
    position: relative;
    background: var(--pf-card);
    border: 1px solid var(--pf-border);
    border-radius: 14px;
    padding: 1.25rem 1.4rem 1rem;
    overflow: hidden;
    transition: border-color 0.22s, transform 0.22s;
  }

  .exp-live-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--pf-green) 0%, transparent 100%);
    opacity: 0.65;
  }

  .exp-top {
    display: flex; justify-content: space-between;
    align-items: flex-start; gap: 1rem; margin-bottom: 0.6rem;
  }
  .exp-top-left { flex: 1; min-width: 0; }
  .exp-role-row {
    display: flex; align-items: center; gap: 0.5rem;
    margin-bottom: 0.22rem; flex-wrap: wrap;
  }
  .exp-role {
    font-family: "Playfair Display", serif;
    font-size: 1.1rem; font-weight: 700;
    letter-spacing: -0.02em; opacity: 0.92;
  }
  .exp-badge {
    display: inline-flex; align-items: center; gap: 0.28rem;
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.58rem; font-weight: 800;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--pf-green); background: var(--pf-green-bg);
    border: 1px solid var(--pf-green-br); border-radius: 20px;
    padding: 0.15rem 0.45rem; white-space: nowrap;
  }
  .exp-badge-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--pf-green);
    animation: blink 2s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

  .exp-company {
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.84rem; font-weight: 500; opacity: 0.45;
  }
  .exp-period {
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.72rem; font-weight: 600;
    opacity: 0.32; letter-spacing: 0.02em;
    white-space: nowrap; flex-shrink: 0; padding-top: 0.2rem;
  }
  .exp-toggle {
    display: inline-flex; align-items: center; gap: 0.35rem;
    background: none; border: none; cursor: pointer;
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--text); opacity: 0.3; padding: 0;
    transition: opacity 0.18s;
  }
  .exp-toggle:hover { opacity: 0.7; }

  .exp-bullets {
    list-style: none; padding: 0;
    margin: 0.85rem 0 0.35rem;
    display: flex; flex-direction: column; gap: 0.45rem;
  }
  .exp-bullets li {
    font-size: 0.93rem; font-weight: 300;
    line-height: 1.7; padding-left: 1.1rem;
    position: relative; opacity: 0.62;
  }
  .exp-bullets li::before {
    content: '–'; position: absolute; left: 0;
    opacity: 0.4; font-size: 0.85rem; top: 0.05em;
  }

  /* ═══════════════════════
     EDUCATION CARDS
  ═══════════════════════ */
  .edu-list { display: flex; flex-direction: column; gap: 0.65rem; }

  .edu-card {
    display: flex; align-items: stretch;
    background: var(--pf-card);
    border: 1px solid var(--pf-border);
    border-radius: 14px; overflow: hidden;
    transition: border-color 0.22s;
  }
  .edu-card-body {
    flex: 1; padding: 1.2rem 1.35rem;
    display: flex; flex-direction: column; gap: 0.65rem;
  }
  .edu-card-top {
    display: flex; justify-content: space-between;
    align-items: flex-start; gap: 1rem;
  }
  .edu-degree {
    font-family: "Playfair Display", serif;
    font-size: 1.08rem; font-weight: 700;
    letter-spacing: -0.02em; opacity: 0.92; margin-bottom: 0.2rem;
  }
  .edu-school {
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.84rem; font-weight: 600; opacity: 0.45;
  }
  .edu-badge {
    display: inline-flex; align-items: center; gap: 0.28rem;
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.58rem; font-weight: 800;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--pf-green); background: var(--pf-green-bg);
    border: 1px solid var(--pf-green-br); border-radius: 20px;
    padding: 0.15rem 0.45rem; white-space: nowrap; flex-shrink: 0; margin-top: 0.1rem;
  }
  .edu-meta-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .edu-pill {
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.75rem; font-weight: 500;
    padding: 0.22rem 0.6rem; border-radius: 5px;
    background: rgba(var(--text-rgb,229,231,235),0.05);
    border: 1px solid var(--pf-border);
    opacity: 0.55; letter-spacing: 0.01em;
  }

  /* ═══════════════════════
     BENTO SKILLS
  ═══════════════════════ */
  .bento { display: grid; grid-template-columns: repeat(6,1fr); gap: 0.6rem; }
  .bento-0 { grid-column: span 4; }
  .bento-1 { grid-column: span 2; }
  .bento-2 { grid-column: span 2; }
  .bento-3 { grid-column: span 2; }
  .bento-4 { grid-column: span 2; }

  .bento-card {
    background: var(--pf-card); border: 1px solid var(--pf-border);
    border-radius: 14px; padding: 1.15rem;
    transition: border-color 0.25s, transform 0.25s;
  }
  .bento-cat {
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.67rem; font-weight: 800;
    letter-spacing: 0.12em; text-transform: uppercase;
    opacity: 0.38; margin-bottom: 0.7rem;
  }
  .bento-tags { display: flex; flex-wrap: wrap; gap: 0.32rem; }
  .pf-tag {
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.79rem; font-weight: 500;
    padding: 0.26rem 0.62rem; border-radius: 5px;
    background: var(--tag-bg); border: 1px solid var(--tag-border);
    opacity: 0.78; letter-spacing: 0.02em; transition: opacity 0.15s;
  }
  .pf-tag:hover { opacity: 1; }

  /* ═══════════════════════
     HONORS
  ═══════════════════════ */
  .honors-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.6rem; }

  .honor-card {
    background: var(--pf-card); border: 1px solid var(--pf-border);
    border-radius: 14px; padding: 1.25rem;
    transition: border-color 0.25s, transform 0.25s;
  }
  .honor-year {
    display: block;
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.67rem; font-weight: 800;
    letter-spacing: 0.14em; text-transform: uppercase;
    opacity: 0.34; margin-bottom: 0.48rem;
  }
  .honor-title {
    font-family: "Playfair Display", serif;
    font-size: 1.02rem; font-weight: 700;
    letter-spacing: -0.02em; line-height: 1.3;
    margin-bottom: 0.3rem; opacity: 0.9;
  }
  .honor-org { font-size: 0.82rem; opacity: 0.44; }

  /* ═══════════════════════
     LIGHT THEME
  ═══════════════════════ */
  :root[data-theme="light"] .pf-name,
  :root[data-theme="light"] .exp-role,
  :root[data-theme="light"] .edu-degree,
  :root[data-theme="light"] .honor-title,
  :root[data-theme="light"] .pf-sec-title  { color: #111; opacity: 1; }

  :root[data-theme="light"] .pf-name-dim   { color: #111; opacity: 0.3; }
  :root[data-theme="light"] .pf-bio        { color: #333; opacity: 1; }
  :root[data-theme="light"] .exp-company   { color: #555; opacity: 1; }
  :root[data-theme="light"] .exp-period    { color: #777; opacity: 1; }
  :root[data-theme="light"] .exp-bullets li{ color: #333; opacity: 1; }
  :root[data-theme="light"] .exp-toggle    { color: #111; }
  :root[data-theme="light"] .edu-pill      { color: #444; opacity: 1; border-color: rgba(0,0,0,0.1); background: rgba(0,0,0,0.03); }
  :root[data-theme="light"] .honor-org     { color: #666; opacity: 1; }
  :root[data-theme="light"] .bento-cat     { color: #555; opacity: 1; }
  :root[data-theme="light"] .honor-year    { color: #777; opacity: 1; }
  :root[data-theme="light"] .hero-subtitle { color: #555; opacity: 1; }
  :root[data-theme="light"] .hero-location { color: #888; opacity: 1; }

  :root[data-theme="light"] .sec-nav-line  { background: #111; }
  :root[data-theme="light"] .sec-nav-label { color: #111; }

  :root[data-theme="light"] .schedule-pill { color: #111; }
  :root[data-theme="light"] .schedule-icon-wrap,
  :root[data-theme="light"] .schedule-arrow-wrap { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1); }
  :root[data-theme="light"] .cv-pill { color: #111; }
  :root[data-theme="light"] .social-pill   { color: #111; }
  :root[data-theme="light"] .hero-divider  { background: rgba(0,0,0,0.09); }

  :root[data-theme="light"] .exp-card,
  :root[data-theme="light"] .edu-card,
  :root[data-theme="light"] .bento-card,
  :root[data-theme="light"] .honor-card    { border-color: rgba(0,0,0,0.09); }
  :root[data-theme="light"] .edu-card-left { border-color: rgba(0,0,0,0.09); }
  :root[data-theme="light"] .pf-tag        { color: #222; }

  :root[data-theme="light"] .exp-badge,
  :root[data-theme="light"] .edu-badge { color: #0a7a52; background: rgba(10,122,82,0.07); border-color: rgba(10,122,82,0.25); }
  :root[data-theme="light"] .exp-badge-dot { background: #0a7a52; }

  /* ═══════════════════════
     RESPONSIVE
  ═══════════════════════ */
  @media (max-width: 900px) {
    .sec-nav-wrap { display: none; }
  }

  @media (max-width: 640px) {

    .pf-page { padding: calc(var(--navbar-h) + 2rem) 1.1rem 8rem; gap: 5.5rem; }

    .pf-name { font-size: clamp(1.7rem, 9vw, 2.5rem); white-space: normal; }
    .pf-photo { width: 52px; height: 52px; }

    .hero-sub-row { flex-direction: column; align-items: flex-start; gap: 0.2rem; }

    .exp-top { flex-direction: column; gap: 0.3rem; }
    .exp-period { padding-top: 0; }

    .edu-card-top { flex-direction: column; gap: 0.4rem; }

    .bento { grid-template-columns: 1fr 1fr; }
    .bento-0 { grid-column: span 2; }
    .bento-1, .bento-2, .bento-3, .bento-4 { grid-column: span 1; }

    .honors-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 380px) {
    .sec-nav-btn { font-size: 0.6rem; padding: 0.22rem 0.38rem; }
  }
`;

export default Portfolio;

import { motion, AnimatePresence } from "framer-motion";
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

const experiences = [
  {
    company: "G4 Lab, Colorado School of Mines",
    role: "Research Assistant",
    period: "Aug 2025",
    periodEnd: "Present",
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
    period: "Aug 2025",
    periodEnd: "May 2026",
    status: "current",
    highlights: [
      "Mentored graduate students on ML design and optimization.",
      "Supported labs, grading, and evaluations.",
    ],
  },
  {
    company: "Data-Driven CPS Lab",
    role: "Research Assistant",
    period: "Aug 2023",
    periodEnd: "May 2025",
    highlights: [
      "Designed FlowSHACL, a DAG-based SHACL engine.",
      "Dependency-aware execution optimizations.",
      "Benchmarking pipelines on large RDF datasets.",
    ],
  },
  {
    company: "Sloan Foundation Energy Project",
    role: "Full Stack Engineer",
    period: "Jan 2023",
    periodEnd: "May 2025",
    highlights: [
      "Backend services for high-frequency energy data.",
      "Containerized deployment via Docker.",
    ],
  },
  {
    company: "NCompass Tech Studio",
    role: "Software Engineer",
    period: "May 2021",
    periodEnd: "May 2022",
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
    meta: "Advisor: Prof. Pejman Tahmasebi",
    status: "current",
  },
  {
    degree: "M.S., Computer Science",
    school: "Colorado School of Mines",
    meta: "GPA 3.7 / 4.0 · Advisor: Prof. Gabe Fierro",
  },
  {
    degree: "B.E., Electronics & Communication",
    school: "Anna University",
    meta: "GPA 8.56 / 10 · First Class with Distinction",
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
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.02 } },
};

const up = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

/* ─────────────────────────────────────────
   EXPERIENCE TIMELINE ITEM
───────────────────────────────────────── */

const TimelineItem = ({ exp, isLast }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="tl-item" variants={up}>
      {/* spine */}
      <div className="tl-spine">
        <div
          className={`tl-node${exp.status === "current" ? " tl-node-live" : ""}`}
        />
        {!isLast && <div className="tl-line" />}
      </div>

      {/* content */}
      <div className="tl-content" onClick={() => setOpen(!open)}>
        <div className="tl-header">
          <div className="tl-header-left">
            <h3 className="tl-company">{exp.company}</h3>
            <p className="tl-role">{exp.role}</p>
          </div>
          <div className="tl-header-right">
            <span className="tl-period">
              {exp.period} — {exp.periodEnd}
            </span>
            {exp.status === "current" && (
              <span className="tl-badge">
                <span className="tl-badge-dot" />
                Now
              </span>
            )}
            <motion.span
              className="tl-chevron"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
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
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.span>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: "hidden" }}
        >
          <ul className="tl-bullets">
            {exp.highlights.map((h, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: open ? 1 : 0, x: open ? 0 : -8 }}
                transition={{ delay: j * 0.06 + 0.05 }}
              >
                {h}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */

const Portfolio = () => {
  const [active, setActive] = useState("intro");

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
      {/* ── DOT NAV ── */}
      <nav className="pf-dotnav">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            className={`pf-dot-btn${active === id ? " active" : ""}`}
            onClick={() => scrollTo(id)}
            title={label}
          >
            <span className="pf-dot-pip" />
          </button>
        ))}
      </nav>

      <div className="pf-page">
        {/* ══════════════════════
            INTRO — centered hero
        ══════════════════════ */}
        <section
          id="intro"
          className="pf-section"
          style={{ scrollMarginTop: "100px" }}
        >
          <motion.div
            className="pf-hero"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* ── LEFT: photo ── */}
            <motion.div
              className="pf-photo-wrap"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={headshot}
                alt="Sowndarya Krishnan"
                className="pf-photo"
              />
            </motion.div>

            {/* ── RIGHT ── */}
            <div className="pf-hero-right">
              <div className="pf-clip">
                <motion.h1
                  className="pf-name"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 0.12,
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  Sowndarya Krishnan NK
                </motion.h1>
              </div>

              <motion.div className="pf-chips" variants={up}>
                {[
                  "Ph.D. Student",
                  "Computer Science",
                  "Colorado School of Mines",
                ].map((label) => (
                  <span key={label} className="pf-chip">
                    {label}
                  </span>
                ))}
              </motion.div>

              <motion.p className="pf-bio" variants={up}>
                Hybrid quantum–AI methods for scientific computing and
                physics-based modeling — extending classical simulation limits
                through computational innovation.
              </motion.p>

              <motion.div className="pf-hero-bottom" variants={up}>
                <span className="pf-meta">
                  Golden, CO ·{" "}
                  <a href="mailto:sknkfyi@gmail.com">sknkfyi@gmail.com</a>
                </span>
                <div className="pf-actions">
                  <motion.a
                    href={cvFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf-btn pf-btn-fill"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
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
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View CV
                  </motion.a>
                  <motion.a
                    href="https://calendar.app.google/QECW5xXxB1YGAGnu9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf-btn pf-btn-ghost"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
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
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Schedule
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════
            EXPERIENCE — timeline
        ══════════════════════ */}
        <section
          id="experience"
          className="pf-section"
          style={{ scrollMarginTop: "100px" }}
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
            <div className="tl-list">
              {experiences.map((exp, i) => (
                <TimelineItem
                  key={i}
                  exp={exp}
                  isLast={i === experiences.length - 1}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════
            EDUCATION
        ══════════════════════ */}
        <section
          id="education"
          className="pf-section"
          style={{ scrollMarginTop: "100px" }}
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
                <motion.div key={i} className="edu-row" variants={up}>
                  <div className="edu-left">
                    <p className="edu-degree">{edu.degree}</p>
                    <p className="edu-meta">{edu.meta}</p>
                  </div>
                  <div className="edu-right">
                    <p className="edu-school">{edu.school}</p>
                    {edu.status === "current" && (
                      <span className="tl-badge">
                        <span className="tl-badge-dot" />
                        In Progress
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════
            SKILLS — bento grid
        ══════════════════════ */}
        <section
          id="skills"
          className="pf-section"
          style={{ scrollMarginTop: "100px" }}
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
                  whileHover={{ y: -4, borderColor: "var(--pf-border-hi)" }}
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

        {/* ══════════════════════
            HONORS — 2-col list
        ══════════════════════ */}
        <section
          id="honors"
          className="pf-section pf-section-last"
          style={{ scrollMarginTop: "100px" }}
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
                  whileHover={{ y: -4, borderColor: "var(--pf-border-hi)" }}
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
    --pf-border-hi: rgba(var(--text-rgb, 229,231,235), 0.3);
    --pf-card:      var(--glass-bg);
    --pf-green:     #34d399;
    --pf-green-bg:  rgba(52,211,153,0.08);
    --pf-green-br:  rgba(52,211,153,0.25);
  }

  .pf-root *, .pf-root *::before, .pf-root *::after { box-sizing: border-box; }

  .pf-root {
    color: var(--text);
    min-height: 100vh;
  }

  /* ── DOT NAV ── */
  .pf-dotnav {
    position: fixed;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 40;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .pf-dot-btn {
    background: none; border: none; cursor: pointer;
    padding: 4px; display: flex; align-items: center; justify-content: center;
  }

  .pf-dot-pip {
    display: block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--text);
    opacity: 0.18;
    transition: all 0.22s ease;
  }

  .pf-dot-btn.active .pf-dot-pip {
    opacity: 0.6;
    width: 8px; height: 8px;
  }

  .pf-dot-btn:hover .pf-dot-pip { opacity: 0.38; }

  /* ── PAGE ── */
  .pf-page {
    max-width: 760px;
    margin: 0 auto;
    padding: 6rem 2rem 10rem;
    display: flex;
    flex-direction: column;
    gap: 8rem;
  }

  .pf-section       { position: relative; }
  .pf-section-last  { padding-bottom: 2rem; }

  /* ── SECTION TITLE ── */
  .pf-sec-title {
    font-family: "Playfair Display", serif;
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    opacity: 0.9;
    margin-bottom: 2.25rem;
  }

  /* ── HERO ── */
  /* ── HERO ── */
  .pf-hero {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    padding-top: 0.5rem;
  }

  .pf-photo-wrap { flex-shrink: 0; }

  .pf-photo {
    width: 88px; height: 88px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 0 1px var(--pf-border), 0 4px 20px rgba(0,0,0,0.12);
    filter: saturate(0.9);
    display: block;
  }

  .pf-hero-right {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .pf-clip { overflow: hidden; }

  .pf-name {
    font-family: "Playfair Display", serif;
    font-size: clamp(1.6rem, 3.5vw, 2.4rem);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1;
    display: block;
    opacity: 0.95;
    white-space: nowrap;
  }

  /* info chip boxes */
  .pf-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .pf-chip {
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    background: var(--glass-bg);
    border: 1px solid var(--pf-border);
    border-radius: 7px;
    padding: 0.3rem 0.7rem;
    backdrop-filter: blur(10px);
    opacity: 0.75;
    white-space: nowrap;
  }

  .pf-bio {
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.7;
    opacity: 0.55;
    margin: 0;
  }

  .pf-hero-bottom {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
  }

  .pf-meta {
    font-size: 0.72rem;
    opacity: 0.3;
    letter-spacing: 0.03em;
  }
  .pf-meta a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
  .pf-meta a:hover { opacity: 0.6; }

  .pf-actions {
    display: flex;
    gap: 0.5rem;
    margin-left: auto;
  }

  .pf-btn {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.6rem 1.2rem;
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.75rem; font-weight: 800;
    letter-spacing: 0.07em; text-transform: uppercase;
    text-decoration: none;
    border-radius: 8px; cursor: pointer;
    transition: all 0.2s ease;
  }

  .pf-btn-fill {
    background: var(--text);
    color: var(--bg);
    border: 1px solid transparent;
    opacity: 0.85;
  }
  .pf-btn-fill:hover { opacity: 1; }

  .pf-btn-ghost {
    background: var(--glass-bg);
    color: var(--text);
    border: 1px solid var(--pf-border);
    backdrop-filter: blur(12px);
    opacity: 0.72;
  }
  .pf-btn-ghost:hover { opacity: 1; border-color: var(--text); }

  /* ── TIMELINE ── */
  .tl-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .tl-item {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 1.25rem;
    position: relative;
  }

  .tl-spine {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.35rem;
  }

  .tl-node {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--glass-bg);
    border: 2px solid var(--pf-border);
    flex-shrink: 0;
    transition: border-color 0.2s ease;
    z-index: 1;
  }

  .tl-node-live {
    border-color: var(--pf-green);
    background: var(--pf-green-bg);
    box-shadow: 0 0 8px rgba(52,211,153,0.25);
  }

  .tl-line {
    width: 1px;
    flex: 1;
    background: var(--pf-border);
    margin-top: 6px;
    min-height: 28px;
  }

  .tl-content {
    padding-bottom: 2rem;
    cursor: pointer;
  }

  .tl-item:last-child .tl-content { padding-bottom: 0; }

  .tl-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 0;
  }

  .tl-company {
    font-family: "Playfair Display", serif;
    font-size: 1.12rem; font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.25;
    margin-bottom: 0.2rem;
    opacity: 0.9;
  }

  .tl-role {
    font-size: 0.8rem;
    opacity: 0.4;
    font-style: italic;
  }

  .tl-header-right {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
    padding-top: 0.1rem;
  }

  .tl-period {
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.67rem;
    opacity: 0.3;
    letter-spacing: 0.03em;
    white-space: nowrap;
  }

  .tl-badge {
    display: inline-flex; align-items: center; gap: 0.3rem;
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.57rem; font-weight: 800;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--pf-green);
    background: var(--pf-green-bg);
    border: 1px solid var(--pf-green-br);
    border-radius: 20px;
    padding: 0.18rem 0.48rem;
    white-space: nowrap;
  }

  .tl-badge-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--pf-green);
    animation: blink 2s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

  .tl-chevron { opacity: 0.25; margin-left: 0.25rem; }
  .tl-content:hover .tl-chevron,
  .tl-item:hover .tl-node { border-color: var(--pf-border-hi); }

  .tl-bullets {
    list-style: none; padding: 0;
    margin-top: 0.85rem;
    display: flex; flex-direction: column; gap: 0.42rem;
  }

  .tl-bullets li {
    font-size: 0.86rem; font-weight: 300;
    line-height: 1.65; padding-left: 1rem; position: relative;
    opacity: 0.62;
  }

  .tl-bullets li::before {
    content: '·'; position: absolute; left: 0;
    opacity: 0.4; font-size: 1rem;
  }

  /* ── EDUCATION ── */
  .edu-list {
    display: flex; flex-direction: column;
    border-top: 1px solid var(--pf-border);
  }

  .edu-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    padding: 1.35rem 0;
    border-bottom: 1px solid var(--pf-border);
  }

  .edu-left { flex: 1; }

  .edu-degree {
    font-family: "Playfair Display", serif;
    font-size: 1.05rem; font-weight: 700;
    letter-spacing: -0.02em; margin-bottom: 0.25rem;
    opacity: 0.88;
  }

  .edu-meta {
    font-size: 0.72rem; opacity: 0.32; letter-spacing: 0.02em; line-height: 1.5;
  }

  .edu-right {
    display: flex; flex-direction: column;
    align-items: flex-end; gap: 0.35rem; flex-shrink: 0;
  }

  .edu-school {
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.78rem; font-weight: 700; opacity: 0.45; text-align: right;
  }

  /* ── BENTO SKILLS ── */
  .bento {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: auto auto;
    gap: 0.75rem;
  }

  /* Wide first card */
  .bento-0 { grid-column: span 4; }
  .bento-1 { grid-column: span 2; }
  .bento-2 { grid-column: span 2; }
  .bento-3 { grid-column: span 2; }
  .bento-4 { grid-column: span 2; }

  .bento-card {
    background: var(--pf-card);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid var(--pf-border);
    border-radius: 14px;
    padding: 1.35rem;
    transition: border-color 0.25s ease, transform 0.25s ease;
    cursor: default;
  }

  .bento-cat {
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.64rem; font-weight: 800;
    letter-spacing: 0.12em; text-transform: uppercase;
    opacity: 0.32; margin-bottom: 0.8rem;
  }

  .bento-tags { display: flex; flex-wrap: wrap; gap: 0.38rem; }

  .pf-tag {
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.73rem; font-weight: 500;
    padding: 0.26rem 0.62rem; border-radius: 5px;
    background: var(--tag-bg);
    border: 1px solid var(--tag-border);
    opacity: 0.72;
    cursor: default;
    transition: opacity 0.15s ease;
    letter-spacing: 0.02em;
  }
  .pf-tag:hover { opacity: 1; }

  /* ── HONORS ── */
  .honors-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .honor-card {
    background: var(--pf-card);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid var(--pf-border);
    border-radius: 14px;
    padding: 1.35rem;
    transition: border-color 0.25s ease, transform 0.25s ease;
    cursor: default;
  }

  .honor-year {
    display: block;
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.62rem; font-weight: 800;
    letter-spacing: 0.14em; text-transform: uppercase;
    opacity: 0.28; margin-bottom: 0.55rem;
  }

  .honor-title {
    font-family: "Playfair Display", serif;
    font-size: 1.02rem; font-weight: 700;
    letter-spacing: -0.02em; line-height: 1.3;
    margin-bottom: 0.35rem; opacity: 0.88;
  }

  .honor-org {
    font-size: 0.76rem; opacity: 0.35; font-weight: 400;
  }

  /* ── LIGHT THEME ── */
  :root[data-theme="light"] .pf-name,
  :root[data-theme="light"] .tl-company,
  :root[data-theme="light"] .edu-degree,
  :root[data-theme="light"] .honor-title,
  :root[data-theme="light"] .pf-sec-title { color: #000; opacity: 1; }

  :root[data-theme="light"] .pf-bio,
  :root[data-theme="light"] .tl-bullets li { color: #000; opacity: 0.72; }

  :root[data-theme="light"] .tl-role,
  :root[data-theme="light"] .edu-school,
  :root[data-theme="light"] .edu-meta,
  :root[data-theme="light"] .honor-org,
  :root[data-theme="light"] .bento-cat { color: #000; opacity: 0.5; }

  :root[data-theme="light"] .tl-period,
  :root[data-theme="light"] .honor-year,
  :root[data-theme="light"] .pf-chip,
  :root[data-theme="light"] .pf-meta { color: #000; opacity: 0.55; }

  :root[data-theme="light"] .pf-dot-pip { background: #000; }

  :root[data-theme="light"] .edu-list,
  :root[data-theme="light"] .edu-row { border-color: rgba(0,0,0,0.1); }

  :root[data-theme="light"] .tl-node { border-color: rgba(0,0,0,0.18); background: #fff; }
  :root[data-theme="light"] .tl-node-live { border-color: var(--pf-green); background: var(--pf-green-bg); }
  :root[data-theme="light"] .tl-line { background: rgba(0,0,0,0.1); }

  :root[data-theme="light"] .bento-card,
  :root[data-theme="light"] .honor-card { border-color: rgba(0,0,0,0.1); }
  :root[data-theme="light"] .bento-card:hover,
  :root[data-theme="light"] .honor-card:hover { border-color: rgba(0,0,0,0.25); }

  :root[data-theme="light"] .pf-tag { border-color: rgba(0,0,0,0.14); color: #000; opacity: 0.78; }
  :root[data-theme="light"] .pf-tag:hover { opacity: 1; }

  :root[data-theme="light"] .pf-btn-fill { background: #000; color: #fff; opacity: 1; }
  :root[data-theme="light"] .pf-btn-fill:hover { opacity: 0.8; }
  :root[data-theme="light"] .pf-btn-ghost { color: #000; border-color: rgba(0,0,0,0.18); opacity: 1; }
  :root[data-theme="light"] .pf-btn-ghost:hover { border-color: rgba(0,0,0,0.45); }

  :root[data-theme="light"] .pf-chip { border-color: rgba(0,0,0,0.14); background: rgba(255,255,255,0.55); }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .pf-dotnav { display: none; }
  }

  @media (max-width: 640px) {
    .pf-page { padding: 5rem 1.25rem 8rem; gap: 5.5rem; }

    .pf-hero { flex-direction: column; align-items: flex-start; gap: 1.25rem; }
    .pf-name { white-space: normal; font-size: 1.9rem; }
    .pf-actions { margin-left: 0; }

    .pf-name { font-size: 2.8rem; }

    .bento {
      grid-template-columns: 1fr 1fr;
    }
    .bento-0 { grid-column: span 2; }
    .bento-1, .bento-2, .bento-3, .bento-4 { grid-column: span 1; }

    .honors-grid { grid-template-columns: 1fr; }

    .tl-header { flex-direction: column; gap: 0.4rem; }
    .tl-header-right { flex-wrap: wrap; }

    .edu-row { flex-direction: column; gap: 0.4rem; }
    .edu-right { align-items: flex-start; }

  }
`;

export default Portfolio;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import headshot from "../assets/images/about/headshot.jpeg";
import cvFile from "../assets/pdf/CV.pdf";

import r1 from "../assets/images/portfolio/r1.jpg";
import r2 from "../assets/images/portfolio/r2.jpg";
import p1 from "../assets/images/portfolio/p1.jpg";
import p2 from "../assets/images/portfolio/p2.jpg";
import h6 from "../assets/images/portfolio/h6.jpeg";
import h7 from "../assets/images/portfolio/h7.jpeg";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const sections = [
  { id: "intro", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "honors", label: "Honors" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/krishnanN27",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/krishnan-n",
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
    location: "Golden, CO",
    status: "current",
    researchLink: "/research",
    tags: ["Python", "Qiskit", "PennyLane", "PyTorch", "NumPy"],
    highlights: [
      "Hybrid quantum–classical algorithms for PDE-governed engineering problems — subsurface flow, multiscale simulation, and inverse problems.",
      "Generative AI for scientific computing — GAN-based super-resolution and LLM-assisted domain adaptation.",
      "Quantum–AI hybrid architectures combining variational circuits with deep learning for parameter estimation in multiphysics systems.",
    ],
  },
  {
    company: "Colorado School of Mines",
    role: "Teaching Assistant — CSCI 575: Advanced ML",
    period: "Fall 2025 — Spring 2026",
    location: "Golden, CO",
    status: "current",
    tags: ["Machine Learning", "Mentorship", "Grading"],
    highlights: [
      "Supported graduate students through office hours and discussions, clarifying advanced ML concepts across both online and in-person sections.",
      "Assisted with grading, assignments, and project evaluations; provided hands-on support for student projects and practical problem-solving.",
    ],
  },
  {
    company: "Data-Driven CPS Lab, Colorado School of Mines",
    role: "Research Assistant",
    period: "Aug 2023 — Summer 2025",
    location: "Golden, CO",
    defaultOpen: true,
    images: [r1, r2],
    tags: ["RDF", "SHACL", "Python", "JavaScript", "Linux"],
    highlights: [
      "Conducted research on SHACL validation and inference, focusing on RDF graph acceleration and semantic interoperability for IoT and Smart City systems.",
      "Developed FlowSHACL — a DAG-based dataflow SHACL validation engine with dependency-aware execution, significantly optimizing validation over large RDF knowledge graphs.",
      "Contributed to the BrickSchema Ontology project, implementing enhanced search functionality now adopted globally.",
      "Built scalable data validation pipelines for real-time IoT and Smart City applications.",
    ],
  },
  {
    company: "Sloan Foundation Interdisciplinary Project",
    role: "Frontend Developer & Backend Engineer",
    period: "Jan 2023 — Summer 2025",
    location: "Leadville, CO",
    tags: ["React", "PostgreSQL", "Firebase", "Docker", "AWS", "Grafana"],
    highlights: [
      "Designed and implemented backend solutions for large-scale time-series data on community energy consumption.",
      "Built a real-time community dashboard with accessible, inclusive UI/UX for diverse stakeholders.",
      "Developed scalable pipelines and optimized retrieval for energy time-series datasets.",
    ],
  },
  {
    company: "NCompass Tech Studio Pvt. Ltd",
    role: "Mobile Engineer, Frontend & Cloud Engineer",
    period: "May 2021 — May 2022",
    location: "Chennai, India",
    tags: ["Kotlin", "Flutter", "React", "AWS", "GCP", "Docker", "Terraform"],
    highlights: [
      "Developed mobile applications and cloud solutions using Kotlin, Flutter, and Android.",
      "Led a major UI redesign, resulting in 1,000+ additional downloads on the Play Store.",
      "Built reusable components, increasing integration efficiency by 25% across teams.",
      "Ensured high-quality releases with TDD and CI/CD, achieving a 98% bug-free rate.",
    ],
  },
];

const projects = [
  {
    title: "FlowSHACL",
    subtitle: "Dataflow-Based SHACL Validation Engine",
    year: "2025",
    tags: ["Python", "RDF", "SHACL", "Knowledge Graphs"],
    description:
      "A dataflow-based SHACL validation engine enabling dependency-aware execution and optimized validation for large RDF knowledge graphs in IoT and smart city systems. Implements a DAG execution model that eliminates redundant constraint evaluations.",
  },
  {
    title: "LLM Prompt Recovery",
    subtitle: "Fine-Tuning GPT-2 for Prompt Generation",
    year: "Dec 2024",
    tags: ["Python", "PyTorch", "Hugging Face", "NLP"],
    description:
      "Developed a GPT-2 based model to generate prompt rewrites and study generalization behavior in language models. Investigated how fine-tuning strategies influence semantic fidelity and prompt reconstruction quality.",
  },
  {
    title: "Echoes of Equality",
    subtitle: "Hackathon-Winning Social Platform",
    year: "Feb 2022",
    tags: ["React", "Node.js", "Firebase", "Google Cloud"],
    description:
      "Won 1st Place in both the Beginner Category and LGBTQIA+ Category at BlasterHacks. Built a mentorship platform connecting LGBTQIA+ community members and allies with a focus on safe, inclusive peer support.",
  },
  {
    title: "KnewYou",
    subtitle: "Platform Website",
    year: "2024",
    tags: ["Web Development", "Cloud Deployment"],
    description:
      "Designed and developed the public website and supporting infrastructure for the KnewYou platform, handling full-stack implementation and cloud deployment.",
  },
  {
    title: "Ponrox",
    subtitle: "Web Platform (In Development)",
    year: "2026",
    status: "current",
    tags: ["Web Development"],
    description:
      "Developing the web platform and interface for Ponrox — currently under active construction.",
  },
];

const publications = [
  {
    type: "S",
    typeLabel: "In Submission",
    authors: "S. Navaneetha Kannan and S. Kamrava",
    title:
      "Quantum Computing for Modeling Fluid Flow in Subsurface Environments",
    venue: "Advances in Water Resources",
    year: "2026",
    status: "Under review",
  },
  {
    type: "P",
    typeLabel: "Poster",
    authors:
      "A. Anwar, U. M. Saka, S. Krishnan Navaneetha Kannan, D. Safronov, P. Salter, K. Munz, G. Fierro, P. C. Tabares Velasco, and Q. Huang",
    title:
      "Poster Abstract: Economic Feasibility of IoT-Based Controls in Low-Income Residential Buildings",
    venue:
      "12th ACM International Conference on Systems for Energy-Efficient Buildings, Cities, and Transportation (BuildSys'25)",
    year: "2025",
    status: "Accepted",
  },
  {
    type: "S",
    typeLabel: "In Submission",
    authors: "A. Anwar, U. M. Saka, S. Krishnan Navaneetha Kannan, et al.",
    title:
      "Economic Feasibility of IoT-Based Controls in Low-Income Residential Buildings",
    venue: "Manuscript under review",
    year: "2025",
    status: "Under review",
  },
];

const education = [
  {
    degree: "Ph.D., Computer Science",
    school: "Colorado School of Mines",
    period: "Aug 2025 — Present",
    advisor: "Advisor: Prof. Pejman Tahmasebi",
    lab: "G4 Lab",
    status: "current",
  },
  {
    degree: "M.S., Computer Science",
    school: "Colorado School of Mines",
    period: "Aug 2023 — Aug 2025",
    gpa: "3.7 / 4.0",
    advisor: "Advisor: Prof. Gabe Fierro",
    lab: "Data-Driven CPS Lab",
  },
  {
    degree: "B.E., Electronics & Communication Engineering",
    school: "Anna University",
    period: "Aug 2018 — Aug 2022",
    location: "Chennai, India",
    gpa: "8.56 / 10",
    distinction: "First Class with Distinction",
  },
];

const skills = [
  {
    category: "Quantum & Scientific ML",
    items: [
      "Quantum Computing",
      "Hybrid Quantum–Classical",
      "Variational Circuits",
      "Quantum Linear Solvers",
      "PDE Modeling",
      "Multiscale Simulation",
      "Qiskit",
      "PennyLane",
    ],
  },
  {
    category: "Machine Learning & AI",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Hugging Face",
      "Deep Learning",
      "GANs",
      "Image Super-Resolution",
      "Statistical Modeling",
    ],
  },
  {
    category: "Programming Languages",
    items: [
      "Python",
      "C",
      "Java",
      "JavaScript",
      "TypeScript",
      "Kotlin",
      "Dart (Flutter)",
      "OCaml",
      "LISP",
      "Bash",
    ],
  },
  {
    category: "Data & Graph Technologies",
    items: [
      "SQL",
      "PostgreSQL",
      "RDF",
      "SHACL",
      "SHACL-AF",
      "Knowledge Graphs",
      "Spark",
      "PySpark",
    ],
  },
  {
    category: "Cloud, Systems & DevOps",
    items: [
      "Linux",
      "Docker",
      "Git",
      "CI/CD",
      "AWS",
      "GCP",
      "Azure",
      "Terraform",
      "Grafana",
    ],
  },
  {
    category: "Web & Application Development",
    items: [
      "React",
      "Node.js",
      "Angular",
      "Nest.js",
      "Android",
      "REST APIs",
      "HTML/CSS",
    ],
  },
  {
    category: "Mathematics & Computation",
    items: [
      "Numerical Simulation",
      "Linear Algebra",
      "Probability & Statistics",
      "Algorithms",
      "Optimization",
      "Cryptography",
    ],
  },
  {
    category: "Research & Tools",
    items: [
      "LaTeX",
      "Data Visualization",
      "Time-Series Analysis",
      "Technical Writing",
      "Experimental Design",
      "Jira",
    ],
  },
];

const honors = [
  {
    title: "Best Poster Presentation",
    org: "CMAPP Honors",
    year: "2025",
    images: [p1, p2],
  },
  {
    title: "Hackathon Winner — 1st Place",
    org: "BlasterHacks · Beginner & LGBTQIA+ Category",
    year: "2022",
    images: [h6, h7],
  },
  {
    title: "Research Symposium Judge",
    org: "Colorado School of Mines",
    year: "2024",
  },
  {
    title: "Best Presentation",
    org: "ECUBE, Anna University",
    year: "2022",
  },
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
  const [open, setOpen] = useState(exp.defaultOpen || false);
  return (
    <motion.div
      className={`exp-card${exp.status === "current" ? " exp-card-live" : ""}`}
      variants={up}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
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
        <div className="exp-meta-right">
          <span className="exp-period">{exp.period}</span>
          {exp.location && <span className="exp-location">{exp.location}</span>}
        </div>
      </div>

      {exp.tags && (
        <div className="exp-tags">
          {exp.tags.map((t, i) => (
            <span key={i} className="pf-tag pf-tag-sm">
              {t}
            </span>
          ))}
        </div>
      )}

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

        {exp.images && exp.images.length > 0 && (
          <div className="exp-img-strip">
            {exp.images.map((src, i) => (
              <motion.div
                key={i}
                className="exp-img-wrap"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.96 }}
                transition={{ delay: i * 0.08 + 0.15 }}
              >
                <img
                  src={src}
                  alt={`${exp.company} photo ${i + 1}`}
                  className="exp-img"
                />
              </motion.div>
            ))}
          </div>
        )}

        {exp.researchLink && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: open ? 1 : 0, y: open ? 0 : 6 }}
            transition={{ delay: 0.28 }}
            style={{ marginTop: "1.1rem" }}
          >
            <Link to={exp.researchLink} className="exp-research-link">
              <span>Know more · View my research</span>
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
            </Link>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   HONOR CARD
   — cards with images: text on top, full-width image strip below
───────────────────────────────────────── */
const HonorCard = ({ h }) => {
  const hasImages = h.images && h.images.length > 0;
  return (
    <motion.div
      className={`honor-card${hasImages ? " honor-card-wide" : ""}`}
      variants={up}
      whileHover={{ y: -3, borderColor: "var(--pf-border-hi)" }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      {/* Text always on top */}
      <div className="honor-card-text">
        <span className="honor-year">{h.year}</span>
        <h3 className="honor-title">{h.title}</h3>
        {h.org && <p className="honor-org">{h.org}</p>}
      </div>

      {/* Images below, equal-width side by side */}
      {hasImages && (
        <div className="honor-img-strip">
          {h.images.map((src, i) => (
            <div key={i} className="honor-img-wrap">
              <img
                src={src}
                alt={`${h.title} photo ${i + 1}`}
                className="honor-img"
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   SECTION QUICK-NAV
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
      <SectionNav active={active} onNav={scrollTo} />

      <div className="pf-page">
        {/* ══ INTRO ══ */}
        <section
          id="intro"
          className="pf-section"
          style={{ scrollMarginTop: "108px" }}
        >
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

          {/*
            Bio: personal voice, not a research abstract.
            The research page covers the technical depth — this is the human intro.
          */}
          <motion.p
            className="pf-bio"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55 }}
          >
            I'm a PhD student at Colorado School of Mines building at the edge
            of what computers can solve — specifically, using quantum computing
            and machine learning together to tackle problems in physics and
            engineering that classical methods can't handle at scale. Outside
            the quantum side, I've shipped production software across mobile,
            web, and cloud, and I care a lot about building things that are both
            rigorous and actually useful.
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

        {/* ══ PROJECTS ══ */}
        <section
          id="projects"
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
              Projects
            </motion.h2>
            <div className="proj-list">
              {projects.map((proj, i) => (
                <motion.div
                  key={i}
                  className="proj-card"
                  variants={up}
                  whileHover={{ y: -2, borderColor: "var(--pf-border-hi)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <div className="proj-top">
                    <div className="proj-top-left">
                      <div className="proj-title-row">
                        <h3 className="proj-title">{proj.title}</h3>
                        {proj.status === "current" && (
                          <span className="exp-badge">
                            <span className="exp-badge-dot" />
                            Active
                          </span>
                        )}
                      </div>
                      <p className="proj-subtitle">{proj.subtitle}</p>
                    </div>
                    <span className="exp-period">{proj.year}</span>
                  </div>
                  <p className="proj-desc">{proj.description}</p>
                  <div className="proj-tags">
                    {proj.tags.map((t, j) => (
                      <span key={j} className="pf-tag pf-tag-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══ PUBLICATIONS ══ */}
        <section
          id="publications"
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
              Publications
            </motion.h2>
            <motion.p className="pub-note" variants={up}>
              Additional journal manuscripts are currently in preparation.
            </motion.p>
            <div className="pub-list">
              {publications.map((pub, i) => (
                <motion.div key={i} className="pub-card" variants={up}>
                  <div className="pub-badge-wrap">
                    <span
                      className={`pub-type pub-type-${pub.type.toLowerCase()}`}
                    >
                      {pub.typeLabel}
                    </span>
                    <span className="pub-year">{pub.year}</span>
                  </div>
                  <p className="pub-title">{pub.title}</p>
                  <p className="pub-authors">{pub.authors}</p>
                  <div className="pub-bottom">
                    <span className="pub-venue">{pub.venue}</span>
                    <span
                      className={`pub-status pub-status-${pub.status === "Accepted" ? "accepted" : "review"}`}
                    >
                      {pub.status}
                    </span>
                  </div>
                </motion.div>
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
                        {edu.location && (
                          <p className="edu-location">{edu.location}</p>
                        )}
                      </div>
                      <div className="edu-card-top-right">
                        {edu.status === "current" && (
                          <span className="edu-badge">
                            <span className="exp-badge-dot" />
                            In Progress
                          </span>
                        )}
                        {edu.period && (
                          <span className="exp-period">{edu.period}</span>
                        )}
                      </div>
                    </div>
                    <div className="edu-meta-row">
                      {edu.gpa && (
                        <span className="edu-pill">GPA {edu.gpa}</span>
                      )}
                      {edu.advisor && (
                        <span className="edu-pill">{edu.advisor}</span>
                      )}
                      {edu.lab && (
                        <span className="edu-pill">Lab: {edu.lab}</span>
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
            <div className="skills-grid">
              {skills.map((s, i) => (
                <motion.div
                  key={i}
                  className="skill-card"
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
                <HonorCard key={i} h={h} />
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
    --navbar-h: 64px;
  }
  .pf-root *, .pf-root *::before, .pf-root *::after { box-sizing: border-box; }
  .pf-root { color: var(--text); min-height: 100vh; }

  /* ══ SECTION NAV ══ */
  .sec-nav-wrap {
    position: fixed; left: 2rem; top: 50%; transform: translateY(-50%);
    z-index: 40; display: flex; flex-direction: column; gap: 0.15rem;
  }
  .sec-nav-btn { display: flex; align-items: center; gap: 0.6rem; background: none; border: none; cursor: pointer; padding: 0.2rem 0; text-align: left; }
  .sec-nav-line { display: block; width: 18px; height: 1.5px; background: var(--text); border-radius: 2px; opacity: 0.2; transition: width 0.22s ease, opacity 0.22s ease; flex-shrink: 0; }
  .sec-nav-label { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text); opacity: 0.25; white-space: nowrap; transition: opacity 0.18s ease; }
  .sec-nav-btn:hover .sec-nav-line  { width: 26px; opacity: 0.45; }
  .sec-nav-btn:hover .sec-nav-label { opacity: 0.55; }
  .sec-nav-btn.active .sec-nav-line  { width: 28px; opacity: 0.9; }
  .sec-nav-btn.active .sec-nav-label { opacity: 0.88; }

  /* ══ PAGE LAYOUT ══ */
  .pf-page { max-width: 760px; margin: 0 auto; padding: calc(var(--navbar-h) + 3rem) 2rem 10rem; display: flex; flex-direction: column; gap: 7rem; }
  .pf-section      { position: relative; }
  .pf-section-last { padding-bottom: 2rem; }
  .pf-sec-title { font-family: "Playfair Display", serif; font-size: clamp(1.75rem, 3.2vw, 2.2rem); font-weight: 700; letter-spacing: -0.03em; opacity: 0.9; margin-bottom: 1.75rem; }

  /* ══ HERO ══ */
  .hero-actions { display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap; }
  .schedule-pill { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.36rem 0.5rem 0.36rem 0.62rem; background: var(--glass-bg); border: 1px solid var(--pf-border); border-radius: 999px; font-family: "Cabinet Grotesk", sans-serif; font-size: 0.86rem; font-weight: 700; color: var(--text); text-decoration: none; letter-spacing: 0.02em; backdrop-filter: blur(12px); opacity: 0.72; transition: opacity 0.2s, border-color 0.2s; }
  .schedule-pill:hover { opacity: 1; border-color: var(--pf-border-hi); }
  .schedule-icon-wrap { display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background: rgba(var(--text-rgb,229,231,235),0.07); border: 1px solid var(--pf-border); border-radius: 50%; }
  .schedule-arrow-wrap { display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: rgba(var(--text-rgb,229,231,235),0.07); border: 1px solid var(--pf-border); border-radius: 50%; transition: background 0.18s; }
  .schedule-pill:hover .schedule-arrow-wrap { background: rgba(var(--text-rgb,229,231,235),0.13); }
  .cv-pill { display: inline-flex; align-items: center; gap: 0.4rem; background: none; border: none; padding: 0; font-family: "Cabinet Grotesk", sans-serif; font-size: 0.86rem; font-weight: 800; color: var(--text); text-decoration: none; letter-spacing: 0.04em; opacity: 0.65; border-bottom: 1.5px solid currentColor; padding-bottom: 1px; transition: opacity 0.18s; }
  .cv-pill:hover { opacity: 1; }
  .hero-name-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  .pf-photo-wrap { flex-shrink: 0; }
  .pf-photo { width: 62px; height: 62px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 1px var(--pf-border), 0 4px 16px rgba(0,0,0,0.14); filter: saturate(0.88); display: block; }
  .pf-clip { overflow: hidden; }
  .pf-name { font-family: "Playfair Display", serif; font-size: clamp(2.1rem, 5.5vw, 3.8rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1; opacity: 0.95; display: block; margin: 0; white-space: nowrap; }
  .pf-name-dim { opacity: 0.38; }
  .hero-sub-row { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .hero-subtitle { font-size: 0.87rem; font-weight: 400; opacity: 0.42; letter-spacing: 0.01em; }
  .hero-location { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.82rem; opacity: 0.26; letter-spacing: 0.02em; }
  .hero-socials { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.85rem; }
  .social-pill { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.34rem 0.8rem; background: var(--glass-bg); border: 1px solid var(--pf-border); border-radius: 999px; font-family: "Cabinet Grotesk", sans-serif; font-size: 0.79rem; font-weight: 700; color: var(--text); text-decoration: none; opacity: 0.52; letter-spacing: 0.02em; backdrop-filter: blur(8px); transition: opacity 0.18s, border-color 0.18s; }
  .social-pill:hover { opacity: 1; border-color: var(--pf-border-hi); }
  .hero-divider { height: 1px; background: var(--pf-border); margin-bottom: 1.5rem; transform-origin: left; }
  .pf-bio { font-size: 1rem; font-weight: 300; line-height: 1.85; opacity: 0.58; margin: 0; }

  /* ══ EXPERIENCE ══ */
  .exp-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .exp-card { position: relative; background: var(--pf-card); border: 1px solid var(--pf-border); border-radius: 14px; padding: 1.25rem 1.4rem 1rem; overflow: hidden; transition: border-color 0.22s, transform 0.22s; }
  .exp-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.55rem; }
  .exp-top-left { flex: 1; min-width: 0; }
  .exp-role-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.22rem; flex-wrap: wrap; }
  .exp-role { font-family: "Playfair Display", serif; font-size: 1.1rem; font-weight: 700; letter-spacing: -0.02em; opacity: 0.92; }
  .exp-badge { display: inline-flex; align-items: center; gap: 0.28rem; font-family: "Cabinet Grotesk", sans-serif; font-size: 0.58rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--pf-green); background: var(--pf-green-bg); border: 1px solid var(--pf-green-br); border-radius: 20px; padding: 0.15rem 0.45rem; white-space: nowrap; }
  .exp-badge-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--pf-green); animation: blink 2s ease-in-out infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
  .exp-company { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.84rem; font-weight: 500; opacity: 0.45; }
  .exp-meta-right { display: flex; flex-direction: column; align-items: flex-end; gap: 0.18rem; flex-shrink: 0; padding-top: 0.1rem; }
  .exp-period { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.72rem; font-weight: 600; opacity: 0.32; letter-spacing: 0.02em; white-space: nowrap; }
  .exp-location { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.68rem; font-weight: 500; opacity: 0.22; letter-spacing: 0.02em; white-space: nowrap; }
  .exp-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.65rem; }
  .exp-toggle { display: inline-flex; align-items: center; gap: 0.35rem; background: none; border: none; cursor: pointer; font-family: "Cabinet Grotesk", sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text); opacity: 0.3; padding: 0; transition: opacity 0.18s; }
  .exp-toggle:hover { opacity: 0.7; }
  .exp-bullets { list-style: none; padding: 0; margin: 0.85rem 0 0.35rem; display: flex; flex-direction: column; gap: 0.5rem; }
  .exp-bullets li { font-size: 0.93rem; font-weight: 300; line-height: 1.75; padding-left: 1.1rem; position: relative; opacity: 0.62; }
  .exp-bullets li::before { content: '–'; position: absolute; left: 0; opacity: 0.4; font-size: 0.85rem; top: 0.05em; }

  /* Experience images — 16:9, two per row */
  .exp-img-strip { display: flex; gap: 0.65rem; margin-top: 1.1rem; margin-bottom: 0.35rem; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
  .exp-img-strip::-webkit-scrollbar { display: none; }
  .exp-img-wrap { position: relative; flex-shrink: 0; border-radius: 10px; overflow: hidden; border: 1px solid var(--pf-border); width: calc(50% - 0.325rem); aspect-ratio: 16 / 9; }
  .exp-img-wrap::after { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.28); pointer-events: none; transition: opacity 0.22s; }
  .exp-img-wrap:hover::after { opacity: 0.14; }
  .exp-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: saturate(0.9); transition: filter 0.22s, transform 0.3s ease; }
  .exp-img-wrap:hover .exp-img { filter: saturate(1); transform: scale(1.03); }

  .exp-research-link {
    display: inline-flex; align-items: center; gap: 0.35rem;
    font-family: "Cabinet Grotesk", sans-serif;
    font-size: 0.78rem; font-weight: 800;
    letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--pf-green); text-decoration: none;
    opacity: 0.8; transition: opacity 0.18s, gap 0.18s;
    border-bottom: 1px solid var(--pf-green-br);
    padding-bottom: 1px;
  }
  .exp-research-link:hover { opacity: 1; gap: 0.5rem; }

  /* ══ PROJECTS ══ */
  .proj-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .proj-card { background: var(--pf-card); border: 1px solid var(--pf-border); border-radius: 14px; padding: 1.25rem 1.4rem; transition: border-color 0.22s, transform 0.22s; }
  .proj-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.75rem; }
  .proj-top-left { flex: 1; min-width: 0; }
  .proj-title-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.22rem; flex-wrap: wrap; }
  .proj-title { font-family: "Playfair Display", serif; font-size: 1.08rem; font-weight: 700; letter-spacing: -0.02em; opacity: 0.92; margin: 0; }
  .proj-subtitle { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.82rem; font-weight: 500; opacity: 0.42; margin: 0; }
  .proj-desc { font-size: 0.92rem; font-weight: 300; line-height: 1.75; opacity: 0.58; margin: 0 0 0.85rem; }
  .proj-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }

  /* ══ PUBLICATIONS ══ */
  .pub-note { font-size: 0.85rem; opacity: 0.38; margin: -0.75rem 0 1.5rem; font-style: italic; }
  .pub-list { display: flex; flex-direction: column; gap: 0.65rem; }
  .pub-card { background: var(--pf-card); border: 1px solid var(--pf-border); border-radius: 14px; padding: 1.25rem 1.4rem; }
  .pub-badge-wrap { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem; }
  .pub-type { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.15rem 0.5rem; border-radius: 20px; }
  .pub-type-s { color: #60a5fa; background: rgba(96,165,250,0.08); border: 1px solid rgba(96,165,250,0.22); }
  .pub-type-p { color: var(--pf-green); background: var(--pf-green-bg); border: 1px solid var(--pf-green-br); }
  .pub-year { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.68rem; opacity: 0.32; font-weight: 600; letter-spacing: 0.05em; }
  .pub-title { font-family: "Playfair Display", serif; font-size: 1rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.4; opacity: 0.9; margin: 0 0 0.4rem; }
  .pub-authors { font-size: 0.82rem; font-weight: 300; opacity: 0.48; line-height: 1.6; margin: 0 0 0.65rem; }
  .pub-bottom { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
  .pub-venue { font-size: 0.81rem; font-weight: 400; opacity: 0.42; font-style: italic; flex: 1; }
  .pub-status { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.15rem 0.5rem; border-radius: 20px; white-space: nowrap; }
  .pub-status-review   { color: #f59e0b; background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22); }
  .pub-status-accepted { color: var(--pf-green); background: var(--pf-green-bg); border: 1px solid var(--pf-green-br); }

  /* ══ EDUCATION ══ */
  .edu-list { display: flex; flex-direction: column; gap: 0.65rem; }
  .edu-card { display: flex; align-items: stretch; background: var(--pf-card); border: 1px solid var(--pf-border); border-radius: 14px; overflow: hidden; transition: border-color 0.22s; }
  .edu-card-body { flex: 1; padding: 1.2rem 1.35rem; display: flex; flex-direction: column; gap: 0.65rem; }
  .edu-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
  .edu-card-top-right { display: flex; flex-direction: column; align-items: flex-end; gap: 0.3rem; flex-shrink: 0; }
  .edu-degree { font-family: "Playfair Display", serif; font-size: 1.08rem; font-weight: 700; letter-spacing: -0.02em; opacity: 0.92; margin-bottom: 0.2rem; }
  .edu-school { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.84rem; font-weight: 600; opacity: 0.45; }
  .edu-location { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.78rem; opacity: 0.3; margin-top: 0.1rem; }
  .edu-badge { display: inline-flex; align-items: center; gap: 0.28rem; font-family: "Cabinet Grotesk", sans-serif; font-size: 0.58rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--pf-green); background: var(--pf-green-bg); border: 1px solid var(--pf-green-br); border-radius: 20px; padding: 0.15rem 0.45rem; white-space: nowrap; flex-shrink: 0; margin-top: 0.1rem; }
  .edu-meta-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .edu-pill { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.75rem; font-weight: 500; padding: 0.22rem 0.6rem; border-radius: 5px; background: rgba(var(--text-rgb,229,231,235),0.05); border: 1px solid var(--pf-border); opacity: 0.55; letter-spacing: 0.01em; }

  /* ══ SKILLS ══ */
  .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
  .skill-card { background: var(--pf-card); border: 1px solid var(--pf-border); border-radius: 14px; padding: 1.15rem; transition: border-color 0.25s, transform 0.25s; }
  .bento-cat { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.67rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.38; margin-bottom: 0.7rem; }
  .bento-tags { display: flex; flex-wrap: wrap; gap: 0.32rem; }

  /* ══ TAGS ══ */
  .pf-tag { font-family: "Cabinet Grotesk", sans-serif; font-size: 0.79rem; font-weight: 500; padding: 0.26rem 0.62rem; border-radius: 5px; background: var(--tag-bg); border: 1px solid var(--tag-border); opacity: 0.78; letter-spacing: 0.02em; transition: opacity 0.15s; }
  .pf-tag:hover { opacity: 1; }
  .pf-tag-sm { font-size: 0.72rem; padding: 0.18rem 0.5rem; opacity: 0.6; }

  /* ══ HONORS ══ */
  .honors-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }

  /* Plain cards (no images) */
  .honor-card {
    background: var(--pf-card); border: 1px solid var(--pf-border);
    border-radius: 14px; padding: 1.25rem;
    transition: border-color 0.25s, transform 0.25s;
    display: flex; flex-direction: column;
  }

  /* Wide cards span both columns and stack text → images */
  .honor-card-wide {
    grid-column: span 2;
  }

  .honor-card-text { margin-bottom: 0; }

  /* When images follow, add spacing */
  .honor-card-wide .honor-card-text { margin-bottom: 1.1rem; }

  .honor-year { display: block; font-family: "Cabinet Grotesk", sans-serif; font-size: 0.67rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.34; margin-bottom: 0.3rem; }
  .honor-title { font-family: "Playfair Display", serif; font-size: 1.18rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 0.25rem; opacity: 0.9; }
  .honor-org { font-size: 0.84rem; opacity: 0.44; }

  /*
    Honor image strip — full width, two equal landscape panels.
    No overflow scroll on desktop: images naturally halve the card.
  */
  .honor-img-strip {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.55rem;
  }

  .honor-img-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 10px; overflow: hidden;
    border: 1px solid var(--pf-border);
  }
  .honor-img-wrap::after { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.28); pointer-events: none; transition: opacity 0.22s; }
  .honor-img-wrap:hover::after { opacity: 0.14; }
  .honor-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: saturate(0.88); transition: filter 0.22s, transform 0.32s ease; }
  .honor-img-wrap:hover .honor-img { filter: saturate(1); transform: scale(1.035); }

  /* ══ LIGHT THEME ══ */
  :root[data-theme="light"] .pf-name,
  :root[data-theme="light"] .exp-role,
  :root[data-theme="light"] .edu-degree,
  :root[data-theme="light"] .honor-title,
  :root[data-theme="light"] .proj-title,
  :root[data-theme="light"] .pub-title,
  :root[data-theme="light"] .pf-sec-title  { color: #111; opacity: 1; }
  :root[data-theme="light"] .pf-name-dim   { color: #111; opacity: 0.3; }
  :root[data-theme="light"] .pf-bio        { color: #333; opacity: 1; }
  :root[data-theme="light"] .exp-company, :root[data-theme="light"] .proj-subtitle { color: #555; opacity: 1; }
  :root[data-theme="light"] .exp-period, :root[data-theme="light"] .exp-location   { color: #777; opacity: 1; }
  :root[data-theme="light"] .exp-bullets li, :root[data-theme="light"] .proj-desc,
  :root[data-theme="light"] .pub-authors    { color: #333; opacity: 1; }
  :root[data-theme="light"] .exp-toggle    { color: #111; }
  :root[data-theme="light"] .edu-pill      { color: #444; opacity: 1; border-color: rgba(0,0,0,0.1); background: rgba(0,0,0,0.03); }
  :root[data-theme="light"] .honor-org     { color: #666; opacity: 1; }
  :root[data-theme="light"] .bento-cat     { color: #555; opacity: 1; }
  :root[data-theme="light"] .honor-year, :root[data-theme="light"] .pub-year { color: #777; opacity: 1; }
  :root[data-theme="light"] .hero-subtitle { color: #555; opacity: 1; }
  :root[data-theme="light"] .hero-location { color: #888; opacity: 1; }
  :root[data-theme="light"] .pub-venue     { color: #555; opacity: 1; }
  :root[data-theme="light"] .pub-note      { color: #666; opacity: 1; }
  :root[data-theme="light"] .sec-nav-line  { background: #111; }
  :root[data-theme="light"] .sec-nav-label { color: #111; }
  :root[data-theme="light"] .schedule-pill { color: #111; }
  :root[data-theme="light"] .schedule-icon-wrap,
  :root[data-theme="light"] .schedule-arrow-wrap { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1); }
  :root[data-theme="light"] .cv-pill       { color: #111; }
  :root[data-theme="light"] .social-pill   { color: #111; }
  :root[data-theme="light"] .hero-divider  { background: rgba(0,0,0,0.09); }
  :root[data-theme="light"] .exp-card,  :root[data-theme="light"] .edu-card,
  :root[data-theme="light"] .skill-card, :root[data-theme="light"] .honor-card,
  :root[data-theme="light"] .proj-card,  :root[data-theme="light"] .pub-card  { border-color: rgba(0,0,0,0.09); }
  :root[data-theme="light"] .pf-tag        { color: #222; }
  :root[data-theme="light"] .exp-badge, :root[data-theme="light"] .edu-badge { color: #0a7a52; background: rgba(10,122,82,0.07); border-color: rgba(10,122,82,0.25); }
  :root[data-theme="light"] .exp-research-link { color: #0a7a52; border-bottom-color: rgba(10,122,82,0.3); }
  :root[data-theme="light"] .exp-badge-dot { background: #0a7a52; }
  :root[data-theme="light"] .exp-img-wrap, :root[data-theme="light"] .honor-img-wrap { border-color: rgba(0,0,0,0.09); }
  :root[data-theme="light"] .exp-img-wrap::after,
  :root[data-theme="light"] .honor-img-wrap::after { background: rgba(255,255,255,0.22); }
  :root[data-theme="light"] .exp-img-wrap:hover::after,
  :root[data-theme="light"] .honor-img-wrap:hover::after { opacity: 0.1; }

  /* ══ RESPONSIVE ══ */
  @media (max-width: 900px) { .sec-nav-wrap { display: none; } }

  @media (max-width: 640px) {
    .pf-page { padding: calc(var(--navbar-h) + 2rem) 1.1rem 8rem; gap: 5.5rem; }
    .pf-name { font-size: clamp(1.7rem, 9vw, 2.5rem); white-space: normal; }
    .pf-photo { width: 52px; height: 52px; }
    .hero-sub-row { flex-direction: column; align-items: flex-start; gap: 0.2rem; }
    .exp-top { flex-direction: column; gap: 0.3rem; }
    .exp-meta-right { align-items: flex-start; }
    .edu-card-top { flex-direction: column; gap: 0.4rem; }
    .edu-card-top-right { align-items: flex-start; }
    .proj-top { flex-direction: column; gap: 0.3rem; }

    /* Exp images stay half-width on mobile too (already fit well) */
    .exp-img-wrap { width: 80vw; max-width: 340px; }

    /* Skills full-width on mobile */
    .skills-grid { grid-template-columns: 1fr; }

    /* Honors: all single-column */
    .honors-grid { grid-template-columns: 1fr; }
    .honor-card-wide { grid-column: span 1; }

    /* Honor image strip stays 2-col grid — scales naturally */
    .honor-img-strip { grid-template-columns: repeat(2, 1fr); gap: 0.4rem; }
  }
`;

export default Portfolio;

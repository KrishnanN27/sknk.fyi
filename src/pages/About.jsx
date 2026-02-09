import { motion } from "framer-motion";
import headshot from "../assets/images/about/headshot.jpeg";

/* ---------------- animation ---------------- */

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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

/* ---------------- component ---------------- */

const About = () => {
  return (
    <section className="about-wrapper">
      {/* -------- DESKTOP NAV -------- */}
      <aside className="about-nav">
        {sections.map((s) => (
          <button key={s.id} onClick={() => scrollTo(s.id)}>
            {s.label}
          </button>
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
        >
          <img
            src={headshot}
            alt="Sowndarya Krishnan"
            className="about-headshot"
          />

          <h1>Sowndarya Krishnan N K</h1>

          <p className="about-meta">
            Golden, CO, USA ·{" "}
            <a href="mailto:sowndaryakrishnanna@mines.edu">
              sowndaryakrishnanna@mines.edu
            </a>{" "}
            · +1 539-895-1874
          </p>

          <p>
            Ph.D. student in Computer Science specializing in machine learning
            and scientific computing for physics-based systems.
          </p>

          <p className="muted">
            Strong background in Python-based scientific coding and applied AI.
          </p>

          <div className="about-links">
            <a href="https://skfyi.com">Website</a>
            <a href="https://github.com/krishnanN27">GitHub</a>
            <a href="https://linkedin.com/in/krishnan-n">LinkedIn</a>
          </div>
        </motion.section>

        {/* EXPERIENCE */}
        <section id="experience" style={sectionStyle}>
          <h2>Experience</h2>

          <h3>G4 Lab, Colorado School of Mines</h3>
          <p>
            <em>Research Assistant — Aug 2025 – Present</em>
          </p>
          <ul>
            <li>Developed ML-driven surrogate models for PDE systems.</li>
            <li>Built Python pipelines for simulation and inverse problems.</li>
            <li>
              Translated mathematical models into scalable research software.
            </li>
          </ul>

          <h3>Colorado School of Mines</h3>
          <p>
            <em>Teaching Assistant — Aug 2025 – May 2026</em>
          </p>
          <ul>
            <li>Mentored graduate students on ML design and optimization.</li>
            <li>Supported labs, grading, and evaluations.</li>
          </ul>

          <h3>Data-Driven CPS Lab</h3>
          <p>
            <em>Research Assistant — Aug 2023 – May 2025</em>
          </p>
          <ul>
            <li>Designed FlowSHACL, a DAG-based SHACL engine.</li>
            <li>Implemented dependency-aware execution optimizations.</li>
            <li>Built benchmarking pipelines on RDF datasets.</li>
          </ul>

          <h3>Sloan Foundation Energy Project</h3>
          <p>
            <em>Full Stack Engineer — Jan 2023 – May 2025</em>
          </p>
          <ul>
            <li>Built backend services for high-frequency energy data.</li>
            <li>Deployed containerized services using Docker.</li>
          </ul>

          <h3>NCompass Tech Studio Pvt. Ltd.</h3>
          <p>
            <em>Software Engineer — May 2021 – May 2022</em>
          </p>
          <ul>
            <li>Developed Android and Flutter applications.</li>
            <li>Led UI redesign resulting in 1,000+ downloads.</li>
          </ul>
        </section>

        {/* EDUCATION */}
        <section id="education" style={sectionStyle}>
          <h2>Education</h2>

          <p>
            <strong>Ph.D. Computer Science</strong>, Colorado School of Mines
          </p>
          <p className="muted">Advisor: Prof. Pejman Tahmasebi</p>

          <p>
            <strong>M.S. Computer Science</strong>, Colorado School of Mines
          </p>
          <p className="muted">GPA: 3.7 / 4.0 · Advisor: Prof. Gabe Fierro</p>

          <p>
            <strong>B.E. Electronics & Communication Engineering</strong>, Anna
            University
          </p>
          <p className="muted">GPA: 8.56 / 10 · First Class with Distinction</p>
        </section>

        {/* SKILLS */}
        <section id="skills" style={sectionStyle}>
          <h2>Skills</h2>
          <ul>
            <li>
              <strong>Programming:</strong> Python, C, Java, JavaScript
            </li>
            <li>
              <strong>Machine Learning:</strong> PyTorch, scikit-learn
            </li>
            <li>
              <strong>Scientific Computing:</strong> PDEs, numerical methods
            </li>
            <li>
              <strong>Systems & Tools:</strong> Linux, Docker, REST APIs
            </li>
            <li>
              <strong>Cloud & DevOps:</strong> AWS, GCP, CI/CD
            </li>
          </ul>
        </section>

        {/* HONORS */}
        <section id="honors" style={sectionStyle}>
          <h2>Honors</h2>
          <ul>
            <li>Best Poster Presentation — CMAPP Honors (2025)</li>
            <li>Hackathon Winner — Echoes of Equality (2022)</li>
            <li>Undergraduate Research Symposium Judge (2024)</li>
            <li>Best Presentation — ECUBE, Anna University (2022)</li>
          </ul>
        </section>
      </main>

      {/* -------- STYLES -------- */}
      <style>{`
        .about-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 9rem 2rem 6rem;
          position: relative;
        }

        /* DESKTOP FIXED NAV */
        .about-nav {
          position: fixed;
          top: 9rem;
          left: max(2rem, calc(50% - 600px));
          width: 200px;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          opacity: 0.85;
        }

        .about-nav button {
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          cursor: pointer;
          font-size: 0.95rem;
          opacity: 0.65;
          color: var(--text);
        }

        .about-nav button:hover {
          opacity: 1;
        }

        .about-content {
          margin-left: 260px;
          max-width: 760px;
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }

        .about-headshot {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1.5rem;
        }

        .about-meta {
          opacity: 0.7;
          margin-bottom: 1.5rem;
        }

        .about-links {
          margin-top: 1.5rem;
          display: flex;
          gap: 1rem;
        }

        .muted {
          opacity: 0.75;
          margin-top: 0.75rem;
        }

        /* -------- MOBILE -------- */
        @media (max-width: 900px) {
          .about-nav {
            display: none;
          }

          .about-content {
            margin-left: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default About;

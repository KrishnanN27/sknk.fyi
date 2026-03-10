import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import researchImage from "../assets/images/research/research.webp";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  },
});
const contentVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

const PUBLICATIONS = [
  {
    id: "S.1",
    typeLabel: "In Submission",
    authors: "S. Navaneetha Kannan and S. Kamrava",
    title:
      "Quantum Computing for Modeling Fluid Flow in Subsurface Environments.",
    venue: "Advances in Water Resources, 2026.",
    status: "Under review.",
    year: "2026",
  },
  {
    id: "P.1",
    typeLabel: "Poster",
    authors:
      "A. Anwar, U. M. Saka, S. Krishnan Navaneetha Kannan, D. Safronov, P. Salter, K. Munz, G. Fierro, P. C. Tabares Velasco, and Q. Huang",
    title:
      "Poster Abstract: Economic Feasibility of IoT-Based Controls in Low-Income Residential Buildings.",
    venue:
      "12th ACM International Conference on Systems for Energy-Efficient Buildings, Cities, and Transportation (BuildSys'25)",
    status: "Accepted.",
    year: "2025",
  },
  {
    id: "S.2",
    typeLabel: "In Submission",
    authors: "A. Anwar, U. M. Saka, S. Krishnan Navaneetha Kannan, et al.",
    title:
      "Economic Feasibility of IoT-Based Controls in Low-Income Residential Buildings.",
    venue: "Manuscript under review.",
    status: "2025.",
    year: "2025",
  },
];

const PLAIN_CHIPS = [
  "Quantum Computing",
  "AI / ML",
  "GAN",
  "Image Super-Resolution",
  "Large Language Models",
  "Multiphysics Simulation",
];

const KEYWORDS = [
  "Variational Quantum Algorithms",
  "Machine Learning",
  "PDE-based Modeling",
  "Multiphysics Systems",
  "Quantum–Classical Hybrid",
  "GAN Super-Resolution",
  "LLMs",
];

const ExternalLinks = () => (
  <div className="ext-links">
    <a
      href="https://scholar.google.com/citations?user=B_e3l3AAAAAJ&hl=en&oi=ao"
      target="_blank"
      rel="noreferrer"
      className="ext-link"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
      </svg>
      Google Scholar <span className="ext-arr">↗</span>
    </a>
    <a
      href="https://orcid.org/0009-0002-6521-5937"
      target="_blank"
      rel="noreferrer"
      className="ext-link"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.484 3.872-3.722 0-2.016-1.284-3.722-3.862-3.722h-2.307z" />
      </svg>
      ORCID <span className="ext-arr">↗</span>
    </a>
  </div>
);

const Research = () => {
  const [mode, setMode] = useState("researchers");
  const [expandedPub, setExpandedPub] = useState(null);

  return (
    <section className="research">
      {/* ── INTRO ── */}
      <motion.div
        className="intro-block"
        variants={fadeUp(0.2)}
        initial="hidden"
        animate="show"
      >
        <p className="body-text drop-cap">
          My research focuses on solving real-world engineering problems using
          advanced computational methods, particularly hybrid quantum–classical
          algorithms for scientific computing and simulation. I also work on
          artificial intelligence and machine learning, including generative
          models, image super-resolution, and large language models, both
          independently and in applications related to scientific computing.
        </p>
      </motion.div>

      {/* ── INTERESTS CHIPS ── */}
      <motion.div
        className="interests-section"
        variants={fadeUp(0.4)}
        initial="hidden"
        animate="show"
      >
        <div className="chips-row">
          {PLAIN_CHIPS.map((label, i) => (
            <motion.span
              key={label}
              className="interest-chip"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
            >
              {label}
            </motion.span>
          ))}

          {/* Quantum–AI Hybrid — visually distinct, no panel anymore */}
          <motion.span
            className="interest-chip interest-chip--hybrid"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.5 + PLAIN_CHIPS.length * 0.05,
            }}
          >
            Quantum–AI Hybrid
          </motion.span>
        </div>
      </motion.div>

      {/* ── MORE ON MY MAIN RESEARCH ── */}
      <motion.div
        className="main-research-section"
        variants={fadeUp(0.6)}
        initial="hidden"
        animate="show"
      >
        {/* label + toggle snug together on the left */}
        <div className="main-research-header">
          <span className="section-eyebrow">More on my main research</span>
          <div className="toggle-track" role="group">
            {["researchers", "everyone"].map((val) => {
              const active = mode === val;
              return (
                <button
                  key={val}
                  onClick={() => setMode(val)}
                  className={`toggle-btn${active ? " toggle-btn--active" : ""}`}
                >
                  {active && (
                    <motion.div
                      layoutId="toggleBg"
                      className="toggle-bg"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="toggle-btn-label">
                    {val === "researchers" ? "Researchers" : "Everyone"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            variants={contentVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="content-grid"
          >
            {mode === "researchers" ? (
              <>
                {/* main text */}
                <div className="main-text">
                  <p className="body-text drop-cap">
                    My research focuses on the development of{" "}
                    <strong>hybrid quantum–classical algorithms</strong> for
                    scientific problems governed by partial differential
                    equations (PDEs).
                  </p>
                  <p className="body-text">
                    I design quantum-enhanced computational frameworks combining
                    variational quantum algorithms with machine learning
                    methods, targeting multiscale, multiphysics systems beyond
                    classical limits.
                  </p>
                  <p className="body-text">
                    By reformulating PDE-based models for quantum hardware, my
                    work aims to expand the scope of scientific modeling and
                    discovery.
                  </p>
                </div>

                {/* keyword sidebar */}
                <aside className="side-note">
                  <div className="side-note-inner">
                    <span className="side-note-title">Keywords</span>
                    {KEYWORDS.map((kw) => (
                      <span key={kw} className="side-kw">
                        {kw}
                      </span>
                    ))}
                  </div>
                </aside>
              </>
            ) : (
              /* Everyone — full width, image panel first then text */
              <div className="everyone-col">
                {/* image + analogy panel */}
                <div className="hybrid-inner">
                  <div className="hybrid-img-wrap">
                    <img
                      src={researchImage}
                      alt="Quantum–AI research"
                      className="hybrid-img"
                    />
                  </div>
                  <div className="hybrid-text">
                    <span className="hybrid-eyebrow">
                      The idea in one picture
                    </span>
                    <p className="hybrid-quote">
                      "Giving a fast plane the vast capacity of a ship."
                    </p>
                    <p className="hybrid-body">
                      AI and machine learning are already fast and powerful —
                      like a plane. Quantum computing doesn't replace that
                      speed. It expands what can be carried, explored, and
                      accessed at once. My work sits exactly at that
                      intersection.
                    </p>
                  </div>
                </div>

                {/* plain language text below */}
                <div className="everyone-text">
                  <p className="body-text">
                    Scientists use math and computer simulations to understand
                    how the world works — how water moves underground, how
                    materials react to heat, how energy flows through systems.
                  </p>
                  <p className="body-text">
                    But some problems are so complex that even today's fastest
                    computers struggle to solve them. My research asks: what if
                    quantum computing gave AI the capacity to carry more?
                  </p>
                  <p className="body-text">
                    Alongside that, I'm exploring how machines can generate
                    sharper images from low-quality ones, and how language
                    models can reason about scientific problems in new ways.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── PUBLICATIONS ── */}
      <motion.div
        className="publications-section"
        variants={fadeUp(0.8)}
        initial="hidden"
        animate="show"
      >
        <div className="pubs-header">
          <div>
            <span className="section-eyebrow">Publications</span>
            <p className="pubs-legend">
              <span className="legend-item">
                <strong>C</strong> Conference
              </span>
              <span className="legend-sep">·</span>
              <span className="legend-item">
                <strong>J</strong> Journal
              </span>
              <span className="legend-sep">·</span>
              <span className="legend-item">
                <strong>P</strong> Poster
              </span>
              <span className="legend-sep">·</span>
              <span className="legend-item">
                <strong>S</strong> In Submission
              </span>
              <span className="legend-sep">·</span>
              <span className="legend-item">
                <strong>T</strong> Thesis
              </span>
            </p>
          </div>
          <ExternalLinks />
        </div>

        <div className="pub-list">
          {PUBLICATIONS.map((pub, i) => (
            <motion.article
              key={pub.id}
              className={`pub-item${expandedPub === pub.id ? " pub-item--open" : ""}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.9 + i * 0.1 }}
              onClick={() =>
                setExpandedPub(expandedPub === pub.id ? null : pub.id)
              }
            >
              <div className="pub-main">
                <div className="pub-left">
                  <span className="pub-id">[{pub.id}]</span>
                  <span className="pub-type-badge">{pub.typeLabel}</span>
                </div>
                <div className="pub-body">
                  <p className="pub-title">{pub.title}</p>
                  <AnimatePresence>
                    {expandedPub === pub.id && (
                      <motion.div
                        className="pub-detail"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="pub-authors">{pub.authors}</p>
                        <p className="pub-venue">
                          {pub.venue}{" "}
                          <span className="pub-status">{pub.status}</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="pub-right">
                  <span className="pub-year">{pub.year}</span>
                  <motion.span
                    className="pub-chevron"
                    animate={{ rotate: expandedPub === pub.id ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    ↓
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="pubs-extra">
          Additional journal manuscripts are currently in preparation.
        </p>
      </motion.div>

      <style>{`
       .research {
  min-height: 100vh; max-width: 860px; margin: 0 auto;
  padding: clamp(8rem, 14vh, 10rem) clamp(1.25rem,5vw,2rem) clamp(3rem,8vh,5rem);
  color: var(--text);
  display: flex; flex-direction: column; gap: 3rem;
}

        .intro-block { margin: 0; }

        /* chips */
        .chips-row { display:flex; flex-wrap:wrap; gap:0.5rem; align-items:center; }
        .interest-chip {
          display:inline-flex; align-items:center;
          padding:0.3rem 0.85rem; border-radius:4px;
          background:var(--glass-bg); border:1px solid var(--glass-border);
          backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
          font-size:0.72rem; font-weight:600; letter-spacing:0.06em;
          color:var(--text); opacity:0.55; font-family:inherit;
          transition:opacity 0.2s, transform 0.2s;
        }
        .interest-chip:hover { opacity:0.85; transform:translateY(-1px); }


        .interest-chip--hybrid:hover { opacity:1; transform:translateY(-1px); }

        /* main research section */
        .main-research-section { display:flex; flex-direction:column; gap:1.6rem; }

        /* label + toggle flush left, snug */
        .main-research-header {
          display:flex; align-items:center;
          justify-content:flex-start;
          gap:1rem; flex-wrap:wrap;
        }
        .section-eyebrow {
          font-size:0.68rem; font-weight:800; letter-spacing:0.18em;
          text-transform:uppercase; opacity:0.4; color:var(--text);
          white-space: nowrap;
        }

        /* toggle */
        .toggle-track { display:flex; padding:3px; border-radius:8px; background:var(--glass-bg); border:1px solid var(--glass-border); backdrop-filter:blur(12px); }
        .toggle-btn { position:relative; border:none; background:transparent; padding:0.45rem 1rem; border-radius:6px; cursor:pointer; font-size:0.8rem; font-weight:700; letter-spacing:0.04em; color:var(--text); opacity:0.45; transition:opacity 0.2s; z-index:0; font-family:inherit; }
        .toggle-btn--active { opacity:1; }
        .toggle-bg { position:absolute; inset:0; border-radius:6px; background:var(--glass-bg); border:1px solid var(--glass-border); backdrop-filter:blur(12px); z-index:-1; }
        .toggle-btn-label { position:relative; z-index:1; }

        /* researcher layout — text + sidebar */
        .content-grid { display:grid; grid-template-columns:1fr 175px; gap:2.5rem; align-items:start; }

        /* everyone layout — full width, stacked */
        .everyone-col { display:flex; flex-direction:column; gap:2rem; }
        .everyone-text {}

        /* body text */
        .body-text { font-size:clamp(1rem,3vw,1.08rem); line-height:1.88; opacity:0.78; margin-bottom:1.5rem; color:var(--text); }
        .body-text:last-child { margin-bottom:0; }
        .body-text strong { opacity:1; font-weight:700; }
        .drop-cap::first-letter { font-family:"Playfair Display",serif; font-size:3.8em; font-weight:800; float:left; line-height:0.78; margin:0.06em 0.1em 0 0; color:var(--text); }

        /* image + analogy panel */
        .hybrid-inner {
          display:grid; grid-template-columns:220px 1fr; gap:1.8rem;
          padding:1.4rem; border-radius:10px;
          background:var(--glass-bg); border:1px solid var(--glass-border);
          backdrop-filter:blur(16px); align-items:start;
        }
        .hybrid-img-wrap { border-radius:7px; overflow:hidden; aspect-ratio:4/3; }
        .hybrid-img { width:100%; height:100%; object-fit:cover; display:block; filter:saturate(0.85) contrast(1.05); }
        .hybrid-text { display:flex; flex-direction:column; gap:0.7rem; }
        .hybrid-eyebrow { font-size:0.62rem; font-weight:800; letter-spacing:0.16em; text-transform:uppercase; opacity:0.35; }
        .hybrid-quote { font-family:"Playfair Display",serif; font-size:clamp(1.1rem,3vw,1.45rem); font-weight:700; font-style:italic; line-height:1.3; opacity:0.85; margin:0; }
        .hybrid-body { font-size:0.88rem; line-height:1.75; opacity:0.58; margin:0; }

        /* sidebar */
        .side-note { position:sticky; top:6rem; }
        .side-note-inner { display:flex; flex-direction:column; gap:0.55rem; padding:1.1rem 1rem; border-radius:10px; background:var(--glass-bg); border:1px solid var(--glass-border); backdrop-filter:blur(14px); }
        .side-note-title { font-size:0.62rem; font-weight:800; letter-spacing:0.16em; text-transform:uppercase; opacity:0.5; margin-bottom:0.3rem; color:var(--text); }
        .side-kw { font-size:0.75rem; font-weight:500; line-height:1.55; opacity:0.7; padding-bottom:0.45rem; border-bottom:1px solid var(--glass-border); color:var(--text); }
        .side-kw:last-child { border-bottom:none; padding-bottom:0; }

        /* publications */
        .publications-section { display:flex; flex-direction:column; gap:0; }
        .pubs-header { display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; flex-wrap:wrap; margin-bottom:1.4rem; }
        .pubs-legend { display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; font-size:0.8rem; font-weight:500; color:var(--text); opacity:0.65; margin-top:0.4rem; }
        .legend-item { display:inline-flex; align-items:center; gap:0.25rem; }
        .legend-item strong { font-weight:800; }
        .legend-sep { opacity:0.3; }
        .pub-list { display:flex; flex-direction:column; }
        .pub-item { padding:1.2rem 0; border-bottom:1px solid var(--glass-border); cursor:pointer; transition:padding 0.2s, background 0.2s; }
        .pub-item:first-child { border-top:1px solid var(--glass-border); }
        .pub-item:hover { background:var(--glass-bg); padding-left:0.6rem; padding-right:0.6rem; margin:0 -0.6rem; border-radius:6px; border-color:transparent; }
        .pub-main { display:flex; gap:1rem; align-items:flex-start; }
        .pub-left { display:flex; flex-direction:column; align-items:flex-start; gap:0.4rem; flex-shrink:0; padding-top:0.1rem; }
        .pub-id { font-size:0.62rem; font-weight:800; letter-spacing:0.1em; font-family:"JetBrains Mono",monospace; opacity:0.4; white-space:nowrap; }
        .pub-type-badge { font-size:0.6rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:0.12rem 0.45rem; border-radius:3px; background:var(--glass-bg); border:1px solid var(--glass-border); color:var(--text); opacity:0.7; white-space:nowrap; }
        .pub-body { flex:1; min-width:0; }
        .pub-title { font-size:0.95rem; font-weight:600; line-height:1.55; opacity:0.85; margin:0; color:var(--text); }
        .pub-detail { overflow:hidden; padding-top:0.65rem; }
        .pub-authors { font-size:0.82rem; opacity:0.6; margin-bottom:0.3rem; line-height:1.6; color:var(--text); }
        .pub-venue { font-size:0.82rem; opacity:0.55; font-style:italic; line-height:1.6; margin:0; color:var(--text); }
        .pub-status { font-style:normal; font-weight:700; opacity:0.85; }
        .pub-right { display:flex; flex-direction:column; align-items:flex-end; gap:0.4rem; flex-shrink:0; padding-top:0.1rem; }
        .pub-year { font-size:0.72rem; font-weight:700; letter-spacing:0.06em; opacity:0.5; color:var(--text); }
        .pub-chevron { font-size:0.75rem; opacity:0.4; color:var(--text); }
        .pubs-extra { font-size:0.85rem; font-style:italic; margin-top:1.4rem; color:var(--text); opacity:0.55; }

        /* ext links */
        .ext-links { display:flex; gap:0.6rem; flex-wrap:wrap; }
        .ext-link { display:inline-flex; align-items:center; gap:0.4rem; padding:0.3rem 0.8rem; border-radius:100px; background:var(--glass-bg); border:1px solid var(--glass-border); backdrop-filter:blur(12px); font-size:0.72rem; font-weight:700; color:var(--text); text-decoration:none; opacity:0.65; transition:opacity 0.2s, transform 0.2s; }
        .ext-link:hover { opacity:1; transform:translateY(-1px); }
        .ext-arr { font-size:0.7rem; opacity:0.5; }
        .ext-link:hover .ext-arr { opacity:1; }

        @media (max-width:700px) {
          .hybrid-inner { grid-template-columns:1fr; }
          .content-grid { grid-template-columns:1fr; }
          .side-note { position:static; }
          .drop-cap::first-letter { font-size:3em; }
          .pubs-header { flex-direction:column; gap:1rem; }
          .main-research-header { gap:0.7rem; }
        }
      `}</style>
    </section>
  );
};

export default Research;

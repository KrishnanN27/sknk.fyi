import { motion } from "framer-motion";
import headshot from "../assets/images/about/headshot.jpeg";
import Widget from "../components/Widget";
import NowPlaying from "../components/widgets/NowPlaying";
import Status from "../components/widgets/Status";
import LatestBlog from "../components/widgets/LatestBlog";
import Pomodoro from "../components/widgets/Pomodoro";

const MinesLink = () => (
  <a
    href="https://www.mines.edu/"
    target="_blank"
    rel="noreferrer"
    className="prose-link"
  >
    Colorado School of Mines
  </a>
);

const CSLink = () => (
  <a
    href="https://cs.mines.edu/"
    target="_blank"
    rel="noreferrer"
    className="prose-link"
  >
    Computer Science
  </a>
);

const PortfolioBtn = ({ src }) => (
  <a href="/portfolio" className="btn-portfolio">
    <img src={src} alt="" className="btn-avatar" />
    <span className="btn-text">View Portfolio</span>
    <span className="btn-icon">
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
  </a>
);

const ScheduleBtn = () => (
  <a
    href="https://calendar.app.google/QECW5xXxB1YGAGnu9"
    target="_blank"
    rel="noreferrer"
    className="btn-schedule"
  >
    <span className="btn-cal">
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
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </span>
    Schedule a Meeting
  </a>
);

// Line 1: Sowndarya Krishnan  ("nan" in Krishnan faded)
// Line 2: Navaneetha Kannan   (fully faded — supporting context)
const nameLines = [
  ["Sowndarya", "Krishnan"],
  ["Navaneetha", "Kannan"],
];

const Home = () => {
  return (
    <section className="home-section">
      <div className="home-grid">
        {/* ── LEFT ── */}
        <div className="left-col">
          {/* Name block */}
          <div className="name-block">
            <h1 className="home-name">
              {nameLines.map((words, li) => (
                <span className="name-line" key={li}>
                  {words.map((word, wi) => (
                    <span className="name-word-gap" key={wi}>
                      {word.split("").map((char, ci) => {
                        // "nan" (indices 5-7) in "Krishnan" (line 0, word 1) faded
                        const isKrishnanSuffix =
                          li === 0 && wi === 1 && ci >= 5;
                        // entire second line faded
                        const isSecondLine = li === 1;
                        const charClass =
                          isKrishnanSuffix || isSecondLine
                            ? "char char-fade"
                            : "char";
                        // stagger: each line starts after the previous finishes
                        const lineOffset = li * 0.55;
                        const wordOffset = wi * 0.28;
                        const delay = 0.1 + lineOffset + wordOffset + ci * 0.03;
                        return (
                          <span className="char-wrap" key={ci}>
                            <motion.span
                              className={charClass}
                              initial={{ y: "110%", opacity: 0 }}
                              animate={{ y: "0%", opacity: 1 }}
                              transition={{
                                duration: 0.7,
                                delay,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              {char}
                            </motion.span>
                          </span>
                        );
                      })}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Reenie Beanie handwritten annotation */}
            <motion.p
              className="krish-annotation"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              aria-label="known as Krish"
            >
              known as Krish
            </motion.p>
          </div>

          {/* Role tags */}
          <motion.div
            className="tags-row"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
          >
            {["PhD Student", "Research Assistant", "Former SWE"].map((t) => (
              <span className="tag-chip" key={t}>
                {t}
              </span>
            ))}
          </motion.div>

          {/* Institution */}
          <motion.p
            className="home-institution"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: "easeOut" }}
          >
            PhD Student in <CSLink /> at <MinesLink />
          </motion.p>

          {/* Description */}
          <motion.p
            className="home-desc"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25, ease: "easeOut" }}
          >
            A space where I share my personal journey, research, and
            photography.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="btn-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <PortfolioBtn src={headshot} />
            <ScheduleBtn />
          </motion.div>
        </div>

        {/* ── WIDGETS ── */}
        <motion.div
          className="widgets-col"
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Widget title="Pomodoro Timer">
            <Pomodoro />
          </Widget>
          <Widget title="Spotify Now">
            <NowPlaying />
          </Widget>
          <Widget title="Status">
            <Status />
          </Widget>
          <Widget title="Latest Post">
            <LatestBlog />
          </Widget>
        </motion.div>
      </div>

      <style>{`
        /* ── Layout ── */
        .home-section {
          flex: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 10rem 2.5rem 7rem;
        }
        .home-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 5rem;
          align-items: start;
        }
        .left-col { max-width: 700px; }

        /* ── Name block ── */
        .name-block {
          position: relative;
          margin-bottom: 3rem;
        }
        .home-name {
          display: flex;
          flex-direction: column;
          gap: 0;
          font-size: clamp(2.6rem, 4.5vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.08;
          margin: 0;
        }
        .name-line {
          display: inline-flex;
          overflow: hidden;
          line-height: 1.08;
          gap: 0;
        }
        .name-word-gap {
          display: inline-flex;
          margin-right: 0.25em;
        }
        .name-word-gap:last-child { margin-right: 0; }
        .char-wrap {
          display: inline-block;
          overflow: hidden;
          line-height: 1.08;
        }
        .char { display: inline-block; }
        .char-fade { opacity: 0.18; }

        /* Reenie Beanie handwritten note */
        .krish-annotation {
          font-family: 'Reenie Beanie', cursive;
          font-size: 2rem;
          color: var(--text);
          opacity: 0.4;
          transform: rotate(-2deg);
          transform-origin: left center;
          margin-top: 0.5rem;
          user-select: none;
          pointer-events: none;
          letter-spacing: 0.02em;
        }

        /* ── Tags ── */
        .tags-row {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
          margin-bottom: 1.8rem;
        }
        .tag-chip {
          display: inline-flex;
          align-items: center;
          padding: 0.28rem 0.75rem;
          border-radius: 6px;
          background: var(--tag-bg);
          border: 1px solid var(--tag-border);
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--text);
          opacity: 0.5;
          transition: opacity 0.2s, border-color 0.2s;
          cursor: default;
        }
        .tag-chip:hover {
          opacity: 0.8;
          border-color: var(--glass-border);
        }

        /* ── Prose ── */
        .home-institution {
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 1.05rem;
          line-height: 1.75;
          opacity: 0.75;
          margin: 0 0 0.85rem;
        }
        .home-desc {
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.97rem;
          line-height: 1.8;
          opacity: 0.3;
          margin-bottom: 2.4rem;
        }
        .prose-link {
          color: var(--link);
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: color-mix(in srgb, var(--link) 35%, transparent);
          font-weight: 500;
          transition: text-decoration-color 0.2s;
        }
        .prose-link:hover {
          text-decoration-color: var(--link);
        }

        /* ── CTAs ── */
        .btn-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        /* ── Portfolio button ── */
        .btn-portfolio {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.38rem 0.5rem 0.38rem 0.38rem;
          border-radius: 100px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(14px);
          text-decoration: none;
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: var(--text);
          transform: translateY(0);
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
          transition:
            transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.2s ease;
        }
        .btn-portfolio:hover {
          transform: translateY(-2px);
          border-color: var(--tag-border);
          box-shadow:
            0 6px 24px rgba(0,0,0,0.14),
            0 2px 6px rgba(0,0,0,0.08);
        }
        .btn-portfolio:active {
          transform: translateY(0px);
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          transition-duration: 0.1s;
        }

        /* Avatar — ring blooms on hover */
        .btn-avatar {
          width: 26px; height: 26px;
          border-radius: 50%; object-fit: cover;
          flex-shrink: 0;
          box-shadow: 0 0 0 0px var(--glass-border);
          transition: box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-portfolio:hover .btn-avatar {
          box-shadow: 0 0 0 2px var(--glass-border);
        }

        /* Icon — slides right on hover */
        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--glass-border);
          flex-shrink: 0;
          transform: translateX(0);
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s;
        }
        .btn-portfolio:hover .btn-icon {
          transform: translateX(2px);
          background: rgba(255,255,255,0.11);
        }

        /* ── Schedule button ── */
        .btn-schedule {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.42rem 0.9rem 0.42rem 0.5rem;
          border-radius: 100px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(14px);
          text-decoration: none;
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text);
          overflow: hidden;
          transition: border-color 0.25s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }
        .btn-schedule::before {
          content: '';
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255,255,255,0.10) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          transition: left 0.55s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }
        .btn-schedule:hover {
          border-color: var(--tag-border);
          transform: translateY(-1px);
        }
        .btn-schedule:hover::before {
          left: 130%;
        }
        .btn-schedule:active {
          transform: translateY(0px) scale(0.98);
        }
        .btn-cal {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(255,255,255,0.07);
          border: 1px solid var(--glass-border);
          flex-shrink: 0;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.2s;
        }
        .btn-schedule:hover .btn-cal {
          transform: scale(1.18) rotate(-8deg);
          background: rgba(255,255,255,0.13);
        }

        /* ── Widgets ── */
        .widgets-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .home-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .left-col { max-width: 100%; }
          .widgets-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
        }
        @media (max-width: 560px) {
          .home-section { padding: 6.5rem 1.5rem 4rem; }
          .home-name { font-size: clamp(2.2rem, 10vw, 3rem); }
          .widgets-col { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Home;

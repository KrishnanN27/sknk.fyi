import { motion } from "framer-motion";
import headshot from "../assets/images/about/headshot.jpeg";
import Widget from "../components/Widget";
import NowPlaying from "../components/widgets/NowPlaying";
import Status from "../components/widgets/Status";

const MinesLink = () => (
  <a
    href="https://www.mines.edu/"
    target="_blank"
    rel="noreferrer"
    className="mines-link"
  >
    {"Colorado School of Mines"}
  </a>
);

const CSLink = () => (
  <a
    href="https://cs.mines.edu/"
    target="_blank"
    rel="noreferrer"
    className="mines-link"
  >
    {"Computer Science"}
  </a>
);

const PortfolioBtn = ({ src }) => (
  <a href="/portfolio" className="btn btn-filled">
    <img src={src} alt="" className="btn-avatar" />
    <span className="btn-label">{"View Portfolio"}</span>
  </a>
);

const ScheduleBtn = () => (
  <a
    href="https://calendar.app.google/QECW5xXxB1YGAGnu9"
    target="_blank"
    rel="noreferrer"
    className="schedule-pill"
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
    <span>{"Schedule a Meeting"}</span>
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
  </a>
);

const letters = "Sowndarya".split("");
const letters2 = "Krishnan".split("");

const Home = () => {
  return (
    <section className="home-section">
      <div className="home-grid">
        <div className="left-col">
          <h1 className="home-name">
            <span className="name-word">
              {letters.map((char, i) => (
                <span className="char-wrap" key={i}>
                  <motion.span
                    className="char"
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.05 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="name-word">
              {letters2.map((char, i) => (
                <span className="char-wrap" key={i}>
                  <motion.span
                    className="char"
                    style={i < 5 ? { color: "#65686d" } : {}}
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.32 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <div className="tags-row">
            {[
              "PhD Student",
              "Research Assistant",
              "Former Software Engineer",
            ].map((t, i) => (
              <motion.span
                className="tag-chip"
                key={t}
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.55 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="tag-dot" />
                <span className="tag-label">{t}</span>
              </motion.span>
            ))}
          </div>

          <motion.p
            className="home-institution"
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {"PhD Student in "}
            <CSLink />
            {" at "}
            <MinesLink />
          </motion.p>

          <motion.p
            className="home-desc"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: "easeOut" }}
          >
            {
              "A space where I share my personal journey, research, and photography."
            }
          </motion.p>

          <motion.div
            className="btn-row"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <PortfolioBtn src={headshot} />
            <ScheduleBtn />
          </motion.div>
        </div>

        <motion.div
          className="widgets-col"
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Widget title="Spotify Now">
            <NowPlaying />
          </Widget>
          <Widget title="Status">
            <Status />
          </Widget>
        </motion.div>
      </div>

      <style>{`
        .home-section {
          flex: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 10rem 2rem 6rem;
        }
        .home-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 3.5rem;
          align-items: start;
        }
        .left-col { max-width: 720px; }

        .home-name {
          display: flex;
          gap: 0.3em;
          flex-wrap: wrap;
          font-size: clamp(3rem, 6vw, 4.8rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 1.5rem;
        }
        .name-word {
          display: inline-flex;
          overflow: hidden;
          line-height: 1.1;
        }
        .char-wrap {
          display: inline-block;
          overflow: hidden;
          line-height: 1.1;
        }
        .char { display: inline-block; }

        /* ── Tags ── */
        .tags-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.6rem;
        }
        .tag-chip {
          display: inline-flex;
          align-items: center;
          padding: 0.28rem 0.75rem;
          border-radius: 5px;
          background: var(--glass-bg, rgba(255,255,255,0.06));
          border: 1px solid var(--glass-border, rgba(255,255,255,0.12));
          backdrop-filter: blur(14px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          transition: opacity 0.2s ease, transform 0.2s ease;
          cursor: default;
        }
        .tag-chip:hover { opacity: 0.8; transform: translateY(-1px); }
        .tag-label {
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--text);
          opacity: 0.65;
          white-space: nowrap;
        }

        /* ── Text ── */
        .home-institution {
          font-size: 1.15rem;
          line-height: 1.75;
          opacity: 0.8;
          margin: 0 0 1.4rem 0;
        }
        .home-desc {
          font-size: 1.08rem;
          line-height: 1.8;
          opacity: 0.38;
          margin-bottom: 2.2rem;
        }
        .mines-link {
          text-decoration: none;
          font-weight: 500;
          color: #2f6fe4;
          transition: color 0.25s ease;
        }
        .mines-link:hover { color: #5b9cf6; }

        /* ── Button row ── */
        .btn-row {
          display: flex;
          gap: 0.65rem;
          align-items: center;
          flex-wrap: wrap;
        }

        /* Portfolio filled button — no arrow */
        .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          overflow: hidden;
          border-radius: 100px;
          transition: color 0.35s ease, border-color 0.35s ease, opacity 0.35s ease;
          white-space: nowrap;
        }
        .btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--text);
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }
        .btn:hover::before { transform: translateX(0); }
        .btn:hover { color: var(--bg); }
        .btn > * { position: relative; z-index: 1; }

        .btn-filled {
          padding: 0.4rem 1rem 0.4rem 0.4rem;
          color: var(--text);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(12px);
        }
        .btn-filled:hover { border-color: var(--text); }

        .btn-avatar {
          width: 28px; height: 28px;
          border-radius: 50%; object-fit: cover;
          flex-shrink: 0;
          transition: opacity 0.3s ease;
        }
        .btn-filled:hover .btn-avatar { opacity: 0.1; }

        /* ── Schedule pill — matches Portfolio page style ── */
        .schedule-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.36rem 0.5rem 0.36rem 0.62rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 999px;
          font-size: 0.86rem;
          font-weight: 700;
          color: var(--text);
          text-decoration: none;
          letter-spacing: 0.02em;
          backdrop-filter: blur(12px);
          opacity: 0.72;
          transition: opacity 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .schedule-pill:hover {
          opacity: 1;
          border-color: rgba(var(--text-rgb, 229,231,235), 0.3);
        }

        .schedule-icon-wrap {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px;
          background: rgba(var(--text-rgb, 229,231,235), 0.07);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .schedule-arrow-wrap {
          display: flex; align-items: center; justify-content: center;
          width: 24px; height: 24px;
          background: rgba(var(--text-rgb, 229,231,235), 0.07);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.18s;
        }
        .schedule-pill:hover .schedule-arrow-wrap {
          background: rgba(var(--text-rgb, 229,231,235), 0.13);
        }

        /* ── Widgets ── */
        .widgets-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .home-grid { grid-template-columns: 1fr !important; }
          .tags-row { gap: 0.4rem; }
        }
        @media (max-width: 480px) {
          .tag-chip { padding: 0.26rem 0.7rem 0.26rem 0.55rem; }
          .tag-label { font-size: 0.68rem; letter-spacing: 0.05em; }
        }
      `}</style>
    </section>
  );
};

export default Home;

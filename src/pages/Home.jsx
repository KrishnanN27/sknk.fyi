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
    <span className="btn-icon">{"↗"}</span>
  </a>
);

const ScheduleBtn = () => (
  <a
    href="https://calendar.app.google/QECW5xXxB1YGAGnu9"
    target="_blank"
    rel="noreferrer"
    className="btn btn-outline"
  >
    <span className="btn-label">{"Schedule a Meeting"}</span>
    <span className="btn-icon-ghost">{"→"}</span>
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

        /* ── Glassmorphism Tags ── */
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

.tag-chip:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.tag-label {
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.65;
  white-space: nowrap;
}

        /* ── Rest of styles ── */
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

        .btn-row {
          display: flex;
          gap: 0.6rem;
          align-items: center;
          flex-wrap: wrap;
        }
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
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          transition: opacity 0.3s ease;
        }
        .btn-filled:hover .btn-avatar { opacity: 0.1; }

        .btn-icon {
          font-size: 0.95rem;
          opacity: 0.45;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .btn-filled:hover .btn-icon {
          transform: translate(2px, -2px);
          opacity: 1;
        }

        .btn-outline {
          padding: 0.52rem 1.2rem;
          color: var(--text);
          background: transparent;
          border: 1.5px solid var(--text);
          opacity: 0.75;
        }
        .btn-outline:hover { opacity: 1; }

        .btn-icon-ghost {
          font-size: 0.9rem;
          transition: transform 0.25s ease;
          opacity: 0.7;
        }
        .btn-outline:hover .btn-icon-ghost {
          transform: translateX(3px);
          opacity: 1;
        }

        .widgets-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

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

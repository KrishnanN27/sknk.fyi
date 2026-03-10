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
    Colorado School of Mines
  </a>
);

const CSLink = () => (
  <a
    href="https://cs.mines.edu/"
    target="_blank"
    rel="noreferrer"
    className="mines-link"
  >
    Computer Science
  </a>
);

const PortfolioBtn = ({ src }) => (
  <a href="/portfolio" className="btn btn-filled">
    <img src={src} alt="" className="btn-avatar" />
    <span className="btn-label">View Portfolio</span>
    <span className="btn-icon">↗</span>
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

const Home = () => (
  <section className="home-section">
    {/* ── ghost index numeral ── */}
    <span className="ghost-index" aria-hidden>
      01
    </span>

    {/* ── top rule ── */}
    <motion.div
      className="top-rule"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    />

    <div className="home-grid">
      {/* ═══════════ LEFT COL ═══════════ */}
      <div className="left-col">
        {/* name */}
        <div className="name-block">
          <h1 className="home-name">
            <span className="name-word">
              {letters.map((char, i) => (
                <span className="char-wrap" key={i}>
                  <motion.span
                    className="char"
                    initial={{ y: "110%", rotateX: -30, opacity: 0 }}
                    animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.15 + i * 0.045,
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
                    style={i < 5 ? { color: "var(--muted)" } : {}}
                    initial={{ y: "110%", rotateX: -30, opacity: 0 }}
                    animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.38 + i * 0.045,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* mid rule */}
        <motion.div
          className="mid-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* tags */}
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
                delay: 0.7 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="tag-label">{t}</span>
            </motion.span>
          ))}
        </div>

        {/* institution */}
        <motion.p
          className="home-institution"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
        >
          PhD Student in <CSLink /> at <MinesLink />
        </motion.p>

        {/* desc */}
        <motion.p
          className="home-desc"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: "easeOut" }}
        >
          A space where I share my personal journey, research, and photography.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="btn-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <PortfolioBtn src={headshot} />
          <ScheduleBtn />
        </motion.div>

        {/* bottom meta row */}
        <motion.div
          className="meta-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span className="meta-item">
            <span className="avail-dot" />
            Open to collaborations
          </span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Golden, CO</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">CS × Quantum</span>
        </motion.div>
      </div>

      {/* ═══════════ VERTICAL RULE ═══════════ */}
      <motion.div
        className="v-rule"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ═══════════ WIDGETS COL ═══════════ */}
      <motion.div
        className="widgets-col"
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
        position: relative;
        flex: 1;
        max-width: 1400px;
        margin: 0 auto;
        padding: clamp(7rem, 12vh, 9rem) clamp(1.5rem, 4vw, 3rem) 6rem;
      }

      /* ghost numeral */
      .ghost-index {
        position: absolute;
        top: clamp(4rem, 8vh, 6rem);
        right: clamp(1.5rem, 4vw, 3rem);
        font-family: "Playfair Display", serif;
        font-size: clamp(6rem, 14vw, 12rem);
        font-weight: 800;
        font-style: italic;
        line-height: 1;
        color: var(--text);
        opacity: 0.025;
        pointer-events: none;
        user-select: none;
        z-index: 0;
      }

      /* rules */
      .top-rule {
        width: 100%;
        height: 1px;
        background: var(--glass-border);
        transform-origin: left;
        margin-bottom: clamp(2.5rem, 5vh, 4rem);
      }
      .mid-rule {
        width: 100%;
        height: 1px;
        background: var(--glass-border);
        transform-origin: left;
        margin-bottom: 1.6rem;
      }

      /* grid — left | 1px rule | widgets */
      .home-grid {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1fr 1px clamp(280px, 26vw, 340px);
        gap: 0 3rem;
        align-items: start;
      }

      .left-col { max-width: 680px; }

      /* vertical rule */
      .v-rule {
        width: 1px;
        height: 100%;
        min-height: 420px;
        background: var(--glass-border);
        transform-origin: top;
        justify-self: center;
      }

      /* name */
      .name-block { margin-bottom: 1.4rem; }
      .home-name {
        display: flex;
        gap: 0.28em;
        flex-wrap: wrap;
        font-family: "Playfair Display", serif;
        font-size: clamp(3.2rem, 7vw, 5.6rem);
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1;
        perspective: 600px;
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

      /* tags */
      .tags-row {
        display: flex;
        gap: 0.45rem;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
      }
      .tag-chip {
        display: inline-flex;
        align-items: center;
        padding: 0.28rem 0.75rem;
        border-radius: 4px;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        backdrop-filter: blur(14px) saturate(160%);
        -webkit-backdrop-filter: blur(14px) saturate(160%);
        cursor: default;
      }
      .tag-label {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--text);
        opacity: 0.55;
        white-space: nowrap;
      }

      /* text */
      .home-institution {
        font-size: clamp(1rem, 2vw, 1.12rem);
        line-height: 1.75;
        opacity: 0.82;
        margin: 0 0 1.1rem 0;
        color: var(--text);
      }
      .home-desc {
        font-size: 1rem;
        line-height: 1.8;
        opacity: 0.35;
        margin-bottom: 2rem;
        color: var(--text);
      }
      .mines-link {
        text-decoration: none;
        font-weight: 600;
        color: #2f6fe4;
        transition: color 0.25s;
      }
      .mines-link:hover { color: #5b9cf6; }

      /* CTAs */
      .btn-row {
        display: flex;
        gap: 0.6rem;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 2.2rem;
      }
      .btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        text-decoration: none;
        font-size: 0.92rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        cursor: pointer;
        overflow: hidden;
        border-radius: 100px;
        transition: color 0.35s, border-color 0.35s, opacity 0.35s;
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
        padding: 0.38rem 1rem 0.38rem 0.38rem;
        color: var(--text);
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        backdrop-filter: blur(12px);
      }
      .btn-filled:hover { border-color: var(--text); }
      .btn-avatar {
        width: 27px; height: 27px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
        transition: opacity 0.3s;
      }
      .btn-filled:hover .btn-avatar { opacity: 0.1; }
      .btn-icon {
        font-size: 0.9rem; opacity: 0.45;
        transition: transform 0.25s, opacity 0.25s;
      }
      .btn-filled:hover .btn-icon { transform: translate(2px,-2px); opacity: 1; }

      .btn-outline {
        padding: 0.5rem 1.2rem;
        color: var(--text);
        background: transparent;
        border: 1.5px solid var(--text);
        opacity: 0.7;
      }
      .btn-outline:hover { opacity: 1; }
      .btn-icon-ghost {
        font-size: 0.88rem; opacity: 0.65;
        transition: transform 0.25s, opacity 0.25s;
      }
      .btn-outline:hover .btn-icon-ghost { transform: translateX(3px); opacity: 1; }

      /* meta row */
      .meta-row {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        flex-wrap: wrap;
      }
      .meta-item {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        color: var(--text);
        opacity: 0.32;
      }
      .meta-sep { font-size: 0.65rem; opacity: 0.2; color: var(--text); }
      .avail-dot {
        display: inline-block;
        width: 5px; height: 5px;
        border-radius: 50%;
        background: #22c55e;
        opacity: 1;
        animation: pulse-green 2.8s ease infinite;
      }
      @keyframes pulse-green {
        0%,100% { opacity: 0.9; transform: scale(1); }
        50%      { opacity: 0.4; transform: scale(0.85); }
      }

      /* widgets */
      .widgets-col {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        padding-top: 0.2rem;
      }

      /* responsive */
      @media (max-width: 960px) {
        .home-grid {
          grid-template-columns: 1fr !important;
        }
        .v-rule { display: none; }
        .ghost-index { opacity: 0.018; }
      }
      @media (max-width: 480px) {
        .home-name { font-size: clamp(2.8rem, 11vw, 4rem); }
        .tag-label { font-size: 0.66rem; }
      }
    `}</style>
  </section>
);

export default Home;

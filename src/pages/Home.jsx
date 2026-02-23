import { motion } from "framer-motion";
import headshot from "../assets/images/about/headshot.jpeg";
import Widget from "../components/Widget";
import NowPlaying from "../components/widgets/NowPlaying";
import Status from "../components/widgets/Status";

/* ---------------- animation presets ---------------- */

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const nameReveal = {
  hidden: { opacity: 0, y: 48, filter: "blur(14px)", skewY: 2 },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    skewY: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideIn = {
  hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

/* ---------------- Tag component ---------------- */

const Tag = ({ children }) => (
  <span className="tag">{children}</span>
);

/* ---------------- Home component ---------------- */

const Home = () => {
  return (
    <section className="home-section">
      {/* Ambient background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="home-grid"
      >
        {/* ================= LEFT COLUMN ================= */}
        <div className="left-col">

          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="eyebrow">
            <span className="eyebrow-dot" />
            Colorado School of Mines
            <span className="eyebrow-dot" />
            CS PhD
          </motion.div>

          {/* Name */}
          <motion.h1 variants={nameReveal} className="name">
            <span className="name-first">Sowndarya</span>
            <br />
            <span className="name-last"><span className="name-krish">Krish</span><span className="name-nan">nan</span></span>
          </motion.h1>

          {/* Tags */}
          <motion.div variants={fadeUp} className="tags-row">
            <Tag>PhD Student</Tag>
            <Tag>Research Assistant</Tag>
            <Tag>Former SWE</Tag>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeUp} className="rule" />

          {/* Description */}
          <motion.p variants={fadeUp} className="bio">
            A space where I share my personal journey, research, and photography.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={fadeUp} className="actions">
            <motion.a
              href="/portfolio"
              className="btn btn-primary"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <img
                src={headshot}
                alt="Sowndarya"
                className="btn-avatar"
              />
              View Portfolio
              <svg className="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>

            <motion.a
              href="https://calendar.app.google/QECW5xXxB1YGAGnu9"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Schedule a Meeting
            </motion.a>
          </motion.div>


        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <motion.div variants={slideIn} className="right-col">
          <div className="widget-stack">
            <Widget title="Spotify Now">
              <NowPlaying />
            </Widget>
            <Widget title="Status">
              <Status />
            </Widget>
          </div>

          {/* Decorative index number */}
          <div className="index-mark">01</div>
        </motion.div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .home-section {
          flex: 1;
          max-width: 1300px;
          margin: 0 auto;
          padding: 9rem 2.5rem 6rem;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Ambient orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(80px);
        }
        .orb-1 {
          width: 500px;
          height: 500px;
          top: -100px;
          right: -80px;
          background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
          animation: float-orb 12s ease-in-out infinite;
        }
        .orb-2 {
          width: 360px;
          height: 360px;
          bottom: 40px;
          left: -60px;
          background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%);
          animation: float-orb 16s ease-in-out infinite reverse;
        }
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 20px) scale(0.97); }
        }

        .home-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 5rem;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        /* LEFT */
        .left-col {
          max-width: 640px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text);
          opacity: 0.45;
          margin-bottom: 1.6rem;
        }
        .eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #9ca3af; /* soft grey */
  flex-shrink: 0;
  box-shadow: 0 0 6px rgba(156,163,175,0.4);
}

        .name {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(3.4rem, 6vw, 5.2rem);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: -0.02em;
          margin: 0 0 1.6rem 0;
          color: var(--text);
        }
        .name-first,
        .name-nan {
          font-style: italic;
        }
        .name-last {
          font-style: italic;
        }
        .name-krish {
          color: color-mix(in srgb, var(--text) 42%, transparent);
        }

        /* Tags */
        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.8rem;
        }
        .tag {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 0.28rem 0.7rem;
          border-radius: 3px;
          border: 1px solid color-mix(in srgb, var(--text) 20%, transparent);
          color: color-mix(in srgb, var(--text) 65%, transparent);
          background: transparent;
        }

        .rule {
          width: 40px;
          height: 1px;
          background: var(--text);
          opacity: 0.2;
          margin-bottom: 1.8rem;
          transform-origin: left;
          animation: rule-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.8s;
        }
        @keyframes rule-grow {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 0.2; }
        }

        .bio {
          font-size: 1rem;
          line-height: 1.8;
          opacity: 0.55;
          margin: 0 0 2.4rem 0;
          font-weight: 300;
          max-width: 480px;
        }

        /* Buttons */
        .actions {
          display: flex;
          gap: 0.9rem;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 2rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.6rem 1.3rem;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.25s ease;
          cursor: pointer;
        }

        .btn-primary {
          background: transparent;
          color: var(--text);
          border: 1.5px solid color-mix(in srgb, var(--text) 28%, transparent);
        }
        .btn-primary:hover {
          background: color-mix(in srgb, var(--text) 8%, transparent);
          border-color: color-mix(in srgb, var(--text) 50%, transparent);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text);
          border: none;
          position: relative;
          padding: calc(0.6rem + 1.5px) calc(1.3rem + 1.5px);
        }
        .btn-secondary::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          padding: 1.5px;
          background: linear-gradient(135deg, rgba(139,92,246,0.7) 0%, rgba(99,102,241,0.4) 50%, color-mix(in srgb, var(--text) 15%, transparent) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .btn-secondary:hover {
          background: rgba(139,92,246,0.06);
        }
        .btn-secondary:hover::before {
          background: linear-gradient(135deg, rgba(139,92,246,0.95) 0%, rgba(99,102,241,0.65) 50%, color-mix(in srgb, var(--text) 25%, transparent) 100%);
        }

        .btn-avatar {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          object-fit: cover;
          opacity: 0.9;
        }

        .btn-arrow {
          opacity: 0.6;
        }

        .footer-note {
          font-size: 0.8rem;
          opacity: 0.3;
          margin: 0;
        }
        .inline-link {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid currentColor;
          opacity: 1;
          transition: opacity 0.2s;
        }
        .inline-link:hover {
          opacity: 0.7;
        }

        /* RIGHT */
        .right-col {
          position: relative;
          padding-top: 0.5rem;
        }

        .widget-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: stretch;
        }
        .widget-stack > * {
          width: 100%;
        }

        .index-mark {
          position: absolute;
          bottom: -2rem;
          right: 0;
          font-family: 'DM Serif Display', serif;
          font-size: 5rem;
          font-weight: 400;
          opacity: 0.04;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          color: var(--text);
        }

        @media (max-width: 880px) {
          .home-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .right-col {
            max-width: 380px;
          }
          .index-mark {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .home-section {
            padding: 6rem 1.5rem 4rem;
          }
          .name {
            font-size: clamp(2.8rem, 12vw, 3.8rem);
            margin-bottom: 1.2rem;
          }
          .eyebrow {
            font-size: 0.7rem;
            margin-bottom: 1.2rem;
          }
          .tags-row {
            gap: 0.4rem;
            margin-bottom: 1.4rem;
          }
          .bio {
            font-size: 0.95rem;
            margin-bottom: 2rem;
          }
          .actions {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }
          .btn {
            justify-content: center;
            padding: 0.75rem 1.3rem;
          }
          .btn-secondary {
            padding: calc(0.75rem + 1.5px) calc(1.3rem + 1.5px);
          }
          .orb-1 {
            width: 300px;
            height: 300px;
            top: -60px;
            right: -60px;
          }
          .orb-2 {
            width: 220px;
            height: 220px;
          }
        }
      `}</style>
    </section>
  );
};

export default Home;

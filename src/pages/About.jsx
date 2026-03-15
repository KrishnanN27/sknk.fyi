import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import h1 from "../assets/images/about/h1.webp";
import h2 from "../assets/images/about/h2.webp";
import h3 from "../assets/images/about/h3.webp";
import h4 from "../assets/images/about/h4.webp";
import h5 from "../assets/images/about/h5.webp";

const images = [h1, h2, h3, h4, h5];

const funFacts = [
  "I speak the oldest living language in the world — Tamil (தமிழ்).",
  "People have called me every version of my name — Sowndar, Sound, Krishna, Krish, Chris, Sowndarya Krishnan.",
  "I come from a culture where last names aren't really used — mine is simply N.",
];

const likes = [
  "Mobile photography",
  "Mechanical keyboards",
  "The smell of petrol",
  "Strong filter coffee",
  "Dosa as emotional recovery",
  "All things nerdy",
  "Anime, manhwa & K-dramas",
  "6am airport terminals",
  "Rewatching comfort shows for the 100th time",
];

const forFun = [
  "Spontaneous adventures — no plan, just go",
  "Trying out new cuisines",
  "Learning new activities on a whim",
  "Working out",
  "PC & PS5 gaming",
  "Mobile games",
  "Swimming",
  "Research (it genuinely doesn't feel like work)",
];

const stats = [
  { label: "Years Coding", value: "10", sub: "2016 → present" },
  { label: "Keyboards", value: "8", sub: "and counting" },
  { label: "Countries", value: "2", sub: "working on it" },
  {
    label: "Languages",
    value: "4",
    sub: "Tamil · Telugu · English · Japanese*",
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

const About = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="about">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap');`}</style>

      {/* ── HERO IMAGE ROTATOR ── */}
      <motion.div
        className="hero-rotator"
        variants={fadeUp(0.2)}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={imageIndex}
            src={images[imageIndex]}
            alt=""
            className="hero-img"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
          />
        </AnimatePresence>
        <div className="hero-overlay" aria-hidden />
        <div className="hero-theme-overlay" aria-hidden />
        <div className="hero-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === imageIndex ? " hero-dot--active" : ""}`}
              onClick={() => setImageIndex(i)}
            />
          ))}
        </div>
      </motion.div>

      {/* ── INTRO ── */}
      <motion.div
        className="intro-block"
        variants={fadeUp(0.35)}
        initial="hidden"
        animate="show"
      >
        <p className="body-text drop-cap">
          {" "}
          Most friends call me Krish or Chris. If you'd like to try the full
          name: Sown-dar-yeh Krish-nun.
        </p>
        <p className="body-text muted handwrite">
          This is where I put the stuff that doesn't fit anywhere else.
        </p>
      </motion.div>

      {/* ── STATS ── */}
      <motion.div
        className="section-block"
        variants={fadeUp(0.4)}
        initial="hidden"
        animate="show"
      >
        <span className="section-eyebrow">Stats</span>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
            >
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              {stat.sub && <span className="stat-sub">{stat.sub}</span>}
            </motion.div>
          ))}
        </div>
        <p className="stat-footnote">
          * Japanese — had it, lost it, currently locking back in.
        </p>
      </motion.div>

      {/* ── FUN FACTS ── */}
      <motion.div
        className="section-block"
        variants={fadeUp(0.45)}
        initial="hidden"
        animate="show"
      >
        <span className="section-eyebrow">Fun Facts</span>
        <div className="facts-list">
          {funFacts.map((fact, i) => (
            <motion.div
              key={i}
              className="fact-item"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
            >
              <span className="fact-num">0{i + 1}</span>
              <p className="fact-text">{fact}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── I LIKE ── */}
      <motion.div
        className="section-block"
        variants={fadeUp(0.5)}
        initial="hidden"
        animate="show"
      >
        <span className="section-eyebrow">I Like</span>
        <div className="chips-row">
          {likes.map((item, i) => (
            <motion.span
              key={i}
              className="like-chip"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ opacity: 0.9 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ── FOR FUN ── */}
      <motion.div
        className="section-block"
        variants={fadeUp(0.52)}
        initial="hidden"
        animate="show"
      >
        <span className="section-eyebrow">For Fun</span>
        <div className="chips-row">
          {forFun.map((item, i) => (
            <motion.span
              key={i}
              className="like-chip"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ opacity: 0.9 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <style>{`
        .about {
          min-height: 100vh;
          max-width: 860px;
          margin: 0 auto;
          padding: clamp(8rem,14vh,10rem) clamp(1.25rem,5vw,2rem) clamp(3rem,8vh,5rem);
          color: var(--text);
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        /* ── hero ── */
        .hero-rotator {
          position: relative;
          width: 100%;
          height: clamp(280px, 45vw, 440px);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--glass-border);
        }
        .hero-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.38) 100%);
          pointer-events: none; z-index: 1;
        }
        .hero-theme-overlay {
          position: absolute; inset: 0;
          pointer-events: none; z-index: 2;
        }
        :root[data-theme="dark"]  .hero-theme-overlay { background: rgba(0,0,0,0.32); }
        :root[data-theme="light"] .hero-theme-overlay { background: rgba(255,255,255,0.22); }
        .hero-dots {
          position: absolute; bottom: 1rem; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 0.4rem; z-index: 3;
        }
        .hero-dot {
          width: 5px; height: 5px; border-radius: 50%; border: none;
          background: rgba(255,255,255,0.35); cursor: pointer; padding: 0;
          transition: background 0.3s, transform 0.3s;
        }
        .hero-dot--active { background: rgba(255,255,255,0.92); transform: scale(1.3); }

        /* ── intro ── */
        .intro-block { margin: 0; }
        .body-text {
          font-size: clamp(1rem, 3vw, 1.08rem);
          line-height: 1.88; opacity: 0.78;
          margin-bottom: 1.2rem; color: var(--text);
        }
        .body-text:last-child { margin-bottom: 0; }
        .body-text.muted { opacity: 0.38; }
        .body-text.handwrite {
          font-family: "Reenie Beanie", cursive;
          font-size: clamp(1.15rem, 3.5vw, 1.35rem);
          line-height: 1.6; letter-spacing: 0.02em;
        }
        .drop-cap::first-letter {
          font-family: "Playfair Display", serif;
          font-size: 3.8em; font-weight: 800;
          float: left; line-height: 0.78;
          margin: 0.06em 0.1em 0 0; color: var(--text);
        }

        /* ── sections ── */
        .section-block { display: flex; flex-direction: column; gap: 1.4rem; }
        .section-eyebrow {
          font-size: 0.68rem; font-weight: 800;
          letter-spacing: 0.18em; text-transform: uppercase;
          opacity: 0.4; color: var(--text);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1px solid var(--glass-border);
          border-radius: 12px; overflow: hidden;
        }
        .stat-card {
          display: flex; flex-direction: column; gap: 0.25rem;
          padding: 1.2rem 1.1rem;
          background: transparent;
          transition: background 0.25s;
        }
        .stat-card:hover { background: color-mix(in srgb, var(--glass-border) 30%, transparent); }
        .stat-card:nth-child(1) { border-bottom: 1px solid var(--glass-border); }
        .stat-card:nth-child(2) { border-left: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border); }
        .stat-card:nth-child(4) { border-left: 1px solid var(--glass-border); }
        .stat-label {
          font-size: 0.6rem; font-weight: 800;
          letter-spacing: 0.16em; text-transform: uppercase;
          opacity: 0.35; color: var(--text);
        }
        .stat-value {
          font-family: "Playfair Display", serif;
          font-size: clamp(1.1rem, 3vw, 1.5rem); font-weight: 800;
          line-height: 1.1; color: var(--text); opacity: 0.88;
        }
        .stat-sub {
          font-size: 0.68rem; font-weight: 500;
          opacity: 0.38; color: var(--text); line-height: 1.4; margin-top: 0.1rem;
        }
        .stat-footnote {
          font-size: 0.75rem; font-style: italic;
          opacity: 0.35; margin: 0; color: var(--text);
        }

        /* ── fun facts ── */
        .facts-list { display: flex; flex-direction: column; }
        .fact-item {
          display: grid;
          grid-template-columns: 2.8rem 1fr;
          gap: 0.8rem; align-items: baseline;
          padding: 1rem 0;
          border-bottom: 1px solid var(--glass-border);
        }
        .fact-item:first-child { border-top: 1px solid var(--glass-border); }
        .fact-num {
          font-family: "Reenie Beanie", cursive;
          font-size: 1.5rem; opacity: 0.28; line-height: 1; color: var(--text);
        }
        .fact-text {
          font-family: "Reenie Beanie", cursive;
          font-size: 1.25rem; line-height: 1.6; letter-spacing: 0.02em;
          opacity: 0.72; margin: 0; color: var(--text);
        }

        /* ── likes / for fun — two-col editorial list ── */
        .chips-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-top: 1px solid var(--glass-border);
        }
        .like-chip {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 0.2rem;
          border-bottom: 1px solid var(--glass-border);
          font-family: "Reenie Beanie", cursive;
          font-size: 1.1rem;
          letter-spacing: 0.02em;
          color: var(--text);
          opacity: 0.55;
          cursor: default;
          transition: opacity 0.2s;
        }
        .like-chip::before {
          content: "—";
          font-family: inherit;
          font-size: 0.75rem;
          opacity: 0.3;
          flex-shrink: 0;
        }
        .like-chip:nth-child(even) {
          padding-left: 1rem;
          border-left: 1px solid var(--glass-border);
        }

        @media (max-width: 600px) {
          .drop-cap::first-letter { font-size: 3em; }
          .fact-item { grid-template-columns: 2rem 1fr; }
          .chips-row { grid-template-columns: 1fr; }
          .like-chip:nth-child(even) { padding-left: 0.2rem; border-left: none; }
        }
      `}</style>
    </section>
  );
};

export default About;

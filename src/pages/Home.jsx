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
      staggerChildren: 0.22,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ---------------- Tag component ---------------- */

const Tag = ({ children }) => (
  <motion.span
    variants={tagVariants}
    style={{
      padding: "0.25rem 0.6rem",
      fontSize: "0.75rem",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      borderRadius: "4px",
      background: "var(--tag-bg)",
      border: "1px solid var(--tag-border)",
      color: "var(--text)",
    }}
  >
    {children}
  </motion.span>
);

/* ---------------- Home component ---------------- */

const Home = () => {
  return (
    <section
      style={{
        flex: 1,
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "10rem 2rem 6rem",
        position: "relative",
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "3.5rem",
          alignItems: "start",
        }}
      >
        {/* ================= LEFT COLUMN ================= */}
        <div style={{ maxWidth: 720 }}>
          {/* Name */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(2.6rem, 5vw, 3.8rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              marginBottom: "0.8rem",
              lineHeight: 1.05,
            }}
          >
            Sowndarya{" "}
            <span style={{ fontWeight: 600 }}>
              <span style={{ color: "rgba(128,128,128,0.85)" }}>Krish</span>
              nan
            </span>
          </motion.h1>

          {/* Tags */}
          <motion.div
            variants={container}
            style={{
              display: "flex",
              gap: "0.6rem",
              flexWrap: "wrap",
              marginBottom: "2rem",
            }}
          >
            <Tag>PhD Student</Tag>
            <Tag>Research Assistant</Tag>
            <Tag>Former Software Engineer</Tag>
          </motion.div>

          {/* Institution */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              opacity: 0.85,
              marginBottom: "1.8rem",
            }}
          >
            PhD Student in Computer Science at{" "}
            <a
              href="https://www.mines.edu/"
              target="_blank"
              rel="noreferrer"
              className="mines-link"
            >
              Colorado School of Mines
            </a>{" "}
            ·{" "}
            <a
              href="https://cs.mines.edu/"
              target="_blank"
              rel="noreferrer"
              className="cs-link"
            >
              Computer Science
            </a>
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              opacity: 0.6,
              marginBottom: "2.8rem",
            }}
          >
            A space where I share my personal journey, research, and
            photography.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              gap: "1.2rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {/* Portfolio Button - Glass with Glow */}
            <motion.a
              href="/portfolio"
              className="portfolio-btn"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.7rem",
                padding: "0.65rem 1.5rem 0.65rem 0.65rem",
                borderRadius: "999px",
                textDecoration: "none",
                color: "var(--text)",
                fontWeight: 600,
                fontSize: "0.95rem",
                position: "relative",
                overflow: "hidden",
                background: "var(--glass-bg)",
                backdropFilter: "blur(12px)",
                border: "1.5px solid var(--glass-border)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <img
                src={headshot}
                alt="Sowndarya"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid var(--glass-border)",
                }}
              />
              View Portfolio
            </motion.a>

            {/* Schedule Meeting - Glass with Neon Border */}
            <motion.a
              href="https://calendar.app.google/QECW5xXxB1YGAGnu9"
              target="_blank"
              rel="noreferrer"
              className="schedule-btn"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.6rem",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                letterSpacing: "0.01em",
                color: "var(--text)",
                position: "relative",
                background: "var(--glass-bg)",
                backdropFilter: "blur(12px)",
                border: "1.5px solid var(--glass-border)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
        <motion.div
          variants={container}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <motion.div variants={fadeUp}>
            <Widget title="Spotify Now">
              <NowPlaying />
            </Widget>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Widget title="Status">
              <Status />
            </Widget>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>
        {`
          @media (max-width: 900px) {
            section > div {
              grid-template-columns: 1fr !important;
            }
          }

          .mines-link,
          .cs-link {
            text-decoration: none;
            font-weight: 500;
            color: #2f6fe4;
            transition: color 0.25s ease;
          }

          .mines-link:hover,
          .cs-link:hover {
            color: #3b82f6;
          }

          /* Portfolio Button Hover Effects */
          .portfolio-btn {
            box-shadow: 0 0 0 rgba(255, 255, 255, 0),
                        0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .portfolio-btn:hover {
            background: var(--glass-bg) !important;
            border-color: var(--text) !important;
            box-shadow: 0 0 25px var(--glass-border),
                        0 0 50px var(--glass-border),
                        0 0 75px var(--glass-border),
                        0 4px 16px rgba(0, 0, 0, 0.2) !important;
            transform: translateY(-2px) scale(1.02) !important;
          }

          .portfolio-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, var(--glass-border) 0%, transparent 70%);
            border-radius: 999px;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .portfolio-btn:hover::before {
            opacity: 0.5;
          }

          /* Schedule Button Hover Effects */
          .schedule-btn {
            box-shadow: 0 0 0 rgba(255, 255, 255, 0),
                        0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .schedule-btn:hover {
            background: var(--glass-bg) !important;
            border-color: var(--text) !important;
            box-shadow: 0 0 20px var(--glass-border),
                        0 0 40px var(--glass-border),
                        inset 0 0 20px var(--glass-border) !important;
            transform: translateY(-2px) scale(1.02) !important;
          }

          .schedule-btn::after {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: var(--glass-border);
            border-radius: 999px;
            z-index: -1;
            opacity: 0;
            filter: blur(8px);
            transition: opacity 0.3s ease;
          }

          .schedule-btn:hover::after {
            opacity: 0.6;
          }

          /* Pulsing glow animation */
          @keyframes pulse-glow {
            0%, 100% {
              filter: brightness(1);
            }
            50% {
              filter: brightness(1.1);
            }
          }

          .portfolio-btn:hover,
          .schedule-btn:hover {
            animation: pulse-glow 2s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Home;

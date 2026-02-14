import { motion } from "framer-motion";
import Status from "../components/widgets/Status";
import Widget from "../components/Widget";
import { useTheme } from "../context/ThemeContext";

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

const imageCardVariant = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
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

/* ---------------- component ---------------- */

const Home = () => {
  const { theme } = useTheme();

  return (
    <section
      style={{
        flex: 1,
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "10rem 2rem 6rem",
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
          {/* Unified Card with Image and Content */}
          <motion.div
            variants={imageCardVariant}
            style={{
              position: "relative",
              width: "100%",
              borderRadius: "16px",
              overflow: "hidden",
              border:
                theme === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Image at top */}
            <div style={{ position: "relative" }}>
              <img
                src="/assets/home/homepage.jpeg"
                alt="Sowndarya Krishnan"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
              {/* Overlay only for dark mode */}
              {theme === "dark" && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(135deg, rgba(6, 4, 10, 0.4) 0%, rgba(13, 9, 34, 0.5) 100%)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>

            {/* Content area */}
            <div style={{ padding: "2.5rem" }} className="card-content">
              <motion.h1
                variants={fadeUp}
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  marginBottom: "0.8rem",
                  lineHeight: 1.1,
                  opacity: 0.92,
                }}
              >
                Sowndarya{" "}
                <span style={{ opacity: 0.6, fontWeight: 500 }}>Krishnan</span>
              </motion.h1>

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

              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  opacity: 0.78,
                  marginBottom: "1.4rem",
                }}
              >
                I am a PhD student in Computer Science at Colorado School of
                Mines and a research assistant working on scientific and
                computational methods for complex physical systems.
              </motion.p>

              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  opacity: 0.7,
                }}
              >
                My research focuses on hybrid quantum–AI approaches for solving
                partial differential equations, with applications in
                physics-based modeling and simulation.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <motion.div variants={fadeUp}>
          <Widget title="Status">
            <Status />
          </Widget>
        </motion.div>
      </motion.div>

      {/* ---------- mobile stack ---------- */}
      <style>
        {`
          @media (max-width: 900px) {
            section > div {
              grid-template-columns: 1fr !important;
            }
            .card-content {
              padding: 1.5rem !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Home;

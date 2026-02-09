import { motion } from "framer-motion";

import Widget from "../components/Widget";
import NowPlaying from "../components/widgets/NowPlaying";
import ContactCard from "../components/widgets/ContactCard";
import LatestProject from "../components/widgets/LatestProject";
import LatestBlog from "../components/widgets/LatestBlog";

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
    whileHover={{ y: -2, scale: 1.04 }}
    style={{
      padding: "0.4rem 0.85rem",
      borderRadius: "999px",
      fontSize: "0.8rem",
      fontWeight: 500,
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.14)",
      color: "var(--text)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    }}
  >
    {children}
  </motion.span>
);

/* ---------------- component ---------------- */

const Home = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "10rem 2rem 6rem",
        color: "var(--text)",
        display: "flex",
        flexDirection: "column",
        gap: "3.2rem",
      }}
    >
      {/* ---------------- WIDGET ROW ---------------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.75rem",
        }}
      >
        <motion.div variants={fadeUp}>
          <Widget title="Latest Project">
            <LatestProject />
          </Widget>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Widget title="Latest Blog">
            <LatestBlog />
          </Widget>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Widget title="Get in Touch">
            <ContactCard />
          </Widget>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Widget title="Now Playing">
            <NowPlaying />
          </Widget>
        </motion.div>
      </motion.div>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ maxWidth: 720 }}
      >
        {/* Floating header block */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "3.8rem",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              marginBottom: "0.9rem",
            }}
          >
            Sowndarya Krishnan
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
          </motion.div>
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
          I am a PhD student in Computer Science at Colorado School of Mines and
          a research assistant working on scientific and computational methods
          for complex physical systems.
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
          partial differential equations, with applications in physics-based
          modeling and simulation.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Home;

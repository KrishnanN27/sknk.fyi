import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const Contact = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        paddingTop: "clamp(6.5rem, 12vh, 8.5rem)",
        paddingBottom: "clamp(3rem, 8vh, 4rem)",
        paddingLeft: "clamp(1.25rem, 5vw, 2rem)",
        paddingRight: "clamp(1.25rem, 5vw, 2rem)",
        maxWidth: "700px",
        margin: "0 auto",
        color: "var(--text)",
      }}
    >
      <motion.div variants={container} initial="hidden" animate="show">
        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          style={{
            fontSize: "clamp(2.1rem, 6vw, 2.75rem)",
            fontWeight: 700,
            marginBottom: "1.25rem",
            lineHeight: 1.1,
          }}
        >
          Contact
        </motion.h1>

        {/* Intro */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(1rem, 3.5vw, 1.1rem)",
            lineHeight: 1.75,
            opacity: 0.85,
            marginBottom: "clamp(2rem, 6vh, 3rem)",
          }}
        >
          I’m always open to discussions about research, collaborations, or
          interesting problems. Feel free to reach out.
        </motion.p>

        {/* Card */}
        <motion.div
          variants={fadeUp}
          style={{
            padding: "clamp(1.25rem, 4vw, 2rem)",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            borderRadius: "18px",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Academic Email */}
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={labelStyle}>Academic Email</div>
            <a
              href="mailto:sowndaryakrishnanna@mines.edu"
              style={valueLinkStyle}
            >
              sowndaryakrishnanna@mines.edu
            </a>
          </div>

          {/* Personal Email */}
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={labelStyle}>Personal Email</div>
            <a href="mailto:krishnaofficial27@gmail.com" style={valueLinkStyle}>
              krishnaofficial27@gmail.com
            </a>
          </div>

          {/* Affiliation */}
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={labelStyle}>Affiliation</div>
            <div style={valueStyle}>Department of Computer Science</div>
          </div>

          {/* Links */}
          <div>
            <div style={labelStyle}>Links</div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "0.6rem",
                fontSize: "0.95rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noreferrer"
                style={linkStyle}
              >
                Google Scholar
              </a>
              <a
                href="https://github.com/krishnanN27"
                target="_blank"
                rel="noreferrer"
                style={linkStyle}
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/krishnan-n"
                target="_blank"
                rel="noreferrer"
                style={linkStyle}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        {/* Soft close */}
        <motion.div
          variants={fadeUp}
          style={{
            marginTop: "clamp(2rem, 6vh, 3rem)",
            fontSize: "0.9rem",
            opacity: 0.6,
          }}
        >
          I usually reply right away.
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ---------- styles ---------- */

const labelStyle = {
  opacity: 0.6,
  fontSize: "0.85rem",
};

const valueStyle = {
  fontSize: "1rem",
  fontWeight: 500,
};

const valueLinkStyle = {
  ...valueStyle,
  color: "var(--text)",
  textDecoration: "none",
};

const linkStyle = {
  color: "var(--text)",
  opacity: 0.8,
  textDecoration: "none",
  transition: "opacity 0.2s ease",
};

export default Contact;

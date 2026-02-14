import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const Contact = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "clamp(7rem, 12vh, 10rem) clamp(1.25rem, 5vw, 2rem)",
        maxWidth: "780px",
        margin: "0 auto",
        color: "var(--text)",
      }}
    >
      <motion.div variants={container} initial="hidden" animate="show">
        {/* Intro */}
        <motion.p
          variants={fadeUp}
          style={{
            marginBottom: "3rem",
            fontSize: "clamp(1rem, 3vw, 1.1rem)",
            opacity: 0.75,
            lineHeight: 1.6,
            maxWidth: "620px",
          }}
        >
          The preferred way to connect is by scheduling a conversation. You’re
          also welcome to reach out directly via email or LinkedIn.
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{
            padding: "clamp(2.8rem, 5vw, 3.8rem)",
            borderRadius: "28px",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(18px)",
          }}
        >
          {/* Primary Section */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: 0.5,
                marginBottom: "0.8rem",
              }}
            >
              Best Way to Connect
            </div>

            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.2rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                marginBottom: "1.5rem",
              }}
            >
              Schedule a Conversation
            </h2>

            <motion.a
              href="https://calendar.app.google/QECW5xXxB1YGAGnu9"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={primaryButton}
            >
              Book a Meeting
            </motion.a>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "var(--glass-border)",
              opacity: 0.4,
              marginBottom: "3rem",
            }}
          />

          {/* Secondary Contact */}
          <div>
            <div style={sectionTitleStyle}>Other Ways to Reach Me</div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "2rem",
              }}
            >
              <ContactItem
                label="Academic Email"
                href="mailto:sowndaryakrishnanna@mines.edu"
                value="sowndaryakrishnanna@mines.edu"
              />

              <ContactItem
                label="Personal Email"
                href="mailto:skfyi@gmail.com"
                value="skfyi@gmail.com"
              />

              <ContactItem
                label="LinkedIn"
                href="https://www.linkedin.com/in/krishnan-n/"
                value="linkedin.com/in/krishnan-n/"
                external
              />
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: "3rem",
              fontSize: "0.85rem",
              opacity: 0.5,
              textAlign: "center",
            }}
          >
            I typically respond within 24 hours.
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const ContactItem = ({ label, href, value, external }) => (
  <div>
    <div style={labelStyle}>{label}</div>
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileHover={{ opacity: 0.6 }}
      style={valueLinkStyle}
    >
      {value}
    </motion.a>
  </div>
);

/* ---------- Styles ---------- */

const primaryButton = {
  display: "inline-block",
  padding: "0.95rem 2.4rem",
  borderRadius: "999px",
  background: "transparent",
  border: "1px solid var(--text)",
  color: "var(--text)",
  fontWeight: 500,
  fontSize: "0.95rem",
  textDecoration: "none",
  transition: "all 0.25s ease",
};

const sectionTitleStyle = {
  fontSize: "0.8rem",
  fontWeight: 600,
  opacity: 0.7,
  marginBottom: "1.5rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

const labelStyle = {
  fontSize: "0.75rem",
  opacity: 0.5,
  marginBottom: "0.4rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const valueLinkStyle = {
  fontSize: "clamp(0.95rem, 3vw, 1rem)",
  fontWeight: 500,
  color: "var(--text)",
  textDecoration: "none",
  wordBreak: "break-word",
};

export default Contact;

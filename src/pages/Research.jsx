import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import researchImage from "../assets/images/research/research.webp";

/* ---------------- animation presets ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ---------------- component ---------------- */

const Research = () => {
  const [mode, setMode] = useState("researchers");

  return (
    <section
      style={{
        minHeight: "100vh",
        maxWidth: "900px",
        margin: "0 auto",

        /* navbar-safe + responsive */
        paddingTop: "clamp(6.5rem, 12vh, 8.5rem)",
        paddingBottom: "clamp(4rem, 10vh, 6rem)",
        paddingLeft: "clamp(1.25rem, 5vw, 2rem)",
        paddingRight: "clamp(1.25rem, 5vw, 2rem)",

        color: "var(--text)",
      }}
    >
      <motion.div initial="hidden" animate="show">
        {/* ---------------- IMAGE ---------------- */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.96, filter: "blur(6px)" },
            show: {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          style={{
            aspectRatio: "16 / 9",
            width: "100%",
            maxWidth: "720px",
            margin: "0 auto clamp(2.5rem, 8vh, 4rem)",
            borderRadius: "clamp(14px, 4vw, 20px)",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            position: "relative",
          }}
        >
          <img
            src={researchImage}
            alt="Hybrid Quantum–AI Concept"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
{/* Theme-based overlay */}
{/* Overlay (same style logic as About) */}
<div
  style={{
    position: "absolute",
    inset: 0,
    background: `
      linear-gradient(
        to bottom,
        transparent 40%,
        var(--bg) 100%
      )
    `,
    pointerEvents: "none",
  }}
/>


        </motion.div>

        {/* ---------------- METAPHOR ---------------- */}
        <motion.div
          variants={fadeUp}
          style={{
            ...paragraphStyle,
            padding: "1.25rem 0",
            marginBottom: "clamp(1.5rem, 6vh, 2rem)",
            maxWidth: "640px",
            fontSize: "clamp(1rem, 3.8vw, 1.05rem)",
            lineHeight: 1.6,
          }}
        >
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "currentColor",
              opacity: 0.3,
              marginBottom: "1rem",
            }}
          />
          <strong style={{ opacity: 0.9 }}>
            If I had to explain my research in one picture:
          </strong>{" "}
          it's like giving a fast plane the vast capacity of a ship.
        </motion.div>

        <motion.p variants={fadeUp} style={paragraphStyle}>
          Artificial intelligence and machine learning are already fast and
          powerful—like a plane. Quantum computing does not replace that speed.
          It expands what can be carried, explored, and accessed.
        </motion.p>

     {/* ---------------- TOGGLE ---------------- */}
<motion.div
  variants={fadeUp}
  style={{
    display: "flex",
    justifyContent: "center",
    margin: "clamp(3rem, 10vh, 4rem) 0 clamp(2rem, 6vh, 3rem)",
    padding: "0 0.5rem",
  }}
>
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.6rem 1rem",
      background: "rgba(255,255,255,0.03)",
      borderRadius: "14px",
      border: "1px solid rgba(255,255,255,0.06)",
      backdropFilter: "blur(6px)",
    }}
  >
    <span
      style={{
        fontSize: "0.9rem",
        opacity: 0.6,
        fontWeight: 500,
      }}
    >
      Viewing for:
    </span>

    <div
      style={{
        display: "flex",
        position: "relative",
        background: "rgba(255,255,255,0.04)",
        borderRadius: "10px",
        padding: "4px",
      }}
    >
      {["researchers", "everyone"].map((value) => {
        const isActive = mode === value;
        return (
          <motion.button
            key={value}
            onClick={() => setMode(value)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={toggleButtonStyle(isActive)}
          >
            {isActive && (
              <motion.div
                layoutId="activeToggle"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "8px",
                  background:
                    "linear-gradient(135deg, var(--text) 0%, rgba(255,255,255,0.35) 100%)",
                  opacity: 0.12,
                  zIndex: 0,
                }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>
              {value === "researchers" ? "Researchers" : "Everyone"}
            </span>
          </motion.button>
        );
      })}
    </div>
  </div>
</motion.div>


        {/* ---------------- CONTENT ---------------- */}
        <div
          style={{
            position: "relative",
            minHeight: "clamp(260px, 40vh, 320px)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              variants={contentVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {mode === "researchers" ? (
                <>
                  <p style={paragraphStyle}>
                    My research focuses on the development of{" "}
                    <span style={highlightStyle}>
                      hybrid quantum–AI algorithms
                    </span>{" "}
                    for scientific problems governed by partial differential
                    equations (PDEs).
                  </p>

                  <p style={paragraphStyle}>
                    I design quantum-enhanced computational frameworks that
                    combine variational quantum algorithms with machine learning
                    methods, targeting{" "}
                    <span style={highlightStyle}>
                      multiscale, multiphysics systems
                    </span>{" "}
                    beyond classical limits.
                  </p>

                  <p style={paragraphStyle}>
                    By reformulating PDE-based models for quantum hardware, my
                    work aims to expand the scope of scientific modeling and
                    discovery.
                  </p>
                </>
              ) : (
             <>
  <p style={paragraphStyle}>
    Scientists use math and computer simulations to understand how the world
    works — like how water moves underground, how materials react to heat, or
    how energy flows through systems.
  </p>

  <p style={paragraphStyle}>
    But some of these problems are so complex that even today’s fastest
    computers struggle to solve them efficiently.
  </p>

  <p style={paragraphStyle}>
    My research explores how{" "}
    <span style={highlightStyle}>quantum computing</span> and{" "}
    <span style={highlightStyle}>artificial intelligence</span>{" "}
    can work together to tackle these harder problems — building new tools
    that may help us design better materials, improve energy systems, and
    understand nature in deeper ways.
  </p>
</>

              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

/* ---------------- styles ---------------- */

const paragraphStyle = {
  fontSize: "clamp(1rem, 3.8vw, 1.15rem)",
  lineHeight: 1.8,
  opacity: 0.78,
  marginBottom: "clamp(1.25rem, 5vh, 1.75rem)",
  letterSpacing: "-0.01em",
};

const toggleButtonStyle = (active) => ({
  position: "relative",
  border: "none",
  background: "transparent",
  padding: "0.55rem 1.1rem",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "0.9rem",
  fontWeight: 500,
  color: active ? "var(--text)" : "rgba(128,128,128,0.6)",
  transition: "color 0.25s ease",
});


const highlightStyle = {
  fontWeight: 600,
  opacity: 0.95,
  background:
    "linear-gradient(120deg, transparent 0%, rgba(128,128,128,0.1) 100%)",
  padding: "0.1em 0.25em",
  borderRadius: "3px",
};

export default Research;

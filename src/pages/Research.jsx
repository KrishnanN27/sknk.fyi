import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import researchImage from "../assets/images/research/research.png";

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

const Research = () => {
  const [mode, setMode] = useState("researchers");

  return (
    <section
      style={{
        minHeight: "100vh",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "8rem 2rem 6rem",
        color: "var(--text)",
      }}
    >
      <motion.div initial="hidden" animate="show">
        {/* ---------------- IMAGE (LOCKED ASPECT RATIO) ---------------- */}
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
            margin: "0 auto 4rem",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
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

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.05))",
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* ---------------- METAPHOR ---------------- */}
        <motion.div
          variants={fadeUp}
          style={{
            ...paragraphStyle,
            padding: "1.5rem 0",
            marginBottom: "2rem",
            maxWidth: "640px",
            fontSize: "1.05em",
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
            margin: "4rem 0 3rem",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.25rem",
              background: "rgba(128, 128, 128, 0.04)",
              borderRadius: "12px",
              border: "1px solid rgba(128, 128, 128, 0.08)",
            }}
          >
            <span
              style={{
                fontSize: "0.9rem",
                opacity: 0.65,
                fontWeight: 500,
              }}
            >
              Viewing for:
            </span>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginLeft: "0.5rem",
                position: "relative",
              }}
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: mode === "researchers" ? 0 : "calc(50% + 0.25rem)",
                  width: "calc(50% - 0.25rem)",
                  height: "100%",
                  background: "var(--text)",
                  borderRadius: "8px",
                  opacity: 0.08,
                  zIndex: 0,
                }}
              />

              <button
                onClick={() => setMode("researchers")}
                style={toggleButtonStyle(mode === "researchers")}
              >
                Researchers
              </button>

              <button
                onClick={() => setMode("everyone")}
                style={toggleButtonStyle(mode === "everyone")}
              >
                Everyone
              </button>
            </div>
          </div>
        </motion.div>

        {/* ---------------- CONTENT (FIXED HEIGHT) ---------------- */}
        <div style={{ position: "relative", height: "320px" }}>
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
                    Modern science relies on mathematical models to understand
                    complex physical systems—from how fluids move through porous
                    materials to how energy and matter interact in large-scale
                    engineering processes.
                  </p>

                  <p style={paragraphStyle}>
                    My research explores how{" "}
                    <span style={highlightStyle}>quantum computing</span> and{" "}
                    <span style={highlightStyle}>artificial intelligence</span>{" "}
                    can work together to push beyond classical computational
                    limits.
                  </p>

                  <p style={{ ...paragraphStyle, opacity: 0.65 }}>
                    Think of it as creating new tools that help us simulate and
                    understand phenomena that current computers struggle
                    with—enabling breakthroughs in materials science, energy
                    systems, and beyond.
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
  fontSize: "1.15rem",
  lineHeight: 1.85,
  opacity: 0.78,
  marginBottom: "1.75rem",
  letterSpacing: "-0.01em",
};

const toggleButtonStyle = (active) => ({
  background: "none",
  border: "none",
  padding: "0.5rem 1rem",
  cursor: "pointer",
  fontSize: "0.9rem",
  color: "var(--text)",
  fontWeight: active ? 600 : 500,
  opacity: active ? 1 : 0.5,
  position: "relative",
  zIndex: 1,
  borderRadius: "8px",
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

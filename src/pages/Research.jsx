import { useState } from "react";
import { motion } from "framer-motion";
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
        {/* Image */}
        <motion.img
          src={researchImage}
          alt="Hybrid Quantum–AI Concept"
          variants={{
            hidden: { opacity: 0, filter: "blur(6px)" },
            show: {
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 0.6 },
            },
          }}
          style={{
            width: "80%",
            height: "280px",
            objectFit: "cover",
            borderRadius: "16px",
            margin: "0 auto 3rem",
            display: "block",
            opacity: 0.9,
          }}
        />

        {/* Metaphor */}
        <motion.p variants={fadeUp} style={paragraphStyle}>
          <strong>If I had to explain my research in one picture:</strong> it’s
          like giving a fast plane the vast capacity of a ship.
        </motion.p>

        <motion.p variants={fadeUp} style={paragraphStyle}>
          Artificial intelligence and machine learning are already fast and
          powerful—like a plane. Quantum computing does not replace that speed.
          It expands what can be carried, explored, and accessed.
        </motion.p>

        {/* Toggle */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            margin: "3.5rem 0 2.5rem",
            fontSize: "0.95rem",
            opacity: 0.8,
          }}
        >
          <span>Viewing this explanation for:</span>

          <button
            onClick={() => setMode("researchers")}
            style={toggleStyle(mode === "researchers")}
          >
            Researchers
          </button>

          <button
            onClick={() => setMode("everyone")}
            style={toggleStyle(mode === "everyone")}
          >
            Everyone
          </button>
        </motion.div>

        {/* Toggle Content (height-balanced, no animation) */}
        {/* Toggle Content (smooth height adjustment) */}
        <div
          style={{
            transition: "height 0.25s ease",
            overflow: "hidden",
          }}
        >
          {mode === "researchers" ? (
            <>
              <p style={paragraphStyle}>
                My research focuses on the development of hybrid quantum–AI
                algorithms for scientific problems governed by partial
                differential equations (PDEs).
              </p>

              <p style={paragraphStyle}>
                I design quantum-enhanced computational frameworks that combine
                variational quantum algorithms with machine learning methods,
                targeting multiscale, multiphysics systems beyond classical
                limits.
              </p>

              <p style={paragraphStyle}>
                By reformulating PDE-based models for quantum hardware, my work
                aims to expand the scope of scientific modeling and discovery.
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
                My research explores how quantum computing and artificial
                intelligence can work together to push beyond classical
                computational limits.
              </p>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
};

/* ---------------- styles ---------------- */

const paragraphStyle = {
  fontSize: "1.15rem",
  lineHeight: 1.8,
  opacity: 0.78,
  marginBottom: "1.75rem",
};

const toggleStyle = (active) => ({
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  fontSize: "0.95rem",
  color: "var(--text)",
  fontWeight: active ? 600 : 400,
  opacity: active ? 1 : 0.45,
  textDecoration: active ? "underline" : "none",
  textUnderlineOffset: "6px",
});

export default Research;

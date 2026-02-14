import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import researchImage from "../assets/images/research/research.webp";

/* ---------------- animations ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

/* ---------------- component ---------------- */

const Research = () => {
  const [mode, setMode] = useState("researchers");
  const { theme } = useTheme();

  return (
    <section
      style={{
        minHeight: "100vh",
        maxWidth: "900px",
        margin: "0 auto",
        paddingTop: "clamp(6.5rem, 12vh, 8.5rem)",
        paddingBottom: "clamp(3rem, 8vh, 5rem)",
        paddingInline: "clamp(1.25rem, 5vw, 2rem)",
        color: "var(--text)",
      }}
    >
      {/* ---------- IMAGE ---------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: "18px",
          overflow: "hidden",
          marginBottom: "clamp(2rem, 6vh, 3rem)",
        }}
      >
        <img
          src={researchImage}
          alt="Research"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </motion.div>

      {/* ---------- METAPHOR INTRO (BEFORE TOGGLE) ---------- */}
      <motion.div variants={fadeUp} initial="hidden" animate="show">
        <p style={paragraph}>
          If I had to explain my research in one picture: it’s like giving a
          fast plane the vast capacity of a ship.
        </p>

        <p style={paragraph}>
          Artificial intelligence and machine learning are already fast and
          powerful — like a plane. Quantum computing does not replace that
          speed. It expands what can be carried, explored, and accessed.
        </p>
      </motion.div>

      {/* ---------- TOGGLE ---------- */}
      {/* ---------- VIEWING FOR + TOGGLE ---------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{
          margin: "clamp(2.5rem, 8vh, 3.5rem) 0",
        }}
      >
        {/* Label */}
        <p
          style={{
            textAlign: "center",
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.6,
            marginBottom: "1rem",
          }}
        >
          Viewing for:
        </p>

        {/* Toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              padding: "0.4rem",
              borderRadius: "12px",
              background:
                theme === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
              border: "1px solid var(--glass-border)",
            }}
          >
            {["researchers", "everyone"].map((value) => {
              const active = mode === value;

              return (
                <button
                  key={value}
                  onClick={() => setMode(value)}
                  style={{
                    position: "relative",
                    border: "none",
                    background: "transparent",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "var(--text)",
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="researchToggle"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "8px",
                        background:
                          theme === "dark"
                            ? "rgba(255,255,255,0.12)"
                            : "rgba(0,0,0,0.05)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid var(--glass-border)",
                        zIndex: -1,
                      }}
                    />
                  )}

                  {value === "researchers" ? "Researchers" : "Everyone"}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ---------- CONTENT ---------- */}
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
              <p style={paragraph}>
                My research focuses on the development of{" "}
                <strong>hybrid quantum–AI algorithms</strong> for scientific
                problems governed by partial differential equations (PDEs).
              </p>

              <p style={paragraph}>
                I design quantum-enhanced computational frameworks that combine
                variational quantum algorithms with machine learning methods,
                targeting multiscale, multiphysics systems beyond classical
                limits.
              </p>

              <p style={paragraph}>
                By reformulating PDE-based models for quantum hardware, my work
                aims to expand the scope of scientific modeling and discovery.
              </p>
            </>
          ) : (
            <>
              <p style={paragraph}>
                Scientists use math and computer simulations to understand how
                the world works — like how water moves underground, how
                materials react to heat, or how energy flows through systems.
              </p>

              <p style={paragraph}>
                But some of these problems are so complex that even today’s
                fastest computers struggle to solve them efficiently.
              </p>

              <p style={paragraph}>
                My research explores how quantum computing and artificial
                intelligence can work together to tackle these harder problems —
                building new tools that may help us design better materials,
                improve energy systems, and understand nature in deeper ways.
              </p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

/* ---------- shared style ---------- */

const paragraph = {
  fontSize: "clamp(1rem, 3.5vw, 1.1rem)",
  lineHeight: 1.8,
  opacity: 0.85,
  marginBottom: "1.5rem",
};

export default Research;

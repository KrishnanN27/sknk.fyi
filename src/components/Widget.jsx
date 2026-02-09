import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Widget({ title, children }) {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 30 }}
      className="relative"
      style={{
        borderRadius: "22px",
        overflow: "hidden",

        // Glass background — airy
        background:
          theme === "dark"
            ? "rgba(255,255,255,0.025)"
            : "rgba(255,255,255,0.45)",

        // Soft border
        border:
          theme === "dark"
            ? "1px solid rgba(255,255,255,0.09)"
            : "1px solid rgba(0,0,0,0.045)",

        // Blur — reduced, balanced
        backdropFilter: theme === "dark" ? "blur(6px)" : "blur(9px)",
        WebkitBackdropFilter: theme === "dark" ? "blur(6px)" : "blur(9px)",

        // Inner highlight
        boxShadow:
          theme === "dark"
            ? "inset 0 1px 0 rgba(255,255,255,0.045)"
            : "inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
    >
      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background:
            theme === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
        }}
      />

      {/* Inner padding wrapper */}
      <div style={{ padding: "1.25rem" }}>
        {/* Header */}
        <div
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            opacity: 0.6,
            marginBottom: "0.9rem",
            paddingBottom: "0.5rem",
            borderBottom:
              theme === "dark"
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {title}
        </div>

        {/* Content */}
        <div
          style={{
            display: "block",
            paddingBottom: "0.4rem", // 👈 critical for rounded corners
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

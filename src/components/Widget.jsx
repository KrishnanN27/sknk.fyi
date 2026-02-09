import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Widget({ title, children }) {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 30 }}
      className="relative p-5"
      style={{
        borderRadius: "22px", // ✅ visible rounding
        overflow: "hidden", // ✅ clips corners
        background:
          theme === "dark"
            ? "rgba(255,255,255,0.04)"
            : "rgba(255,255,255,0.85)",
        border:
          theme === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.06)",
        backdropFilter: "blur(8px)",
        boxShadow:
          theme === "dark"
            ? "inset 0 1px 0 rgba(255,255,255,0.05)"
            : "inset 0 1px 0 rgba(255,255,255,0.4)",
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

      {children}
    </motion.div>
  );
}

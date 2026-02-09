import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Widget({ title, children }) {
  const { theme } = useTheme();

  const shadow =
    theme === "dark"
      ? "0 10px 40px rgba(0,0,0,0.35)"
      : "0 6px 18px rgba(30,35,45,0.08)";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
        color: "var(--text)",
        backdropFilter: "blur(18px)",
        boxShadow: shadow,
      }}
      className="relative rounded-2xl p-5"
    >
      {/* Header */}
      <div
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          opacity: 0.55,
          marginBottom: "0.75rem",
        }}
      >
        {title}
      </div>

      {children}
    </motion.div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import {
  Atom,
  Briefcase,
  Home,
  Mail,
  Moon,
  Sun,
  User,
  Image,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredPath, setHoveredPath] = useState(null);
  const [colonVisible, setColonVisible] = useState(true);

  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------- CLOCK ---------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setColonVisible((v) => !v); // blink colon
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/about", icon: User, label: "About" },
    { path: "/portfolio", icon: Briefcase, label: "Portfolio" },
    { path: "/research", icon: Atom, label: "Research" },
    { path: "/gallery", icon: Image, label: "Gallery" },
    { path: "/contact", icon: Mail, label: "Contact" },
  ];

  const timeStr = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Denver",
  });
  const [hh, mm] = timeStr.split(":");

  return (
    <>
      {/* ---------------- NAVBAR ---------------- */}
      <nav className="navbar-container">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.15rem",
            padding: "0.45rem",
            background: "var(--glass-bg)",
            color: "var(--text)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid var(--glass-border)",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            position: "relative",
          }}
        >
          {navItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isHovered = hoveredPath === item.path;

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                onHoverStart={() => setHoveredPath(item.path)}
                onHoverEnd={() => setHoveredPath(null)}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.055,
                  duration: 0.4,
                  ease: [0.23, 1, 0.32, 1],
                }}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.7rem 1.1rem",
                  background: "transparent",
                  color: "inherit",
                  border: "none",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 600 : 500,
                  zIndex: 1,
                  outline: "none",
                }}
              >
                {/* Hover pill */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "14px",
                      background:
                        theme === "dark"
                          ? "rgba(255,255,255,0.07)"
                          : "rgba(0,0,0,0.04)",
                      zIndex: -1,
                    }}
                  />
                )}

                {/* Active pill */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "14px",
                      background:
                        theme === "dark"
                          ? "rgba(255,255,255,0.16)"
                          : "rgba(0,0,0,0.06)",
                      boxShadow:
                        theme === "dark"
                          ? "inset 0 1px 0 rgba(255,255,255,0.25)"
                          : "inset 0 1px 0 rgba(255,255,255,0.6)",
                      zIndex: -1,
                    }}
                  />
                )}

                {/* Icon with spring scale when active */}
                <motion.span
                  animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.8 : 2.3} />
                </motion.span>

                <span className="nav-label">{item.label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </nav>

      {/* ---------------- TIME + THEME ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.6rem 1.1rem",
          background: "var(--glass-bg)",
          color: "var(--text)",
          border: "1px solid var(--glass-border)",
          borderRadius: "18px",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          fontWeight: 600,
          fontSize: "0.9rem",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.03em",
        }}
      >
        {/* THEME TOGGLE with icon rotation */}
        <motion.button
          onClick={toggleTheme}
          whileTap={{ scale: 0.9 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            background:
              theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
            color: "inherit",
            border: "1px solid var(--glass-border)",
            borderRadius: "12px",
            cursor: "pointer",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={theme}
              initial={{ y: 16, opacity: 0, rotate: -30 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -16, opacity: 0, rotate: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ display: "flex" }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Blinking clock */}
        <span>
          {hh}
          <motion.span
            animate={{ opacity: colonVisible ? 1 : 0.15 }}
            transition={{ duration: 0.1 }}
          >
            :
          </motion.span>
          {mm}
        </span>
        <span
          style={{ opacity: 0.5, fontSize: "0.7rem", letterSpacing: "0.08em" }}
        >
          MST
        </span>
      </motion.div>

      {/* ---------------- RESPONSIVE CSS ---------------- */}
      <style>{`
        .navbar-container {
          position: fixed;
          top: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
        }

        @media (max-width: 768px) {
          .navbar-container {
            top: auto;
            bottom: 1.5rem;
            border-top: 1px solid var(--glass-border);
          }

          .nav-label {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;

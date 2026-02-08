// Navbar.jsx
import { useState, useEffect } from "react";
import { Home, User, Briefcase, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [currentTime, setCurrentTime] = useState(new Date());
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "work", icon: Briefcase, label: "Work" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  return (
    <>
      <style>{`
        .navbar-container {
          position: fixed;
          top: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
        }

        .nav-button {
          position: relative;
          overflow: hidden;
        }

        .nav-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            45deg,
            rgba(160, 100, 255, 0.25),
            rgba(100, 150, 255, 0.25)
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-button.active::before {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .navbar-container {
            top: auto;
            bottom: 1.5rem;
          }
          .nav-label {
            display: none;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.5rem",
            background: "var(--glass-bg)",
            color: "var(--text)", // ✅ KEY LINE
            backdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid var(--glass-border)",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`nav-button ${isActive ? "active" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.7rem 1.1rem",
                  background: isActive
                    ? "rgba(255,255,255,0.15)"
                    : "transparent",
                  color: "inherit", // ✅ inherit text color
                  border: "none",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 600 : 500,
                  transition: "all 0.25s ease",
                  position: "relative",
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={2.5}
                  color="currentColor" // ✅ icon follows text
                />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              marginLeft: 4,
              background: "rgba(255,255,255,0.12)",
              color: "inherit", // ✅ inherit
              border: "1px solid var(--glass-border)",
              borderRadius: 14,
              cursor: "pointer",
            }}
          >
            {theme === "dark" ? (
              <Sun size={18} color="currentColor" />
            ) : (
              <Moon size={18} color="currentColor" />
            )}
          </button>
        </div>
      </nav>

      {/* TIME */}
      <div
        style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          zIndex: 1000,
          padding: "0.75rem 1.2rem",
          background: "var(--glass-bg)",
          color: "var(--text)", // ✅ switches correctly
          border: "1px solid var(--glass-border)",
          borderRadius: "18px",
          backdropFilter: "blur(20px)",
          fontWeight: 600,
          fontSize: "0.9rem",
        }}
      >
        {currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/Denver",
        })}{" "}
        <span style={{ opacity: 0.6, fontSize: "0.7rem" }}>MST</span>
      </div>
    </>
  );
};

export default Navbar;

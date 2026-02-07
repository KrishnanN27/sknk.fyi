// Navbar.jsx
import { useState, useEffect } from "react";
import {
  Home,
  User,
  Briefcase,
  FileText,
  Image,
  MessageCircle,
  Mail,
  Sun,
  Moon,
} from "lucide-react";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "work", icon: Briefcase, label: "Work" },
    { id: "blog", icon: FileText, label: "Blog" },
    { id: "gallery", icon: Image, label: "Gallery" },
    { id: "chat", icon: MessageCircle, label: "AI Chat" },
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
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(160, 100, 255, 0.3), rgba(100, 150, 255, 0.3));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-button.active::before {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .navbar-container {
            top: auto !important;
            bottom: 1.5rem !important;
          }
          .nav-label {
            display: none;
          }
          .nav-button {
            padding: 0.7rem !important;
          }
        }

        @media (max-width: 480px) {
          .theme-toggle {
            width: 36px !important;
            height: 36px !important;
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .time-separator {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.5rem",
            background: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            borderRadius: "20px",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
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
                    ? "rgba(255, 255, 255, 0.12)"
                    : "transparent",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? "600" : "500",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  whiteSpace: "nowrap",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={2.5}
                  style={{
                    filter: isActive
                      ? "drop-shadow(0 0 8px rgba(160, 100, 255, 0.6))"
                      : "none",
                  }}
                />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}

          {/* Theme toggle button */}
          <button
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              marginLeft: "0.25rem",
              background: "rgba(255, 255, 255, 0.08)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "14px",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {isDark ? (
              <Sun size={18} strokeWidth={2.5} />
            ) : (
              <Moon size={18} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </nav>

      {/* Time Display - Premium design */}
      <div
        style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.25rem",
          padding: "0.85rem 1.35rem",
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          borderRadius: "20px",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            fontFamily: "'Roboto Mono', monospace",
            letterSpacing: "0.5px",
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          {currentTime
            .toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "America/Denver",
            })
            .split(":")
            .map((part, index) => (
              <span key={index}>
                {part}
                {index === 0 && (
                  <span className="time-separator" style={{ opacity: 0.7 }}>
                    :
                  </span>
                )}
              </span>
            ))}
        </div>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: "600",
            opacity: 0.6,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            background:
              "linear-gradient(90deg, rgba(160, 100, 255, 0.8), rgba(100, 150, 255, 0.8))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Mountain Time
        </div>
      </div>
    </>
  );
};

export default Navbar;

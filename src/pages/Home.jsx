import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const heroRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    import("beautiful-backgrounds").then(() => {
      if (!heroRef.current) return;

      // Remove old ribbons
      heroRef.current
        .querySelectorAll("bb-ambient-ribbon")
        .forEach((n) => n.remove());

      const ribbon = document.createElement("bb-ambient-ribbon");

      if (theme === "dark") {
        ribbon.setAttribute("ribbon-count", "8");
        ribbon.setAttribute("ribbon-width", "100");
        ribbon.setAttribute("ribbon-rotation", "159");

        ribbon.setAttribute("ribbon-hue-start", "260");
        ribbon.setAttribute("ribbon-hue-end", "290");

        ribbon.setAttribute("ribbon-saturation-start", "80");
        ribbon.setAttribute("ribbon-saturation-end", "70");

        ribbon.setAttribute("ribbon-lightness-start", "45");
        ribbon.setAttribute("ribbon-lightness-end", "35");

        ribbon.setAttribute("ribbon-amplitude", "0.5");
        ribbon.setAttribute("ribbon-speed-min", "0.001");
        ribbon.setAttribute("ribbon-speed-max", "0.002");

        ribbon.setAttribute("ribbon-line-width", "0.3");
        ribbon.setAttribute("ribbon-line-opacity", "0.08");

        ribbon.setAttribute("bg-colors", "#050208, #0a0410");
        ribbon.setAttribute("bg-angle", "90");
        ribbon.setAttribute("trail-opacity", "0.05");
      } else {
        ribbon.setAttribute("ribbon-count", "8");
        ribbon.setAttribute("ribbon-width", "100");
        ribbon.setAttribute("ribbon-rotation", "159");

        ribbon.setAttribute("ribbon-hue-start", "310");
        ribbon.setAttribute("ribbon-hue-end", "280");

        ribbon.setAttribute("ribbon-saturation-start", "70");
        ribbon.setAttribute("ribbon-saturation-end", "60");

        ribbon.setAttribute("ribbon-lightness-start", "70");
        ribbon.setAttribute("ribbon-lightness-end", "65");

        ribbon.setAttribute("ribbon-amplitude", "0.5");
        ribbon.setAttribute("ribbon-speed-min", "0.001");
        ribbon.setAttribute("ribbon-speed-max", "0.002");

        ribbon.setAttribute("ribbon-line-width", "0.3");
        ribbon.setAttribute("ribbon-line-opacity", "0.10");

        ribbon.setAttribute("bg-colors", "#ffffff, #ffffff");
        ribbon.setAttribute("bg-angle", "90");
        ribbon.setAttribute("trail-opacity", "0.05");
      }

      heroRef.current.insertBefore(ribbon, heroRef.current.firstChild);
    });
  }, [theme]);

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Add Navbar */}
      <Navbar />

      {/* Global styles */}
      <style>{`
        bb-ambient-ribbon {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 0 !important;
          pointer-events: none !important;
          background: var(--bg) !important;
        }

        bb-ambient-ribbon canvas {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          background: transparent !important;
        }
      `}</style>

      {/* Hero Section with Background */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            color: "var(--text)",
            padding: "2rem",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
              fontWeight: "700",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
              color: "var(--text)",
            }}
          >
            Sowndayra Krishnan
          </h1>
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "1.5rem",
              fontWeight: "400",
              color: "color-mix(in srgb, var(--text) 80%, transparent)",
              letterSpacing: "-0.01em",
            }}
          >
            Computer Science PhD · Research Scientist
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              marginBottom: "2.5rem",
              opacity: 0.75,
              lineHeight: "1.7",
              fontWeight: "400",
              maxWidth: "650px",
              margin: "0 auto 2.5rem",
            }}
          >
            Exploring the frontiers of machine learning and distributed systems.
            Building elegant solutions to complex problems.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "0.9rem 2.2rem",
                fontSize: "1rem",
                cursor: "pointer",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                color: "var(--text)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                fontWeight: "500",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--glass-bg)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              View Research
            </button>
            <button
              style={{
                padding: "0.9rem 2.2rem",
                fontSize: "1rem",
                cursor: "pointer",
                background:
                  "linear-gradient(135deg, rgba(160, 100, 255, 0.3), rgba(100, 150, 255, 0.3))",
                border: "1px solid rgba(180, 130, 255, 0.5)",
                color: "var(--text)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                fontWeight: "500",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(160, 100, 255, 0.4), rgba(100, 150, 255, 0.4))";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(160, 100, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(160, 100, 255, 0.3), rgba(100, 150, 255, 0.3))";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        style={{
          padding: "6rem 2rem",
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          color: "var(--text)",
        }}
      >
        <h2
          style={{
            marginBottom: "2rem",
            fontSize: "2.5rem",
            fontWeight: "700",
            letterSpacing: "-0.02em",
          }}
        >
          About Me
        </h2>
        <p
          style={{
            lineHeight: "1.8",
            opacity: 0.85,
            fontSize: "1.1rem",
            fontWeight: "400",
          }}
        >
          I'm a researcher passionate about pushing the boundaries of artificial
          intelligence and distributed computing. My work focuses on developing
          scalable algorithms and novel architectures that bridge theory and
          practice.
        </p>
      </section>
    </div>
  );
};

export default Home;

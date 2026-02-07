import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Dynamically import the component
    import("beautiful-backgrounds").then(({ BbAmbientRibbon }) => {
      if (
        heroRef.current &&
        !heroRef.current.querySelector("bb-ambient-ribbon")
      ) {
        const ribbon = document.createElement("bb-ambient-ribbon");

        // Ultra-light, delicate Midnight Aura
        ribbon.setAttribute("ribbon-count", "5");
        ribbon.setAttribute("ribbon-width", "150");
        ribbon.setAttribute("ribbon-rotation", "45");
        ribbon.setAttribute("ribbon-hue-start", "260");
        ribbon.setAttribute("ribbon-hue-end", "280");
        ribbon.setAttribute("ribbon-saturation-start", "85");
        ribbon.setAttribute("ribbon-saturation-end", "65");
        ribbon.setAttribute("ribbon-lightness-start", "50");
        ribbon.setAttribute("ribbon-lightness-end", "35");
        ribbon.setAttribute("ribbon-amplitude", "0.7");
        ribbon.setAttribute("ribbon-speed-min", "0.001");
        ribbon.setAttribute("ribbon-speed-max", "0.003");
        ribbon.setAttribute("ribbon-line-width", "0.8");
        ribbon.setAttribute("ribbon-line-opacity", "0.08");

        heroRef.current.insertBefore(ribbon, heroRef.current.firstChild);
      }
    });
  }, []);

  return (
    <div style={{ background: "#050208" }}>
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
        }

        bb-ambient-ribbon canvas {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
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
            color: "white",
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
              background:
                "linear-gradient(135deg, #fff 0%, rgba(160, 100, 255, 0.9) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Hi, I'm Your Name 👋
          </h1>
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "1.5rem",
              fontWeight: "400",
              color: "rgba(255, 255, 255, 0.8)",
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
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "white",
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
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
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
                color: "white",
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
          color: "white",
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

      {/* Skills Section */}
      <section
        style={{
          padding: "6rem 2rem",
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          color: "white",
        }}
      >
        <h2
          style={{
            marginBottom: "2.5rem",
            fontSize: "2.5rem",
            fontWeight: "700",
            letterSpacing: "-0.02em",
          }}
        >
          Research Interests
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {[
            "Machine Learning",
            "Distributed Systems",
            "Computer Vision",
            "Natural Language Processing",
            "Algorithm Design",
            "Neural Architecture Search",
          ].map((skill) => (
            <li
              key={skill}
              style={{
                padding: "1.5rem",
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                transition: "all 0.3s ease",
                fontWeight: "500",
                fontSize: "1rem",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.borderColor = "rgba(160, 100, 255, 0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      {/* Publications/Projects Preview */}
      <section
        style={{
          padding: "6rem 2rem",
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          color: "white",
          paddingBottom: "8rem",
        }}
      >
        <h2
          style={{
            marginBottom: "2.5rem",
            fontSize: "2.5rem",
            fontWeight: "700",
            letterSpacing: "-0.02em",
          }}
        >
          Featured Publications
        </h2>
        <div style={{ display: "grid", gap: "2rem" }}>
          <div
            style={{
              padding: "2.5rem",
              background: "rgba(255, 255, 255, 0.04)",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.borderColor = "rgba(160, 100, 255, 0.3)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <h3
              style={{
                marginBottom: "1rem",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
            >
              Novel Approach to Distributed Learning
            </h3>
            <p
              style={{
                opacity: 0.75,
                lineHeight: "1.7",
                marginBottom: "1rem",
              }}
            >
              Published in NeurIPS 2024. A scalable framework for federated
              learning with differential privacy guarantees.
            </p>
            <div
              style={{
                display: "inline-block",
                padding: "0.4rem 1rem",
                background: "rgba(160, 100, 255, 0.2)",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontFamily: "'Roboto Mono', monospace",
                fontWeight: "500",
              }}
            >
              NeurIPS 2024
            </div>
          </div>

          <div
            style={{
              padding: "2.5rem",
              background: "rgba(255, 255, 255, 0.04)",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.borderColor = "rgba(160, 100, 255, 0.3)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <h3
              style={{
                marginBottom: "1rem",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
            >
              Efficient Neural Architecture Search
            </h3>
            <p
              style={{
                opacity: 0.75,
                lineHeight: "1.7",
                marginBottom: "1rem",
              }}
            >
              ICML 2023. Reducing computational costs in NAS by 10x through
              gradient-based optimization.
            </p>
            <div
              style={{
                display: "inline-block",
                padding: "0.4rem 1rem",
                background: "rgba(100, 150, 255, 0.2)",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontFamily: "'Roboto Mono', monospace",
                fontWeight: "500",
              }}
            >
              ICML 2023
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

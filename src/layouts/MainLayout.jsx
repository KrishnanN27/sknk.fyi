import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { useTheme } from "../context/ThemeContext";

const MainLayout = () => {
  const bgRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!bgRef.current) return;

    const bg = bgRef.current;
    bg.innerHTML = "";
    bg.style.background = "var(--bg)";
    bg.style.overflow = "hidden";

    const hasMouse = window.matchMedia("(pointer: fine)").matches;
    const isSmallScreen = window.innerWidth < 1024;

    // ---------- DESKTOP INTERACTIVE ----------
    if (hasMouse && !isSmallScreen) {
      const ORB_COUNT = 5;
      const orbs = [];

      const mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };

      const state = [];

      for (let i = 0; i < ORB_COUNT; i++) {
        const orb = document.createElement("div");

        const size = Math.min(window.innerWidth * (0.55 - i * 0.07), 900);

        orb.style.position = "absolute";
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.borderRadius = "50%";
        orb.style.pointerEvents = "none";
        orb.style.transform = "translate(-50%, -50%)";
        orb.style.willChange = "transform";

        if (theme === "dark") {
          orb.style.background = `
    radial-gradient(circle,
      rgba(140,90,255,${0.32 - i * 0.05}) 0%,
      rgba(100,120,255,${0.26 - i * 0.05}) 40%,
      rgba(70,80,170,${0.18 - i * 0.04}) 60%,
      transparent 80%)
  `;
          orb.style.filter = "blur(140px)";
        } else {
          orb.style.background = `
    radial-gradient(circle,
      rgba(95,110,255,${0.55 - i * 0.07}) 0%,
      rgba(145,130,255,${0.45 - i * 0.06}) 35%,
      rgba(120,190,255,${0.38 - i * 0.05}) 55%,
      transparent 80%)
  `;
          orb.style.filter = "blur(120px)";
        }
        bg.appendChild(orb);

        orbs.push(orb);

        state.push({
          x: mouse.x,
          y: mouse.y,
          driftX: Math.random() * 2 - 1,
          driftY: Math.random() * 2 - 1,
        });
      }

      const move = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };

      window.addEventListener("mousemove", move);

      let frame;

      const animate = () => {
        state.forEach((p, i) => {
          const delay = 0.04 - i * 0.006;

          p.x += (mouse.x - p.x) * delay;
          p.y += (mouse.y - p.y) * delay;

          // subtle floating drift
          p.x += p.driftX * 0.05;
          p.y += p.driftY * 0.05;

          orbs[i].style.left = `${p.x}px`;
          orbs[i].style.top = `${p.y}px`;
        });

        frame = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("mousemove", move);
      };
    }

    // ---------- MOBILE / TABLET STATIC ----------
    const ambient = document.createElement("div");

    ambient.style.position = "absolute";
    ambient.style.inset = "0";
    ambient.style.pointerEvents = "none";

    if (theme === "dark") {
      ambient.style.background = `
      radial-gradient(circle at 30% 35%, rgba(120,0,255,0.35), transparent 55%),
      radial-gradient(circle at 70% 65%, rgba(0,120,255,0.25), transparent 60%),
      radial-gradient(circle at 50% 80%, rgba(160,80,255,0.18), transparent 65%)
    `;
    } else {
      ambient.style.background = `
  radial-gradient(circle at 30% 40%, rgba(95,110,255,0.40), transparent 60%),
  radial-gradient(circle at 75% 70%, rgba(150,130,255,0.32), transparent 65%),
  radial-gradient(circle at 50% 80%, rgba(120,190,255,0.25), transparent 70%)
`;
    }

    ambient.style.filter = "blur(90px)";
    ambient.style.opacity = "0.9";

    bg.appendChild(ambient);
  }, [theme]);
  return (
    <>
      {/* Background host */}
      <div
        ref={bgRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Scroll container */}
      <main
        id="scroll-container"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
        }}
      >
        <ScrollToTop />
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default MainLayout;

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

  // ---------- DESKTOP (interactive) ----------
  if (hasMouse && !isSmallScreen) {
    const orb = document.createElement("div");
    orb.style.position = "absolute";
    orb.style.borderRadius = "50%";
    orb.style.pointerEvents = "none";
    orb.style.transform = "translate(-50%, -50%)";
    orb.style.willChange = "transform";
    orb.style.transition = "transform 0.15s ease-out";

    const size = Math.min(window.innerWidth * 0.65, 1100);
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;

    if (theme === "dark") {
      orb.style.background =
        "radial-gradient(circle, rgba(120,0,255,0.7) 0%, rgba(0,120,255,0.5) 40%, transparent 75%)";
      orb.style.filter = "blur(120px)";
      orb.style.opacity = "0.8";
    } else {
      orb.style.background =
        "radial-gradient(circle, rgba(90,100,255,0.65) 0%, rgba(140,120,255,0.5) 35%, rgba(120,180,255,0.4) 55%, transparent 80%)";
      orb.style.filter = "blur(130px)";
      orb.style.opacity = "0.9";
    }

    bg.appendChild(orb);

    const move = (e) => {
      orb.style.left = `${e.clientX}px`;
      orb.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }

  // ---------- TABLET & MOBILE (designed static gradient) ----------
  const ambient = document.createElement("div");
  ambient.style.position = "absolute";
  ambient.style.inset = "0";
  ambient.style.pointerEvents = "none";

  if (theme === "dark") {
    ambient.style.background = `
      radial-gradient(circle at 30% 35%, rgba(120,0,255,0.35), transparent 55%),
      radial-gradient(circle at 70% 65%, rgba(0,120,255,0.25), transparent 60%)
    `;
  } else {
    ambient.style.background = `
      radial-gradient(circle at 30% 40%, rgba(90,100,255,0.35), transparent 60%),
      radial-gradient(circle at 75% 70%, rgba(160,140,255,0.25), transparent 65%)
    `;
  }

  ambient.style.filter = "blur(80px)";
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

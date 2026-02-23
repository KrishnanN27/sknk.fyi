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

  const orb = document.createElement("div");
  orb.style.position = "absolute";
  orb.style.width = "650px";
  orb.style.height = "650px";
  orb.style.borderRadius = "50%";
  orb.style.pointerEvents = "none";
  orb.style.transform = "translate(-50%, -50%)";
  orb.style.willChange = "transform";
  orb.style.transition = "transform 0.15s ease-out";

  if (theme === "dark") {
    orb.style.background =
      "radial-gradient(circle, rgba(120,0,255,0.7) 0%, rgba(0,120,255,0.5) 40%, transparent 75%)";
    orb.style.filter = "blur(110px)";
    orb.style.opacity = "0.8";
  } else {
    // Stronger light mode glow
    orb.style.background =
      "radial-gradient(circle, rgba(90,100,255,0.6) 0%, rgba(140,120,255,0.45) 35%, rgba(120,180,255,0.35) 55%, transparent 75%)";
    orb.style.filter = "blur(90px)";
    orb.style.opacity = "0.9";
  }

  bg.appendChild(orb);

  const move = (e) => {
    orb.style.left = `${e.clientX}px`;
    orb.style.top = `${e.clientY}px`;
  };

  window.addEventListener("mousemove", move);

  return () => {
    window.removeEventListener("mousemove", move);
  };
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

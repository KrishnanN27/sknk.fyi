import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

const MainLayout = () => {
  const bgRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!bgRef.current) return;
    // 🔹 MOBILE: cool ambient gradient
    if (isMobile) {
      bgRef.current.innerHTML = "";
      bgRef.current.style.background =
        theme === "dark"
          ? `
        linear-gradient(
          135deg,
          #06040a 0%,
          #0d0922 45%,
          #06040a 100%
        )
      `
          : `
  linear-gradient(
    180deg,
    #e9e8ee 0%,
    #dddce3 50%,
    #e9e8ee 100%
  )
`;
      return;
    }

    // 🔹 DESKTOP: your existing ribbon (unchanged)
    bgRef.current.style.background = "none";

    import("beautiful-backgrounds").then(() => {
      if (!bgRef.current) return;

      bgRef.current
        .querySelectorAll("bb-ambient-ribbon")
        .forEach((n) => n.remove());

      const ribbon = document.createElement("bb-ambient-ribbon");

      if (theme === "dark") {
        ribbon.setAttribute("ribbon-count", "3");
        ribbon.setAttribute("ribbon-hue-start", "260");
        ribbon.setAttribute("ribbon-hue-end", "260");
        ribbon.setAttribute("ribbon-lightness-start", "36");
        ribbon.setAttribute("ribbon-lightness-end", "32");
        ribbon.setAttribute("ribbon-line-opacity", "0.03");
        ribbon.setAttribute("bg-colors", "#06040a, #090611");
      } else {
        ribbon.setAttribute("ribbon-count", "3");
        ribbon.setAttribute("ribbon-hue-start", "295");
        ribbon.setAttribute("ribbon-hue-end", "295");
        ribbon.setAttribute("ribbon-lightness-start", "54");
        ribbon.setAttribute("ribbon-lightness-end", "50");
        ribbon.setAttribute("ribbon-line-opacity", "0.025");
        ribbon.setAttribute("bg-colors", "#ece8e3, #e7e3de");
      }

      bgRef.current.prepend(ribbon);
    });
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

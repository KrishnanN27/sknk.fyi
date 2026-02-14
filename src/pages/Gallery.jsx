import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ---------- AUTO LOAD ---------- */

const portraitModules = import.meta.glob(
  "../assets/gallery/portraits/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

const landscapeModules = import.meta.glob(
  "../assets/gallery/landscapes/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

const images = [
  ...Object.values(portraitModules),
  ...Object.values(landscapeModules),
];

/* ---------- COMPONENT ---------- */

const Gallery = () => {
  const [active, setActive] = useState(null);

  return (
    <section
      style={{
        minHeight: "100vh",
        paddingTop: "clamp(6.5rem, 12vh, 8.5rem)",
        paddingBottom: "clamp(4rem, 8vh, 6rem)",
        paddingInline: "clamp(1.5rem, 5vw, 3rem)",
        maxWidth: "1400px",
        margin: "0 auto",
        color: "var(--text)",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
          fontWeight: 700,
          marginBottom: "3rem",
        }}
      >
        Gallery
      </motion.h1>

      {/* ---------- MASONRY GRID ---------- */}
      <div
        style={{
          columnCount:
            window.innerWidth > 1000 ? 3 : window.innerWidth > 600 ? 2 : 1,
          columnGap: "1.5rem",
        }}
      >
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            loading="lazy"
            onClick={() => setActive(src)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ scale: 1.02 }}
            style={{
              width: "100%",
              marginBottom: "1.5rem",
              borderRadius: "18px",
              cursor: "pointer",
              breakInside: "avoid",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            }}
          />
        ))}
      </div>

      {/* ---------- FULLSCREEN VIEWER ---------- */}
      <AnimatePresence>
        {active && (
          <motion.div
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2000,
              cursor: "zoom-out",
              padding: "2rem",
            }}
          >
            <motion.img
              src={active}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                maxWidth: "95%",
                maxHeight: "90%",
                borderRadius: "16px",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

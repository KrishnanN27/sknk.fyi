import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

/* ---------- AUTO LOAD ---------- */

const portraitModules = import.meta.glob(
  "../assets/gallery/portraits/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

const landscapeModules = import.meta.glob(
  "../assets/gallery/landscapes/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

const formatImages = (modules) =>
  Object.values(modules).map((src) => ({ src }));

const images = [
  ...formatImages(portraitModules),
  ...formatImages(landscapeModules),
];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const close = () => setActiveIndex(null);

  const next = useCallback(() => {
    setActiveIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, []);

  /* Keyboard + scroll lock */
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, next, prev]);

  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "90px",
        padding: "clamp(3rem, 6vh, 6rem) 1.2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns:
            window.innerWidth > 1000 ? "260px 1fr" : "1fr",
          gap: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        {/* ---------- QUOTE ---------- */}

        <div
          style={{
            position: window.innerWidth > 1000 ? "sticky" : "relative",
            top: "120px",
            alignSelf: "start",
          }}
        >
    <blockquote
  style={{
    fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
    fontFamily: "'Crimson Pro', 'Crimson Text', 'Libre Baskerville', serif",
    lineHeight: 1.7,
    margin: 0,
  }}
>
  "Medicine, law, business, engineering — these are noble pursuits and
  necessary to sustain life, but{" "}
 <span style={{ color: "#8b5cf6", fontFamily: "inherit" }}>
  poetry, beauty, romance, love —
</span>
  these are what we stay alive for."
</blockquote>
          <footer
            style={{
              marginTop: "1rem",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.55,
            }}
          >
            — Dead Poets Society
          </footer>
        </div>

        {/* ---------- MASONRY GRID ---------- */}

        <motion.div
          layout
          style={{
            columnCount:
              window.innerWidth > 1100
                ? 3
                : window.innerWidth > 700
                ? 2
                : 1,
            columnGap: "1.5rem",
          }}
        >
          <AnimatePresence>
            {images.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                style={{
                  breakInside: "avoid",
                  marginBottom: "1.5rem",
                  borderRadius: "14px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => setActiveIndex(i)}
              >
                <motion.img
                  src={img.src}
                  loading="lazy"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ---------- LIGHTBOX ---------- */}

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.9)",
              backdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999,
              padding: "2rem",
            }}
          >
            <motion.img
              key={images[activeIndex].src}
              src={images[activeIndex].src}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) next();
                if (info.offset.x > 100) prev();
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: "12px",
              }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              style={arrowStyle("left")}
            >
              ‹
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              style={arrowStyle("right")}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const arrowStyle = (side) => ({
  position: "fixed",
  top: "50%",
  [side]: "40px",
  transform: "translateY(-50%)",
  fontSize: "2rem",
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
  opacity: 0.7,
  transition: "0.3s ease",
});

export default Gallery;

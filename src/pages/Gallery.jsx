import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/* ---------- AUTO LOAD + CATEGORIZE ---------- */

const portraitModules = import.meta.glob(
  "../assets/gallery/portraits/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

const landscapeModules = import.meta.glob(
  "../assets/gallery/landscapes/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

const formatImages = (modules, category) =>
  Object.entries(modules).map(([path, src]) => {
    const name = path.split("/").pop().split(".")[0];
    const caption = name.replace(/[-_]/g, " ");
    return { src, caption, category };
  });

const images = [
  ...formatImages(portraitModules, "Portraits"),
  ...formatImages(landscapeModules, "Landscapes"),
];

/* ---------- COMPONENT ---------- */
const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
          gridTemplateColumns: isMobile ? "1fr" : "260px minmax(0, 1fr)",
          gap: "clamp(2rem, 4vw, 4rem)",
          alignItems: "start",
        }}
      >
        {/* ---------- QUOTE ---------- */}

        <div
          style={{
            position: isMobile ? "relative" : "sticky",
            top: isMobile ? "0" : "120px",
            alignSelf: "start",
            marginBottom: isMobile ? "2rem" : "0",
          }}
        >
          <div style={{ maxWidth: isMobile ? "100%" : "240px" }}>
            <blockquote
              style={{
                fontSize: isMobile
                  ? "clamp(1.2rem, 4.5vw, 1.5rem)" // mobile
                  : "clamp(1.05rem, 1.4vw, 1.3rem)", // desktop (slightly larger but controlled)
                fontFamily:
                  "'Crimson Pro', 'Crimson Text', 'Libre Baskerville', serif",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              “Medicine, law, business, engineering — these are noble pursuits
              and necessary to sustain life, but{" "}
              <span
                style={{
                  color: "#8b5cf6",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  fontStyle: "inherit",
                  letterSpacing: "inherit",
                  lineHeight: "inherit",
                }}
              >
                poetry, beauty, romance, love —
              </span>{" "}
              these are what we stay alive for.”
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
        </div>

        {/* ---------- GALLERY GRID ---------- */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
            gap: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              style={{
                overflow: "hidden",
                borderRadius: "14px",
              }}
            >
              <motion.img
                src={img.src}
                loading="lazy"
                onClick={() => setActiveIndex(i)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.35 }}
                style={{
                  width: "100%",
                  aspectRatio: "4 / 5",
                  objectFit: "cover",
                  display: "block",
                  cursor: "pointer",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

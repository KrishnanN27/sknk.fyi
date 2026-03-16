import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

/* ---------- AUTO LOAD ---------- */

const portraitModules = import.meta.glob(
  "../assets/gallery/portraits/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);
const landscapeModules = import.meta.glob(
  "../assets/gallery/landscapes/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);
const formatImages = (modules) =>
  Object.values(modules).map((src) => ({ src }));
const images = [
  ...formatImages(portraitModules),
  ...formatImages(landscapeModules),
];

/* ---------- HOOKS ---------- */

const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
};

/* ---------- SKELETON TILE ---------- */

const SkeletonTile = () => (
  <div style={s.skeletonWrapper}>
    <div style={s.skeletonBase}>
      <div style={s.shimmer} />
    </div>
    <style>{shimmerKeyframes}</style>
  </div>
);

const shimmerKeyframes = `
  @keyframes shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

/* ---------- GALLERY ITEM ---------- */

const GalleryItem = ({ img, index, onOpen, isHovered, onHover, onLeave }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={s.item}
      onClick={() => ready && onOpen(index)}
      onMouseEnter={() => ready && onHover(index)}
      onMouseLeave={onLeave}
    >
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={s.skeletonOverlay}
          >
            <SkeletonTile />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src={img.src}
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{
          opacity: ready ? 1 : 0,
          scale: ready && isHovered ? 1.05 : 1,
          filter:
            ready && isHovered
              ? "brightness(1.08) saturate(1.1)"
              : "brightness(0.95) saturate(0.9)",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ ...s.img, pointerEvents: ready ? "auto" : "none" }}
      />
    </motion.div>
  );
};

/* ---------- LIGHTBOX ---------- */

const Lightbox = ({
  activeIndex,
  isMobile,
  close,
  next,
  prev,
  setActiveIndex,
}) => {
  const lightboxImgStyle = {
    maxWidth: isMobile ? "92vw" : "65vw",
    maxHeight: isMobile ? "70vh" : "68vh",
    objectFit: "contain",
    borderRadius: "10px",
    cursor: "grab",
    userSelect: "none",
  };

  return createPortal(
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div
          style={s.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
        >
          <button style={s.closeBtn} onClick={close}>
            ✕
          </button>

          <div style={s.counter}>
            <span style={s.counterCurrent}>
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span style={s.counterSep}>/</span>
            <span style={s.counterTotal}>
              {String(images.length).padStart(2, "0")}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.img
              key={images[activeIndex].src}
              src={images[activeIndex].src}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) next();
                if (info.offset.x > 60) prev();
              }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={lightboxImgStyle}
              onClick={(e) => e.stopPropagation()}
            />
          </AnimatePresence>

          {!isMobile && (
            <>
              <button
                style={s.arrowLeft}
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                ‹
              </button>
              <button
                style={s.arrowRight}
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                ›
              </button>
            </>
          )}

          <div style={s.dotStrip} onClick={(e) => e.stopPropagation()}>
            {images.map((_, i) => (
              <motion.div
                key={i}
                onClick={() => setActiveIndex(i)}
                animate={{
                  width: i === activeIndex ? 24 : 6,
                  background:
                    i === activeIndex ? "#8b5cf6" : "rgba(255,255,255,0.2)",
                }}
                transition={{ duration: 0.3 }}
                style={s.dot}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

/* ---------- COMPONENT ---------- */

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const width = useWindowWidth();

  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 900;
  const isDesktop = width >= 900;

  const cols = isDesktop ? 4 : isTablet ? 3 : 2;

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((p) => (p === images.length - 1 ? 0 : p + 1)),
    [],
  );
  const prev = useCallback(
    () => setActiveIndex((p) => (p === 0 ? images.length - 1 : p - 1)),
    [],
  );

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
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, next, prev]);

  const bodyStyle = {
    display: "grid",
    gridTemplateColumns: isDesktop
      ? "160px 1fr"
      : isTablet
        ? "140px 1fr"
        : "1fr",
    gap: isDesktop ? "3rem" : isTablet ? "2rem" : "1.5rem",
    alignItems: "start",
  };

  const sidebarStyle = {
    position: isDesktop || isTablet ? "sticky" : "relative",
    top: isDesktop || isTablet ? "120px" : "auto",
    ...(isMobile && { marginBottom: "0.5rem" }),
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap"
        rel="stylesheet"
      />

      <section style={s.root}>
        <div style={bodyStyle}>
          {/* ── SIDEBAR / TOP QUOTE ── */}
          <aside style={sidebarStyle}>
            <blockquote style={s.quoteText}>
              <span style={s.quoteNormal}>
                "Medicine, law, business, engineering — these are noble pursuits
                and necessary to sustain life, but{" "}
              </span>
              <span style={s.quoteEm}>
                poetry, beauty, romance, love — these are what we stay alive
                for."
              </span>
            </blockquote>
            <footer style={s.quoteFooter}>— Dead Poets Society</footer>
          </aside>

          {/* ── MASONRY ── */}
          <motion.div layout style={{ ...s.masonry, columnCount: cols }}>
            {images.map((img, i) => (
              <GalleryItem
                key={img.src}
                img={img}
                index={i}
                onOpen={setActiveIndex}
                isHovered={hoveredIndex === i}
                onHover={setHoveredIndex}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox portalled to document.body — escapes all CSS stacking contexts */}
      <Lightbox
        activeIndex={activeIndex}
        isMobile={isMobile}
        close={close}
        next={next}
        prev={prev}
        setActiveIndex={setActiveIndex}
      />
    </>
  );
};

/* ---------- STATIC STYLES ---------- */

const s = {
  root: {
    width: "100%",
    maxWidth: "1280px",
    margin: "0 auto",
    marginTop: "90px",
    padding: "clamp(2rem, 6vh, 5rem) clamp(1rem, 4vw, 3rem)",
  },
  quoteText: {
    fontFamily: "'Reenie Beanie', cursive",
    fontSize: "1.4rem",
    lineHeight: 1.75,
    margin: 0,
    fontWeight: 400,
    color: "inherit",
    borderLeft: "2px solid rgba(139,92,246,0.35)",
    paddingLeft: "0.9rem",
  },
  quoteNormal: {
    fontFamily: "'Reenie Beanie', cursive",
  },
  quoteEm: {
    fontFamily: "'Reenie Beanie', cursive",
    color: "#8b5cf6",
  },
  quoteFooter: {
    marginTop: "0.5rem",
    paddingLeft: "0.9rem",
    fontSize: "0.6rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    opacity: 0.4,
  },
  masonry: {
    columnGap: "0.6rem",
  },
  item: {
    breakInside: "avoid",
    marginBottom: "0.6rem",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    position: "relative",
    aspectRatio: "1 / 1",
  },
  img: {
    width: "100%",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    display: "block",
  },
  skeletonOverlay: {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    borderRadius: "8px",
    overflow: "hidden",
  },
  skeletonWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
  },
  skeletonBase: {
    width: "100%",
    height: "100%",
    background: "rgba(139, 92, 246, 0.06)",
    position: "relative",
    overflow: "hidden",
    borderRadius: "8px",
  },
  shimmer: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.12) 40%, rgba(255,255,255,0.08) 50%, rgba(139,92,246,0.12) 60%, transparent 100%)",
    animation: "shimmer 1.6s infinite",
    transform: "translateX(-100%)",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(139,92,246,0.18)",
    backdropFilter: "blur(1px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  overlayIcon: {
    fontSize: "1.4rem",
    color: "white",
    opacity: 0.9,
  },
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.92)",
    backdropFilter: "blur(24px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9998,
  },
  closeBtn: {
    position: "fixed",
    top: "1.2rem",
    right: "1.2rem",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.6)",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    fontSize: "0.8rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  counter: {
    position: "fixed",
    top: "1.4rem",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "baseline",
    gap: "0.4rem",
    zIndex: 9999,
  },
  counterCurrent: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#8b5cf6",
    fontVariantNumeric: "tabular-nums",
  },
  counterSep: {
    fontSize: "0.7rem",
    color: "rgba(255,255,255,0.2)",
  },
  counterTotal: {
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.35)",
    fontVariantNumeric: "tabular-nums",
  },
  arrowLeft: {
    position: "fixed",
    left: "clamp(0.75rem, 2vw, 2rem)",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "1.4rem",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "50%",
    width: "44px",
    height: "44px",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  arrowRight: {
    position: "fixed",
    right: "clamp(0.75rem, 2vw, 2rem)",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "1.4rem",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "50%",
    width: "44px",
    height: "44px",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  dotStrip: {
    position: "fixed",
    bottom: "1.5rem",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "5px",
    alignItems: "center",
    zIndex: 9999,
  },
  dot: {
    height: "6px",
    borderRadius: "999px",
    cursor: "pointer",
  },
};

export default Gallery;

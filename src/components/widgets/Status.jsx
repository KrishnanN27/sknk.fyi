import { useEffect, useState } from "react";

/* ---------------- GIF REGISTRY ---------------- */

const VISUALS = {
  about2crashout: "/src/assets/gifs/status/about2crashout.gif",
  crashingout: "/src/assets/gifs/status/crashingout.gif",
  codenowork: "/src/assets/gifs/status/codenowork.gif",
  researching: "/src/assets/gifs/status/researching.gif",
  writingresearchpaper: "/src/assets/gifs/status/writingresearchpaper.gif",
};

/* ---------------- STATUS MODES ---------------- */

const STATUS_MAP = {
  1: { text: "debugging code that worked yesterday", visual: "codenowork" },
  2: { text: "about to crash out", visual: "about2crashout" },
  3: { text: "writing a paper", visual: "writingresearchpaper" },
  4: { text: "deep in research", visual: "researching" },
  5: { text: "crashing out", visual: "crashingout" },
};

export default function Status() {
  const [state, setState] = useState(null);

  useEffect(() => {
    fetch("/status.json")
      .then((r) => r.json())
      .then(setState)
      .catch(() => {});
  }, []);

  if (!state) return null;

  const status = STATUS_MAP[state.active];
  if (!status) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {/* Status text */}
      <div
        style={{
          fontSize: "0.95rem",
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        {status.text}
      </div>

      {/* Visual */}
      <div
        style={{
          marginTop: "0.6rem",
          height: "96px",
          borderRadius: "14px",
          overflow: "hidden",
          opacity: 0.6,
          mixBlendMode: "luminosity",
          background: "rgba(255,255,255,0.03)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={VISUALS[status.visual]}
          alt=""
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            transform: "scale(1.15)", // 👈 key line
          }}
        />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

const VISUALS = {
  about2crashout: "/gifs/status/about2crashout.gif",
  crashingout: "/gifs/status/crashingout.gif",
  codenowork: "/gifs/status/codenowork.gif",
  researching: "/gifs/status/researching2.gif",
  writingresearchpaper: "/gifs/status/writingresearchpaper.gif",
};

const STATUS_MAP = {
  1: { text: "Debugging code that worked yesterday", visual: "codenowork" },
  2: { text: "About to crash out", visual: "about2crashout" },
  3: { text: "Writing a paper", visual: "writingresearchpaper" },
  4: { text: "Deep in research", visual: "researching" },
  5: { text: "Crashing out", visual: "crashingout" },
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
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div
        style={{
          fontFamily: "'Reenie Beanie', cursive",
          fontSize: "1.5rem",
          fontWeight: 400,
          lineHeight: 1.3,
          letterSpacing: "0.02em",
        }}
      >
        {status.text}
      </div>

      <div
        style={{
          width: "100%",
          maxHeight: "160px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <img
          src={VISUALS[status.visual]}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

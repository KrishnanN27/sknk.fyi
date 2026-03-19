import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import previewGif from "../../assets/gifs_pomo/42b4229a9ec3145edaa895b2415dd720.gif";

export default function PomodoroWidget() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const textMain = dark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.78)";
  const textMuted = dark ? "rgba(255,255,255,0.36)" : "rgba(0,0,0,0.36)";
  const border = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)";
  const bg = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";

  return (
    <motion.a
      href="/pomodoro"
      className="pw-root"
      whileTap={{ scale: 0.97 }}
      style={{
        textDecoration: "none",
        background: bg,
        border: `1px solid ${border}`,
      }}
    >
      <div className="pw-thumb" style={{ border: `1px solid ${border}` }}>
        <img src={previewGif} alt="" className="pw-gif" />
      </div>

      <div className="pw-text">
        <span className="pw-title" style={{ color: textMain }}>
          Focus Timer
        </span>
        <span className="pw-sub" style={{ color: textMuted }}>
          25 min · lofi sessions
        </span>
      </div>

      <svg
        className="pw-chevron"
        style={{ color: textMuted }}
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>

      <style>{`
        .pw-root {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.6rem 0.7rem;
          border-radius: 14px;
          cursor: pointer;
        }
        .pw-thumb {
          width: 54px; height: 54px;
          border-radius: 11px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .pw-gif {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .pw-text {
          display: flex; flex-direction: column;
          gap: 0.2rem; flex: 1;
        }
        .pw-title {
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.82rem; font-weight: 700;
        }
        .pw-sub {
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.7rem; font-weight: 500;
        }
        .pw-chevron { flex-shrink: 0; }
      `}</style>
    </motion.a>
  );
}

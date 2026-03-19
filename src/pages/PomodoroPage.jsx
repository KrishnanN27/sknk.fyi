import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

import gif1 from "../assets/gifs_pomo/014bb94863c0ae597d6f4be224128bdb.gif";
import gif2 from "../assets/gifs_pomo/42b4229a9ec3145edaa895b2415dd720.gif";
import gif3 from "../assets/gifs_pomo/570ca09aa7450b886da8551039a0a91f.gif";
import gif4 from "../assets/gifs_pomo/5fbe1685b1f7d617361fdb63e0c94a7e.gif";
import gif5 from "../assets/gifs_pomo/7d727a282731ddcda200907e962e7917.gif";
import gif6 from "../assets/gifs_pomo/a4f410c09bb95585a837c51364923bcd.gif";

const GIFS = [gif1, gif2, gif3, gif4, gif5, gif6];

const GIF_CREDITS = [
  { artist: "unknown artist", source: "found via Google" },
  { artist: "unknown artist", source: "found via Google" },
  { artist: "unknown artist", source: "found via Google" },
  { artist: "unknown artist", source: "found via Google" },
  { artist: "unknown artist", source: "found via Google" },
  { artist: "unknown artist", source: "found via Google" },
];

const MODES = {
  work: { label: "Focus", seconds: 25 * 60 },
  short: { label: "Short Break", seconds: 5 * 60 },
  long: { label: "Long Break", seconds: 15 * 60 },
};

function beep(ctx) {
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.connect(g);
  g.connect(ctx.destination);
  o.type = "sine";
  o.frequency.setValueAtTime(660, ctx.currentTime);
  g.gain.setValueAtTime(0.12, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
  o.start(ctx.currentTime);
  o.stop(ctx.currentTime + 1.3);
}

const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function PomodoroPage() {
  const { theme } = useTheme();

  const [mode, setMode] = useState("work");
  const [left, setLeft] = useState(MODES.work.seconds);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [done, setDone] = useState(false);
  const [gifIdx, setGifIdx] = useState(4);
  const [showCredit, setShowCredit] = useState(false);
  const [isFS, setIsFS] = useState(false);

  const creditRef = useRef(null);
  const audioCtx = useRef(null);
  const intervalRef = useRef(null);

  const cfg = MODES[mode];
  const pct = left / cfg.seconds;
  const credit = GIF_CREDITS[gifIdx];

  // ── Timer ──────────────────────────────────────────────────
  const tick = useCallback(() => {
    setLeft((prev) => {
      if (prev <= 1) {
        setRunning(false);
        setDone(true);
        setTimeout(() => setDone(false), 2500);
        if (!audioCtx.current)
          audioCtx.current = new (
            window.AudioContext || window.webkitAudioContext
          )();
        beep(audioCtx.current);
        setSessions((s) => s + (mode === "work" ? 1 : 0));
        return 0;
      }
      return prev - 1;
    });
  }, [mode]);

  useEffect(() => {
    if (running) intervalRef.current = setInterval(tick, 1000);
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [running, tick]);

  useEffect(() => {
    document.title = running ? `${fmt(left)} · ${cfg.label}` : "Pomodoro · SK";
    return () => {
      document.title = "Sowndarya Krishnan";
    };
  }, [left, running, cfg.label]);

  // ── Credit popover outside click ──────────────────────────
  useEffect(() => {
    if (!showCredit) return;
    const handler = (e) => {
      if (creditRef.current && !creditRef.current.contains(e.target))
        setShowCredit(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showCredit]);

  // ── Fullscreen API ─────────────────────────────────────────
  const toggleFS = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const handler = () => setIsFS(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // Hide navbar in fullscreen
  useEffect(() => {
    const navbar = document.querySelector(".navbar-container");
    const topRight = document.querySelector(
      "div[style*='position: fixed'][style*='top: 1.5rem'][style*='right']",
    );
    if (navbar) navbar.style.display = isFS ? "none" : "";
    if (topRight) topRight.style.display = isFS ? "none" : "";
  }, [isFS]);

  // ── Controls ───────────────────────────────────────────────
  const switchMode = (m) => {
    setMode(m);
    setLeft(MODES[m].seconds);
    setRunning(false);
  };
  const reset = () => {
    setLeft(cfg.seconds);
    setRunning(false);
  };
  const toggle = () => {
    if (!audioCtx.current)
      audioCtx.current = new (
        window.AudioContext || window.webkitAudioContext
      )();
    setRunning((r) => !r);
  };
  const skipMode = () => {
    const order = ["work", "short", "long"];
    switchMode(order[(order.indexOf(mode) + 1) % order.length]);
  };
  const prevGif = () => {
    setGifIdx((i) => (i - 1 + GIFS.length) % GIFS.length);
    setShowCredit(false);
  };
  const nextGif = () => {
    setGifIdx((i) => (i + 1) % GIFS.length);
    setShowCredit(false);
  };

  const RS = 230,
    RW = 5;
  const rr = (RS - RW) / 2;
  const circ = 2 * Math.PI * rr;
  const dots = Array.from({ length: Math.min(sessions, 8) });

  return (
    <div className="pomo-root">
      {/* Background GIF */}
      <AnimatePresence mode="wait">
        <motion.img
          key={gifIdx}
          src={GIFS[gifIdx]}
          alt=""
          className="pomo-bg"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>

      <div className="pomo-scrim-base" />
      <div className="pomo-scrim-vignette" />

      {/* Done flash */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 5,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* UI */}
      <div className="pomo-ui">
        {/* Mode tabs */}
        <motion.div
          className="pomo-modes"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {Object.entries(MODES).map(([key, m]) => (
            <button
              key={key}
              onClick={() => switchMode(key)}
              className={`pomo-mode-btn ${mode === key ? "pomo-mode-btn--on" : ""}`}
            >
              {m.label}
            </button>
          ))}
        </motion.div>

        {/* Ring */}
        <motion.div
          className="pomo-ring-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width={RS} height={RS}>
            <circle
              cx={RS / 2}
              cy={RS / 2}
              r={rr}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={RW}
            />
            <circle
              cx={RS / 2}
              cy={RS / 2}
              r={rr}
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth={RW}
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - pct)}
              transform={`rotate(-90 ${RS / 2} ${RS / 2})`}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="pomo-ring-inner">
            <div className="pomo-time">{fmt(left)}</div>
            <div className="pomo-state">
              {running
                ? "● in progress"
                : left === cfg.seconds
                  ? "ready"
                  : "⏸ paused"}
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="pomo-controls"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="pomo-ctrl-sm" onClick={reset} title="Reset">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
            </svg>
          </button>

          <motion.button
            className="pomo-ctrl-main"
            onClick={toggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {running ? (
                <motion.svg
                  key="p"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                >
                  <rect x="6" y="4" width="4" height="16" rx="1.5" />
                  <rect x="14" y="4" width="4" height="16" rx="1.5" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="pl"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>

          <button className="pomo-ctrl-sm" onClick={skipMode} title="Next mode">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          </button>
        </motion.div>

        {/* Sessions */}
        <AnimatePresence>
          {sessions > 0 && (
            <motion.div
              className="pomo-sessions"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {dots.map((_, i) => (
                <motion.div
                  key={i}
                  className="pomo-session-dot"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 22,
                    delay: i * 0.04,
                  }}
                />
              ))}
              {sessions > 8 && (
                <span className="pomo-session-more">+{sessions - 8}</span>
              )}
              <span className="pomo-session-label">
                {sessions * 25} min focused today
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GIF switcher + credit */}
        <motion.div
          className="pomo-switcher-row"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pomo-switcher">
            <button className="pomo-sw-arrow" onClick={prevGif}>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="pomo-sw-pips">
              {GIFS.map((_, i) => (
                <button
                  key={i}
                  className={`pomo-pip ${gifIdx === i ? "pomo-pip--on" : ""}`}
                  onClick={() => {
                    setGifIdx(i);
                    setShowCredit(false);
                  }}
                />
              ))}
            </div>
            <button className="pomo-sw-arrow" onClick={nextGif}>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <span className="pomo-sw-divider" />
            <span className="pomo-sw-label">change vibe</span>
          </div>

          {/* Fullscreen */}
          <button
            className="pomo-fs-btn"
            onClick={toggleFS}
            title={isFS ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFS ? (
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="10" y1="14" x2="3" y2="21" />
                <line x1="21" y1="3" x2="14" y2="10" />
              </svg>
            ) : (
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>

          {/* Credit */}
          <div className="pomo-credit-wrap" ref={creditRef}>
            <button
              className="pomo-credit-btn"
              onClick={() => setShowCredit((v) => !v)}
              title="GIF credits"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </button>

            <AnimatePresence>
              {showCredit && (
                <motion.div
                  className="pomo-credit-popover"
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="pomo-credit-title">
                    GIF {gifIdx + 1} of {GIFS.length}
                  </div>
                  <div className="pomo-credit-row">
                    <span className="pomo-credit-key">Artist</span>
                    <span className="pomo-credit-val">{credit.artist}</span>
                  </div>
                  <div className="pomo-credit-row">
                    <span className="pomo-credit-key">Source</span>
                    <span className="pomo-credit-val">{credit.source}</span>
                  </div>
                  <div className="pomo-credit-note">
                    All visual content belongs to its respective creator. If
                    this is yours,{" "}
                    <a href="/contact" className="pomo-credit-link">
                      get in touch
                    </a>{" "}
                    for credit or removal.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style>{`
        .pomo-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .pomo-bg {
          position: fixed;
          inset: 0; width: 100%; height: 100%;
          object-fit: cover; z-index: 0;
        }
        .pomo-scrim-base {
          position: fixed; inset: 0; z-index: 1;
          background: rgba(4,3,8,0.48);
          pointer-events: none;
        }
        .pomo-scrim-vignette {
          position: fixed; inset: 0; z-index: 1;
          background: radial-gradient(ellipse at center, transparent 35%, rgba(4,3,8,0.55) 100%);
          pointer-events: none;
        }



        /* UI */
        .pomo-ui {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          align-items: center; gap: 1.8rem;
          padding: 9rem 1.5rem 4rem;
          width: 100%;
        }

        /* Mode tabs */
        .pomo-modes {
          display: flex; gap: 0.3rem;
          padding: 0.28rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          flex-wrap: wrap;
          justify-content: center;
        }
        .pomo-mode-btn {
          padding: 0.4rem 1.15rem;
          border-radius: 9px;
          border: 1px solid transparent;
          background: transparent;
          color: rgba(255,255,255,0.32);
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.64rem; font-weight: 700;
          letter-spacing: 0.09em; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s ease;
          white-space: nowrap;
        }
        .pomo-mode-btn:hover:not(.pomo-mode-btn--on) { color: rgba(255,255,255,0.55); }
        .pomo-mode-btn--on {
          color: rgba(255,255,255,0.88);
          border-color: rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.08);
        }

        /* Ring */
        .pomo-ring-wrap {
          position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .pomo-ring-inner {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.3rem;
        }
        .pomo-time {
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 3.4rem; font-weight: 800;
          letter-spacing: -0.05em;
          color: rgba(255,255,255,0.92);
          font-variant-numeric: tabular-nums;
          line-height: 1;
          text-shadow: 0 1px 24px rgba(0,0,0,0.35);
        }
        .pomo-state {
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }

        /* Controls */
        .pomo-controls { display: flex; align-items: center; gap: 1rem; }
        .pomo-ctrl-sm {
          width: 42px; height: 42px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          transition: all 0.2s ease;
        }
        .pomo-ctrl-sm:hover {
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.85);
          border-color: rgba(255,255,255,0.2);
        }
        .pomo-ctrl-main {
          width: 68px; height: 68px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.9);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12);
          transition: all 0.3s ease;
        }
        .pomo-ctrl-main:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.28);
        }

        /* Sessions */
        .pomo-sessions {
          display: flex; align-items: center;
          gap: 0.38rem; flex-wrap: wrap; justify-content: center;
        }
        .pomo-session-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.5); opacity: 0.75;
        }
        .pomo-session-more, .pomo-session-label {
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.66rem;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.04em;
        }
        .pomo-session-label { margin-left: 0.2rem; }

        /* Switcher row */
        .pomo-switcher-row {
          display: flex; align-items: center; gap: 0.5rem;
          flex-wrap: wrap; justify-content: center;
        }
        .pomo-switcher {
          display: flex; align-items: center; gap: 0.55rem;
          padding: 0.4rem 0.65rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
        }
        .pomo-sw-arrow {
          width: 22px; height: 22px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.18s; padding: 0;
        }
        .pomo-sw-arrow:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.12); }
        .pomo-sw-pips { display: flex; gap: 0.3rem; align-items: center; }
        .pomo-pip {
          width: 5px; height: 5px; border-radius: 999px;
          border: none; background: rgba(255,255,255,0.2);
          cursor: pointer; padding: 0;
          transition: all 0.25s ease;
        }
        .pomo-pip:hover { background: rgba(255,255,255,0.45); }
        .pomo-pip--on { width: 16px; background: rgba(255,255,255,0.7); }
        .pomo-sw-divider {
          width: 1px; height: 12px;
          background: rgba(255,255,255,0.1); flex-shrink: 0;
        }
        .pomo-sw-label {
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.6rem; letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
          padding-right: 0.15rem;
        }

        /* Fullscreen button — highlighted */
        .pomo-fs-btn {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          transition: all 0.2s; padding: 0;
          box-shadow: 0 0 10px rgba(255,255,255,0.08);
        }
        .pomo-fs-btn:hover {
          background: rgba(255,255,255,0.22);
          border-color: rgba(255,255,255,0.55);
          color: #fff;
        }

        /* Credit */
        .pomo-credit-wrap { position: relative; }
        .pomo-credit-btn {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          transition: all 0.2s; padding: 0;
        }
        .pomo-credit-btn:hover {
          color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.18);
        }
        .pomo-credit-popover {
          position: absolute;
          bottom: calc(100% + 10px); right: 0;
          width: 230px; padding: 0.9rem 1rem;
          background: rgba(12,10,20,0.82);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          display: flex; flex-direction: column; gap: 0.5rem;
          box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        }
        .pomo-credit-title {
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); margin-bottom: 0.1rem;
        }
        .pomo-credit-row {
          display: flex; justify-content: space-between;
          align-items: baseline; gap: 0.5rem;
        }
        .pomo-credit-key {
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.68rem; color: rgba(255,255,255,0.35); flex-shrink: 0;
        }
        .pomo-credit-val {
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.72rem; font-weight: 600;
          color: rgba(255,255,255,0.75); text-align: right;
        }
        .pomo-credit-note {
          font-family: "Cabinet Grotesk", sans-serif;
          font-size: 0.65rem; color: rgba(255,255,255,0.28);
          line-height: 1.6;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 0.5rem; margin-top: 0.1rem;
        }
        .pomo-credit-link {
          color: rgba(255,255,255,0.55);
          text-decoration: underline; text-underline-offset: 2px;
          transition: color 0.2s;
        }
        .pomo-credit-link:hover { color: rgba(255,255,255,0.88); }

        /* ── Responsive ── */
        @media (max-width: 480px) {
          .pomo-ui { gap: 1.4rem; padding: 7rem 1rem 3rem; }
          .pomo-time { font-size: 2.6rem; }
          .pomo-mode-btn { padding: 0.35rem 0.75rem; font-size: 0.58rem; }
          .pomo-sw-label { display: none; }
          .pomo-credit-popover { right: auto; left: 0; }
          .pomo-ctrl-main { width: 58px; height: 58px; }
          .pomo-ctrl-sm { width: 38px; height: 38px; }

        }

        @media (max-width: 360px) {
          .pomo-time { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );
}

export default function NowPlaying() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <div style={{ fontSize: "0.95rem", fontWeight: 500, lineHeight: 1.4 }}>
        Silence
      </div>

      <div style={{ fontSize: "0.8rem", opacity: 0.65, lineHeight: 1.4 }}>
        by My Overthinking Brain
      </div>

      <div
        style={{
          marginTop: "0.4rem",
          fontSize: "0.75rem",
          opacity: 0.55,
          lineHeight: 1.5,
        }}
      >
        Spotify integration pending · currently running experiments instead
      </div>
    </div>
  );
}

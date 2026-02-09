export default function NowPlaying() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <div
        style={{
          fontSize: "0.9rem",
          fontWeight: 500,
          opacity: 0.85,
        }}
      >
        Nothing playing
      </div>

      <div
        style={{
          fontSize: "0.75rem",
          opacity: 0.55,
        }}
      >
        Spotify integration coming soon
      </div>
    </div>
  );
}

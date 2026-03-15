import { useEffect, useState } from "react";

export default function NowPlaying() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Spotify fetch error:", err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!data)
    return <div style={{ opacity: 0.6, fontSize: "0.82rem" }}>Loading…</div>;

  const current = data.current?.item;
  const lastPlayed = data.recent?.[0]?.track;
  const topTracks = data.top?.slice(0, 5) || [];
  const featuredTrack = current || lastPlayed;

  const labelStyle = {
    fontSize: "0.68rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    opacity: 0.45,
    marginBottom: "0.4rem",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: featuredTrack && topTracks.length > 0 ? "0.9rem" : "0",
      }}
    >
      {featuredTrack && (
        <div>
          <div style={labelStyle}>
            {current ? "Now Playing" : "Last Played"}
          </div>

          <a
            href={featuredTrack.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              gap: "0.65rem",
              textDecoration: "none",
              color: "inherit",
              alignItems: "center",
            }}
          >
            <img
              src={featuredTrack.album.images[0]?.url}
              alt="album"
              style={{
                width: 44,
                height: 44,
                borderRadius: "8px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {featuredTrack.name}
              </div>
              <div
                style={{
                  opacity: 0.5,
                  fontSize: "0.75rem",
                  marginTop: "0.15rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {featuredTrack.artists.map((a) => a.name).join(", ")}
              </div>
            </div>
          </a>
        </div>
      )}

      {topTracks.length > 0 && (
        <div>
          <div style={labelStyle}>Currently Obsessed With</div>
          {/* 5 fixed columns — each album shrinks proportionally, no overflow */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              gap: "0.4rem",
            }}
          >
            {topTracks.map((track) => (
              <a
                key={track.id}
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", minWidth: 0 }}
              >
                <img
                  src={track.album.images[0]?.url}
                  alt="album"
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    borderRadius: "6px",
                    objectFit: "cover",
                    display: "block",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {!featuredTrack && topTracks.length === 0 && (
        <div style={{ opacity: 0.4, fontSize: "0.82rem" }}>
          Nothing playing.
        </div>
      )}
    </div>
  );
}

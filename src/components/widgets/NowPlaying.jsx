// @jsxRuntime automatic
import { useEffect, useState } from "react";

export default function NowPlaying() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://www.sknk.fyi/api/now-playing");
        const json = await res.json();
        console.log(json);
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
    marginBottom: "0.6rem",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
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
              gap: "0.75rem",
              textDecoration: "none",
              color: "inherit",
              alignItems: "center",
            }}
          >
            <img
              src={featuredTrack.album.images[0]?.url}
              alt="album"
              style={{
                width: 52,
                height: 52,
                borderRadius: "10px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  lineHeight: 1.3,
                }}
              >
                {featuredTrack.name}
              </div>
              <div
                style={{
                  opacity: 0.55,
                  fontSize: "0.78rem",
                  marginTop: "0.2rem",
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "0.5rem",
            }}
          >
            {topTracks.map((track) => (
              <a
                key={track.id}
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={track.album.images[0]?.url}
                  alt="album"
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

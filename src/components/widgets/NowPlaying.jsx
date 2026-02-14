import { useEffect, useState } from "react";

export default function NowPlaying() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://www.sknk.fyi/api/now-playing");
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

  if (!data) return <div style={{ opacity: 0.6 }}>Loading…</div>;

  const current = data.current?.item;
  const lastPlayed = data.recent?.[0]?.track;
  const topTracks = data.top?.slice(0, 5) || [];

  const featuredTrack = current || lastPlayed;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* ================= FEATURED (Now or Last Played) ================= */}
      {featuredTrack && (
        <div>
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              opacity: 0.5,
              marginBottom: "0.8rem",
            }}
          >
            {current ? "Now Playing" : "Last Played"}
          </div>

          <a
            href={featuredTrack.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              gap: "1rem",
              textDecoration: "none",
              color: "inherit",
              alignItems: "center",
            }}
          >
            <img
              src={featuredTrack.album.images[0]?.url}
              alt="album"
              style={{
                width: 80,
                height: 80,
                borderRadius: "12px",
                objectFit: "cover",
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              }}
            />

            <div>
              <div style={{ fontWeight: 600, fontSize: "1rem" }}>
                {featuredTrack.name}
              </div>
              <div style={{ opacity: 0.7 }}>
                {featuredTrack.artists.map((a) => a.name).join(", ")}
              </div>
            </div>
          </a>
        </div>
      )}

      {/* ================= TOP TRACKS GRID ================= */}
      {topTracks.length > 0 && (
        <div>
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              opacity: 0.5,
              marginBottom: "0.8rem",
            }}
          >
            Top Tracks
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
              gap: "0.8rem",
            }}
          >
            {topTracks.map((track) => (
              <a
                key={track.id}
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block" }}
              >
                <img
                  src={track.album.images[0]?.url}
                  alt="album"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    objectFit: "cover",
                    transition: "transform 0.2s ease",
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

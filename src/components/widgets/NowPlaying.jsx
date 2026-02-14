import { useEffect, useState } from "react";

export default function NowPlaying() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Always hit production API
        const res = await fetch("https://www.sknk.fyi/api/now-playing");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Spotify fetch error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div>Loading...</div>;

  /* ================= CURRENTLY PLAYING ================= */
  if (data.current && data.current.item) {
    const track = data.current.item;

    return (
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <img
          src={track.album.images[0]?.url}
          alt="album"
          style={{
            width: 60,
            height: 60,
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
        <div>
          <div style={{ fontWeight: 600 }}>{track.name}</div>
          <div style={{ opacity: 0.7 }}>
            {track.artists.map((a) => a.name).join(", ")}
          </div>
        </div>
      </div>
    );
  }

  /* ================= TOP TRACKS FALLBACK ================= */
  if (data.top) {
    return (
      <div>
        <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
          Top Tracks
        </div>
        {data.top.slice(0, 5).map((t) => (
          <div key={t.id} style={{ opacity: 0.8 }}>
            {t.name}
          </div>
        ))}
      </div>
    );
  }

  return <div>No Spotify data available.</div>;
}

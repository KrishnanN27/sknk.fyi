import { useEffect, useState } from "react";

export default function NowPlaying() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/now-playing");
      const json = await res.json();
      setData(json);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div>Loading...</div>;

  // 🎵 If currently playing
  if (data.current && data.current.item) {
    const track = data.current.item;

    return (
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <img
          src={track.album.images[0].url}
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

  // 🎶 Fallback: Top tracks
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

  return null;
}

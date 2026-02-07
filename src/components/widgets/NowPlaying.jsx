import Widget from "../Widget";

export default function NowPlaying() {
  return (
    <Widget title="Now Playing">
      <p className="text-lg">🎧 Nothing playing</p>
      <p className="text-sm text-muted">Spotify coming soon</p>
    </Widget>
  );
}

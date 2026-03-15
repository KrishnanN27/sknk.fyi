import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../pages/Blog";

export default function LatestBlog() {
  const navigate = useNavigate();
  const latest = getAllPosts()[0];

  if (!latest)
    return (
      <div style={{ fontSize: "0.9rem", opacity: 0.45 }}>No posts yet.</div>
    );

  return (
    <div
      onClick={() => navigate(`/blog/${latest.slug}`)}
      style={{ fontSize: "0.9rem", lineHeight: 1.6, cursor: "pointer" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: 600,
        }}
      >
        {latest.title}
        {latest.draft === "true" && (
          <span
            style={{
              fontFamily: "'Reenie Beanie', cursive",
              fontSize: "0.95rem",
              color: "#ef4444",
              background: "rgba(239,68,68,0.08)",
              border: "1px dashed rgba(239,68,68,0.4)",
              borderRadius: "6px",
              padding: "0 0.4rem",
              lineHeight: "1.6",
              fontWeight: 400,
            }}
          >
            draft
          </span>
        )}
      </div>

      {latest.excerpt && (
        <div
          style={{ opacity: 0.45, marginTop: "0.25rem", fontSize: "0.82rem" }}
        >
          {latest.excerpt}
        </div>
      )}

      <div
        style={{
          opacity: 0.3,
          fontSize: "0.7rem",
          marginTop: "0.4rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {latest.date}
      </div>
    </div>
  );
}

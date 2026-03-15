import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const rawPosts = import.meta.glob("../posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line
      .slice(colonIdx + 1)
      .trim()
      .replace(/^"|"$/g, "");

    if (val.startsWith("[")) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^"|"$/g, ""))
        .filter(Boolean);
    }

    data[key] = val;
  });

  return { data, content: match[2].trim() };
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr.trim() + "T00:00:00");
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getAllPosts = () =>
  Object.entries(rawPosts)
    .map(([filepath, raw]) => {
      const slug = filepath.split("/").pop().replace(".md", "");
      const { data, content } = parseFrontmatter(raw);
      return { slug, content, ...data };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

const Blog = () => {
  const navigate = useNavigate();
  const posts = getAllPosts();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      style={{ maxWidth: 720, margin: "0 auto", padding: "6rem 1.5rem 3rem" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            onClick={() => navigate(`/blog/${post.slug}`)}
            style={{
              padding: "1.25rem 1.5rem",
              background: "var(--glass-bg)",
              border: `1px solid ${post.draft === "true" ? "rgba(239,68,68,0.3)" : "var(--glass-border)"}`,
              borderRadius: "16px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              backdropFilter: "blur(12px)",
              transition: "opacity 0.2s",
            }}
            whileHover={{ opacity: 0.8 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <span style={{ fontWeight: 500 }}>{post.title}</span>
              {post.draft === "true" && (
                <span
                  style={{
                    fontFamily: "'Reenie Beanie', cursive",
                    fontSize: "1rem",
                    color: "#ef4444",
                    background: "rgba(239,68,68,0.08)",
                    border: "1px dashed rgba(239,68,68,0.4)",
                    borderRadius: "6px",
                    padding: "0 0.5rem",
                    lineHeight: "1.6",
                    flexShrink: 0,
                  }}
                >
                  draft
                </span>
              )}
            </div>

            {post.excerpt && (
              <div style={{ opacity: 0.45, fontSize: "0.82rem" }}>
                {post.excerpt}
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "0.25rem",
              }}
            >
              <div
                style={{
                  opacity: 0.3,
                  fontSize: "0.72rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {formatDate(post.date)}
                {(Array.isArray(post.tags) ? post.tags : []).map(
                  (t) => ` · ${t}`,
                )}
              </div>

              <span
                style={{
                  fontSize: "0.75rem",
                  opacity: 0.4,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  flexShrink: 0,
                }}
              >
                Read more
              </span>
            </div>
          </motion.div>
        ))}

        {posts.length === 0 && (
          <p style={{ opacity: 0.35, fontSize: "0.9rem" }}>
            No posts yet. Drop a .md file into src/posts/ to get started.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;

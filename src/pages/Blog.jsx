import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const rawPosts = import.meta.glob("../posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const blogImages = import.meta.glob("../assets/images/blogs/*/1.png", {
  eager: true,
  import: "default",
});

const getCoverImage = (coverKey) => {
  if (!coverKey) return null;
  const key = Object.keys(blogImages).find((k) =>
    k.includes(`/blogs/${coverKey}/1.png`),
  );
  return key ? blogImages[key] : null;
};

const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data = {};
  const lines = match[1].split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const colonIdx = lines[i].indexOf(":");
    if (colonIdx === -1) {
      i++;
      continue;
    }
    const key = lines[i].slice(0, colonIdx).trim();
    const rest = lines[i].slice(colonIdx + 1).trim();

    if (rest === "[" || (rest.startsWith("[") && !rest.endsWith("]"))) {
      const items = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("]")) {
        const item = lines[i]
          .trim()
          .replace(/^-\s*/, "")
          .replace(/^"|"$|,$/g, "")
          .trim();
        if (item) items.push(item);
        i++;
      }
      data[key] = items;
    } else {
      let val = rest.replace(/^"|"$/g, "");
      if (val.startsWith("[") && val.endsWith("]")) {
        val = val
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^"|"$/g, ""))
          .filter(Boolean);
      }
      data[key] = val;
    }
    i++;
  }
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ maxWidth: 780, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "3.5rem",
          borderBottom: "1px solid var(--glass-border)",
          paddingBottom: "1.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.5,
            }}
          >
            Writing
          </span>
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.35,
            }}
          >
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {posts.map((post, i) => {
          const cover = getCoverImage(post.cover);
          const isDraft = post.draft === "true";

          return (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1],
              }}
              onClick={() => navigate(`/blog/${post.slug}`)}
              whileHover="hover"
              style={{
                cursor: "pointer",
                borderBottom: "1px solid var(--glass-border)",
                paddingBottom: "2rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                }}
              >
                {/* Index number */}
                <span
                  style={{
                    fontSize: "0.6rem",
                    opacity: 0.35,
                    letterSpacing: "0.1em",
                    paddingTop: "0.2rem",
                    flexShrink: 0,
                    width: "1.5rem",
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Cover image */}
                {cover ? (
                  <motion.div
                    style={{
                      width: "90px",
                      height: "120px",
                      flexShrink: 0,
                      borderRadius: "8px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <motion.img
                      src={cover}
                      alt={post.title}
                      variants={{ hover: { scale: 1.05 } }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: isDraft
                          ? "saturate(0.4) brightness(0.8)"
                          : "none",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35))",
                        pointerEvents: "none",
                      }}
                    />
                  </motion.div>
                ) : (
                  <div
                    style={{
                      width: "90px",
                      height: "120px",
                      flexShrink: 0,
                      borderRadius: "8px",
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                    }}
                  />
                )}

                {/* Text */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    paddingTop: "0.15rem",
                  }}
                >
                  {/* Tags + draft */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {(Array.isArray(post.tags)
                      ? post.tags.slice(0, 3)
                      : []
                    ).map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "0.58rem",
                          opacity: 0.55,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {isDraft && (
                      <span
                        style={{
                          fontFamily: "'Reenie Beanie', cursive",
                          fontSize: "0.95rem",
                          color: "#ef4444",
                          background: "rgba(239,68,68,0.08)",
                          border: "1px dashed rgba(239,68,68,0.35)",
                          borderRadius: "5px",
                          padding: "0 0.45rem",
                          lineHeight: "1.6",
                        }}
                      >
                        draft
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <motion.h2
                    variants={{ hover: { x: 3 } }}
                    transition={{ duration: 0.2 }}
                    style={{
                      margin: 0,
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      lineHeight: 1.35,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {post.title}
                  </motion.h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p
                      style={{
                        margin: 0,
                        opacity: 0.5,
                        fontSize: "0.78rem",
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.excerpt}
                    </p>
                  )}

                  {/* Date + arrow */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "0.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        opacity: 0.4,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {formatDate(post.date)}
                    </span>
                    <motion.span
                      variants={{ hover: { opacity: 0.7, x: 4 } }}
                      style={{ fontSize: "0.75rem", opacity: 0.3 }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {posts.length === 0 && (
          <p style={{ opacity: 0.4, fontSize: "0.85rem" }}>No posts yet.</p>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;

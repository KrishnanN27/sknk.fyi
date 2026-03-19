import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ─── data layer (untouched) ──────────────────────────────────────────────────

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

// ─── component ───────────────────────────────────────────────────────────────

const Blog = () => {
  const navigate = useNavigate();
  const posts = getAllPosts();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: 860, margin: "0 auto", padding: "7rem 2rem 6rem" }}
    >
      {/* ── Header ── */}
      <div style={{ marginBottom: "5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Things I've been
            <br />
            thinking about.
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            Notes on research, computing, and whatever else refuses to leave my
            head.
          </p>
        </motion.div>
      </div>

      {/* ── Post count rule ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        <span
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            whiteSpace: "nowrap",
          }}
        >
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </span>
        <div
          style={{ flex: 1, height: "1px", background: "var(--glass-border)" }}
        />
      </div>

      {/* ── Post list ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {posts.map((post, i) => {
          const cover = getCoverImage(post.cover);
          const isDraft = post.draft === "true";

          return (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.07,
                duration: 0.55,
                ease: [0.23, 1, 0.32, 1],
              }}
              onClick={() => navigate(`/blog/${post.slug}`)}
              whileHover={{
                y: -3,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.18)",
              }}
              whileTap={{
                scale: 0.98,
                y: 0,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 4px rgba(0,0,0,0.15)",
              }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              style={{
                cursor: "pointer",
                border: "1px solid var(--glass-border)",
                borderRadius: 14,
                padding: "1.5rem",
                overflow: "hidden",
                background: "var(--glass-bg)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.12)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1.75rem",
                  alignItems: "flex-start",
                }}
              >
                {/* Cover image */}
                {cover ? (
                  <motion.div
                    style={{
                      width: 130,
                      height: 170,
                      flexShrink: 0,
                      borderRadius: 10,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <motion.img
                      src={cover}
                      alt={post.title}
                      variants={{ hover: { scale: 1.05 } }}
                      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: isDraft
                          ? "saturate(0.35) brightness(0.75)"
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
                  /* No cover — index number placeholder */
                  <div
                    style={{
                      width: 130,
                      height: 170,
                      flexShrink: 0,
                      borderRadius: 10,
                      border: "1px solid var(--glass-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "2.8rem",
                        fontWeight: 700,
                        color: "var(--glass-border)",
                        letterSpacing: "-0.04em",
                        userSelect: "none",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0, paddingTop: "0.15rem" }}>
                  {/* Tags + draft */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {(Array.isArray(post.tags)
                      ? post.tags.slice(0, 3)
                      : []
                    ).map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "0.68rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "0.2em 0.7em",
                          borderRadius: 999,
                          border: "1px solid var(--tag-border)",
                          background: "var(--tag-bg)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {isDraft && (
                      <span
                        style={{
                          fontFamily: "'Reenie Beanie', cursive",
                          fontSize: "1rem",
                          color: "#ef4444",
                          background: "rgba(239,68,68,0.08)",
                          border: "1px dashed rgba(239,68,68,0.35)",
                          borderRadius: 5,
                          padding: "0 0.45rem",
                          lineHeight: 1.7,
                        }}
                      >
                        draft
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <motion.h2
                    variants={{ hover: { x: 4 } }}
                    transition={{ duration: 0.22 }}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      margin: "0 0 0.65rem",
                      fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)",
                      fontWeight: 700,
                      lineHeight: 1.25,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {post.title}
                  </motion.h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p
                      style={{
                        margin: "0 0 1rem",
                        color: "var(--text-muted)",
                        fontSize: "0.88rem",
                        lineHeight: 1.7,
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
                      paddingTop: "0.6rem",
                      borderTop: "1px solid var(--glass-border)",
                      marginTop: "auto",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {formatDate(post.date)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}

        {posts.length === 0 && (
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              paddingTop: "2rem",
            }}
          >
            Nothing here yet.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;

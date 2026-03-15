import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllPosts } from "../../pages/Blog";

const blogImages = import.meta.glob("../../assets/images/blogs/*/1.png", {
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

export default function LatestBlog() {
  const navigate = useNavigate();
  const post = getAllPosts()[0];

  if (!post)
    return (
      <div style={{ fontSize: "0.85rem", opacity: 0.35 }}>No posts yet.</div>
    );

  const cover = getCoverImage(post.cover);
  const isDraft = post.draft === "true";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => navigate(`/blog/${post.slug}`)}
      whileHover="hover"
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.85rem",
        padding: "0.65rem 0",
        width: "100%",
        minWidth: 0,
      }}
    >
      {/* Thumbnail */}
      {cover ? (
        <motion.div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "6px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <motion.img
            src={cover}
            alt={post.title}
            variants={{ hover: { scale: 1.08 } }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: isDraft ? "saturate(0.4)" : "none",
            }}
          />
        </motion.div>
      ) : (
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "6px",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            flexShrink: 0,
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
          gap: "0.2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
          }}
        >
          <motion.span
            variants={{ hover: { x: 2 } }}
            transition={{ duration: 0.2 }}
            style={{
              fontSize: "0.84rem",
              fontWeight: 500,
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            {post.title}
          </motion.span>
          {isDraft && (
            <span
              style={{
                fontFamily: "'Reenie Beanie', cursive",
                fontSize: "0.85rem",
                color: "#ef4444",
                background: "rgba(239,68,68,0.08)",
                border: "1px dashed rgba(239,68,68,0.35)",
                borderRadius: "5px",
                padding: "0 0.4rem",
                lineHeight: "1.6",
                flexShrink: 0,
              }}
            >
              draft
            </span>
          )}
        </div>

        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <span
            style={{
              fontSize: "0.58rem",
              opacity: 0.4,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {post.tags.slice(0, 3).join(" · ")}
          </span>
        )}
      </div>

      {/* Arrow */}
      <motion.span
        variants={{ hover: { opacity: 0.6, x: 3 } }}
        style={{ fontSize: "0.7rem", opacity: 0.25, flexShrink: 0 }}
      >
        →
      </motion.span>
    </motion.div>
  );
}

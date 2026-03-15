import { motion } from "framer-motion";
import { getAllPosts } from "./Blog";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getAllPosts().find((p) => p.slug === slug);

  if (!post)
    return <div style={{ padding: "6rem 1.5rem" }}>Post not found.</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      style={{ maxWidth: 680, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}
    >
      <button
        onClick={() => navigate("/blog")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "inherit",
          opacity: 0.4,
          fontSize: "0.82rem",
          marginBottom: "2.5rem",
          padding: 0,
        }}
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div
        style={{
          opacity: 0.35,
          fontSize: "0.72rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}
      >
        {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {(Array.isArray(post.tags) ? post.tags : []).map((t) => ` · ${t}`)}
      </div>

      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          marginBottom: "2.5rem",
          lineHeight: 1.3,
        }}
      >
        {post.title}
      </h1>

      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default BlogPost;

const Footer = () => {
  return (
    <footer
      style={{
        padding: "2rem 2rem 2.5rem",
        fontSize: "0.8rem",
        opacity: 0.6,
        textAlign: "center",
      }}
    >
      © {new Date().getFullYear()} Sowndarya Krishnan ·{" "}
      <a href="mailto:sowndaryakrishnanna@mines.edu" style={linkStyle}>
        Email
      </a>{" "}
      ·{" "}
      <a
        href="https://github.com/krishnanN27"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        GitHub
      </a>{" "}
      ·{" "}
      <a
        href="https://linkedin.com/in/krishnan-n"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        LinkedIn
      </a>
    </footer>
  );
};

const linkStyle = {
  color: "var(--text)",
  textDecoration: "none",
  opacity: 0.8,
};

export default Footer;

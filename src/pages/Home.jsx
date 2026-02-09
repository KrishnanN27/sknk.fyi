import Widget from "../components/Widget";
import NowPlaying from "../components/widgets/NowPlaying";
import GithubActivity from "../components/widgets/GithubActivity";
import ContactCard from "../components/widgets/ContactCard";
import LatestProject from "../components/widgets/LatestProject";
import LatestBlog from "../components/widgets/LatestBlog";

const Home = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "10rem 2rem 6rem",
        color: "var(--text)",
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
      }}
    >
      {/* TOP — WIDGET ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(220px, 1fr))",
          gap: "1.5rem",
          overflowX: "auto",
          paddingBottom: "0.5rem",
        }}
      >
        <Widget title="Now Playing">
          <NowPlaying />
        </Widget>

        <Widget title="GitHub Activity">
          <GithubActivity />
        </Widget>

        <Widget title="Get in Touch">
          <ContactCard />
        </Widget>

        <Widget title="Latest Project">
          <LatestProject />
        </Widget>

        <Widget title="Latest Blog">
          <LatestBlog />
        </Widget>
      </div>

      {/* CONTENT BELOW */}
      <div style={{ maxWidth: 720 }}>
        <h1
          style={{
            fontSize: "3.8rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "1rem",
          }}
        >
          Sowndayra Krishnan
        </h1>

        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: 400,
            opacity: 0.8,
            marginBottom: "2rem",
          }}
        >
          Computer Science PhD · Research Scientist
        </h2>

        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.75,
            opacity: 0.75,
            marginBottom: "1.5rem",
          }}
        >
          Hi, I’m Sowndarya — most friends call me Krish or Chris. I’m a
          first-year PhD student in Computer Science at Colorado School of
          Mines, exploring the intersection of quantum computing, artificial
          intelligence, and scientific computing.
        </p>

        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.75,
            opacity: 0.7,
          }}
        >
          My research focuses on hybrid quantum–AI methods for solving partial
          differential equations that govern complex physical systems.
        </p>
      </div>
    </section>
  );
};

export default Home;

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import h1 from "../assets/images/about/h1.jpg";
import h2 from "../assets/images/about/h2.JPG";
import h3 from "../assets/images/about/h3.jpg";
import h4 from "../assets/images/about/h4.JPG";

const images = [h1, h2, h3, h4];

const history = [
  "At 10, I wrote my first lines of code and realized computers obey logic better than people.",
  "At 14, I became fascinated by systems — circuits, algorithms, patterns.",
  "At 18, I chose engineering because it was difficult.",
  "At 22, I learned that clean code is a form of respect.",
  "At 24, I understood that intelligence without discipline goes nowhere.",
  "Now, I care about long-horizon work and meaningful problems."
];

const funFacts = [
  "I speak the Oldest living language in the world — Tamil (தமிழ்).",
  "Growing up, people have called me every version of my name — Sowndar, Sound, Krishna, Krish, Chris, Sowndarya Krishnan.",
  "I come from a culture where last names aren’t really used — mine is simply N."
];

const likes = [
  "Mobile photography",
  "Mechanical keyboards",
  "The smell of petrol",
  "Strong filter coffee",
  "Dosa as emotional recovery",
  "All things nerdy",
  "Anime, manhwa, and K-dramas",
  "6am airport terminals",
  "Rewatching comfort shows for the 100th time",
];


const quotes = [
  "If we don’t explain science to the public, others will fill the gap with nonsense.",
  "Don’t shine to be seen. Shine to help others see.",
  "You can honor your parents and break their patterns. You can love your culture and question its traditions. You can respect your elders and challenge their beliefs."
];

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "8rem" }}>
    <h2
      style={{
        marginBottom: "3rem",
        fontSize: "1rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        opacity: 0.5,
      }}
    >
      {title}
    </h2>
    {children}
  </div>
);

const About = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        padding: "8rem 2rem",
        maxWidth: 850,
        margin: "0 auto",
      }}
    >


      {/* DRAFT NOTICE */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  style={{
    marginBottom: "3rem",
    padding: "1rem 1.5rem",
    borderRadius: "16px",
    border: "1px solid var(--glass-border)",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(8px)",
    fontSize: "0.9rem",
    letterSpacing: "0.03em",
    opacity: 0.75,
  }}
>
Please be kind — this portfolio is aggressively under construction.
It will be good. Eventually.

</motion.div>

      {/* HERO IMAGE ROTATOR */}
     <div
  style={{
    height: "420px",
    overflow: "hidden",
    borderRadius: "28px",
    border: "1px solid var(--glass-border)",
    marginBottom: "8rem",
    position: "relative",
  }}
>
  <AnimatePresence mode="wait">
    <motion.img
      key={imageIndex}
      src={images[imageIndex]}
      alt=""
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position: "absolute",
      }}
    />
  </AnimatePresence>

  {/* OVERLAY */}
  <div
  style={{
    position: "absolute",
    inset: 0,
    background: `
      linear-gradient(
        to bottom,
        transparent 40%,
        var(--bg) 100%
      )
    `,
    pointerEvents: "none",
  }}
/>

</div>
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  style={{ marginBottom: "10rem" }}
>
  <p
    style={{
      fontSize: "1.2rem",
      lineHeight: 1.8,
      opacity: 0.9,
    }}
  >
    Who am I ?? idek
  </p>

  <p
    style={{
      marginTop: "2rem",
      fontSize: "1.05rem",
      lineHeight: 1.8,
      opacity: 0.75,
    }}
  >
    Most friends call me Krish or Chris.
    If you’d like to pronounce my full name:
    (Sown-dar-yeh Krish-nun).
  </p>
</motion.div>

      {/* FUN FACTS */}
      <Section title="Fun Facts">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {funFacts.map((fact, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.75 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              {fact}
            </motion.p>
          ))}
        </div>
      </Section>

      {/* HISTORY
      <Section title="Some History">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {history.map((item, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              style={{ lineHeight: 1.7 }}
            >
              {item}
            </motion.p>
          ))}
        </div>
      </Section> */}

      {/* I LIKE */}
      <Section title="I Like">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {likes.map((item, i) => (
            <motion.span
              key={i}
              whileHover={{ y: -3 }}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                fontSize: "0.85rem",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--glass-border)",
              }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </Section>



      {/* QUOTES */}
<Section title="Quiet Influences">
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {quotes.map((quote, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true }}
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              {quote}
            </motion.p>
          ))}
        </div>
      </Section>
    </section>
  );
};

export default About;

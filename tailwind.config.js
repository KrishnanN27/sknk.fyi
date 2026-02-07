/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0f",
        card: "#111118",
        border: "#1f1f2b",
        text: "#e5e7eb",
        muted: "#9ca3af",
      },
    },
  },
  plugins: [],
};

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        green: {
          accent: "#22c55e",
          hover: "#16a34a",
        },
      },
    },
  },
  plugins: [],
};

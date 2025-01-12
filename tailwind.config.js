/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          901: "#272443",
          902: "#4B8EDC",
          903: "#6B66CC",
          904: "9A74C1",
        },
      },
    },
  },
  plugins: [],
};

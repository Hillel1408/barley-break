/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {},
    extend: {},
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        "*, *:before, *:after": {
          "-webkitTapHighlightColor": "transparent",
        },
        body: {
          fontFamily: '"RT", sans-serif',
          minWidth: "1080px",
          lineHeight: "normal",
          backgroundColor: "#7700FF",
        },
        ".container": {
          maxWidth: "1080px",
          margin: "0 auto",
        },
      });
    }),
  ],
};

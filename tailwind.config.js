/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 1s linear infinite",
      },

      fontFamily: {
        itim: ["Itim", "cursive"],
        prosto: ["'Prosto One'", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        robotoMono: ["'Roboto Mono'", "monospace"],
        ubuntu: ["Ubuntu", "sans-serif"],
        unbounded: ["Unbounded", "cursive"],
      },

      textShadow: {
        "text-shadow-1": "0 0 2px  rgb(234, 179, 8)", //yellow glow
        "text-shadow-2": "0 0 3px  rgb(255, 255, 255)", //white glow
        "text-shadow-3": "0 0 3px  rgb(0, 0, 0)", //black glow
      },

      boxShadow: {
        "shadow-c1": "0 0 6px 1px  rgb(190, 190, 190)", //black glow
      },

      minHeight: (theme) => ({
        ...theme("spacing"),
      }),

      maxWidth: (theme) => ({
        ...theme("spacing"),
      }),

      minWidth: (theme) => ({
        ...theme("spacing"),
      }),
    },
  },

  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};

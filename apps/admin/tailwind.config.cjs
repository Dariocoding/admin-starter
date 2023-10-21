const colors = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

const colorsNumbers = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

const tailwindColors = [
  ...colorsNumbers
    .map((number) => {
      const colorsNormal = colors.map((color) => {
        return `bg-${color}-${number}`;
      });

      const colorsHover = colors.map((color) => {
        return `hover:${color}-${number}`;
      });

      const borderColors = colors.map((color) => {
        return `border-${color}-${number}`;
      });

      const textColors = colors.map((color) => {
        return `text-${color}-${number}`;
      });

      const borders = ["border", "border-t", "border-r", "border-b", "border-l"];

      return [...colorsNormal, ...colorsHover, ...borderColors, ...borders, ...textColors];
    })
    .flat(),
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../node_modules/react-tailwindcss-select/dist/index.esm.js",
    "../packages/ui/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  important: true,
  safelist: [...tailwindColors],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "bounce-right": "bounceRight 1s infinite",
        "bounce-left": "bounceLeft 1s infinite",
      },
      scale: {
        3: "3",
      },

      keyframes: {
        bounceLeft: {
          "0%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(0)" },
          "80%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(0)" },
          "40%": { transform: "translateX(10px)" },
          "60%": { transform: "translateX(5px)" },
        },

        bounceRight: {
          "0%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(0)" },
          "80%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(0)" },
          "40%": { transform: "translateX(-10px)" },
          "60%": { transform: "translateX(-5px)" },
        },
      },
    },
  },
  plugins: [],
};

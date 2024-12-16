/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        verticalScroll: "verticalScroll 10s linear infinite",
      },
      keyframes: {
        verticalScroll: {
          "0%": { backgroundPosition: "center top" },
          "100%": { backgroundPosition: "center bottom" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["coffee"],
  },
};

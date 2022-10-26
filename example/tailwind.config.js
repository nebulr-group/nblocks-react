/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("../preset.js")],
  // Configure paths to all of your HTML, JS components, and any other files that contain Tailwind class names
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../src/**/*.{js,jsx,ts,tsx}",
    "./public/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

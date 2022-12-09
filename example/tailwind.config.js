/** @type {import('tailwindcss').Config} */

module.exports = {
  // Configure paths to all of your HTML, JS components, and any other files that contain Tailwind class names
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../src/**/*.{js,jsx,ts,tsx}",
    "./public/*.html",
  ],
  theme: {
    extend: {},
    spacing: {
      px: "var(--px-space)",
      0: "var(--space-0)",
      0.5: "var(--space-0-5)",
      1: "var(--space-1)",
      1.5: "var(--space-1-5)",
      2: "var(--space-2)",
      2.5: "var(--space-2-5)",
      3: "var(--space-3)",
      3.5: "var(--space-3-5)",
      4: "var(--space-4)",
      5: "var(--space-5)",
      6: "var(--space-6)",
      7: "var(--space-7)",
      8: "var(--space-8)",
      9: "var(--space-9)",
      10: "var(--space-10)",
      11: "var(--space-11)",
      12: "var(--space-12)",
      14: "var(--space-14)",
      16: "var(--space-16)",
      20: "var(--space-20)",
      28: "var(--space-28)",
      32: "var(--space-32)",
      40: "var(--space-40)",
      44: "var(--space-44)",
      48: "var(--space-48)",
      52: "var(--space-52)",
      56: "var(--space-56)",
      60: "var(--space-60)",
      64: "var(--space-64)",
      72: "var(--space-72)",
      80: "var(--space-80)",
      96: "var(--space-96)",
    },
    colors: {
      white: "var(--color-white)",
      purple: {
        50: "var(--color-primary-50)",
        100: "var(--color-primary-100)",
        200: "var(--color-primary-200)",
        300: "var(--color-primary-300)",
        400: "var(--color-primary-400)",
        500: "var(--color-primary-500)",
        600: "var(--color-primary-600)",
        700: "var(--color-primary-700)",
        800: "var(--color-primary-800)",
        900: "var(--color-primary-900)",
      },
      gray: {
        50: "var(--color-tertiary-50)",
        100: "var(--color-tertiary-100)",
        200: "var(--color-tertiary-200)",
        300: "var(--color-tertiary-300)",
        400: "var(--color-tertiary-400)",
        500: "var(--color-tertiary-500)",
        600: "var(--color-tertiary-600)",
        700: "var(--color-tertiary-700)",
        800: "var(--color-tertiary-800)",
        900: "var(--color-tertiary-900)",
      },
      green: {
        50: "var(--color-success-50)",
        100: "var(--color-success-100)",
        200: "var(--color-success-200)",
        300: "var(--color-success-300)",
        400: "var(--color-success-400)",
        500: "var(--color-success-500)",
        600: "var(--color-success-600)",
        700: "var(--color-success-700)",
        800: "var(--color-success-800)",
        900: "var(--color-success-900)",
      },
      yellow: {
        50: "var(--color-warning-50)",
        100: "var(--color-warning-100)",
        200: "var(--color-warning-200)",
        300: "var(--color-warning-300)",
        400: "var(--color-warning-400)",
        500: "var(--color-warning-500)",
        600: "var(--color-warning-600)",
        700: "var(--color-warning-700)",
        800: "var(--color-warning-800)",
        900: "var(--color-warning-900)",
      },
      red: {
        50: "var(--color-danger-50)",
        100: "var(--color-danger-100)",
        200: "var(--color-danger-200)",
        300: "var(--color-danger-300)",
        400: "var(--color-danger-400)",
        500: "var(--color-danger-500)",
        600: "var(--color-danger-600)",
        700: "var(--color-danger-700)",
        800: "var(--color-danger-800)",
        900: "var(--color-danger-900)",
      },
      blue: {
        50: "var(--color-info-50)",
        100: "var(--color-info-100)",
        200: "var(--color-info-200)",
        300: "var(--color-info-300)",
        400: "var(--color-info-400)",
        500: "var(--color-info-500)",
        600: "var(--color-info-600)",
        700: "var(--color-info-700)",
        800: "var(--color-info-800)",
        900: "var(--color-info-900)",
      },
    },
  },
  plugins: [],
};

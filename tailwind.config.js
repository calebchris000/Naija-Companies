/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#003366",
        secondary: "#ffffff",
        cto: "#ffffff",
        accent: "#999999",
        accent2: "#FFFFFF",
      },
    },
  },
  plugins: [],
};

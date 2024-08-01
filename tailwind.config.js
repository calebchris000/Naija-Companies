/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d1321",
        secondary: "#afe0ce",
        cto: "#c5d86d",
        accent: "#ffeddf",
        accent2: "#86615c",
      },
    },
  },
  plugins: [],
};

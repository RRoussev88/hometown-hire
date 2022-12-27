module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--brand-primary-color)",
        "secondary-color": "var(--brand-secondary-color)",
      },
    },
  },
};

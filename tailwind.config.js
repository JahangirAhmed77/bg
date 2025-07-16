/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      colors: {
        themeYellow: '#ffc20e',
        formBGBlue: '#e3edf9',
        sidebarGray: '#cfd3d4',
        themeBlue: '#5570f1'
      }
    },
  },
  plugins: [],
};

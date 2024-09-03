/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this to include your file paths
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#123456',
      },
    },
  },
  plugins: [],
}

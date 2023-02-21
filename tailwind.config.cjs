/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    backgroundImage: {
      'clear': "url('/images/clearMountain.jpg')",
      'cloudy': "url('/images/cloudy.jpg')",
      'rain': "url('/images/rain.jpg')",
      'storm': "url('/images/storm.jpg')",
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#7ecf97',
        'custom-grey': '#4A5568',
        'custom-blue': '#1A202C',
        'custom-rose': '#EFB8AB',
        'custom-warning': '#FFDE59'
      },

      
    },
    plugins: [],
  }
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'red' },
        },
      },
      animation: {
        blinkTwice: 'blink 0.5s ease-in-out 2',
      },
    },
    colors:{
      "chess":{
        "blackBg": "#36454F",
        "whiteBg":"#D3D3D3"
      }
    }
  },
  plugins: [],
}


import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
            keyframes: {
        move: {
          '0%': { transform: 'translateX(-200px)' },
          '100%': { transform: 'translateX(200px)' },
        },
      },
      animation: {
        move: 'move 5s linear infinite',
      },

      fontFamily: {
      roxborough: ['RoxboroughCF', 'serif'],
    },
  },
  translate: {
        'z-10': '10px',
        'z-20': '20px',
        'z-25': '25px',
        'z-26': '26px',
        'z-40': '40px',
        'z-50': '50px',
        'z-60': '60px',
        'z-80': '80px',
        'z-100': '100px',
        'z-120': '120px',
      },
    },
  darkMode: "class",
  variants: {
    extend: {
      translate: ['responsive', 'hover', 'focus'],
      animation: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
      

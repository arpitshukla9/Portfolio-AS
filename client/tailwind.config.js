import daisyui from "daisyui";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        move: {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(200px)" },
        },
      },
      animation: {
        move: "move 5s linear infinite",
      },
      fontFamily: {
        roxborough: ["RoxboroughCF", "serif"],
      },
      zIndex: {
        10: "10",
        20: "20",
        25: "25",
        26: "26",
        40: "40",
        50: "50",
        60: "60",
        80: "80",
        100: "100",
        120: "120",
      },
      colors: {
        skin: {
          base: "var(--color-base)",
          muted: "var(--color-muted)",
          border: "var(--color-border)",
          card: "var(--color-card)",
          heading: "var(--color-heading)",
          text: "var(--color-text)",
          accent: "var(--color-accent)",
          glow: "var(--color-accent-glow)",
          glow: {
            purple: "rgba(167, 139, 250, 0.15)",
            blue: "rgba(96, 165, 250, 0.15)",
            amber: "rgba(251, 191, 36, 0.15)",
            emerald: "rgba(52, 211, 153, 0.15)",
          },
        },
      },
      backgroundImage: {
        "skin-gradient": "var(--color-gradient)",
      },
    },
  },
  variants: {
    extend: {
      translate: ["responsive", "hover", "focus"],
      animation: ["responsive", "hover", "focus"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".bg-glass": {
          backgroundColor: "var(--glass-bg)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
        },
        ".blur-glass": {
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
        },
      });
    },
  ],
};
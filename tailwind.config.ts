import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Paleta Dragon Ball: cielo -> azul profundo en los tonos altos
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#cde4fb",
          300: "#a9d1fa",
          400: "#81bef7",
          500: "#5aa6f0",
          600: "#3d8fe0",
          700: "#1e3f66",
          800: "#122c4d",
          900: "#0b2161",
        },
        // Amarillo Nimbus / resplandor Super Saiyajin
        gold: {
          50: "#fefbe8",
          100: "#fdf3b8",
          200: "#fce87a",
          300: "#fbdd4a",
          400: "#facc2e",
          500: "#eeb815",
          600: "#c9950e",
          700: "#a1720e",
          800: "#6b4f0a",
        },
        goku: {
          // Naranja del traje + azul profundo de la camiseta interior
          orange: "#f0712a",
          blue: "#1e3f66",
          navy: "#0b2161",
          hair: "#1f2733",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        drift: {
          "0%": { transform: "translateX(-8%)" },
          "100%": { transform: "translateX(108%)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0.4)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        glowpulse: {
          "0%, 100%": { filter: "drop-shadow(0 0 6px rgba(250,204,46,0.45))" },
          "50%": { filter: "drop-shadow(0 0 18px rgba(250,204,46,0.85))" },
        },
        bouncein: {
          "0%": { opacity: "0", transform: "scale(0.55) translateY(24px)" },
          "60%": { opacity: "1", transform: "scale(1.06) translateY(-4px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        twinkle: "twinkle 2.6s ease-in-out infinite",
        glowpulse: "glowpulse 4s ease-in-out infinite",
        bouncein: "bouncein 0.9s cubic-bezier(0.25, 1, 0.5, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;

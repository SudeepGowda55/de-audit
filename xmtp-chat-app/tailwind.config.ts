import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import formsPlugin from "@tailwindcss/forms";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/component-library/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        84: "21rem",
      },
      colors: {
        b: {
          100: "#BFCEFF",
          200: "#90A9FF",
          300: "#5E80F6",
          400: "#3448FF",
          500: "#0c2cdc",
          600: "#0004a5",
        },
        bt: {
          100: "#F5F6FF",
          200: "#EDEFFF",
          300: "#E1E4FF",
        },
        g: {
          100: "#61E979",
        },
        l: {
          100: "#ffaa85",
          200: "#ff7658",
          300: "#FC4F37",
          400: "#c91812",
          500: "#990101",
          600: "#690000",
        },
        n: {
          100: "#c2c6d2",
          200: "#989ca7",
          300: "#70747e",
          400: "#4a4e57",
          500: "#272b34",
          600: "#010613",
        },
        p: {
          100: "#ffcfff",
          200: "#da9dfd",
          300: "#AC73E7",
          400: "#824DBD",
          500: "#5a2895",
          600: "#31006e",
        },
        y: {
          100: "#f5e33e",
          200: "#c7b902",
        },
      },
      fontFamily: {
        sans: ["SF Pro Rounded", "Inter", ...fontFamily.sans],
        mono: ["Inconsolata", ...fontFamily.mono],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "15px",
        lg: "18px",
        xl: "20px",
      },
    },
  },
  plugins: [formsPlugin],
} satisfies Config;

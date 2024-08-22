import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}","./src/commons/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e3ebfe",
          100: "#c7d8fc",
          200: "#abc4fb",
          300: "#8fb1fa",
          400: "#739df8",
          500: "#578AF7",
          600: "#0a4bd5",
          700: "#578AF7",
        },
        secondary: {
          50: "#e4e3fe",
          100: "#cac7fc",
          200: "#afabfb",
          300: "#948ffa",
          400: "#739df8",
          500: "#5F57F7",
          600: "#140ad5",
          700: "#0a056a",
        },
        tertiary: {
          50: "#eee3fe",
          100: "#dec7fc",
          200: "#cdabfb",
          300: "#bd8ffa",
          400: "#ac73f8",
          500: "#9C57F7",
          600: "#610ad5",
          700: "#31056a",
        },
        vibrant: {
          50: "#f9e3fe",
          100: "#f3c6fd",
          200: "#eeaafd",
          300: "#e88efc",
          400: "#e271fb",
          500: "#DC55FA",
          600: "#b306d9",
          700: "#59036c",
        },
        pastel: {
          50: "#fee3f4",
          100: "#fcc7e9",
          200: "#fbabdd",
          300: "#fa8fd2",
          400: "#f873c7",
          500: "#F757BC",
          600: "#d50a8a",
          700: "#6a0545",
        },
        soft: {
          50: "#feeaf7",
          100: "#fdd5ef",
          200: "#fdc0e7",
          300: "#fcabde",
          400: "#fb96d6",
          500: "#FA81CE",
          600: "#f30a9e",
          700: "#7a054f",
        },
        myColorWhite: {
          500: "#e6e6e6",
        },
        myColorBlack: {
          500: "#333333",
        },
        myColorTransparent: {
          500: "rgba(222, 199, 252, 0.25)",
        },
        myPlaceholder: {
          500: "#D4C4C4",
        },
        myColorRed: {
          500: "#E53935",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        gradientLight: "linear-gradient(90deg, #578AF7 16.64%, #DC55FA 100%)",
        gradientDark: "linear-gradient(90deg, #2D4984 16.64%, #AD3BC6 100%)",
      },
      //al ser otra propiedad, boxShadow va fuera de 'colors' =>
      boxShadow: {
        custom: "0px 4px 10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [
    function ({ addVariant }: any) {
      addVariant("warning", "&.warningMode"); // Aquí defines tu variante `warningMode`
    },
  ],
};

export default config;

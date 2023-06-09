/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

const primary = "#E30B13";

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary,
      black: colors.black,
      white: colors.white,
      transparent: colors.transparent,
      yellow: {
        700: "#F5C521",
      },
      gray: {
        300: "#d9dae8",
        500: "#999AA5",
        600: "#66676E",
        700: "#39393F",
        800: "#242529",
        900: "#191B1F",
        950: "#101215",
      },
    },
    extend: {
      screens: {
        "ssm": "500px",
        "xs": "400px",
      },
      spacing: {
        0.5: "0.12rem",
        layout: "2.75rem",
      },
      fontSize: {
        "2lg": "1.38rem",
      },
      borderRadius: {
        image: "0.5rem",
        layout: "0.8rem",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-in-out",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
      },
      keyframes: {
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        scaleIn: {
          from: {
            opacity: 0,
            transform: "scale(0.9)",
          },
          "50%": {
            opacity: 0.3,
          },
          to: {
            opacity: 1,
            transform: "scale(1)",
          },
        },
      },
      animation: {
        fade: "fade .5s ease-in-out",
        scaleIn: "scaleIn .35s ease-in-out",
      },
    },
  },
  plugins: [
    // require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    plugin(({ addComponents, theme, addUtilities }) => {
      /** @type {import('react').CSSProperties} */
      const btnPrimary = {
        backgroundColor: primary,
        color: "#fff",
        borderRadius: "0.65rem",
        transition: "background-color .3s ease-in-out",
        "&:hover": {
          backgroundColor: "#ff0009",
        },
      };
      /** @type {import('react').CSSProperties} */
      const textLink = {
        textUnderlineOffset: 4,
        color: "rgba(255,255,255, .9)",
        transition: "text-decoration-color .3s ease-in-out",
        textDecorationLine: "underline",
        textDecorationColor: "rgba(255,255,255, .2)",
        "&:hover": {
          textDecorationColor: "rgba(255,255,255, .9)",
        },
      };
      /** @type {import('react').CSSProperties} */
      const airBlock = {
        borderRadius: theme("borderRadius.layout"),
        backgroundColor: theme("colors.gray.950"),
        color: theme("colors.white"),
        boxShadow: theme("boxShadow.lg"),
      };

      addComponents({
        ".btn-primary": btnPrimary,
        ".text-link": textLink,
        ".air-block": airBlock,
      });

      addUtilities({
        ".text-shadow": {
          textShadow: "1px 1px rgba(0,0,0, .4)",
        },
        ".full-screen": {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        ".max-h-inf": {
          maxHeight: "3000px"
        },
        ".outline-border-none": {
          outline: "none",
          border: "none",
        },
        ".flex-center-between": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        ".image-like-bg": {
          objectPosition: "center",
          objectFit: "cover",
          pointerEvents: "none",
        },
        ".hide-scroll": {
          scrollWidth: "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            display: "none"
          },
        },
        ".no-bg": {
          background: "none!important",
        },
        ".ratio-16-9": {
          position: "relative",
          width: "100%",
          paddingBottom: "56%"
        },
        ".ratio-2-3": {
          position: "relative",
          width: "100%",
          paddingBottom: "150%"
        },
        ".pb-full": {
          paddingBottom: "100%"
        }

      });

    }),
  ],
};

import { createStitches } from "@stitches/react";

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  css,
} = createStitches({
  theme: {
    colors: {
      gray100: "#e1e1e6",
      gray300: "#c4c4cc",
      gray800: "#202024",
      gray900: "#121214",

      green300: "#00b37e",
      green500: "#00875f",

      white: "#fff",
    },
    fontSizes: {
      "2xl": "2rem",
      lg: "1.25rem",
      md: "1.125rem",
      xl: "1.5rem",
    },
  },
});

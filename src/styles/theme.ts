import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";

const theme = extendTheme({
  colors: {
    primary: "#990001",
    secondary: "#6748e3",
    accent: "#212529",
    accentAlt: "#912820",
    offWhite: "#F9FAFB",
  },
  fonts: {
    body: `"Inter", sans-serif`,
    heading: `"Inter", sans-serif`,
  },
  breakpoints: {
    sm: "320px",
    md: "868px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
});

export default theme;

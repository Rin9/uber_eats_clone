import { extendTheme } from "@chakra-ui/react";

// import { styles } from "./styles";
import { Button } from "./components/button";
import { Text } from "./components/text";
import { Heading } from "@chakra-ui/react";

const overrides = {
  colors: {
    lime: {
      50: "#f2ffde",
      100: "#defcb2",
      200: "#caf884",
      300: "#b5f554",
      400: "#a1f226",
      500: "#88d90d",
      600: "#69a905",
      700: "#4a7801",
      800: "#2b4800",
      900: "#0b1900",
    },
    black: {
      50: "#0d0d0d",
      100: "#0d0d0d",
      200: "#0d0d0d",
      300: "#0d0d0d",
      400: "#0d0d0d",
      500: "#0d0d0d",
      600: "#0d0d0d",
      700: "#0d0d0d",
      800: "#0d0d0d",
      900: "#0d0d0d",
    },
  },
  styles: {
    global: {
      "html, body": {
        fontFamily: "Rubik, sans-serif",
      },
    },
  },
  components: {
    Button,
    Text,
    Heading,
  },
};

export const theme = extendTheme(overrides);

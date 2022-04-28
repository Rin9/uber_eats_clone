import { extendTheme } from "@chakra-ui/react";

// import { styles } from "./styles";
import { Button } from "./components/button";
import { Text } from "./components/text";
import { Heading } from "@chakra-ui/react";

const overrides = {
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

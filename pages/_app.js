import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";
import { theme } from "../styles/theme/index";
import "@fontsource/rubik";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppContext>
        <Component {...pageProps} />
      </AppContext>
    </ChakraProvider>
  );
}

export default MyApp;

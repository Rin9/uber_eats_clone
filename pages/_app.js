import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";
// cart context
import { CartContext } from "../context/CartContext";
import { theme } from "../styles/theme/index";
import "@fontsource/rubik";
import { SessionProvider } from "next-auth/react";
// toaster
import { Toaster } from "react-hot-toast";

//progress bar
import nProgress from "nprogress";
import "../styles/nprogress.css";

import Router from "next/router";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeComplete", nProgress.done);
Router.events.on("routeChangeError", nProgress.done);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider theme={theme}>
      {/* nextauth session */}
      <SessionProvider session={session}>
        <AppContext>
          <CartContext>
            <Toaster />
            <Component {...pageProps} />
          </CartContext>
        </AppContext>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;

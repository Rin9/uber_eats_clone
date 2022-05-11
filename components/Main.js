import React from "react";
import { Flex } from "@chakra-ui/react";
import MainRight from "./parts/MainRight";
import MainLeft from "./parts/MainLeft";

const Main = ({ mainData }) => {
  return (
    <Flex
      mx="0"
      px="0"
      position="relative"
      height="100vh"
      pt="30px"
      maxW="100vw"
    >
      {/* left filter */}
      <MainLeft />
      {/* right content */}
      <MainRight mainData={mainData} />
    </Flex>
  );
};

export default Main;

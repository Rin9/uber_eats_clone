import { Flex, Image, VStack, Text, Skeleton } from "@chakra-ui/react";
import React from "react";
import { urlFor } from "../lib/client";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import Router from "next/router";

const BannerItem = ({ item, isLoaded }) => {
  return (
    <Link href="/" passHref>
      <Skeleton isLoaded={isLoaded}>
        <VStack minW="90px">
          <Image
            _hover={{
              backgroundColor: "gray.300",
              rounded: "full",
              cursor: "pointer",
            }}
            transitionDuration="500ms"
            transitionTimingFunction="ease-in-out"
            transitionProperty="all"
            maxH={{ base: "50px", md: "70px" }}
            src={urlFor(item.image)}
            alt={item.text}
          />
          <Text
            textTransform="capitalize"
            fontSize={{ base: "md", md: "md", lg: "md", xl: "lg" }}
          >
            {item.text}
          </Text>
        </VStack>
      </Skeleton>
    </Link>
  );
};

const Banner = ({ bannerData }) => {
  const { isLoaded } = useAppContext();
  return (
    <Flex
      minH="150px"
      boxShadow="md"
      rounded="md"
      justify={{ base: "", md: "space-evenly" }}
      align="center"
      overflowX="auto"
      columnGap={{ base: "20px" }}
      paddingX={{ base: "20px", md: "" }}
    >
      {bannerData.map((item) => {
        return <BannerItem key={item._id} item={item} isLoaded={isLoaded} />;
      })}
    </Flex>
  );
};

export default Banner;

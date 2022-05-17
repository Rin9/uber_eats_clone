import React, { useState } from "react";
import {
  Flex,
  Heading,
  Box,
  Text,
  SimpleGrid,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { formatPrice } from "../../lib/utils/util";
import { urlFor } from "../../lib/client";
import { truncate } from "../../lib/utils/util";
import Link from "next/link";

const StoreComponent = ({ storesData, type }) => {
  return (
    <Box mt="100px" px="50px" width="100vw" minH="800px">
      <Flex pt="50px" flexDir="column" rowGap="10px" maxW="100vw">
        <Heading as={"h1"}>{type}</Heading>

        <SimpleGrid
          maxW="100vw"
          columns={[1, 1, 2, 3, 4, 5]}
          spacing="50px"
          pt="20px"
        >
          {storesData.map((item) => {
            return (
              <Link key={item._id} href={`/products/${item._id}`} passHref>
                <Flex
                  transition="all"
                  transitionDuration="300ms"
                  transitionTimingFunction="ease-in"
                  _hover={{
                    boxShadow: "md",
                  }}
                  position="relative"
                  maxH="400px"
                  flexDir="column"
                  rowGap="10px"
                  cursor="pointer"
                  // onClick={() => {
                  //   setProductInfo(item);
                  //   setProductNum(1);
                  //   onOpen();
                  // }}
                >
                  <Box
                    backgroundImage={`${urlFor(item.image)}`}
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="cover"
                    height="200px"
                    transition="all"
                    transitionDuration="300ms"
                    transitionTimingFunction="ease-in"
                    _hover={{
                      transform: "scale(0.95)",
                    }}
                  />

                  <Flex justify="space-between" align="flex-start">
                    <Heading as={"h2"} fontSize="md">
                      {truncate(item.name, 35)}
                    </Heading>
                    <Box
                      backgroundColor="gray.200"
                      rounded="full"
                      p="1"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      {item.score / 10}
                    </Box>
                  </Flex>
                  {/* delivery tag */}
                  <Flex align="center">
                    {formatPrice(parseInt(item.deliveryFee))} Delivery Fee
                    &nbsp;•&nbsp;
                    <Text fontWeight="lighter">
                      {item.minDeliveryTime} - {item.maxDeliveryTime} min
                    </Text>
                  </Flex>
                </Flex>
              </Link>
            );
          })}
        </SimpleGrid>
      </Flex>
      {/* overlay item detail */}
      {/* <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        productInfo={productInfo}
        productNum={productNum}
        setProductNum={setProductNum}
      /> */}
    </Box>
  );
};

export default StoreComponent;

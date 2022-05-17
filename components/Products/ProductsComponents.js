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
import { AiFillStar, AiOutlinePlus } from "react-icons/ai";
import { formatPrice } from "../../lib/utils/util";
import { urlFor } from "../../lib/client";
import ModalComponent from "./ModalComponent";
import { useCartContext } from "../../context/CartContext";
import ErrorComponent from "../parts/ErrorComponent";

const ProductsComponents = ({ productsData }) => {
  const { onAdd } = useCartContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productInfo, setProductInfo] = useState(null);
  const [productNum, setProductNum] = useState(1);
  // console.log("Products", productsData);
  const data = productsData[0];
  let priceRange = "";
  switch (data.priceRange) {
    case 1:
      priceRange = "$";

    default:
      priceRange = "$";
  }
  return (
    <Box mt="100px" px="50px" width="100vw" minH="800px">
      <Flex pt="50px" flexDir="column" rowGap="10px" maxW="100vw">
        <Heading as={"h1"}>{data.name}</Heading>
        <Flex justify="flex-start" align="center">
          <AiFillStar /> &nbsp;•&nbsp;
          <Text>{data.score / 10}&nbsp;•&nbsp;</Text>
          <Text>{priceRange}</Text>
        </Flex>
        <Flex justify="flex-start" align="center">
          <Text fontWeight="lighter">
            {data.minDeliveryTime} - {data.maxDeliveryTime} min&nbsp;•&nbsp;
            {formatPrice(data.deliveryFee)} Delivery Fee
          </Text>
        </Flex>
        <SimpleGrid
          maxW="100vw"
          columns={[1, 1, 2, 3, 4, 5]}
          spacing="50px"
          pt="20px"
        >
          {data.products.map((item) => {
            return (
              <Flex
                key={item._id}
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
                onClick={() => {
                  setProductInfo(item);
                  setProductNum(1);
                  onOpen();
                }}
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
                <IconButton
                  rounded="full"
                  icon={<AiOutlinePlus color="white" />}
                  position="absolute"
                  top="10px"
                  right="10px"
                  colorScheme="black"
                  _hover={{
                    bgColor: "gray",
                  }}
                  //quick add to cart
                  onClick={(event) => {
                    event.stopPropagation();
                    onAdd(item, 1);
                  }}
                />
                <Text>{item.name}</Text>
                <Text>
                  {formatPrice(item.price)}&nbsp;•&nbsp;
                  <span style={{ fontWeight: "100", color: "gray" }}>
                    {item.calorie}&nbsp;Cal.
                  </span>
                </Text>
              </Flex>
            );
          })}
        </SimpleGrid>
      </Flex>
      {/* overlay item detail */}
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        productInfo={productInfo}
        productNum={productNum}
        setProductNum={setProductNum}
      />
    </Box>
  );
};

export default ProductsComponents;

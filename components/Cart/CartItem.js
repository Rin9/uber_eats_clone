import { Flex, Image, Heading, Text, IconButton } from "@chakra-ui/react";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { urlFor } from "../../lib/client";
import { formatPrice } from "../../lib/utils/util";
import { useCartContext } from "../../context/CartContext";

const CartItem = ({ product }) => {
  console.log("This is product info in CartItem", product);
  const { toggleCartItemQuanitity } = useCartContext();
  return (
    <Flex>
      <Image src={urlFor(product.image)} alt="burger" width="50%" />
      <Flex
        direction="column"
        paddingLeft="10px"
        paddingTop="10px"
        rowGap="10px"
      >
        <Heading as={"h4"} fontSize="md">
          {product.name}
        </Heading>
        <Text>{formatPrice(product.price * product.quantity)}</Text>
        <Flex justify="flex-start" align="center" columnGap="10px">
          <IconButton
            icon={<AiOutlineMinus />}
            rounded="full"
            onClick={() => toggleCartItemQuanitity(product._id, "dec")}
            // disabled={product.quantity === 1}
          />
          <Text>{product.quantity}</Text>
          <IconButton
            icon={<AiOutlinePlus />}
            rounded="full"
            onClick={() => toggleCartItemQuanitity(product._id, "inc")}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;

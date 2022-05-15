import React, { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import CartItem from "./CartItem";
import { useCartContext } from "../../context/CartContext";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Cart = () => {
  const { cartObj } = useCartContext();
  // const [cart, setCart] = useState();
  // useEffect(() => {
  //   setCart(cartObj.cart);
  // }, [cartObj]);

  return (
    <Flex
      flexDirection="column"
      rowGap="20px"
      width="100%"
      overflowY="auto"
      height="300px"
      pb="20px"
      sx={{
        "&::-webkit-scrollbar": {
          width: "8px",
          borderRadius: "8px",
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "8px",
          backgroundColor: `#049a52`,
        },
      }}
    >
      {cartObj?.cart?.length > 0 ? (
        cartObj?.cart?.map((item) => {
          return <CartItem key={item._id} product={item} />;
        })
      ) : (
        <Flex
          justify="center"
          align="center"
          height="100%"
          flexDir="column"
          rowGap="30px"
        >
          <AiOutlineShoppingCart size="5rem" />
          <Text fontSize="1.5rem">No Items For Now..</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Cart;

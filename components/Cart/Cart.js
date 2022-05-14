import React, { useState, useEffect } from "react";
import { Container, Flex } from "@chakra-ui/react";
import CartItem from "./CartItem";
import { useCartContext } from "../../context/CartContext";

const Cart = () => {
  const { cartObj } = useCartContext();
  console.log("This is cartObj in cart", cartObj);
  const [cart, setCart] = useState();
  useEffect(() => {
    setCart(cartObj.cart);
  }, [cartObj]);

  return (
    <Flex
      flexDirection="column"
      rowGap="20px"
      width="100%"
      overflowY="auto"
      height="300px"
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
      {cart?.map((item) => {
        return <CartItem key={item._id} product={item} />;
      })}
    </Flex>
  );
};

export default Cart;

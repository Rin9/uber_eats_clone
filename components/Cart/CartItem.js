import {
  Flex,
  Image,
  Heading,
  Text,
  IconButton,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import React from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { urlFor } from "../../lib/client";
import { formatPrice } from "../../lib/utils/util";
import { useCartContext } from "../../context/CartContext";

const CartItem = ({ product }) => {
  const { toggleCartItemQuanitity, removeCartItem } = useCartContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  return (
    <Flex flexDir="column">
      <Flex>
        <Image src={urlFor(product.image)} alt="burger" width="50%" />
        <Flex
          direction="column"
          paddingLeft="10px"
          paddingTop="10px"
          rowGap="15px"
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
          {/* <Button onClick={onToggle}>Remove</Button> */}
          <Popover isOpen={isOpen} onClose={close}>
            <PopoverTrigger>
              <Button onClick={open} width={{ base: "100px", lg: "200px" }}>
                Remove
              </Button>
            </PopoverTrigger>
            <PopoverContent width="200px" bgColor="gray.100">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Sure To Remove?</PopoverHeader>
              <PopoverBody>
                <Flex columnGap="20px" justify="center" align="center">
                  <IconButton
                    rounded="full"
                    colorScheme="red"
                    icon={<AiOutlineCheck />}
                    onClick={() => removeCartItem(product._id)}
                  />
                  <IconButton
                    rounded="full"
                    color="#05c167"
                    bgColor="gray.300"
                    icon={<AiOutlineClose />}
                    onClick={close}
                  />
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;

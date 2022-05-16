import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  IconButton,
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  Box,
  PopoverFooter,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { GoSignIn } from "react-icons/go";
import Image from "next/image";
import logo from "../public/assets/logo.svg";
import Link from "next/link";
import Cart from "./Cart/Cart";
import useWindowOffsetY from "../lib/utils/useWindowOffsetY";
import { useCartContext } from "../context/CartContext";
import { useSession } from "next-auth/react";
import getStripe from "../lib/utils/getStripe";
import { formatPrice } from "../lib/utils/util";
import toast from "react-hot-toast";

// const SwitchComponent = () => {
//   const { isDelivery, setIsDelivery } = useAppContext();
//   return (
//     <Switch
//       checked={isDelivery}
//       onChange={setIsDelivery}
//       className={`${isDelivery ? "bg-gray-500" : "bg-gray-500"}
//           relative inline-flex flex-shrink-0 h-[38px] w-[180px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
//     >
//       <span
//         aria-hidden="true"
//         className={`${isDelivery ? "translate-x-[0]" : "translate-x-[90px]"}
//             pointer-events-none flex items-center justify-center h-[34px] w-[85px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 font-rubik`}
//       >
//         {isDelivery ? "Dilivery" : "Pick Up"}
//       </span>
//     </Switch>
//   );
// };

const Navbar = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const { totalQuantities, cartObj, initalizeCart } = useCartContext();

  // get session from next-auth
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseCart = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleOpenCart = useCallback(() => {
    setIsOpen(!isOpen);
  }, []);

  const cartEl = useRef(null);
  // const [clientHeight, setClientHeight] = useState(0);

  const scrollY = useWindowOffsetY();

  let progress = 0;
  const { current: elContainer } = cartEl;

  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight);
  }

  useEffect(() => {
    if (progress >= 0.5) {
      handleCloseCart();
    }
  }, [progress]);

  const handleCheckOut = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartObj),
    });
    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    initalizeCart();

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    // Main container of the navbar
    <Flex
      width={{ base: "100vw", lg: "100vw" }}
      minH="100px"
      boxShadow="md"
      rounded="md"
      flexDirection="row"
      align="center"
      justify="space-between"
      position="fixed"
      top="0"
      left="0"
      zIndex="10"
      backgroundColor="white"
      m="0"
    >
      {/* logo and burger menu */}
      <Flex
        justify="space-between"
        align="center"
        width="200px"
        marginLeft={{ base: "5", md: "10" }}
      >
        {/* <IconButton
          aria-label="menu"
          icon={<GiHamburgerMenu size="25" />}
          onClick={onOpen}
        /> */}
        {/* <DrawerComponent isOpen={isOpen} onClose={onClose} /> */}
        <Link href="/" passHref>
          <Box cursor="pointer">
            <Image src={logo} height="80" alt="logo" />
          </Box>
        </Link>
      </Flex>
      {/* switch for dilivery or pickup*/}
      {/* {width >= 400 && <SwitchComponent />} */}

      <Flex
        justify="space-between"
        align="center"
        columnGap="10px"
        pr={{ base: "10px", lg: "30px" }}
        minW="10vw"
      >
        {/* This is cart button */}
        <Popover isOpen={isOpen} onClose={handleCloseCart}>
          <PopoverTrigger>
            <Button
              leftIcon={<AiOutlineShoppingCart />}
              colorScheme="blackAlpha"
              backgroundColor="black"
              variant="solid"
              onClick={handleOpenCart}
            >
              Cart | {totalQuantities}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            width={{ base: "350px", lg: "500px" }}
            mr="20px"
            transitionDuration="500ms"
            transitionTimingFunction="ease-in-out"
            ref={cartEl}
          >
            <PopoverArrow />
            <PopoverCloseButton onClick={handleCloseCart} />
            <PopoverHeader>Cart</PopoverHeader>
            <PopoverBody>
              <Cart />
            </PopoverBody>
            <PopoverFooter textAlign="center">
              <Flex justifyContent="space-around" align="center">
                <Text fontWeight="900" fontSize="lg">
                  Total : {formatPrice(cartObj.totalPrice)}
                </Text>
                <Button
                  colorScheme="green"
                  onClick={handleCheckOut}
                  disabled={cartObj.totalQuantities === 0}
                >
                  Check Out
                </Button>
              </Flex>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
        {/* sign in button */}
        <Link href={"/auth/signin"} passHref>
          <Button
            leftIcon={session ? <AiOutlineUser /> : "Sign In"}
            colorScheme="gray"
            variant="solid"
            pr="10px"
          />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;

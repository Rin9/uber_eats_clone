import React, { useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import logo from "../public/assets/logo.svg";
import DrawerComponent from "./parts/DrawerComponent";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      columnGap="10"
    >
      {/* logo and burger menu */}
      <Flex
        justify="space-between"
        align="center"
        width="200px"
        marginLeft={{ base: "5", md: "10" }}
      >
        <IconButton
          aria-label="menu"
          icon={<GiHamburgerMenu size="25" />}
          onClick={onOpen}
        />
        <DrawerComponent isOpen={isOpen} onClose={onClose} />
        <Image src={logo} height="80" alt="logo" />
      </Flex>
      {/* switch for dilivery or pickup*/}
      {/* {width >= 400 && <SwitchComponent />} */}

      <Popover>
        <PopoverTrigger>
          <Button
            leftIcon={<AiOutlineShoppingCart />}
            colorScheme="blackAlpha"
            backgroundColor="black"
            variant="solid"
            marginRight={{ base: "5", md: "10" }}
          >
            Cart
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            Are you sure you want to have that milkshake?
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Navbar;

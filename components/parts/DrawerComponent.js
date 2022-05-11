import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link as InnerLink,
  Stack,
  Flex,
  RadioGroup,
  Radio,
  Switch,
  FormControl,
  FormLabel,
  HStack,
  Button,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiLeafLine, RiHeartPulseFill } from "react-icons/ri";
import { useAppContext } from "../../context/AppContext";

const DrawerComponent = ({ onClose, isOpen }) => {
  // const {
  //   sortState,
  //   setSortState,
  //   switchValue,
  //   setSwitchValue,
  //   priceTag,
  //   setPriceTag,
  //   deliveryFee,
  //   setDeliveryFee,
  //   dietary,
  //   setDietary,
  // } = useAppContext();

  // // handle filter change
  // const handleFilterChange = (e, type) => {
  //   if (type === "sort") {
  //     setSortState(e.target.value);
  //   }
  //   if (type.includes("switch")) {
  //     setSwitchValue((prev) => {
  //       return {
  //         ...prev,
  //         [type]: !prev[type],
  //       };
  //     });
  //   }
  //   if (type.includes("price")) {
  //     setPriceTag((prev) => {
  //       return {
  //         ...prev,
  //         [type]: !prev[type],
  //       };
  //     });
  //   }
  //   if (type.includes("delivery")) {
  //     setDeliveryFee((prev) => {
  //       return {
  //         ...prev,
  //         [type]: !prev[type],
  //       };
  //     });
  //   }
  //   if (type.includes("dietary")) {
  //     setDietary((prev) => {
  //       return {
  //         ...prev,
  //         [type]: !prev[type],
  //       };
  //     });
  //   }
  // };

  return (
    <Drawer size="xs" placement={"left"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
        <DrawerBody></DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;

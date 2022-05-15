import React, { useState } from "react";
import {
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

const MainLeft = () => {
  const { filterState, setFilterState } = useAppContext();

  // handle filter change
  const handleFilterChange = (e, type) => {
    e.preventDefault();
    if (type === "sort") {
      setFilterState((prev) => {
        return {
          ...prev,
          sort: e.target.value,
        };
      });
      // setSortState(e.target.value);
    }
    if (type.includes("switch")) {
      setFilterState((prev) => {
        return {
          ...prev,
          switch: {
            ...prev.switch,
            [type]: !prev.switch[type],
          },
        };
      });
    }
    if (type.includes("price")) {
      setFilterState((prev) => {
        return {
          ...prev,
          price: {
            ...prev.price,
            [type]: !prev.price[type],
          },
        };
      });
    }
    if (type.includes("delivery")) {
      setFilterState((prev) => {
        return {
          ...prev,
          delivery: {
            ...prev.delivery,
            [type]: !prev.delivery[type],
          },
        };
      });
    }
    if (type.includes("dietary")) {
      setFilterState((prev) => {
        return {
          ...prev,
          dietary: {
            ...prev.dietary,
            [type]: !prev.dietary[type],
          },
        };
      });
    }
  };
  return (
    <Flex
      direction="column"
      rowGap="20px"
      width="30vw"
      pl="40px"
      maxH="100vw"
      display={{ base: "none", lg: "flex" }}
    >
      {/* todo: fix the link */}
      {/* <Link href="/" passHref>
                <InnerLink textDecor="underline">Clear All</InnerLink>
              </Link> */}
      <Accordion width="20vw" defaultIndex={[0, 1, 2, 3, 4]} allowMultiple>
        {/* sort */}
        <AccordionItem border="none">
          <AccordionButton px="0">
            <Box flex="1" textAlign="left">
              <Heading as={"h4"} fontSize="2xl">
                Sort
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} px="10px">
            <RadioGroup
              onChange={() => handleFilterChange(event, "sort")}
              value={filterState.sort}
            >
              <Stack direction="column">
                <Radio value="pfy" colorScheme="black">
                  Picked for you
                </Radio>
                <Radio value="mp" colorScheme="black">
                  Most popular
                </Radio>
                <Radio value="r" colorScheme="black">
                  Rating
                </Radio>
                <Radio value="dt" colorScheme="black">
                  Delivery time
                </Radio>
              </Stack>
            </RadioGroup>
          </AccordionPanel>
        </AccordionItem>
        {/* From Uber Eats */}
        <AccordionItem border="none">
          <h2>
            <AccordionButton px="0">
              <Box flex="1" textAlign="left">
                <Heading as={"h4"} fontSize="2xl">
                  From Uber Eats
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} px="0">
            <Stack direction="column" pl="10px">
              <FormControl
                display="flex"
                flexDir="column"
                rowGap="20px"
                alignItems="flex-start"
                pr="20px"
              >
                <Box width="100%" display="flex" justifyContent="space-between">
                  <FormLabel htmlFor="deals" mb="0">
                    Deals
                  </FormLabel>
                  <Switch
                    id="deals"
                    colorScheme="black"
                    size="lg"
                    value={filterState.switch["switch-1"]}
                    onChange={() => handleFilterChange(event, "switch-1")}
                  />
                </Box>
                <Box width="100%" display="flex" justifyContent="space-between">
                  <FormLabel htmlFor="tops" mb="0">
                    Tops
                  </FormLabel>
                  <Switch
                    id="tops"
                    colorScheme="black"
                    size="lg"
                    value={filterState.switch["switch-2"]}
                    onChange={() => handleFilterChange(event, "switch-2")}
                  />
                </Box>
              </FormControl>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        {/* Price Range */}
        <AccordionItem border="none">
          <h2>
            <AccordionButton px="0">
              <Box flex="1" textAlign="left">
                <Heading as={"h4"} fontSize="2xl">
                  Price Range
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} px="0">
            <HStack pl="10px">
              <Button
                rounded="full"
                onClick={() => handleFilterChange(event, "price-1")}
                background={filterState.price["price-1"] ? "black" : "gray.100"}
                color={filterState.price["price-1"] ? "white" : "black"}
              >
                $
              </Button>
              <Button
                rounded="full"
                onClick={() => handleFilterChange(event, "price-2")}
                background={filterState.price["price-2"] ? "black" : "gray.100"}
                color={filterState.price["price-2"] ? "white" : "black"}
              >
                $$
              </Button>
              <Button
                rounded="full"
                onClick={() => handleFilterChange(event, "price-3")}
                background={filterState.price["price-3"] ? "black" : "gray.100"}
                color={filterState.price["price-3"] ? "white" : "black"}
              >
                $$$
              </Button>
              <Button
                rounded="full"
                onClick={() => handleFilterChange(event, "price-4")}
                background={filterState.price["price-4"] ? "black" : "gray.100"}
                color={filterState.price["price-4"] ? "white" : "black"}
              >
                $$$$
              </Button>
            </HStack>
          </AccordionPanel>
        </AccordionItem>
        {/* Max Delivery Fee */}
        <AccordionItem border="none">
          <h2>
            <AccordionButton px="0">
              <Box flex="1" textAlign="left">
                <Heading as={"h4"} fontSize="2xl">
                  Max Delivery Fee
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} px="0">
            <HStack pl="10px">
              <Button
                rounded="full"
                onClick={() => handleFilterChange(event, "delivery-1")}
                background={
                  filterState.delivery["delivery-1"] ? "black" : "gray.100"
                }
                color={filterState.delivery["delivery-1"] ? "white" : "black"}
              >
                $2
              </Button>
              <Button
                rounded="full"
                onClick={() => handleFilterChange(event, "delivery-2")}
                background={
                  filterState.delivery["delivery-2"] ? "black" : "gray.100"
                }
                color={filterState.delivery["delivery-2"] ? "white" : "black"}
              >
                $3
              </Button>
              <Button
                rounded="full"
                onClick={() => handleFilterChange(event, "delivery-3")}
                background={
                  filterState.delivery["delivery-3"] ? "black" : "gray.100"
                }
                color={filterState.delivery["delivery-3"] ? "white" : "black"}
              >
                $4
              </Button>
              <Button
                rounded="full"
                onClick={() => handleFilterChange(event, "delivery-4")}
                background={
                  filterState.delivery["delivery-4"] ? "black" : "gray.100"
                }
                color={filterState.delivery["delivery-4"] ? "white" : "black"}
              >
                $4+
              </Button>
            </HStack>
          </AccordionPanel>
        </AccordionItem>
        {/* Dietary */}
        <AccordionItem border="none">
          <AccordionButton px="0">
            <Box flex="1" textAlign="left">
              <Heading as={"h4"} fontSize="2xl">
                Dietary
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} px="0">
            <VStack pl="10px" alignItems="flex-start" gap="10px">
              <Button
                leftIcon={<RiLeafLine />}
                rounded="full"
                onClick={() => handleFilterChange(event, "dietary-1")}
                background={
                  filterState.dietary["dietary-1"] ? "black" : "gray.100"
                }
                color={filterState.dietary["dietary-1"] ? "white" : "black"}
              >
                Vegetarian
              </Button>
              <Button
                leftIcon={<RiHeartPulseFill />}
                rounded="full"
                onClick={() => handleFilterChange(event, "dietary-2")}
                background={
                  filterState.dietary["dietary-2"] ? "black" : "gray.100"
                }
                color={filterState.dietary["dietary-2"] ? "white" : "black"}
              >
                Vegan
              </Button>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default MainLeft;

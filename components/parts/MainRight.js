import React, { useState } from "react";
import {
  Flex,
  Heading,
  Link as InnerLink,
  IconButton,
  Text,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  RadioGroup,
  Radio,
  Stack,
  FormControl,
  Switch,
  FormLabel,
  HStack,
  Button,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import Link from "next/link";
import { urlFor } from "../../lib/client";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { CgMenuRight } from "react-icons/cg";
import { RiLeafLine, RiHeartPulseFill } from "react-icons/ri";
import Slider from "react-slick";
import { formatPrice, truncate } from "../../lib/utils/util";
import { useAppContext } from "../../context/AppContext";
import useFetchData from "../../lib/useFetchData";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

// Settings for the slider
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SectionItem = ({ item }) => {
  return (
    // <Skeleton height="200px" width="200px">
    <Flex direction="column" rowGap="10px" justify="flex-start">
      <Box
        key={item._id}
        minW="calc(25% - 15px)"
        height="150px"
        backgroundImage={`${urlFor(item.image)}`}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        mr="30px"
      />
      {/* name and score */}
      <Flex justify="space-between" pr="30px" align="flex-start">
        <Heading as={"h2"} fontSize="md">
          {truncate(item.name, 30)}
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
        {formatPrice(parseInt(item.deliveryFee))} Delivery Fee &nbsp;•&nbsp;
        <Text fontWeight="lighter">
          {item.minDeliveryTime} - {item.maxDeliveryTime} min
        </Text>
      </Flex>
    </Flex>
    // </Skeleton>
  );
};

const Section = ({ data }) => {
  // change the state
  const [slider, setSlider] = React.useState();
  return (
    <Flex direction="column" width="100%" pl={{ base: "20px", lg: "0px" }}>
      <Flex width="100%" align="center" justify="space-between">
        <Heading as={"h2"}>{data.name}</Heading>
        <Flex align="center" minW="150px" justify="flex-end" pr="20px">
          {/* <Link href="/" passHref>
            <InnerLink textDecor="underline">See All</InnerLink>
          </Link> */}
          <Flex dir="row" columnGap="10px">
            <IconButton
              rounded="full"
              icon={<BiLeftArrowAlt />}
              aria-label="left-arrow"
              onClick={() => slider?.slickPrev()}
            />
            <IconButton
              rounded="full"
              icon={<BiRightArrowAlt />}
              aria-label="right-arrow"
              onClick={() => slider?.slickNext()}
            />
          </Flex>
        </Flex>
      </Flex>
      {/* slider part */}
      <Box
        position={"relative"}
        height={"250px"}
        maxW="full"
        overflow={"hidden"}
        my="30px"
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* main slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {data.items.map((item, index) => (
            <SectionItem key={item._id} item={item} />
          ))}
        </Slider>
      </Box>
    </Flex>
  );
};

// const MainRight = ({ mainData }) => {
const MainRight = () => {
  const { filterState, setFilterState } = useAppContext();
  // const [mainDataLoaded, setMainDataLoaded] = useState(false);

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
      // console.log("This is e", e);
      // console.log("This is type", type);
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

  // const result = useFetchData();
  const { data: mainData, error } = useSWR(
    `/api/data/${JSON.stringify(filterState)}`,
    fetcher
  );
  console.log("Fetched data", mainData);

  return (
    <Flex
      direction="column"
      rowGap="20px"
      width={{ base: "100vw", lg: "70vw" }}
    >
      {/* this is the filter for small screen */}
      <Flex display={{ base: "flex", lg: "none" }} width="100vw">
        {/* this is filter */}
        <Accordion allowToggle width="100%">
          <AccordionItem border="none" margin="0">
            <h2>
              <AccordionButton margin="0" justifyContent="flex-end">
                {/* <Box flex="1" textAlign="left">
                  Filter
                </Box> */}
                <CgMenuRight />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Heading as={"h3"}>80 stores</Heading>
              {/* todo: fix the link */}
              {/* <Link href="/" passHref>
                <InnerLink textDecor="underline">Clear All</InnerLink>
              </Link> */}
              <Accordion
                width="100%"
                defaultIndex={[0, 1, 2, 3, 4]}
                allowMultiple
              >
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
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="space-between"
                        >
                          <FormLabel htmlFor="deals" mb="0">
                            Deals
                          </FormLabel>
                          <Switch
                            id="deals"
                            colorScheme="black"
                            size="lg"
                            value={filterState.switch["switch-1"]}
                            onChange={() =>
                              handleFilterChange(event, "switch-1")
                            }
                          />
                        </Box>
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="space-between"
                        >
                          <FormLabel htmlFor="tops" mb="0">
                            Tops
                          </FormLabel>
                          <Switch
                            id="tops"
                            colorScheme="black"
                            size="lg"
                            value={filterState.switch["switch-2"]}
                            onChange={() =>
                              handleFilterChange(event, "switch-2")
                            }
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
                        background={
                          filterState.price["price-1"] ? "black" : "gray.100"
                        }
                        color={filterState.price["price-1"] ? "white" : "black"}
                      >
                        $
                      </Button>
                      <Button
                        rounded="full"
                        onClick={() => handleFilterChange(event, "price-2")}
                        background={
                          filterState.price["price-2"] ? "black" : "gray.100"
                        }
                        color={filterState.price["price-2"] ? "white" : "black"}
                      >
                        $$
                      </Button>
                      <Button
                        rounded="full"
                        onClick={() => handleFilterChange(event, "price-3")}
                        background={
                          filterState.price["price-3"] ? "black" : "gray.100"
                        }
                        color={filterState.price["price-3"] ? "white" : "black"}
                      >
                        $$$
                      </Button>
                      <Button
                        rounded="full"
                        onClick={() => handleFilterChange(event, "price-4")}
                        background={
                          filterState.price["price-4"] ? "black" : "gray.100"
                        }
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
                          filterState.delivery["delivery-1"]
                            ? "black"
                            : "gray.100"
                        }
                        color={
                          filterState.delivery["delivery-1"] ? "white" : "black"
                        }
                      >
                        $2
                      </Button>
                      <Button
                        rounded="full"
                        onClick={() => handleFilterChange(event, "delivery-2")}
                        background={
                          filterState.delivery["delivery-2"]
                            ? "black"
                            : "gray.100"
                        }
                        color={
                          filterState.delivery["delivery-2"] ? "white" : "black"
                        }
                      >
                        $3
                      </Button>
                      <Button
                        rounded="full"
                        onClick={() => handleFilterChange(event, "delivery-3")}
                        background={
                          filterState.delivery["delivery-3"]
                            ? "black"
                            : "gray.100"
                        }
                        color={
                          filterState.delivery["delivery-3"] ? "white" : "black"
                        }
                      >
                        $4
                      </Button>
                      <Button
                        rounded="full"
                        onClick={() => handleFilterChange(event, "delivery-4")}
                        background={
                          filterState.delivery["delivery-4"]
                            ? "black"
                            : "gray.100"
                        }
                        color={
                          filterState.delivery["delivery-4"] ? "white" : "black"
                        }
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
                          filterState.dietary["dietary-1"]
                            ? "black"
                            : "gray.100"
                        }
                        color={
                          filterState.dietary["dietary-1"] ? "white" : "black"
                        }
                      >
                        Vegetarian
                      </Button>
                      <Button
                        leftIcon={<RiHeartPulseFill />}
                        rounded="full"
                        onClick={() => handleFilterChange(event, "dietary-2")}
                        background={
                          filterState.dietary["dietary-2"]
                            ? "black"
                            : "gray.100"
                        }
                        color={
                          filterState.dietary["dietary-2"] ? "white" : "black"
                        }
                      >
                        Vegan
                      </Button>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
      {mainData ? (
        mainData.map((item) => {
          return <Section data={item} key={item._id} />;
        })
      ) : (
        <Skeleton width={{ base: "100vw", lg: "65vw" }} height="300px" />
      )}
    </Flex>
  );
};

export default MainRight;

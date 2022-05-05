import React, { useState } from "react";
import {
  Flex,
  Heading,
  Link as InnerLink,
  IconButton,
  Text,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { urlFor } from "../../lib/client";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import { formatPrice, truncate } from "../../lib/utils/util";
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
        <Text fontWeight="lighter">{item.deliveryTime} min</Text>
      </Flex>
    </Flex>
  );
};

const Section = ({ data }) => {
  // change the state
  const [slider, setSlider] = React.useState();
  return (
    <Flex direction="column" width="100%" ml={{ base: "20px", lg: "0px" }}>
      <Flex width="100%" align="center" justify="space-between">
        <Heading as={"h2"}>{data.name}</Heading>
        <Flex align="center" minW="150px" justify="space-between" mr="20px">
          <Link href="/" passHref>
            <InnerLink textDecor="underline">See All</InnerLink>
          </Link>
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

const MainRight = ({ mainData }) => {
  return (
    <Flex
      direction="column"
      rowGap="20px"
      width={{ base: "100vw", lg: "70vw" }}
    >
      {mainData.map((item) => {
        return <Section data={item} key={item._id} />;
      })}
    </Flex>
  );
};

export default MainRight;

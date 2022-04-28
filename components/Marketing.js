import React from "react";
import {
  Image,
  Heading,
  Button,
  Box,
  IconButton,
  useBreakpointValue,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
// import Link from "next/link";
import { urlFor } from "../lib/client";
import { useAppContext } from "../context/AppContext";

// Settings for the slider
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
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

const MarketingItem = ({ item }) => {
  const { isLoaded } = useAppContext();
  return (
    <Skeleton isLoaded={isLoaded}>
      <Box
        key={item._id}
        height="250px"
        width="auto"
        rounded="2xl"
        position="relative"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundImage={`${
          item.type === "background" ? urlFor(item.image) : "/"
        }`}
        backgroundColor={`${item.type === "side" ? item.color : "null"}`}
        transitionProperty="all"
        transitionDuration="500ms"
        transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{
          transform: "scale(0.99)",
        }}
        mx="20px"
        pt="10px"
        pb="20px"
        pl={{ base: "10px", md: "15px", lg: "20px" }}
        _after={
          item.type === "background" && {
            content: '""',
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            rounded: "2xl",
            background:
              "linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4))",
          }
        }
      >
        {item.type === "side" && (
          <Image
            width="40%"
            height="100%"
            position="absolute"
            right="0"
            top="0"
            src={urlFor(item.image)}
            alt={item.name}
            roundedRight="2xl"
          />
        )}

        <Flex
          flexDirection="column"
          alignItems="flex-start"
          justify="space-between"
          width="55%"
          height="100%"
        >
          <Box zIndex="2">
            <Heading
              as={"h2"}
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              textColor={item.textColor}
            >
              {item.titleText}
            </Heading>
            <Heading
              pt="10px"
              as={"h2"}
              fontSize={{ base: "sm", md: "sm", lg: "md" }}
              textColor={item.textColor}
            >
              {item.smallText}
            </Heading>
          </Box>
          <Box zIndex="2">
            <Button
              zIndex="2"
              fontSize="xs"
              roundedLeft="full"
              roundedRight="full"
              colorScheme="gray"
            >
              {item.buttonText} {"->"}
            </Button>
          </Box>
        </Flex>
      </Box>
    </Skeleton>
  );
};

const Marketing = ({ marketingData }) => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState();

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  return (
    <Box
      position={"relative"}
      height={"250px"}
      maxW="full"
      overflow={"hidden"}
      mx="20px"
      my="50px"
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
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="blackAlpha"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="blackAlpha"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider title */}
      {/* <Box my="10px">
        <Heading as={"h2"} fontWeight="300" fontStyle="italic" fontSize="2rem">
          {title}
        </Heading>
      </Box> */}

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {marketingData.map((item, index) => (
          // <Link href="/" key={item._id} passHref>
          <MarketingItem key={item._id} item={item} />
          // </Link>
        ))}
      </Slider>
    </Box>
  );
};

export default Marketing;

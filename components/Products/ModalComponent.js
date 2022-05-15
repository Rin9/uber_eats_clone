import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Flex,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { urlFor } from "../../lib/client";
import { formatPrice } from "../../lib/utils/util";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCartContext } from "../../context/CartContext";

const ModalComponent = ({
  isOpen,
  onClose,
  productInfo,
  productNum,
  setProductNum,
}) => {
  const { onAdd } = useCartContext();

  const handleProdutChange = (type) => {
    if (type === "minus") {
      setProductNum((prev) => prev - 1);
    }
    if (type === "plus") {
      setProductNum((prev) => prev + 1);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width="90vw">
        {/* <ModalHeader>{productInfo?.name}</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody mt="50px">
          <Flex flexDir="column">
            <Image
              src={productInfo ? `${urlFor(productInfo?.image)}` : ""}
              alt={productInfo?.name}
            />
            <Text fontSize="xl">{productInfo?.name}</Text>
            <Text color="gray">{productInfo?.calorie}&nbsp;Cal.</Text>
            <Text>{formatPrice(productInfo?.price)}</Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex justify="space-between" align="center" width="100%">
            <Flex align="center" columnGap="10px">
              <IconButton
                icon={<AiOutlineMinus />}
                rounded="full"
                onClick={() => handleProdutChange("minus")}
                disabled={productNum === 1}
              />
              <Text>{productNum}</Text>
              <IconButton
                icon={<AiOutlinePlus />}
                rounded="full"
                onClick={() => handleProdutChange("plus")}
              />
            </Flex>
            <Button
              variant="ghost"
              onClick={() => {
                onAdd(productInfo, productNum);
              }}
            >
              add to cart
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;

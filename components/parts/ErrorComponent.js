import {
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";
import React from "react";
//next router
import { useRouter } from "next/router";

const ErrorComponent = () => {
  // nextjs router, to push user to the home page
  const router = useRouter();
  return (
    <Container mt="100px" pt="100px">
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="300px"
        rounded="md"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={4} fontSize="lg">
          Oops...
        </AlertTitle>
        <AlertDescription mt={4} mb={4} maxWidth="sm">
          No Products Now...
        </AlertDescription>
        <Button
          mt={4}
          mb={4}
          colorScheme="red"
          onClick={() => {
            router.push("/");
          }}
        >
          Back To Home
        </Button>
      </Alert>
    </Container>
  );
};

export default ErrorComponent;

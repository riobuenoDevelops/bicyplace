import { Button, Flex, Icon, Spacer, Heading, HStack } from "@chakra-ui/react";
import { IoBicycle } from "react-icons/io5";

export default function Navbar({ history }) {
  const redirectToSignUp = () => {
    history.push("/signup");
  };

  const redirectToLogin = () => {
    history.push("/login");
  };

  return (
    <Flex w="100%" bg="spaceCadet.500" p="1em" align="center">
      <HStack spacing="0.2em" align="start">
        <Icon
          h={35}
          w={35}
          as={IoBicycle}
          color="white"
          transform="rotate(-45deg)"
        />
        <Heading as="h2" fontSize="2xl" pl="0.2em" color="white">
          BicyPlace
        </Heading>
      </HStack>
      <Spacer />
      <Button
        bg="bitterLime.500"
        _hover={{ bg: "bitterLime.600" }}
        mr="0.5em"
        color="black"
        onClick={redirectToLogin}
      >
        Iniciar Sesión
      </Button>
      <Button
        bg="bitterLime.500"
        color="black"
        _hover={{ bg: "bitterLime.600" }}
        onClick={redirectToSignUp}
      >
        Registrarse
      </Button>
    </Flex>
  );
}

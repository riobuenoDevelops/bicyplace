import {
  Button,
  Flex,
  Icon,
  Spacer,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoBicycle, IoNotifications } from "react-icons/io5";
import LoggedSubMenu from "./LoggedSubMenu";
import NotificationOver from "./NotificationOver";

export default function Navbar({ kuzzleService, color, onOpen,userNotifications }) {
  const history = useHistory();
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("jwt") && jwt === "") {
      setJwt(localStorage.getItem("jwt") || "");
    }
    if (localStorage.getItem("user") && !user._id) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [jwt, user]);

  /* useEffect(() => {
    (async function getUser() {
      try {
        setUser(await kuzzleService.auth.getCurrentUser());
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, [setUser]); */

  const redirectToSignUp = () => {
    history.push("/signup");
  };

  const redirectToLogin = () => {
    history.push("/login");
  };

  return (
    <Flex w="100%" bg={color} p="1em" align="center">
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
      {jwt === "" ? (
        <>
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
        </>
      ) : (
        <HStack spacing="2em">
          <NotificationOver userNotifications={userNotifications} />
          <LoggedSubMenu
            history={history}
            kuzzleService={kuzzleService}
            user={user}
            onOpen={onOpen}
          />
        </HStack>
      )}
    </Flex>
  );
}

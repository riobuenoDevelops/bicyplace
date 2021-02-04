//dependencies imports
import { useState } from "react";
import {
  Stack,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { IoEye, IoEyeOff } from "react-icons/io5";

//component imports

export default function LoginForm({ history, kuzzleService, setLoginErrors }) {
  //useForm
  const { handleSubmit, register, errors } = useForm();

  //state Variables
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const [isPasswordHiden, setPasswordHiden] = useState(true);

  //component functions
  const onSubmitData = async (data) => {
    console.log("searching data");
    setSubmitLoading(true);
    try {
      await kuzzleService.auth.login("local", {
        username: data.email,
        password: data.password,
      });
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoginErrors(err.message);
    }
    setSubmitLoading(false);
  };

  const togglePasswordHidden = () => {
    setPasswordHiden(!isPasswordHiden);
  };

  const redirectToSignUp = () => {
    history.push("/signup");
  };

  return (
    <Stack
      p="3em"
      spacing="2em"
      borderRadius="5px"
      bg="white"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      w="40%"
    >
      <Heading as="h5" fontSize="2xl" textAlign="center">
        Iniciar Sesión en BicyPlace
      </Heading>
      <form onSubmit={handleSubmit(onSubmitData)}>
        <FormControl id="email" w="100%" isRequired>
          <FormLabel>Correo Electrónico o Username</FormLabel>
          <Input
            name="email"
            ref={register({
              required: true,
            })}
            w="100%"
            placeholder="Correo Electrónico o Username"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl id="password" w="100%" isRequired mt="2em">
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              name="password"
              ref={register({
                required: true,
              })}
              w="100%"
              placeholder="Contraseña"
              type={isPasswordHiden ? "password" : "text"}
            />
            <InputRightElement>
              <IconButton
                isRound
                variant="ghost"
                onClick={togglePasswordHidden}
                icon={
                  <Icon
                    as={isPasswordHiden ? IoEyeOff : IoEye}
                    w={5}
                    h={5}
                    color="gray.500"
                  />
                }
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <Button
          mt="2em"
          w="100%"
          isLoading={isSubmitLoading}
          bgColor="bitterLime.500"
          color="richBlack.500"
          _hover={{ backgroundColor: "bitterLime.600" }}
          type="submit"
          spinner={<BeatLoader size={8} color="#fff" />}
        >
          Iniciar Sesión
        </Button>
      </form>
      <HStack spacing={2} justify="center">
        <Text>¿Aún no tienes cuenta?</Text>
        <Button
          variant="link"
          color="unitedNationsBlue.500"
          onClick={redirectToSignUp}
        >
          Regístrate
        </Button>
      </HStack>
    </Stack>
  );
}

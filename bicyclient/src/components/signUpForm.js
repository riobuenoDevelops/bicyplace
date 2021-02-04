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

const SignUpForm = ({ history, kuzzleService, setErrors }) => {
  //useForm
  const { handleSubmit, register, errors, getValues } = useForm();

  //state Variables
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const [isPasswordHiden, setPasswordHiden] = useState(true);
  const [isRepeatPasswordHidden, setRepeatPasswordHidden] = useState(true);

  //component functions
  const onSubmitData = async (data) => {
    setSubmitLoading(true);
    try {
      await kuzzleService.security.createUser(data.username, {
        content: {
          profileIds: ["customer"],
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
        },
        credentials: {
          local: {
            username: data.username,
            password: data.password,
          },
        },
      });
      history.push("/login");
    } catch (err) {
      console.log(err);
      setErrors(err.message);
    }
    setSubmitLoading(false);
  };

  const togglePasswordHidden = () => {
    setPasswordHiden(!isPasswordHiden);
  };
  const toggleRepeatPasswordHidden = () => {
    setRepeatPasswordHidden(!isRepeatPasswordHidden);
  };

  const redirectToLogin = () => {
    history.push("/login");
  };

  return (
    <Stack
      p="3em"
      spacing="2em"
      borderRadius="5px"
      bg="white"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      w="40%"
      m="3em 0px 3em 0px"
    >
      <Heading as="h5" fontSize="2xl" textAlign="center">
        Registrate en BicyPlace
      </Heading>
      <form onSubmit={handleSubmit(onSubmitData)}>
        <FormControl id="name" w="100%" isRequired>
          <FormLabel>Nombre Completo</FormLabel>
          <Input
            name="name"
            ref={register({ required: true })}
            w="100%"
            placeholder="Nombre Completo"
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl id="username" w="100%" isRequired mt="2em">
          <FormLabel>Nombre de Usuario o Username</FormLabel>
          <Input
            name="username"
            ref={register({ required: true })}
            w="100%"
            placeholder="Nombre de Usuario"
          />
          <FormErrorMessage>{errors.username}</FormErrorMessage>
        </FormControl>
        <FormControl id="email" w="100%" isRequired mt="2em">
          <FormLabel>Correo Electrónico</FormLabel>
          <Input
            name="email"
            ref={register({
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
              ref={register({ required: true })}
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
        <FormControl id="repeatPassword" w="100%" isRequired mt="2em">
          <FormLabel>Repita Contraseña</FormLabel>
          <InputGroup>
            <Input
              name="repeatPassword"
              ref={register({
                required: true,
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || "Las contraseñas no coinciden";
                  },
                },
              })}
              w="100%"
              placeholder="Repita Contraseña"
              type={isRepeatPasswordHidden ? "password" : "text"}
            />
            <InputRightElement>
              <IconButton
                isRound
                variant="ghost"
                onClick={toggleRepeatPasswordHidden}
                icon={
                  <Icon
                    as={isRepeatPasswordHidden ? IoEyeOff : IoEye}
                    w={5}
                    h={5}
                    color="gray.500"
                  />
                }
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.repeatPassword}</FormErrorMessage>
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
          Registrarse
        </Button>
      </form>
      <HStack spacing={2} justify="center">
        <Text>¿Ya tienes cuenta?</Text>
        <Button
          variant="link"
          color="unitedNationsBlue.500"
          onClick={redirectToLogin}
        >
          Inicia Sesión
        </Button>
      </HStack>
    </Stack>
  );
};

export default SignUpForm;

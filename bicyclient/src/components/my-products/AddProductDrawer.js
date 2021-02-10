import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Spacer,
  Textarea,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";

const AddProductDrawer = ({
  isEditing,
  product,
  kuzzleService,
  drawerSettings,
  getUpdatedData,
}) => {
  const { register, errors, handleSubmit } = useForm();
  const Toast = useToast();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!isEditing) {
        await kuzzleService.document.create("bicyplace", "products", {
          author: user._id,
          isDisabled: true,
          name: data.name,
          type: data.type,
          state: data.state,
          description: data.description,
          price: Number(data.price),
          quantity: Number(data.quantity),
        });
        Toast({
          title: "Exito",
          description: "Producto Creado",
          isClosable: true,
          duration: 9000,
          status: "success",
          position: "top-right",
        });
      } else {
        await kuzzleService.document.createOrReplace(
          "bicyplace",
          "products",
          product._id,
          {
            author: user._id,
            isDisabled: true,
            name: data.name,
            type: data.type,
            state: data.state,
            description: data.description,
            price: Number(data.price),
            quantity: Number(data.quantity),
          }
        );
        Toast({
          title: "Exito",
          description: "Producto Actualizado",
          isClosable: true,
          duration: 9000,
          status: "success",
          position: "top-right",
        });
      }
      getUpdatedData();
      drawerSettings.onClose();
    } catch (err) {
      Toast({
        title: "Error",
        description: err.message,
        isClosable: true,
        duration: 9000,
        status: "error",
        position: "top-right",
      });
    }
    setLoading(false);
  };

  return (
    <Drawer
      size="sm"
      scrollBehavior="outside"
      preserveScrollBarGap={true}
      blockScrollOnMount={false}
      onClose={drawerSettings.onClose}
      isOpen={drawerSettings.isOpen}
    >
      <DrawerOverlay>
        <DrawerContent overflowY="auto">
          <DrawerHeader borderBottomWidth="1px">
            {isEditing ? "Actualizar Producto" : "Crear producto"}
          </DrawerHeader>
          <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody>
              <VStack spacing="1.5em" w="100%" align="start">
                <Box w="100%">
                  <FormLabel fontWeight="bold">Nombre del Producto</FormLabel>
                  <Input
                    ref={register({ required: true })}
                    name="name"
                    placeholder="Ej. Bicicleta Todo Terreno"
                    defaultValue={isEditing ? product._source.name : ""}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </Box>
                <Box w="100%">
                  <FormLabel fontWeight="bold">Descripción</FormLabel>
                  <Textarea
                    ref={register({ required: true })}
                    name="description"
                    placeholder="Escriba una breve descripción..."
                    defaultValue={isEditing ? product._source.description : ""}
                  />
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                </Box>
                <Box w="100%">
                  <FormLabel fontWeight="bold">Tipo de Producto</FormLabel>
                  <Select
                    ref={register({ required: true })}
                    name="type"
                    placeholder="Seleccione"
                  >
                    <option
                      value="Bicicleta"
                      selected={
                        isEditing && product._source.type === "Bicicleta"
                          ? true
                          : false
                      }
                    >
                      Bicicleta
                    </option>
                    <option
                      value="Accesorio"
                      selected={
                        isEditing && product._source.type === "Accesorio"
                          ? true
                          : false
                      }
                    >
                      Accesorio
                    </option>
                    <option
                      value="Repuesto"
                      selected={
                        isEditing && product._source.type === "Repuesto"
                          ? true
                          : false
                      }
                    >
                      Repuesto
                    </option>
                  </Select>
                  <FormErrorMessage>{errors.type}</FormErrorMessage>
                </Box>
                <Box w="100%">
                  <FormLabel fontWeight="bold">Estado del Producto</FormLabel>
                  <Select
                    ref={register({ required: true })}
                    name="state"
                    placeholder="Seleccione"
                  >
                    <option
                      value="Nuevo"
                      selected={
                        isEditing && product._source.state === "Nuevo"
                          ? true
                          : false
                      }
                    >
                      Nuevo
                    </option>
                    <option
                      value="Usado"
                      selected={
                        isEditing && product._source.type === "Usado"
                          ? true
                          : false
                      }
                    >
                      Usado
                    </option>
                  </Select>
                  <FormErrorMessage>{errors.state}</FormErrorMessage>
                </Box>
                <Box w="100%">
                  <FormLabel fontWeight="bold">Cantidad</FormLabel>
                  <NumberInput
                    min={1}
                    defaultValue={isEditing ? product._source.quantity : 0}
                  >
                    <NumberInputField
                      ref={register({ required: true })}
                      name="quantity"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormErrorMessage>{errors.quantity}</FormErrorMessage>
                </Box>
                <Box w="100%">
                  <FormLabel fontWeight="bold">Precio</FormLabel>
                  <NumberInput
                    min={1}
                    precision={2}
                    step={0.2}
                    defaultValue={isEditing ? product._source.price : 0}
                  >
                    <NumberInputField
                      ref={register({ required: true })}
                      name="price"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormErrorMessage>{errors.price}</FormErrorMessage>
                </Box>
              </VStack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Flex w="100%">
                <Button onClick={drawerSettings.onClose}>Cancelar</Button>
                <Spacer />
                <Button
                  type="submit"
                  bg="unitedNationsBlue.700"
                  _hover={{ bg: "unitedNationsBlue.800" }}
                  color="white"
                  isLoading={isLoading}
                  spinner={<BeatLoader size={8} color="#fff" />}
                >
                  {isEditing ? "Actualizar Producto" : "Crear Producto"}
                </Button>
              </Flex>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default AddProductDrawer;

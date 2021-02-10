import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Icon,
  HStack,
  Switch,
  Text,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  IoPencil,
  IoTrash,
  IoCloudUpload,
  IoCloudDownload,
} from "react-icons/io5";
import { GridLoader } from "react-spinners";

const ProductsList = ({
  productsData,
  kuzzleService,
  getUpdatedData,
  setEditingProduct,
  setEditing,
  onOpen,
  isLoading,
}) => {
  const Toast = useToast();

  const onPublish = async (e) => {
    try {
      await kuzzleService.document.update(
        "bicyplace",
        "products",
        productsData[Number(e.target.name)]._id,
        {
          isDisabled: false,
        }
      );
      getUpdatedData();
    } catch (err) {
      console.error(err.message);
    }
  };

  const onUnpublish = async (e) => {
    try {
      await kuzzleService.document.update(
        "bicyplace",
        "products",
        productsData[Number(e.target.name)]._id,
        {
          isDisabled: true,
        }
      );
      getUpdatedData();
    } catch (err) {
      console.error(err.message);
    }
  };

  const onUpdate = (index) => {
    setEditingProduct(productsData[index]);
    setEditing(true);
    onOpen();
  };

  const onDelete = async (index) => {
    try {
      await kuzzleService.document.delete(
        "bicyplace",
        "products",
        productsData[index]._id
      );
      Toast({
        status: "success",
        title: "Exito",
        description: "Producto Eliminado",
        duration: 9000,
        isClosable: true,
      });
      getUpdatedData();
    } catch (err) {
      Toast({
        status: "error",
        title: "Error.",
        description: err.message,
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Center w="100%" h="100%">
          <GridLoader color="blue" size={20} />
        </Center>
      ) : (
        <Table variant="simple">
          <Thead>
            <Th>Nombre</Th>
            <Th>Cantidad</Th>
            <Th>Precio</Th>
            <Th>Publicado</Th>
            <Th>Creado en</Th>
            <Th>Acciones</Th>
          </Thead>
          <Tbody>
            {productsData.map((product, index) => {
              return (
                <Tr>
                  <Td>{product._source.name}</Td>
                  <Td>{product._source.quantity}</Td>
                  <Td>${product._source.price}</Td>
                  <Td>
                    {product._source.isDisabled ? (
                      <Text>No</Text>
                    ) : (
                      <Text>Si</Text>
                    )}
                  </Td>
                  <Td>
                    {new Date(
                      product._source._kuzzle_info.createdAt
                    ).toLocaleDateString()}
                  </Td>
                  <Td>
                    <HStack spacing="0.5em" w="100%" align="end">
                      <IconButton
                        name={index}
                        colorScheme={
                          product._source.isDisabled ? "green" : "orange"
                        }
                        icon={
                          <Icon
                            as={
                              product._source.isDisabled
                                ? IoCloudUpload
                                : IoCloudDownload
                            }
                          />
                        }
                        isRound
                        onClick={
                          product._source.isDisabled ? onPublish : onUnpublish
                        }
                      />
                      <IconButton
                        colorScheme="blue"
                        icon={<Icon as={IoPencil} />}
                        isRound
                        onClick={() => onUpdate(index)}
                      />
                      <IconButton
                        colorScheme="red"
                        icon={<Icon as={IoTrash} />}
                        isRound
                        onClick={() => onDelete(index)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default ProductsList;

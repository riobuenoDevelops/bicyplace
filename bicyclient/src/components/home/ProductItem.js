import { Avatar, Badge, Box, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";

const ProductItem = ({ kuzzleService, product, getNotifications }) => {
  const modalSettings = useDisclosure();
  const [author, setAuthor] = useState({});

  useEffect(() => {
    (async function getAuthor() {
      try {
        const user = await kuzzleService.security.getUser(
          product._source.author
        );
        console.log("author", user);
        setAuthor(user);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  return (
    <>
      <Box
        p="6"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        borderRadius="0.5em"
        _hover={{ cursor: "pointer" }}
        onClick={modalSettings.onOpen}
      >
        <Box d="flex" alignItems="baseline">
          <Badge
            borderRadius="full"
            px="2"
            colorScheme={product._source.state === "Nuevo" ? "teal" : "orange"}
          >
            {product._source.state}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {new Date(
              product._source._kuzzle_info.createdAt
            ).toLocaleDateString()}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          fontSize="xl"
          lineHeight="tight"
          isTruncated
        >
          {product._source.name}
        </Box>

        <Box fontWeight="bold" color="unitedNationsBlue.600">
          ${product._source.price}
        </Box>
        <Box d="flex" mt="3" alignItems="center">
          <Avatar mr="2" size="sm" />
          <Text>{product._source.author}</Text>
        </Box>
      </Box>
      <ProductDetail
        kuzzleService={kuzzleService}
        product={product}
        modalSettings={modalSettings}
        author={author}
        getNotifications={getNotifications}
      />
    </>
  );
};

export default ProductItem;

import { Grid, Text } from "@chakra-ui/react";
import ProductItem from "./ProductItem";

const HomeProductList = ({ kuzzleService, productData, getNotifications }) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={12} w="100%">
      {productData.length ? (
        productData.map((product, index) => {
          return (
            <ProductItem
              kuzzleService={kuzzleService}
              product={product}
              getNotifications={getNotifications}
            />
          );
        })
      ) : (
        <Text>No hay productos para mostrar...</Text>
      )}
    </Grid>
  );
};

export default HomeProductList;

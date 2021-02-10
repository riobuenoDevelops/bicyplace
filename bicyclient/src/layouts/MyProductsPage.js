//dependencies imports
import {
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import AddProductDrawer from "../components/my-products/AddProductDrawer";
import ProductsList from "../components/my-products/ProductsList";

const MyProductsPage = ({ kuzzleService, setNavColor }) => {
  const drawerSettings = useDisclosure();

  const [productData, setProductData] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [isLoadingData, setLoadingData] = useState(false);
  const [editingProduct, setEditingProduct] = useState({});

  useEffect(() => {
    getUpdatedData();
  }, []);

  useEffect(() => {
    setNavColor("unitedNationsBlue.500");
  }, [setNavColor]);

  const sortProducts = (productA, productB) => {
    if (productA._source.name < productB._source.name) {
      return -1;
    }
    if (productA._source.name > productB._source.name) {
      return 1;
    }
    return 0;
  };

  const getUpdatedData = async () => {
    setLoadingData(true);
    const options = { lang: "koncorde" };
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = await kuzzleService.document.search(
        "bicyplace",
        "products",
        {
          query: {
            equals: {
              author: user._id,
            },
          },
        },
        options
      );
      setProductData(data.hits.sort(sortProducts));
    } catch (err) {
      console.error(err.message);
    }
    setLoadingData(false);
  };

  /* const updateData = (newUpdatedElement) => {
    console.log("newUpdatedElement", newUpdatedElement);
    const newData = productData.map((product) => {
      debugger;
      if (product._id === newUpdatedElement._id) {
        return newUpdatedElement;
      }
      return product;
    });
    console.log("New Data", newData);
    setProductData(newData);
  }; */

  const openProductDrawerCreateMode = () => {
    setEditing(false);
    drawerSettings.onOpen();
  };

  return (
    <>
      <Flex w="100%" padding="2em">
        <Heading as="h2" fontSize="3xl">
          Mis Productos
        </Heading>
        <Spacer />
        <Button
          leftIcon={<Icon as={IoAdd} color="white" w={5} h={5} />}
          bgColor="unitedNationsBlue.700"
          color="white"
          _hover={{ bgColor: "unitedNationsBlue.800" }}
          onClick={openProductDrawerCreateMode}
        >
          Agregar Producto
        </Button>
      </Flex>
      <ProductsList
        isLoading={isLoadingData}
        productsData={productData}
        kuzzleService={kuzzleService}
        getUpdatedData={getUpdatedData}
        setEditing={setEditing}
        onOpen={drawerSettings.onOpen}
        setEditingProduct={setEditingProduct}
      />
      <AddProductDrawer
        kuzzleService={kuzzleService}
        drawerSettings={drawerSettings}
        product={editingProduct}
        isEditing={isEditing}
        getUpdatedData={getUpdatedData}
      />
    </>
  );
};

export default MyProductsPage;

import { Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HomeProductList from "../components/home/HomeProductList";

const Home = ({ kuzzleService, getNotifications }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function getProducts() {
      try {
        const data = await kuzzleService.document.search(
          "bicyplace",
          "products",
          {
            query: {
              match: {
                isDisabled: false,
              },
            },
          }
        );
        console.log("data", data);
        setProducts(data.hits);
      } catch (err) {
        console.log(err.message);
      }
    })();

    (async function suscribeNewProducts() {
      const options = {
        scope: "in",
      };
      const filters = {
        equals: {
          isDisabled: false,
        },
      };
      await kuzzleService.realtime.subscribe(
        "bicyplace",
        "products",
        filters,
        (data) => {
          const newProduct = [data.result, ...products];
          console.log(newProduct);
          setProducts(newProduct);
        },
        options
      );
    })();
  }, []);

  /* const onSubscribe = async (e) => {
    try {
      const options = {
        scope: "in",
      };
      const filters = {
        and: [
          {
            equals: {
              author: e.target.name,
            },
          },
          {
            equals: {
              isDisabled: false,
            },
          },
        ],
      };
      const roomId = await kuzzleService.realtime.subscribe(
        "bicyplace",
        "products",
        filters,
        (data) => {
          getNotifications()
        },
        options
      );
      console.log(roomId);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onUnsubscribe = async (e) => {
    try {
      await kuzzleService.realtime.unsubscribe(
        "1f9c85da46f4c81fb5038fcbe2da37b2"
      );
    } catch (err) {
      console.log(err.message);
    }
  }; */

  return (
    <VStack spacing="3em" padding="3em" w="100%">
      <Heading fontSize="3xl" as="h2">
        Todos los productos
      </Heading>
      <HomeProductList
        kuzzleService={kuzzleService}
        productData={products}
        getNotifications={getNotifications}
      />
    </VStack>
  );
};

export default Home;

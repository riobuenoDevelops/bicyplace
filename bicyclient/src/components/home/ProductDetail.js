import {
  Avatar,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

const ProductDetail = ({
  kuzzleService,
  product,
  modalSettings,
  author,
  getNotifications,
}) => {
  const onSubscribeVendedor = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const options = {
        scope: "in",
      };
      const filters = {
        and: [
          {
            equals: {
              author: author._id,
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
        async (data) => {
          await kuzzleService.document.upsert(
            "bicyplace",
            "notifications",
            user._id,
            {
              notifications: data.result,
            }
          );
        },
        options
      );
      await kuzzleService.document.upsert(
        "bicyplace",
        "subscriptions",
        user._id,
        {
          subs: {
            author: author._id,
            room: roomId,
          },
        }
      );
      getNotifications();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Modal
      isOpen={modalSettings.isOpen}
      onClose={modalSettings.onClose}
      size="md"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottomWidth="1px">
          {product._source.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
        <ModalFooter borderTopWidth="1px">
          <VStack spacing="0.5em" w="100%" align="start">
            <Heading as="h6" size="sm">
              Vendedor
            </Heading>
            <Flex align="center" w="100%">
              <Avatar size="sm" mr="0.5em" />
              <VStack spacing="0.2em" align="start">
                <Text fontWeight="bold">{author && author._id}</Text>
                <Text fontSize="sm">
                  {author && author.content && author.content.email}
                </Text>
              </VStack>
              <Spacer />
              <Button
                color="white"
                bg="spaceCadet.500"
                _hover={{ bg: "spaceCadet.600" }}
                onClick={onSubscribeVendedor}
              >
                Suscribirse
              </Button>
            </Flex>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductDetail;

import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverBody,
  Icon,
  Text,
  Flex,
  Spacer,
  Button,
  IconButton,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";

const NotificationOver = ({ userNotifications }) => {
  return (
    <Popover closeOnBlur={true} placement="bottom">
      <PopoverTrigger>
        <IconButton
          isRound
          variant="ghost"
          _hover={{
            bg: "unitedNationsBlue.600",
          }}
          icon={
            <Icon
              as={IoNotifications}
              color="white"
              w={6}
              h={6}
              _hover={{ cursor: "pointer" }}
            />
          }
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>
          <Flex align="center">
            <Text fontWeight="bold" color="spaceCadet.300" fontSize="md">
              Notificaciones
            </Text>
            <Spacer />
            <Button variant="ghost" size="sm" color="unitedNationsBlue.500">
              Marcar como leidos
            </Button>
          </Flex>
        </PopoverHeader>
        <PopoverBody>
          {userNotifications.map((notification) => {
            return (
              <VStack spacing="0.5em" p="0.5em">
                <Text fontWeight="bold">{`Author: ${notification._source.author}`}</Text>
                <Text>{`Product: ${notification._source.name}`}</Text>
              </VStack>
            );
          })}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationOver;

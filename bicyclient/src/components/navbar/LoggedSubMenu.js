import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  IoPerson,
  IoStorefront,
  IoExit,
  IoInformationCircleOutline,
  IoPersonCircleOutline,
  IoChevronDown,
} from "react-icons/io5";

const LoggedSubMenu = ({ history, kuzzleService, user, onOpen }) => {
  const onSelectMenuItem = async (e) => {
    switch (e.target.name) {
      case "profile":
        history.push("/#");
        break;
      case "store":
        history.push("/my-products");
        break;
      case "about":
        onOpen();
        break;
      case "logout":
        try {
          await kuzzleService.auth.logout();
          localStorage.removeItem("jwt");
          localStorage.removeItem("user");
        } catch (err) {
          console.error(err.message);
        }
        history.push("/login");
        break;
      default:
    }
  };

  return (
    <Menu closeOnBlur={true} isLazy>
      <MenuButton _hover={{ filter: "saturate(80%)" }}>
        <Button
          _hover={{ filter: "saturate(80%)" }}
          color="white"
          variant="ghost"
          leftIcon={
            <Icon as={IoPersonCircleOutline} colo="white" h={10} w={10} />
          }
          rigtIcon={<Icon as={IoChevronDown} colo="white" h={8} w={8} />}
        >{`Hola, ${user._id}`}</Button>
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={onSelectMenuItem}
          name="profile"
          color="gray.600"
          icon={<Icon as={IoPerson} color="gray.600" h={5} w={5} />}
        >
          Mi Perfil
        </MenuItem>
        {user.content && user.content.profileIds.includes("seller") ? (
          <MenuItem
            onClick={onSelectMenuItem}
            name="store"
            color="gray.600"
            icon={<Icon as={IoStorefront} color="gray.600" h={5} w={5} />}
          >
            Mis Productos
          </MenuItem>
        ) : null}
        <MenuItem
          onClick={onSelectMenuItem}
          name="about"
          color="gray.600"
          icon={
            <Icon
              as={IoInformationCircleOutline}
              color="gray.600"
              h={5}
              w={5}
            />
          }
        >
          Acerca de...
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={onSelectMenuItem}
          name="logout"
          color="gray.600"
          icon={<Icon as={IoExit} color="gray.600" h={5} w={5} />}
        >
          Cerrar Sesión
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LoggedSubMenu;

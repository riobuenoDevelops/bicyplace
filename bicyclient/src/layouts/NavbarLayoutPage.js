import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function NavbarLayoutPage({ children }) {
  return (
    <>
      <Navbar />
      <Box w="100%">{children}</Box>
    </>
  );
}

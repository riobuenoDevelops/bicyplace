import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
} from "@chakra-ui/react";

const AboutModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Acerca de BicyPlace</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <h1>Hola</h1>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;

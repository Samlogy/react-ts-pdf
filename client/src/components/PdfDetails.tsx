import {
  Box,
  Text,
  Button,
  Image,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import usePdfStore from "../store";

interface IPdfDetails {
  isOpen: boolean;
}
const PdfDetails = ({ isOpen }: IPdfDetails) => {
  const pdf = usePdfStore((state: any) => state.pdf);
  const setAction = usePdfStore((state: any) => state.setAction);
  const action = usePdfStore((state: any) => state.action);
  const fileDetails = usePdfStore((state: any) => state.fileDetails);

  const onClose = () => {
    setAction({ ...action, details: false, displayAll: true });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> PDF Details </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex flexDir="column">
            <Display label="File Name" data={fileDetails.name} />
            <Display label="Size" data={fileDetails.size} />
            <Display label="File Type" data={fileDetails.type} />
            <Display label="Last Modified" data={fileDetails.editedAt} />
            <Display label="Created on" data={fileDetails.createdAt} />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button bg="gray_3" color="white" _hover={{ bg: "gray_4" }} onClick={() => onClose()}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PdfDetails;

const Display = ({ label, data }: { label: string; data: any }) => {
  const isDataExist = (data: any) => {
    if (Array.isArray(data) && data.length === 0) return false;
    if (Object.keys(data).length === 0) return false;
    if (!data) return false;
    return true;
  };

  return (
    <Flex mb=".5rem">
      <Box as="span" w="6.25rem" textAlign={"left"} fontWeight={"600"}>
        {label}:
      </Box>

      {!isDataExist(data) ? (
        <Box as="span" fontSize="1rem" fontWeight="400" ml=".5rem" color="gray_4">
          ---
        </Box>
      ) : Array.isArray(data) ? (
        <UnorderedList textAlign={"left"}>
          {data.map((item, idx) => (
            <ListItem key={idx} fontSize="1rem" fontWeight="400" ml=".5rem" color="gray_4">
              {item}
            </ListItem>
          ))}
        </UnorderedList>
      ) : (
        <Text textAlign={"left"} w="auto" fontSize="1rem" fontWeight="400" ml=".5rem" color="gray_4">
          {data}
        </Text>
      )}
    </Flex>
  );
};

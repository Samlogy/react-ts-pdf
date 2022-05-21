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
  const pdf = usePdfStore((state) => state.pdf);
  const setAction = usePdfStore((state) => state.setAction);
  const action = usePdfStore((state) => state.action);

  return (
    <Modal isOpen={isOpen} onClose={() => setAction({ ...action, delete: false })} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> PDF Details </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex flexDir="column">
            <Flex justifyContent={"space-between"} alignItems="center" mb=".5rem"></Flex>
            <Display label="File Name" data={pdf.name} />
            <Display label="Size" data={pdf.size} />
            <Display label="Last Modified" data={pdf.editedAt} />
            <Display label="Created on" data={pdf.createdAt} />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button bg="gray_3" color="white" _hover={{ bg: "gray_4" }} onClick={() => setAction({ ...action, delete: false })}>
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

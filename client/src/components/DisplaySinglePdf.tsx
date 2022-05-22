import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { MenuOptions } from "../components";
import usePdfStore from "../store";

const DisplaySinglePdf = ({ data }: { data: any }) => {
  const setAction = usePdfStore((state: any) => state.setAction);
  return (
    <Flex
      justify={"space-between"}
      align="center"
      mb=".5rem"
      w="80vw"
      borderRadius="10px"
      p=".5rem"
      mx="auto"
      transition="all .25s"
      _hover={{ cursor: "pointer", bg: "gray.200" }}
      // onClick={() => setAction({ display: true })}
    >
      <AiOutlineFilePdf size={18} />
      <Flex flexDir={"column"}>
        <Text fontSize={"1rem"}> {data.fileName} </Text>
        <Text fontSize={".85rem"} color="gray.500">
          {data.editedAt ? `last modified on ${data.editedAt}` : `created on ${data.createdAt}`}
        </Text>
      </Flex>
      <MenuOptions pdfId={data.id} />
    </Flex>
  );
};

export default DisplaySinglePdf;

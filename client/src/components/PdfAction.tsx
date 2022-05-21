import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import React, { useRef } from "react";

import usePdfStore from "../store";

interface IPdfAction {
  isOpen: boolean;
  pdfId: any;
  mode: string;
}
const PdfAction = ({ isOpen, pdfId, mode }: IPdfAction) => {
  const action = usePdfStore((state) => state.action);
  const setAction = usePdfStore((state) => state.setAction);

  const cancelRef = useRef(null);
  const onDelete = (pdfId: string | number) => {
    // console.log("delete product: ", pdfId);
    setAction({ delete: false });
  };

  const onDisable = (pdfId: string | number) => {
    // console.log("disable product: ", pdfId);
    setAction({ disable: false });
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => setAction({ ...action, delete: false })}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{mode === "delete" ? "Delete PDF ?" : "Disable PDF ?"}</AlertDialogHeader>

        <AlertDialogCloseButton />

        <AlertDialogBody>
          {mode === "delete" ? "Are you sure you want to delete this PDF ?" : "Are you sure you want to disable this PDF ?"}
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button colorScheme="red" onClick={mode === "delete" ? () => onDelete(pdfId) : () => onDisable(pdfId)}>
            Yes
          </Button>
          <Button ref={cancelRef} onClick={() => setAction({ ...action, delete: false })} bg="gray_3" color="white" _hover={{ bg: "gray_4" }} ml={3}>
            No
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PdfAction;

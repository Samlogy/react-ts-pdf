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
  const action = usePdfStore((state: any) => state.action);
  const setAction = usePdfStore((state: any) => state.setAction);

  const cancelRef = useRef(null);
  const onDelete = (pdfId: string | number) => {
    setAction({ ...action, delete: false, displayAll: true });
    // update state
    // api
  };

  const onDisable = (pdfId: string | number) => {
    setAction({ ...action, disable: false, displayAll: true });
    // update state
    // api
  };
  const onClose = (mode: string) => {
    mode === "delete" ? setAction({ ...action, delete: false, displayAll: true }) : setAction({ ...action, disable: false, displayAll: true });
  };

  return (
    <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={() => onClose(mode)} isOpen={isOpen} isCentered>
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
          <Button ref={cancelRef} onClick={() => onClose(mode)} bg="gray_3" color="white" _hover={{ bg: "gray_4" }} ml={3}>
            No
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PdfAction;

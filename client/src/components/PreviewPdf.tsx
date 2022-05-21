import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import usePdfStore from "../store";
import { DisplayPdf } from "./";

const PreviewPdf = () => {
  const action = usePdfStore((state) => state.action);
  const setAction = usePdfStore((state) => state.setAction);

  return (
    <div>
      <Modal isOpen={action.preview} onClose={() => setAction({ preview: false })} size="full">
        <ModalOverlay />
        <ModalContent bg="transparent" display={"flex"}>
          <ModalBody>
            <DisplayPdf preview={action.preview} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PreviewPdf;

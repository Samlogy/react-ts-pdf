import { IconButton, Input, Button, Text, useToast } from "@chakra-ui/react";
import React, { useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import usePdfStore from "../store";
import { View } from "./";

const toastConfig: any = {
  variant: "subtle",
  duration: 3000,
  isClosable: true,
  position: "top-right",
};
const UploadPdf = () => {
  const setFileName = usePdfStore((state: any) => state.setFileName);
  const setPdf = usePdfStore((state: any) => state.setPdf);
  const pdf = usePdfStore((state: any) => state.pdf);
  const fileName = usePdfStore((state: any) => state.fileName);

  const refButton = useRef<any>(null);
  const toast = useToast();

  const handlePdf = (inputVal: any) => {
    const file = inputVal[0];
    if (file.type !== "application/pdf") {
      toast({
        title: "Pdf Upload",
        description: "Please select a PDF !",
        status: "error",
        ...toastConfig,
      });
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPdf(reader.result);
    };
    toast({
      title: "Pdf Upload",
      description: "Success !",
      status: "success",
      ...toastConfig,
    });
  };

  return (
    <>
      <Input type="file" accept=".pdf" onChange={(e) => handlePdf(e.target.files)} display="none" ref={refButton} />
      <IconButton
        aria-label="upload-pdf"
        icon={<AiOutlinePlus size={20} />}
        onClick={() => refButton.current.click()}
        mr=".25rem"
        pos="fixed"
        right="5%"
        bottom="5%"
      />
      <View cond={pdf}>
        <Text pos="fixed" right="22%" bottom="6%" w="50vw" textAlign="right">
          {fileName}
        </Text>
        <Button onClick={() => setPdf(null)} pos="fixed" right="12%" bottom="5%">
          Reset
        </Button>
      </View>
    </>
  );
};

export default UploadPdf;

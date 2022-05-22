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
  const setFileDetails = usePdfStore((state: any) => state.setFileDetails);
  const setPdf = usePdfStore((state: any) => state.setPdf);
  const pdf = usePdfStore((state: any) => state.pdf);
  const fileDetails = usePdfStore((state: any) => state.fileDetails);

  const refButton = useRef<any>(null);
  const toast = useToast();

  const convertOctToMo = (size: any) => {
    const UNIT = 1024;
    if (size === 0) return 0;

    let new_size = size;
    while (new_size >= UNIT) {
      new_size = new_size / UNIT;
    }
    console.log(new_size);
    return new_size;
  };

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

    setFileDetails({ size: convertOctToMo(file.size), type: file.type, name: file.name, createdAt: "", editedAt: "" });

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
          {fileDetails.name}
        </Text>
        <Button onClick={() => setPdf(null)} pos="fixed" right="12%" bottom="5%">
          Reset
        </Button>
      </View>
    </>
  );
};

export default UploadPdf;

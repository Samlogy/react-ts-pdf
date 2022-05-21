import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Flex, Button, Text, IconButton, Select } from "@chakra-ui/react";
import { AiOutlineFilePdf, AiOutlineZoomIn, AiOutlineZoomOut, AiOutlineArrowLeft } from "react-icons/ai";
import { DownloadPdf, View } from "./";
import usePdfStore from "../store";

interface IDisplayPdf {
  preview?: boolean;
}
interface IBottom {
  pageNumber: number;
  numPages: number;
  nextPage: any;
  previousPage: any;
}

export default function DisplayPdf({ preview = false }: IDisplayPdf) {
  const [numPages, setNumPages] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  const isMultiPage = usePdfStore((state) => state.isMultiPage);
  const action = usePdfStore((state) => state.action);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const pdf = usePdfStore((state) => state.pdf);

  return (
    <>
      <View cond={pdf}>
        <Header preview={action.preview} />
      </View>

      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <View cond={isMultiPage}>
          {Array.from(new Array(numPages), (_, idx) => (
            <Page key={idx} pageNumber={idx + 1} className="pdf-page multiple" />
          ))}
        </View>

        <View cond={!isMultiPage}>
          <Page pageNumber={pageNumber} className="pdf-page single" />
        </View>
      </Document>

      <View cond={!isMultiPage && pdf}>
        <Bottom pageNumber={pageNumber} numPages={numPages} nextPage={nextPage} previousPage={previousPage} />
      </View>
    </>
  );
}

const Bottom = ({ pageNumber, numPages, nextPage, previousPage }: IBottom) => {
  return (
    <Flex justify="center" align="center" mb="1rem" borderRadius={"10px"} bg="gray.500" w="16rem" mx="auto" p=".5rem">
      <Text mr="1rem" color="#fff">
        Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
      </Text>

      <Button disabled={pageNumber <= 1} onClick={previousPage}>
        Prev
      </Button>
      <Button disabled={pageNumber >= numPages} onClick={nextPage}>
        Next
      </Button>
    </Flex>
  );
};

const Header = ({ preview = false }: { preview?: boolean }) => {
  const setPdf = usePdfStore((state) => state.setPdf);
  const zoomIn = usePdfStore((state) => state.zoomIn);
  const zoomOut = usePdfStore((state) => state.zoomOut);
  const fileName = usePdfStore((state) => state.fileName);
  const setMultiPage = usePdfStore((state) => state.setMultiPage);
  const pdf = usePdfStore((state) => state.pdf);
  const action = usePdfStore((state) => state.action);

  const setAction = usePdfStore((state) => state.setAction);

  const [pageMode, setPageMode] = useState("single");

  const handleClose = () => {
    if (action.preview) {
      setAction({ ...action, preview: false });
    } else {
      setAction({ ...action, display: false });
    }
    setPdf(null);
  };
  const handlePageMode = (e: any) => {
    const val = e.target.value;
    console.log(val);
    if (val !== "single" && val !== "multi") {
      console.log("wrong page mode selected !");
      return;
    }
    setPageMode(val);
    setMultiPage(val === "multi" ? true : false);
  };
  const handleOpen = () => {
    setPdf(pdf);
    setAction({ ...action, display: true });
  };

  return (
    <Flex
      justify={"space-between"}
      align="center"
      bg="gray.600"
      borderRadius={"10px"}
      p=".75rem 1.5rem"
      pos="fixed"
      top="0"
      zIndex={100}
      w="full"
      opacity={0.8}
    >
      <Flex align="center">
        <IconButton aria-label="zoom-in" icon={<AiOutlineArrowLeft size={18} onClick={() => handleClose()} />} mr="1rem" />
        <AiOutlineFilePdf size={20} color="white" />
        <Text color="white" ml=".5rem" fontSize={"1rem"}>
          {fileName}
        </Text>
      </Flex>

      <View cond={preview}>
        <Button
          variant="ghost"
          fontSize="1rem"
          color={"white"}
          transition="all .3s"
          _hover={{ color: "black", bg: "gray.200" }}
          onClick={() => handleOpen()}
        >
          Open
        </Button>
      </View>

      <Select onChange={handlePageMode} value={pageMode} w="5rem" color="white">
        <option value="multi">Multi Page</option>
        <option value="single">Single Page</option>
      </Select>

      <Flex>
        <IconButton aria-label="zoom-out" icon={<AiOutlineZoomOut size={20} onClick={zoomOut} />} mr=".25rem" />
        <IconButton aria-label="zoom-in" icon={<AiOutlineZoomIn size={20} onClick={zoomIn} />} mr=".25rem" />
        <DownloadPdf />
      </Flex>
    </Flex>
  );
};

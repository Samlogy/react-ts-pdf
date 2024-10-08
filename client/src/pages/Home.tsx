import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import {
  DisplaySinglePdf,
  Layout,
  UploadPdf,
  PreviewPdf,
  DisplayPdf,
  PdfDetails,
  PdfAction,
  CreatePdf,
  EditPdf,
  PrintPdf,
  View,
} from "../components";
import usePdfStore from "../store";

const data = [
  {
    id: 0,
    fileName: "le pouvoir du moment présent.pdf",
    createdAt: "21-05-2022",
    editedAt: null,
  },
  {
    id: 1,
    fileName: "le pouvoir du moment présent.pdf",
    createdAt: "21-05-2022",
    editedAt: null,
  },
  {
    id: 2,
    fileName: "le pouvoir du moment présent.pdf",
    createdAt: "21-05-2022",
    editedAt: null,
  },
];

function Home() {
  const action = usePdfStore((state: any) => state.action);
  const pdf = usePdfStore((state: any) => state.pdf);
  // const preview = usePdfStore((state) => state.preview);
  // const setPreview = usePdfStore((state) => state.setPreview);

  // const setAction = usePdfStore((state) => state.setAction);
  // const { isLoading, error, data } = useQuery("all_pdf", GET_ALL_PDF)
  // );

  // if (isLoading) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;

  return (
    <Layout isHeaderVisible isFooterVisible>
      <Heading as="h1" mb="4rem" textAlign={"center"}>
        React Pdf App
      </Heading>

      <View cond={action.displayAll}>
        <Flex flexDir={"column"} justify="center">
          {data.map((item, idx) => (
            <DisplaySinglePdf key={idx} data={item} />
          ))}
        </Flex>
      </View>

      <UploadPdf />

      <View cond={action.delete}>
        <PdfAction isOpen={action.delete} pdfId={data[0].id} mode="delete" />
      </View>

      {/* <View cond={action.disable}>
        <PdfAction isOpen={action.disable} pdfId={data[0].id} mode="disable" />
      </View> */}

      <View cond={action.details}>
        <PdfDetails isOpen={action.details} />
      </View>

      <View cond={action.preview}>
        <PreviewPdf />
      </View>

      <View cond={action.display}>
        <DisplayPdf />
      </View>

      <View cond={action.add}>
        <CreatePdf />
      </View>

      <View cond={action.edit}>
        <EditPdf />
      </View>

      <View cond={action.print}>
        <PrintPdf />
      </View>
    </Layout>
  );
}

export default Home;

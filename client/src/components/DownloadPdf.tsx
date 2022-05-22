import { IconButton } from "@chakra-ui/react";
import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

import usePdfStore from "../store";

export default function DownloadPdf() {
  const pdf = usePdfStore((state: any) => state.pdf);
  return (
    <a href={pdf} download>
      <IconButton aria-label="donwload" icon={<AiOutlineDownload />} />
    </a>
  );
}

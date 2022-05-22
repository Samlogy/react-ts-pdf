import { IconButton, Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useRef } from "react";
import { AiOutlineClose, AiOutlineEye, AiOutlineDownload, AiOutlinePrinter } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { FaEllipsisV } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import { GrCircleInformation } from "react-icons/gr";
import { Link } from "react-router-dom";
import usePdfStore from "../store";

interface IMenuOptions {
  pdfId: number | string;
}

const MenuOptions = ({ pdfId }: IMenuOptions) => {
  const setPdf = usePdfStore((state: any) => state.setPdf);
  const setAction = usePdfStore((state: any) => state.setAction);
  const action = usePdfStore((state: any) => state.action);
  const pdf = usePdfStore((state: any) => state.pdf);

  const linkRef = useRef<any>(null);

  const onEdit = (pdfId: string | number) => {
    setAction({ edit: true });
  };
  const onDelete = (pdfId: string | number) => {
    setAction({ delete: true });
  };
  const onPreview = (pdfId: string | number) => {
    setAction({ preview: true });
  };
  const onDetails = (pdfId: string | number) => {
    setAction({ details: true });
  };
  const onPrint = (pdfId: string | number) => {
    setAction({ print: true });
  };
  const onDowload = (pdfId: string | number) => (pdfId: string | number) => {
    linkRef.current.click();
  };
  return (
    <Box onClick={(e) => e.preventDefault()}>
      <Menu>
        <MenuButton as={IconButton} icon={<FaEllipsisV />}></MenuButton>
        <MenuList>
          <MenuItem color={"gray_4"} icon={<FiEdit color="gray" size="18" />} onClick={() => onEdit(pdfId)}>
            Edit
          </MenuItem>
          <MenuItem color={"gray_4"} icon={<FiTrash color="gray" size="18" />} onClick={() => onDelete(pdfId)}>
            Delete
          </MenuItem>
          <MenuItem color={"gray_4"} icon={<AiOutlineEye color="gray" size="20" />} onClick={() => onPreview(pdfId)}>
            Preview
          </MenuItem>
          <MenuItem color={"gray_4"} icon={<GrCircleInformation color="gray" size="18" />} onClick={() => onDetails(pdfId)}>
            Details
          </MenuItem>
          <MenuItem color={"gray_4"} icon={<AiOutlinePrinter color="gray" size="20" />} onClick={() => onPrint(pdfId)}>
            Print
          </MenuItem>
          <MenuItem color={"gray_4"} icon={<AiOutlineDownload color="gray" size="20" />} onClick={() => onDowload(pdfId)}>
            Download
          </MenuItem>
        </MenuList>
      </Menu>

      <a href={pdf && pdf} download ref={linkRef} style={{ display: "none" }}>
        Download
      </a>
    </Box>
  );
};

export default MenuOptions;

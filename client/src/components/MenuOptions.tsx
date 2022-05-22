import { IconButton, Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { FaEllipsisV } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import usePdfStore from "../store";

interface IMenuOptions {
  pdfId: number | string;
}

const MenuOptions = ({ pdfId }: IMenuOptions) => {
  const setPdf = usePdfStore((state: any) => state.setPdf);
  const setAction = usePdfStore((state: any) => state.setAction);
  const action = usePdfStore((state: any) => state.action);

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
  return (
    <Box onClick={(e) => e.preventDefault()}>
      <Menu>
        <MenuButton as={IconButton} icon={<FaEllipsisV />}></MenuButton>
        <MenuList>
          <MenuItem color={"warning"} icon={<FiEdit color="warning" size="18" />} onClick={() => onEdit(pdfId)}>
            Edit
          </MenuItem>
          <MenuItem color={"error"} icon={<FiTrash color="error" size="18" />} onClick={() => onDelete(pdfId)}>
            Delete
          </MenuItem>
          <MenuItem color={"gray_4"} icon={<AiOutlineClose color="disable" size="18" />} onClick={() => onPreview(pdfId)}>
            Preview
          </MenuItem>
          <MenuItem color={"info"} icon={<BiDetail color={"info"} size="18" />} onClick={() => onDetails(pdfId)}>
            Details
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default MenuOptions;

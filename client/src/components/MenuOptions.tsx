import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
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
  const setPdf = usePdfStore((state) => state.setPdf);
  const setAction = usePdfStore((state) => state.setAction);

  const onEdit = (pdfId: string | number) => {
    // console.log('edit product: ', productId)
    setAction({ edit: true });
    // setPdf(pdf);
  };
  const onDelete = (pdfId: string | number) => {
    // console.log('delete product: ', productId)
    setAction({ delete: true });
    // setPdf({ id: pdfId });
  };
  const onPreview = (pdfId: string | number) => {
    // console.log('edit product: ', productId)
    setAction({ edit: true });
    // setPdf(pdf);
  };
  const onDetails = (pdfId: string | number) => {
    // console.log('details product: ', productId)
    setAction({ details: true });
    // setPdf(pdf);
  };
  return (
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
  );
};

export default MenuOptions;

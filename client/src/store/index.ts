import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IAction {
  delete: boolean;
  edit: boolean;
  preview: boolean;
  details: boolean;
  disable: boolean;
  display: boolean;
  add: boolean;
  displayAll: boolean;
  print: boolean;
}

interface PdfState {
  //   name: string;
  //   setName: (name: string) => void;
  action: IAction; // for each major feature in the app
  pdf: any;
  isMultiPage: boolean;
  fileDetails: any;
  setFileDetails: any;

  setAction: any; // change action in app
  setPdf: any; // open / close pdf
  setMultiPage: any; // single / multi page
  zoomIn: any;
  zoomOut: any;
}

const INIT_ACTION = {
  delete: false,
  disable: false,
  display: false,
  preview: false,
  add: false,
  edit: false,
  details: false,
  displayAll: true,
  print: false,
};
const INIT_FILE_DETAILS = {
  size: null,
  type: null,
  name: null,
  createdAt: null,
  editedAt: null,
};

const pdfStore = (set: any) => ({
  action: INIT_ACTION,
  pdf: null,
  isMultiPage: false,
  fileDetails: INIT_FILE_DETAILS,

  setFileDetails: (val: any) => set((state: any) => ({ fileDetails: { ...val } })),
  setAction: (val: any) => set((state: any) => ({ action: { ...val } })),
  setPdf: (val: any) => set((state: any) => ({ pdf: val })),
  setMultiPage: (val: any) => set((state: any) => ({ isMultiPage: val })),
  zoomOut: (val: any) => set((state: any) => ({ pdf: state })),
  zoomIn: (val: any) => set((state: any) => ({ pdf: state })),
});

const usePdfStore = create<any>(devtools(pdfStore, { name: "pdf-store" }));

export default usePdfStore;

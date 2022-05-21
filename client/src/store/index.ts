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
}

interface PdfState {
  //   name: string;
  //   setName: (name: string) => void;
  action: IAction; // for each major feature in the app
  pdf: any;
  fileName: string;
  isMultiPage: boolean;

  setAction: any; // change action in app
  setPdf: any; // open / close pdf
  setMultiPage: any; // single / multi page
  setFileName: any;
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
};

const pdfStore = (set: any) => ({
  action: INIT_ACTION,
  pdf: null,
  fileName: "",
  isMultiPage: false,

  setAction: (val: any) => set((state: any) => ({ ...val })),
  setPdf: (val: any) => set((state: any) => ({ pdf: val })),
  setMultiPage: (val: any) => set((state: any) => ({ isMultiPage: val })),
  setFileName: (val: any) => set((state: any) => ({ fileName: val })),
  zoomOut: (val: any) => set((state: any) => ({ pdf: state })),
  zoomIn: (val: any) => set((state: any) => ({ pdf: state })),
});

// let usePdfStore = devtools(pdfStore, { name: "pdf_store" });
// usePdfStore = persist(usePdfStore, { name: "pdf_store" });

const usePdfStore = create<PdfState>(pdfStore);

export default usePdfStore;

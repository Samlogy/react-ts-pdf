import { request } from "./_http";

export async function GET_ALL_PDF() {
  try {
    const response = await request("get", `/all_pdf`);
    if (response) {
      return response;
    }
  } catch (err: any) {
    return err.message;
  }
}

import axios from "axios";
import type { ResponseType } from "@src/types";

export const AddEmail = async ({ email }: { email: string }) => {
  const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;

  const response = await axios.post(`${base_url}/addEmail`, { email }, {});

  const { status, data } = response;
  return {
    status,
    data: data as ResponseType,
  };
};

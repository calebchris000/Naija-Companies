import axios from "axios";

export const GetCapital = async ({ token }: { token: string }) => {
  try {
    const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;
    const response = await axios.get(`${base_url}/capitals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data, status } = response;

    return {
      status,
      data,
    };
  } catch (error: any) {
    if (error?.response) {
      return {
        status: 403,
        data: error.response?.data.message,
      };
    } else {
      return {
        status: 403,
        data: String(error),
      };
    }
  }
};

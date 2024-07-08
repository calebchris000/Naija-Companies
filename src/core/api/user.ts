import axios from "axios";

export const GetUsers = async ({
  token,
  query,
}: {
  token: string;
  query?: string;
}) => {
  try {
    const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;
    const response = await axios.get(`${base_url}/users?${query ?? ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, data } = response;
    return { status, data };
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

import axios from "axios";

export const AddJobExperiences = async (data: any[], token: string) => {
  try {
    const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;

    const response = await axios.post(`${base_url}/experiences`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { status, data: d } = response;
    return { status, data: d };
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

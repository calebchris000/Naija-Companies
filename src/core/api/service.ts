import axios from "axios";

export const UploadImage = async (formData: FormData) => {
  try {
    const url = import.meta.env.VITE_IMGBB_API_URL;
    const api_key = import.meta.env.VITE_IMGBB_API_KEY;

    const response = await axios.post(`${url}?key=${api_key}`, formData, {});
    const { data, status } = response;

    return { status, data };
  } catch (error: any) {
    if (error.response) {
      return {
        status: 403,
        data: error.response?.data?.message,
      };
    }
    return {
      status: 403,
      data: String(error),
    };
  }
};

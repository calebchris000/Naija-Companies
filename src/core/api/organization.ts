import axios from "axios";

export const GetOrganizations = async ({
  token,
  getReviews,
}: {
  token: string;
  getReviews: boolean;
}) => {
  try {
    const query = getReviews ? "getReviews=true" : "";
    const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;
    const response = await axios.get(`${base_url}/organizations?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data, status } = response;

    return { data, status };
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

export const AddOrganization = async ({
  token,
  data,
}: {
  token: string;
  data: any;
}) => {
  try {
    const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;
    const response = await axios.post(`${base_url}/organizations`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data: d, status } = response;

    return { data: d, status };
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

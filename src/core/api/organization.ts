import axios from "axios";

export const GetOrganizations = async ({
  token,
  getReviews,
  capitalId,
}: {
  token: string;
  getReviews?: boolean;
  capitalId?: string;
}) => {
  try {
    const query = getReviews ? "getReviews=true" : "";
    const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;
    const response = await axios.get(
      `${base_url}/organizations?${query}${
        capitalId ? `&capitalId=${capitalId}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export const GetOrganization = async ({
  token,
  organizationId,
}: {
  token: string;
  organizationId: string;
}) => {
  try {
    const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;
    const response = await axios.get(
      `${base_url}/organization?organizationId=${organizationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export const AcceptOrReject = async ({
  token,
  organizationId,
  action,
}: {
  token: string;
  organizationId: string;
  action: string;
}) => {
  try {
    const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;
    const response = await axios.post(
      `${base_url}/organizations/action`,
      {
        organizationId,
        action,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

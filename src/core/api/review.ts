import axios from "axios";
import { useEndpoint } from "../utils/utils";

export const GetReviews = async ({
  token,
  organizationId,
}: {
  token: string;
  organizationId: string;
}) => {
  try {
    const base_url = useEndpoint();
    const response = await axios.get(`${base_url}/reviews?organizationId=${organizationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data: d, status } = response;

    return {
      status,
      data: d,
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

export const AddReview = async ({
  token,
  data,
}: {
  token: string;
  data: any;
}) => {
  try {
    const base_url = useEndpoint();
    const response = await axios.post(`${base_url}/reviews`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data: d, status } = response;

    return {
      status,
      data: d,
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

export const UpdateReview = async ({
  token,
  data,
}: {
  token: string;
  data: any;
}) => {
  try {
    const base_url = useEndpoint();
    const response = await axios.put(`${base_url}/reviews`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data: d, status } = response;

    return {
      status,
      data: d,
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

export const DeleteReview = async ({
  token,
  reviewId,
}: {
  token: string;
  reviewId: string;
}) => {
  try {
    const base_url = useEndpoint();
    const response = await axios.delete(
      `${base_url}/reviews?reviewId=${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data: d, status } = response;

    return {
      status,
      data: d,
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

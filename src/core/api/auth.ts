import axios from "axios";
import type { ResponseType } from "@src/types";

export const Signup = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;
  try {
    const response = await axios.post(
      `${base_url}/user/signup`,
      JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5174",
        },
      },
    );
    const { data, status } = response;

    return {
      status,
      data: data as ResponseType,
    };
  } catch (error: any) {
    if (error?.response) {
      return {
        status: 400,
        data: error.response?.data?.message as ResponseType,
      };
    } else {
      return { status: 500, data: error as ResponseType };
    }
  }
};

export const Login = async ({
  user,
  password,
}: {
  user: string;
  password: string;
}) => {
  const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;

  const response = await axios.post(
    `${base_url}/user/login`,
    {
      user,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5174",
      },
    },
  );
  const { data, status } = response;

  return {
    status,
    data,
  };
};

export const VerifyOtp = async ({
  otp,
  userId,
}: {
  otp: string;
  userId: string;
}) => {
  const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;

  try {
    const response = await axios.post(
      `${base_url}/user/verifyOtp`,
      {
        otp,
        userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5174",
        },
      },
    );
    const { data, status } = response;

    return {
      status,
      data: data as ResponseType,
    };
  } catch (error: any) {
    if (error?.response) {
      return {
        status: error.response.status,
        data: error.response.data as ResponseType,
      };
    } else {
      return {
        status: 500,
        data: { message: "An error occurred" } as ResponseType,
      };
    }
  }
};

export const ResendOtp = async ({ userId }: { userId: string }) => {
  const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;

  const response = await axios.post(
    `${base_url}/user/resendOtp`,
    {
      userId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5174",
      },
    },
  );
  const { data, status } = response;

  return {
    status,
    data: data as ResponseType,
  };
};

export const VerifyToken = async ({ token }: { token: string }) => {
  const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;

  const response = await axios.post(
    `${base_url}/user/verifyToken`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const { data, status } = response;

  return {
    status,
    data: data as ResponseType,
  };
};

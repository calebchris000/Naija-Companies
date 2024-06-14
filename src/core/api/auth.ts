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
    }
  );
  const { data, status } = response;

  return {
    status,
    data: data as ResponseType,
  };
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
    }
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
    }
  );
  const { data, status } = response;

  return {
    status,
    data: data as ResponseType,
  };
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
    }
  );
  const { data, status } = response;

  return {
    status,
    data: data as ResponseType,
  };
};

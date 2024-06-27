import type { UserDataType } from "@src/types";

export const useToken = (): string => {
  const token = localStorage.getItem("token");

  if (token) {
    return token;
  } else {
    return "";
  }
};

export const useEndpoint = (): string => {
  const url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;

  if (!url) {
    return "";
  }
  return url;
};

export const useUserData = (): UserDataType => {
  const user: UserDataType = JSON.parse(localStorage.getItem("user") ?? "{}");

  if (!user) {
    return { firstName: "", lastName: "", email: "", id: "", userName: "" };
  }
  return user;
};

export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

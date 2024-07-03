import type { UserDataType } from "@src/types";
import { navigate } from "svelte-routing";

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

export const useLocalStorage = ({
  key,
  isString,
}: {
  key: string;
  isString: boolean;
}): object | string => {
  const item = localStorage.getItem(key);
  if (!item) return "";
  if (isString) {
    return item;
  } else {
    const parsed = JSON.parse(item);
    return parsed;
  }
};

export class LocalStorage {
  constructor() {}

  public getItem(key: string, isString: boolean) {
    const item = localStorage.getItem(key);

    if (!item) return "";
    if (isString) return item;
    const parsed = JSON.parse(item);
    return parsed;
  }
  public setItem(key: string, data: string | object) {
    if (typeof data === "object") {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }
  }
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
  public clear() {
    localStorage.clear();
  }
}

export const handleLogout = () => {
  localStorage.clear();
  

  if (window.location.pathname === "/home") {
    window.location.reload();
  } else {
    navigate("/home");
  }
};

export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

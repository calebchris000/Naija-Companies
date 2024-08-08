import { VerifyToken } from "@src/core/api/auth";
import { LocalStorage, useToken, useUserData } from "@src/core/utils/utils";
import { navigate } from "svelte-routing";

export const HandleRoute = async () => {
  const user = useUserData();
  const token = useToken();
  const local = new LocalStorage();
  const { pathname } = window.location;

  const path =
    pathname[pathname.length - 1] === "/" ? pathname.slice(0, -2) : pathname;
  const split = path.split("/");

  if (!split[1]) {
    window.location.href = "home";
    return;
  }

  const res = await VerifyToken({ token });
  if (res.status && res.status !== 200) {
    local.clear();
    navigate("/home");
    return;
  }

  const role: "admin" | "user" | "sub-admin" = (res.data?.data as any)
    ?.privilege;

  if (role === "user" && split[1] === "admin") {
    window.location.href = "/home";
  }
};

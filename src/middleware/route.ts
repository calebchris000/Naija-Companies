import { useToken, useUserData } from "@src/core/utils/utils";
import { navigate } from "svelte-routing";

export const HandleRoute = () => {
  const user = useUserData();
  const token = useToken();
  const { pathname } = window.location;

  const path =
    pathname[pathname.length - 1] === "/" ? pathname.slice(0, -2) : pathname;
  const split = path.split("/");

  if (split[split.length]) return;
  if (
    split[1] === "home" &&
    ["admin", "sub-admin"].includes(user.role as string)
  ) {
    navigate("/admin/dashboard/user");
  } else if (token || (split[1] === "admin" && user.role === "user")) {
    navigate("/home");
  }
};

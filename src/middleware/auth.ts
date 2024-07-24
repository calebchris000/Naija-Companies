import { useToken, useUserData } from "@src/core/utils/utils";
import { navigate } from "svelte-routing";
import { HandleRoute } from "./route";
import { VerifyToken } from "@src/core/api/auth";
import { store } from "@src/lib/store";

export const Auth = () => {
  //   verifyAuth();
  handleAuth();
  HandleRoute();
  getUserRole();
};

function handleAuth() {
  const token = useToken();
  const { pathname } = window.location;
  const valid_routes = ["/signup", "/login", "/home"];

  if (!token && !valid_routes.includes(pathname)) {
    navigate("/home");
  }
}

export const getUserRole = async () => {
  const token = useToken();
  const res = await VerifyToken({ token });

  if (res.status !== 200) {
    console.log("Could not verify token");
  } else {
    const { privilege } = res.data?.data;
    console.log(privilege);
    store.update((c) => {
      c.user_role = privilege;
      return c;
    });
  }
};

import { useToken, useUserData } from "@src/core/utils/utils";
import { navigate } from "svelte-routing";
import { HandleRoute } from "./route";

export const Auth = () => {
  //   verifyAuth();
  handleAuth();
  HandleRoute();
};

function handleAuth() {
  const token = useToken();
  const { pathname } = window.location;
  const valid_routes = ["/signup", "/login"];

  if (!token && !valid_routes.includes(pathname)) {
    navigate("/login");
  }
}

export const verifyAuth = () => {};

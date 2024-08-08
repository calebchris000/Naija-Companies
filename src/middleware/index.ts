import { Auth } from "./auth";
import { Screen } from "./screen";

export const Middleware = () => {
  Auth();
  Screen();
  closeFilterItems();
};

function closeFilterItems() {}

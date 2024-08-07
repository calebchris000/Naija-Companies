import { Auth } from "./auth";
import { Screen } from "./screen";

export const Middleware = () => {
  Auth();
  Screen();
  closeFilterItems();
};

function closeFilterItems() {
  console.log("this works");
  document.addEventListener("click", (e) => {
    console.log(e.target.className);
  });
}

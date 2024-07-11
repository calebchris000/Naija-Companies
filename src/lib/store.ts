import { writable } from "svelte/store";

type CapitalListType = Array<string>;
type SelectedCapital = { id: string; name: string }; // Assuming both ID and name are strings
type DeviceType = "desktop" | "mobile" | "tablet" | "large-tablet";

// Define the StoreType based on the properties of initialValue
type StoreType = {
  cities_in_capital: string[];
  capital_list: CapitalListType;
  user_role: "user" | "admin" | "unset";
  selected_capital: any[];
  application: {
    selected_capital: SelectedCapital;
  };
  device: DeviceType;
  sidebar_selected: string;
};
const initialValue: StoreType = {
  cities_in_capital: [],
  capital_list: [],
  user_role: "user",
  selected_capital: [],
  application: {
    selected_capital: { id: "", name: "" },
  },
  device: "desktop" as "desktop" | "mobile" | "tablet" | "large-tablet",
  sidebar_selected: "Users"
};

// Define a writable store with an initial value
export const store = writable(initialValue);

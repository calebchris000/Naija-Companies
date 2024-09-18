import type { OrganizationDetailType } from "@src/types";
import { writable } from "svelte/store";

type CapitalListType = Array<string>;
type SelectedCapital = { id: string; name: string }; // Assuming both ID and name are strings
type DeviceType = "desktop" | "mobile" | "tablet" | "large-tablet";

// Define the StoreType based on the properties of initialValue
type StoreType = {
  cities_in_capital: string[];
  mobileSidebarOpen: boolean;
  capital_list: CapitalListType;
  user_role: "user" | "admin" | "unset";
  selected_capital: any[];
  review_modal_open: boolean;
  organization: {
    id: string | null;
    rating: number;
    starColor: number | undefined;
    selected: OrganizationDetailType;
  };
  application: {
    selected_capital: SelectedCapital;
  };
  summarize_status: "inactive" | "pending" | "success" | "failure";
  device: DeviceType;
  sidebar_selected: string;
};
const initialValue: StoreType = {
  cities_in_capital: [],
  mobileSidebarOpen: false,
  capital_list: [],
  user_role: "user",
  selected_capital: [],
  review_modal_open: false,
  organization: {
    id: null,
    rating: 0,
    starColor: 0,
    selected: {
      id: "",
      name: "",
      website: "",
      industry: { name: "" },
      description: "",
      average: 0,
      logoUrl: "",
      verified: false,
    },
  },
  summarize_status: "inactive",
  application: {
    selected_capital: { id: "", name: "" },
  },
  device: "desktop" as "desktop" | "mobile" | "tablet" | "large-tablet",
  sidebar_selected: "Users",
};

// Define a writable store with an initial value
export const store = writable(initialValue);

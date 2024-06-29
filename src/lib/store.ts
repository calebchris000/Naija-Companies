import { writable } from "svelte/store";

const initialValue = {
  cities_in_capital: [],
  capital_list: [],
  selected_capital: [],
  application: {
    selected_capital: { id: "", name: "" },
  },
};

// Define a writable store with an initial value
export const store = writable(initialValue);

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let capital_name = "Ibadan";
  export let capital_id = "";
  export let capital_color = "blue";
  export let numberOfCompanies = 1
  const dispatch = createEventDispatcher();
</script>

<button
  on:click={() => {
    dispatch("click", { capital: capital_name, id: capital_id });
  }}
  style="border-color: {capital_color}"
  class="p-4 cursor-pointer border-b-2 bg-gray-200 shadow-md h-20 flex items-center justify-center"
>
  <div></div>
  <div class="flex flex-col gap-1">
    <span class="font-semibold">{capital_name}</span>
    <span class="text-xs font-medium">{numberOfCompanies} companies</span>
  </div>
</button>

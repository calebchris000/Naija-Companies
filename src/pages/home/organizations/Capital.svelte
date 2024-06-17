<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let capital_name = "Ibadan";
  export let capital_color = "blue";
  export let capital_img = "";
  const dispatch = createEventDispatcher();
</script>

<button
  on:click={() => {
    dispatch("click", { capital: capital_name });
  }}
  style="border-color: {capital_color}"
  class="p-4 cursor-pointer border-b-2 bg-gray-200 shadow-md h-20 flex items-center justify-center"
>
  <div></div>
  <div>
    <span class="font-semibold">{capital_name}</span>
  </div>
</button>

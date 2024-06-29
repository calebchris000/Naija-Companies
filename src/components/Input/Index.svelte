<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let type: "text" | "number" | "email" | "password" = "text";
  export let label: string = "";
  export let placeholder: string = "";
  export let icon: string = "";
  export let icon_class: string = "";
  const dispatch = createEventDispatcher();

  function handleInput(e: Event) {
    dispatch("input", { label, value: (e.target as HTMLInputElement)?.value });
  }
</script>

<div class="border-b p-2 px-4 ps-8 relative border-gray-400">
  <img
    class="absolute w-4 left-0 top-[50%] translate-y-[-50%] {icon_class}"
    src={icon}
    alt="icon"
  />
  <input
    on:input={handleInput}
    class="outline-none font-medium placeholder:text-gray-600 bg-transparent border-transparent"
    {type}
    {placeholder}
  />
</div>

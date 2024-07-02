<script lang="ts">
  import Link from "@src/assets/svg/Link.svelte";
  import User from "@src/assets/svg/User.svelte";
  import { createEventDispatcher } from "svelte";

  export let label: string = "";
  export let placeholder: string = "";
  export let Icon: string | typeof User = "";
  export let icon_class: string = "";
  const dispatch = createEventDispatcher();

  function handleInput(e: Event) {
    dispatch("input", { label, value: (e.target as HTMLInputElement)?.value });
  }
</script>

<div class="border-b-2 p-2 px-4 ps-8 relative border-gray-400">
  {#if typeof Icon === "string"}
    <!-- <img
  class="absolute w-4 left-0 top-[50%] translate-y-[-50%] {icon_class}"
  src={icon}
  alt="icon"
  /> -->
  {:else}
    <svelte:component className="absolute w-4 left-0 top-[1.3rem] translate-y-[-50%] {icon_class}" this={Icon} />
  {/if}
  <textarea
    on:input={handleInput}
    class="outline-none font-medium h-10 placeholder:text-gray-600 bg-transparent border-transparent"
    {placeholder}
  ></textarea>
</div>

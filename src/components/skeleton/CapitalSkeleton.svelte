<script lang="ts">
  import { store } from "@src/lib/store";
  const thirty_six_content = new Array(36).fill("");
  import "./style.css";
</script>

<section
  class="lg:grid lg:grid-cols-2 lg:pt-28 lg:gap-4 lg:w-[85vw] lg:mx-auto h-[85vh]"
>
  <div class="grid grid-cols-2 max-md:h-[75vh] gap-2 overflow-y-scroll w-full">
    {#each thirty_six_content as _}
      <div
        style=""
        class="p-4 cursor-pointer pulse h-20 flex items-center justify-center"
      ></div>
    {/each}
  </div>
  {#if $store.device !== "mobile"}
    <div class="w-full right_pulse bg-gray-200 h-[80vh]"></div>
  {/if}
</section>

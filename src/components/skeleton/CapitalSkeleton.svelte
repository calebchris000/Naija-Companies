<script lang="ts">
  import { store } from "@src/lib/store";
  const thirty_six_content = new Array(36).fill("");
  import "./style.css";
</script>

<section
  class="xl:grid xl:grid-cols-2 xl:pt-28 xl:gap-4 xl:w-[85vw] xl:mx-auto h-[85vh]"
>
  <div class="grid grid-cols-2 gap-2 overflow-y-scroll w-full">
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

<script lang="ts">
  const thirty_six_content = new Array(36).fill("");
  import "./style.css";
</script>

<section class="grid grid-cols-2 gap-2 overflow-y-scroll h-[60vh] ">
  {#each thirty_six_content as _}
    <div
      style=""
      class="p-4 cursor-pointer pulse h-20 flex items-center justify-center"
    ></div>
  {/each}
</section>

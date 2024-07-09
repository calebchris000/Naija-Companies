<script lang="ts">
  import Grid from "@src/assets/svg/grid.svelte";
</script>

<nav
  class="h-20 bg-gray-700 flex fixed left-0 right-0 items-center justify-between px-5"
>
  <section>
    <button type="button">
      <Grid className="w-10 text-white" />
    </button>
  </section>
  <section></section>
  <section class="flex items-center gap-2">
    <div class="h-10 w-10 bg-white rounded-full">
      <img src="" alt="" />
    </div>
    <button type="button" class="flex flex-col gap-1">
      <span class="text-xs font-medium spaced">Caleb Nwaizu</span>
      <span class="text-xs font-medium spaced">calebchris000@gmail.com</span>
    </button>
  </section>
</nav>

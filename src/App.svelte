<script lang="ts">
  import logo from "@src/assets/logo.jpeg";
  import More from "@src/assets/svg/More.svelte"
  $: isMobile = window.innerWidth <= 820;
</script>

<main>
  <section
    class="border border-red-500 flex items-center justify-between max-md:p-4"
  >
    <div class="flex flex-col gap-1 items-center">
      <img class="w-10 h-10 rounded-full overflow-hidden" src={logo} alt="" />
      <!-- <span class="text-sm font-semibold">NC</span> -->
    </div>
    <div>Home</div>
    {#if isMobile}
      <button>
        <More className=" fill-orange-600 h-8" />
      </button>
    {:else}
      <div>Account</div>
    {/if}
  </section>
</main>

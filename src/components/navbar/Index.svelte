<script type="ts">
  import logo from "@src/assets/logo.jpeg";
  import logo_text from "@src/assets/logo_text.png";
  import More from "@src/assets/svg/More.svelte";
  $: isMobile = window.innerWidth <= 820;
</script>

<section
  class="border border-orange-600 w-full grid grid-cols-3 items-center fixed top-0 p-0 px-4 h-20 overflow-hidden"
>
  <div class="h-fit">
    <button class="">
      <img class="h-20" src={logo_text} alt="logo" />
    </button>
  </div>
  <div class="mx-auto">
    <select id="" class="text-lg border border-orange-600 rounded-sm p-2 px-4">
      <option value="">Home</option>
      <option value="">About</option>
    </select>
  </div>
  <div class="ms-auto">
    {#if isMobile}
      <More className="fill-orange-600 w-8" />
    {/if}
  </div>
</section>

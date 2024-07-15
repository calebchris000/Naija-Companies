<script lang="ts">
  import logo from "@src/assets/svg/logo.svg";
  import More from "@src/assets/svg/More.svelte";
  import { Link } from "svelte-routing";

  $: menu_open = false;
  function toggleMenu() {
    menu_open = !menu_open;
  }
</script>

<nav
  class="px-12 nav h-20 fixed left-0 right-0 top-0 z-[200] bg-gray-950 text-white flex items-center justify-between max-lg:px-4"
>
  <div class="">
    <img class="w-16" src={logo} alt="" />
  </div>
  <div class="space-x-4 font-semibold">
    <Link class=" text-secondary transition-all text-lg max-lg:hidden" to="/"
      >ABOUT US</Link
    >
    <Link class="text-secondary transition-all text-lg max-lg:hidden" to="/"
      >FAQ</Link
    >
  </div>
  <div
    class="text-lg font-semibold bg-yellow-500 hover:bg-white transition-all text-gray-900 p-1 px-2 max-lg:hidden"
  >
    <button class="font-bold" type="button">GET STARTED</button>
  </div>

  <!-- Mobile -->
  <button on:click={toggleMenu} type="button" class="xl:hidden">
    <More className="w-8 h-8" />
  </button>

  <!--* Menu -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-interactive-supports-focus -->
  <section
    role="button"
    on:click={() => {
      menu_open = false;
    }}
    style="opacity: {menu_open ? '1' : '0'}; pointer-events: {menu_open
      ? 'all'
      : 'none'}"
    class="fixed inset-0 nav-menu nav-overlay opacity-0 p-4 py-10"
  >
    <div class="nav-body flex flex-col gap-10">
      <div class="flex flex-col gap-4">
        <Link class="text-2xl text-secondary w-fit font-semibold" to="/"
          >ABOUT US</Link
        >
        <Link class="text-secondary text-2xl w-fit font-semibold" to="/"
          >FAQ</Link
        >
      </div>
      <button
        class="w-fit bg-yellow-500 text-black px-4 block p-1 font-bold text-2xl"
        type="button">GET STARTED</button
      >
    </div>
  </section>
  <!--* Menu  -->

  <!-- Mobile -->
</nav>

<style>
  .nav {
    font-family: "Rajdhani", sans-serif;
  }

  .nav-overlay {
    background: rgba(255, 255, 255, 0);
    backdrop-filter: blur(12.3px);
    -webkit-backdrop-filter: blur(12.3px);
  }
</style>

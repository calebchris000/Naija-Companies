<script lang="ts">
  import logo from "@src/assets/svg/logo-no-background.png";
  import { Link } from "svelte-routing";

  $: menu_open = false;
  $: screen_height = window.innerHeight;
  $: scroll_y = 0;

  let menu_element: HTMLDivElement;

  function handleMenuToggle() {
    menu_open = !menu_open;
    console.log(menu_open);
  }

  window.addEventListener("scroll", () => {
    scroll_y = window.scrollY;
  });

  window.addEventListener("resize", () => {
    setTimeout(() => {
      menu_element.style.display = "flex";
    }, 1000);
    menu_element.style.display = "none";
    menu_open = false;
    screen_height = window.innerHeight;
  });
</script>

<nav
  style="box-shadow: {scroll_y > 0 ? '0 1px 10px rgba(131, 143, 165, 0.5)' : ''};"
  class="sticky top-0 w-full bg-primary h-20"
>
  <!--* Desktop -->
  <div class="hidden xl:flex items-center w-full h-full px-32 gap-20">
    <div class="items-center hidden xl:flex">
      <img class="w-32" src={logo} alt="" />
    </div>
    <div class="items-center gap-10 font-medium text-secondary xl:flex">
      <Link to="/">Blog</Link>
      <Link to="/">Features</Link>
      <Link to="/">Services</Link>
    </div>
    <div class="gap-4 items-center justify-self-end xl:flex ms-auto">
      <button
        class=" bg-cto p-2 px-4 rounded-lg font-semibold text-light"
        type="button">Get Started</button
      >
      <button class="font-semibold text-cto" type="button">Log In</button>
    </div>
  </div>
  <!--* Desktop  -->

  <!--* Mobile -->
  <div
    class="w-full h-full px-4 flex relative items-center justify-end xl:hidden"
  >
    <img
      class="w-32 absolute left-[50%] translate-x-[-50%]"
      src={logo}
      alt=""
    />
    <button
      on:click={handleMenuToggle}
      type="button"
      class="w-6 flex flex-col gap-2"
    >
      <span class="w-full h-[0.3rem] rounded-lg bg-secondary"></span>
      <span class="w-full h-[0.3rem] rounded-lg bg-secondary"></span>
    </button>

    <div
      bind:this={menu_element}
      style="height: {menu_open ? '100vh' : '0'}; padding-top: {menu_open
        ? '2.5rem'
        : '0'}; padding-bottom: {menu_open ? '2.5rem' : '0'}"
      class="fixed slow-transition flex flex-col overflow-hidden p-10 justify-between inset-0 bg-secondary"
    >
      <div class="flex justify-end w-full">
        <button
          on:click={handleMenuToggle}
          type="button"
          class="w-8 flex flex-col gap-2 absolute right-4"
        >
          <span class="w-full h-[0.3rem] rounded-lg rotate-45 bg-primary"
          ></span>
          <span
            class="w-full h-[0.3rem] rounded-lg -rotate-45 bg-primary absolute"
          ></span>
        </button>
      </div>

      <div class="flex flex-col gap-4">
        <Link class="text-[4rem] text-primary font-semibold" to="/">Blog</Link>
        <Link class="text-[4rem] text-primary font-semibold" to="/"
          >Features</Link
        >
        <Link class="text-[4rem] text-primary font-semibold" to="/"
          >Services</Link
        >
      </div>
      <div class="flex flex-col gap-4">
        <Link class="text-[4rem] text-light font-semibold" to="/">Sign Up</Link>
        <Link class="text-[4rem] text-light font-semibold" to="/">Log In</Link>
      </div>
    </div>
  </div>
  <!--* Mobile  -->
</nav>

<style>
  .slow-transition {
    transition: all 0.8s ease-in-out;
  }
</style>

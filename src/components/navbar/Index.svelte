<script lang="ts">
  import logo_text from "@src/assets/logo_text.png";
  import "./style.css";
  import More from "@src/assets/svg/More.svelte";
  import MobileOptions from "./MobileOptions.svelte";
  $: isMobile = window.innerWidth <= 820;
  export let className = "";
  export let style = "";
  $: mobile_option_opened = false;

</script>

<nav
  {style}
  class="w-full shadow-sm grid grid-cols-4 bg-white items-center fixed top-0 p-0 px-4 h-20 z-10 overflow-hidden {className}"
>
  <div class="h-fit">
    <button class="">
      <img class="h-20" src={logo_text} alt="logo" />
    </button>
  </div>
  <div class="col-span-2">

    <slot />
  </div>
  <div class="ms-auto">
    {#if isMobile}
      <button
        on:click={() => {
          mobile_option_opened = !mobile_option_opened;
        }}
        type="button"
      >
        <More className="fill-orange-600 w-8" />
      </button>
    {/if}

    {#if mobile_option_opened}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-interactive-supports-focus -->
      <div
        role="button"
        on:click={() => {
          mobile_option_opened = false;
        }}
        class="fixed inset-0 overlay-blur right-0 top-0 p-5 z-[100]"
      >
        <MobileOptions />
      </div>
    {/if}
  </div>
</nav>

<script lang="ts">
  import Mobile from "./Mobile.svelte";
  import Desktop from "./Desktop.svelte";
  import logo_text from "@src/assets/svg/logo.svg";
  import "./style.css";
  import More from "@src/assets/svg/More.svelte";
  import MobileOptions from "./MobileOptions.svelte";
  $: isMobile = window.innerWidth <= 820;
  export let className = "";
  export let style = "";
  $: mobile_option_opened = false;
  $: device = "desktop" as "desktop" | "mobile" | "tablet" | "large-tablet";

  function handleResize() {
    const { innerWidth } = window;

    let deviceType;
    if (innerWidth >= 768 && innerWidth <= 1024) {
      // Tablet
      deviceType = "tablet";
      device = "tablet";
    } else if (innerWidth > 1024 && innerWidth <= 1200) {
      // Large Tablet
      deviceType = "largeTablet";
      device = "large-tablet";
    } else if (innerWidth > 1200) {
      // Desktop
      device = "desktop";
      deviceType = "desktop";
    } else {
      // Mobile
      device = "mobile";
      deviceType = "mobile";
    }
  }
  $: handleResize();
  $: console.log(device);

  window.addEventListener("resize", handleResize);
</script>

{#if device === "desktop"}
  <Desktop />
{:else}
  <Mobile>
    <slot />
  </Mobile>
{/if}

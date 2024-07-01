<script lang="ts">
  import Mobile from "./Mobile.svelte";
  import Desktop from "./Desktop.svelte";
  import logo_text from "@src/assets/svg/logo.svg";
  import "./style.css";
  import More from "@src/assets/svg/More.svelte";
  import MobileOptions from "./MobileOptions.svelte";
  import { store } from "@src/lib/store";
  export let className = "";
  export let style = "";
  $: device = $store.device as "desktop" | "mobile" | "tablet" | "large-tablet";

</script>

{#if device === "desktop"}
  <Desktop />
{:else}
  <Mobile>
    <slot />
  </Mobile>
{/if}

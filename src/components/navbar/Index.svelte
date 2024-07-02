<script lang="ts">
  import Mobile from "./Mobile.svelte";
  import Desktop from "./Desktop.svelte";
  import logo_text from "@src/assets/svg/logo.svg";
  import "./style.css";
  import More from "@src/assets/svg/More.svelte";
  import MobileOptions from "./MobileOptions.svelte";
  import { store } from "@src/lib/store";
  export let show_right_action: boolean = true
  $: device = $store.device as "desktop" | "mobile" | "tablet" | "large-tablet";

</script>

{#if device === "desktop"}
  <Desktop {show_right_action} />
{:else}
  <Mobile>
    <slot />
  </Mobile>
{/if}

<script lang="ts">
  import Arrow from "@src/assets/svg/Arrow.svelte";
  import { navigate } from "svelte-routing";
  export let title = "";
  export let custom_path = "";

  function handleBack() {
    if (custom_path) {
      navigate(custom_path);
      return;
    }
    const { pathname } = window.location;
    const path =
      pathname[pathname.length - 1] === "/" ? pathname.slice(0, -2) : pathname;
    let newRoute: string | string[] = path.split("/");
    newRoute.pop();
    newRoute = newRoute.join("/");
    navigate(newRoute);
  }
</script>

<div class="flex items-center gap-4 px-4 xl:hidden">
  <button on:click={handleBack} type="button">
    <Arrow className="w-4" />
  </button>
  <span class="text-xl font-semibold">{title}</span>
</div>

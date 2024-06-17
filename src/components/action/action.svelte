<script lang="ts">
  import Arrow from "@src/assets/svg/Arrow.svelte";
  import { navigate } from "svelte-routing";
  export let title = "";

  function handleBack() {
    const { pathname } = window.location;
    const path =
      pathname[pathname.length - 1] === "/" ? pathname.slice(0, -2) : pathname;
    let newRoute: string | string[] = path.split("/");
    newRoute.pop();
    newRoute = newRoute.join("/");
    console.log(newRoute);
    navigate(newRoute);
  }
</script>

<div class="flex items-center gap-4 px-4">
  <button on:click={handleBack} type="button">
    <Arrow className="w-4" />
  </button>
  <span class="text-xl font-semibold">{title}</span>
</div>

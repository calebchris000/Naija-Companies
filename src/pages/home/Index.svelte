<script lang="ts">
  import Navbar from "@src/components/navbar/Index.svelte";
  import Landing from "./Landing.svelte";
  import Pencil from "@src/assets/svg/Pencil.svelte";
  import { LocalStorage, useToken } from "@src/core/utils/utils";
  import { onMount } from "svelte";
  import Door from "@src/assets/svg/Door.svelte";
  import { navigate } from "svelte-routing";
  const local_storage = new LocalStorage();
  const token = useToken();

  function handleWrite() {
    const token = useToken();
    if (!token) {
      window.location.replace("login");
      return;
    }
    window.location.href = "/home/capital";
  }

  function handleGetStarted() {
    navigate("/signup");
  }

  onMount(() => {
    local_storage.removeItem("selected_organization");
    local_storage.removeItem("selected_capital");
    local_storage.removeItem("params");
  });
</script>

<section>
  <Navbar>
    <div class="mx-auto flex items-center justify-center gap-1 w-full">
      {#if token}
        <Pencil className="fill-orange-600 stroke-white w-4" />
        <button
          on:click={handleWrite}
          class="font-medium underline text-orange-600 p-0 text-nowrap"
          type="button">Write a Review</button
        >
      {:else}
        <button
          on:click={handleGetStarted}
          class="bg-orange-500 flex items-center justify-between p-2 px-4 gap-2 font-medium text-white rounded"
          type="button"
        >
          <Door className="w-5" />
          <span>Get Started</span>
        </button>
      {/if}
    </div>
  </Navbar>

  <Landing />
</section>

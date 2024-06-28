<script lang="ts">
  import Navbar from "@src/components/navbar/Index.svelte";
  import Landing from "./Landing.svelte";
  import Pencil from "@src/assets/svg/Pencil.svelte";
  import { LocalStorage, useToken } from "@src/core/utils/utils";
  import { onMount } from "svelte";
  const local_storage = new LocalStorage();

  function handleWrite() {
    const token = useToken();
    if (!token) {
      window.location.replace("login");
      return;
    }
    window.location.href = "/home/capital?focus=true";
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
      <Pencil className="fill-orange-600 stroke-white w-4" />
      <button
        on:click={handleWrite}
        class="font-medium underline text-orange-600 p-0 text-nowrap"
        type="button">Write a Review</button
      >
    </div>
  </Navbar>

  <Landing />
</section>

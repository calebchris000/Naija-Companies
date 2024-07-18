<script lang="ts">
  import Landing from "./Landing.svelte";
  import { LocalStorage, useToken } from "@src/core/utils/utils";
  import { onMount } from "svelte";
  const local_storage = new LocalStorage();
  const token = useToken();


  onMount(() => {
    local_storage.removeItem("selected_organization");
    local_storage.removeItem("selected_capital");
    local_storage.removeItem("params");
  });
</script>

<main class="">
  <Landing />
</main>

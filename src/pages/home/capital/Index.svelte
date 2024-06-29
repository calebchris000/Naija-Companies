<script lang="ts">
  import Navbar from "@src/components/navbar/Index.svelte";
  import Capital from "./Capital.svelte";
  import { capitals } from "@src/lib/capitals";
  import Action from "@src/components/action/action.svelte";
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { GetCapital } from "@src/core/api/capital";
  import { useToken } from "@src/core/utils/utils";
  import { Notification } from "@src/utils/notification";
  import CapitalSkeleton from "@src/components/skeleton/CapitalSkeleton.svelte";
  import { store } from "@src/lib/store";

  function handleClick({ capital, id }: { capital: string; id: string }) {
    localStorage.setItem(
      "selected_capital",
      JSON.stringify({ name: capital, id })
    );
    $store.application.selected_capital = { name: capital, id };

    navigate(`capital/${capital}/`);
  }

  $: capitals_list = [];
  $: fetch_state = "pending";

  async function getCapitals() {
    const notification = new Notification();
    const token = useToken();
    fetch_state = "pending";
    const response = await GetCapital({ token });

    if (response.status !== 200) {
      fetch_state = "failure";

      notification.error({
        text: "Sorry, could not get capitals at this time",
      });
      return;
    }
    fetch_state = "success";
    capitals_list = response.data?.data;
  }

  onMount(() => {
    getCapitals();
  });
</script>

<section class="">
  <Navbar>
    <button type="button" class="w-full"></button>
  </Navbar>
  <div class="pt-24 py-4">
    <Action title="Select a capital" />
  </div>

  <div>
    <span></span>
  </div>

  {#if fetch_state === "pending"}
    <div class="px-4">
      <CapitalSkeleton />
    </div>
  {/if}

  <div class="grid grid-cols-2 px-4 gap-2 overflow-y-scroll h-[60vh]">
    {#each capitals_list as { id, name, color, image, numberOfCompanies }}
      <Capital
        on:click={(e) => {
          handleClick(e.detail);
        }}
        capital_id={id}
        {numberOfCompanies}
        capital_name={name}
        capital_img={image}
        capital_color={color}
      />
    {/each}
  </div>
</section>

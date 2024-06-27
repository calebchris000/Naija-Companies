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

  function handleClick({ capital }: { capital: string }) {
    localStorage.setItem("params", capital);

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

<section class="pt-24 grid grid-cols-1 gap-2 px-4">
  <Navbar>
    <div></div>
  </Navbar>
  <Action title="Select a capital" />

  <div>
    <span></span>
  </div>

  {#if fetch_state === "pending"}
    <div class="">
      <CapitalSkeleton />
    </div>
  {/if}

  <div class="grid grid-cols-2 gap-2 overflow-y-scroll h-[50vh]">
    {#each capitals_list as { name, color, image, numberOfCompanies }}
      <Capital
        on:click={(e) => {
          handleClick(e.detail);
        }}
        {numberOfCompanies}
        capital_name={name}
        capital_img={image}
        capital_color={color}
      />
    {/each}
  </div>
</section>

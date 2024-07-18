<script lang="ts">
  import Navbar from "@src/components/navbar/navbar.svelte";
  import Action from "@src/components/action/action.svelte";
  import Company from "./Company.svelte";
  import { Link, navigate } from "svelte-routing";
  import Building from "@src/assets/svg/Building.svelte";
  import { store } from "@src/lib/store";
  import { onMount } from "svelte";
  import { Notification } from "@src/utils/notification";
  import { GetOrganizations } from "@src/core/api/organization";
  import { LocalStorage, useToken } from "@src/core/utils/utils";

  const capital = $store.application.selected_capital.name;
  const token = useToken();
  const local_storage = new LocalStorage();
  $: organization_status = "not_fetched";
  $: organizations = [];

  function handleClick(d: { company: string; id: string }) {
    const { company, id } = d;
    local_storage.setItem("selected_organization", {
      id,
      organization: company,
    });
    const join = company.toLowerCase().split(" ").join("-");
    navigate(`${join}/reviews`);
  }

  function handleAddCompany() {
    navigate("/home/organization/add");
  }

  async function getOrganizations() {
    organization_status = "pending";
    const notification = new Notification();
    const capitalId = local_storage.getItem("selected_capital", false)?.id;

    const response = await GetOrganizations({
      token,
      getReviews: true,
      capitalId,
    });

    if (response.status !== 200) {
      organization_status = "failure";
      notification.error({
        text: response.data?.message ?? "Could not get organizations",
      });
      return;
    }
    organization_status = "success";
    organizations = response.data?.data;
  }

  function handleRoute() {
    const { origin } = window.location;
    navigate(`${origin}/home/organization/add`);
  }

  onMount(() => {
    local_storage.removeItem("selected_organization");
    getOrganizations();
  });
</script>

<section class="pt-20">
  <Navbar>
    <button
      on:click={handleAddCompany}
      class="text-orange-500 w-full justify-center p-1 transition-all flex items-center gap-2"
      type="button"
    >
      <Building className="w-3" />
      <span class="text-xs">Add Organization</span>
    </button>
  </Navbar>
  <div class="py-4">
    <Action title="Search Companies In {capital}" />
  </div>
  <div class="grid grid-cols-2 gap-2 px-4">
    {#if organization_status === "pending"}
      <span>Loading. Please wait...</span>
    {:else if organizations.length}
      {#each organizations as { id, name, logoUrl, rating }}
        <Company
          {id}
          on:click={(e) => handleClick(e.detail)}
          {name}
          logo={logoUrl}
          rating={Number(rating)}
        />
      {/each}
    {:else}
      <div class="fixed top-36 left-0 right-0 mx-4 flex flex-col gap-4">
        <span class="font-medium text-gray-500"
          >There are no organizations listed on this capital.</span
        >
        <button
          on:click={handleRoute}
          class="bg-orange-500 p-2 px-4 w-fit mx-auto block rounded-md text-white font-medium"
          type="button">Add An Existing Organization</button
        >
      </div>
    {/if}
  </div>
</section>

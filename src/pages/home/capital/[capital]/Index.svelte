<script lang="ts">
  import Navbar from "@src/components/navbar/Index.svelte";
  import Action from "@src/components/action/action.svelte";
  import Company from "./Company.svelte";
  import { navigate } from "svelte-routing";
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

    const response = await GetOrganizations({ token, getReviews: true });

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
      <span class="text-xs">Add a company</span>
    </button>
  </Navbar>
  <div class="py-4">
    <Action title="Search Companies In {capital}" />
  </div>
  <div class="grid grid-cols-2 gap-2 px-4">
    {#if organization_status === "pending"}
      <span>Loading. Please wait...</span>
    {:else}
      {#each organizations as { id, name, logoUrl, rating }}
        <Company
          {id}
          on:click={(e) => handleClick(e.detail)}
          {name}
          logo={logoUrl}
          rating={Number(rating)}
        />
      {/each}
    {/if}
  </div>
</section>

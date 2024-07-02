<script lang="ts">
  import Navbar from "@src/components/navbar/Index.svelte";
  import Capital from "./Capital.svelte";
  import { capitals } from "@src/lib/capitals";
  import Action from "@src/components/action/action.svelte";
  import { Link, navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { GetCapital } from "@src/core/api/capital";
  import { LocalStorage, useToken } from "@src/core/utils/utils";
  import { Notification } from "@src/utils/notification";
  import CapitalSkeleton from "@src/components/skeleton/CapitalSkeleton.svelte";
  import { store } from "@src/lib/store";
  import { GetOrganizations } from "@src/core/api/organization";
  import Company from "./[capital]/Company.svelte";

  const token = useToken();
  const local_storage = new LocalStorage();
  $: capitals_list = [];
  $: fetch_state = "success";
  $: is_mobile = $store.device === "mobile";
  $: organizations = [];
  $: organization_status = "not_active" as
    | "pending"
    | "success"
    | "failure"
    | "not_active";

  $: console.log(organizations);

  function handleClick({ capital, id }: { capital: string; id: string }) {
    localStorage.setItem(
      "selected_capital",
      JSON.stringify({ name: capital, id })
    );
    $store.application.selected_capital = { name: capital, id };

    if (!is_mobile) {
      console.log("it is desktop");

      getOrganizations();
      return;
    }

    navigate(`capital/${capital}/`);
  }

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
    navigate("/home/organization/add");
  }

  function handleCapital(d: { company: string; id: string }) {
    const { company, id } = d;
    local_storage.setItem("selected_organization", {
      id,
      organization: company,
    });
    const join = company.toLowerCase().split(" ").join("-");
    navigate(`capital/${join}/reviews`);
  }

  onMount(() => {
    getCapitals();
  });
</script>

<section class="">
  <Navbar>
    <button type="button" class="w-full"></button>
  </Navbar>
  {#if is_mobile}
    <div class="pt-24 py-4">
      <Action title="Select a capital" />
    </div>
  {/if}

  {#if fetch_state === "pending"}
    <div class="px-4">
      <CapitalSkeleton />
    </div>
  {/if}

  <div class="xl:grid xl:grid-cols-2 xl:pt-28 xl:gap-4 xl:w-[85vw] xl:mx-auto">
    {#if !is_mobile}
      <div
        class="col-span-2 flex justify-between font-semibold text-orange-500 text-xl px-4"
      >
        <span>Capitals</span>
        <span class="flex flex-col"
          >Organizations In Selected Capital <Link
            class="font-normal text-sm ms-auto underline"
            to="/home/organization/add">Add an existing organization</Link
          >
        </span>
      </div>
    {/if}
    <div
      class="grid grid-cols-2 px-4 gap-2 overflow-y-scroll h-[60vh] xl:h-[80vh]"
    >
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
    {#if !is_mobile}
      <div style="" class="bg-gray-100 p-4 h-[80vh] overflow-y-scroll">
        {#if organization_status === "not_active"}
          <span class="font-medium text-gray-400 pt-10 text-2xl mx-auto"
            >Select a capital on the left.</span
          >
        {:else}
          <div class="grid grid-cols-3 gap-4 px-0 w-full">
            {#if organization_status === "pending"}
              <span>Loading. Please wait...</span>
            {:else if organizations.length}
              {#each organizations as { id, name, logoUrl, rating }}
                <Company
                  {id}
                  on:click={(e) => handleCapital(e.detail)}
                  {name}
                  logo={logoUrl}
                  rating={Number(rating)}
                />
              {/each}
            {:else}
              <div class="flex flex-col col-span-3 px-10 w-full gap-10">
                <span class="font-medium text-gray-400 pt-10 text-2xl"
                  >There are no organizations listed on this capital.</span
                >
                {#if is_mobile}
                  <button
                    on:click={handleRoute}
                    class="bg-orange-500 p-4 w-full mx-auto block rounded-md text-white font-medium"
                    type="button">Add An Existing Organization</button
                  >
                {/if}
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</section>


<svelte:head>
  <title>Find Organizations - Naija Companies</title>
</svelte:head>
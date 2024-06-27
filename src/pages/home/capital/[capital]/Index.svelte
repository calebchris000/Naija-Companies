<script lang="ts">
  import Navbar from "@src/components/navbar/Index.svelte";
  import Action from "@src/components/action/action.svelte";
  import { companies } from "@src/lib/companies";
  import Company from "./Company.svelte";
  import { navigate } from "svelte-routing";
  import Building from "@src/assets/svg/Building.svelte";
  import { store } from "@src/lib/store";

  const capital = $store.application.selected_capital.name;

  function handleClick(d: { company: string }) {
    const { company } = d;
    const join = company.toLowerCase().split(" ").join("-");
    navigate(`${join}/review`);
  }

  function handleAddCompany() {
    navigate("/home/organization/add");
  }
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
    {#each companies as { name, logo, rating }}
      <Company on:click={(e) => handleClick(e.detail)} {name} {logo} {rating} />
    {/each}
  </div>
</section>

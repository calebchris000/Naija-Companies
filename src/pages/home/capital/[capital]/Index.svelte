<script lang="ts">
  import Navbar from "@src/components/navbar/Index.svelte";
  import Action from "@src/components/action/action.svelte";
  import { companies } from "@src/lib/companies";
  import Company from "./Company.svelte";

  const capital = localStorage.getItem("params");

  function handleClick(company_name: string) {
    console.log(company_name);
  }
</script>

<section class="pt-20">
  <Navbar>
    <div></div>
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

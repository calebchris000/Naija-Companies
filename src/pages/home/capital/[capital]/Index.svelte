<script lang="ts">
  import Navbar from "@src/components/navbar/Index.svelte";
  import Action from "@src/components/action/action.svelte";
  import { companies } from "@src/lib/companies";
  import Company from "./Company.svelte";
  import { navigate } from "svelte-routing";

  const capital = localStorage.getItem("params");

  function handleClick(d: { company: string }) {
    const { company } = d;
    const join = company.toLowerCase().split(' ').join("-")
    navigate(`${join}/review`);
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

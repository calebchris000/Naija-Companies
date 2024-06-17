<script>
  import Navbar from "@src/components/navbar/Index.svelte";
  import Action from "@src/components/action/action.svelte";
  import { companies } from "@src/lib/companies";
  import Company from "./Company.svelte";

  const capital = localStorage.getItem("params");
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
      <Company {name} {logo} {rating} />
    {/each}
  </div>
</section>

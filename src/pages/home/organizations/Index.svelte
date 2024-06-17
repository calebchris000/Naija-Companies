<script lang="ts">
  import Navbar from "@src/components/navbar/Index.svelte";
  import Capital from "./Capital.svelte";
  import { capitals } from "@src/lib/capitals";
  import Action from "@src/components/action/action.svelte";
  import { navigate } from "svelte-routing";

  function handleClick({ capital }: { capital: string }) {
    localStorage.setItem("params", capital);
console.log(capital, "cap");

    navigate(`organizations/${capital}/`)
  }
</script>

<section class="pt-24 grid grid-cols-1 gap-2 px-4">
  <Navbar>
    <div></div>
  </Navbar>
  <Action title="Select a capital" />

  <div>
    <span></span>
  </div>

  <div class="grid grid-cols-2 gap-2 overflow-y-scroll h-[50vh]">
    {#each capitals as { name, color, image }}
      <Capital
        on:click={(e) => {
          handleClick(e.detail);
        }}
        capital_name={name}
        capital_img={image}
        capital_color={color}
      />
    {/each}
  </div>
</section>

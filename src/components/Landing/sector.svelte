<script lang="ts">
  import { sector } from "@src/lib/sectors";
  import Pill from "./components/pill.svelte";
</script>

<section class="bg-white w-full h-full p-4 py-20 flex flex-col gap-10 xl:h-screen xl:p-32">
  <div class="flex flex-col gap-4 text-center xl:max-w-[36vw] mx-auto">
    <span class="text-3xl text-secondary font-medium"
      >Find Organizations By Sector</span
    >
    <span class="text-sm text-secondary leading-loose"
      >Explore and share honest reviews of Nigerian companies by industry. Find
      insights on workplace experiences across diverse sectors.</span
    >
  </div>
  <div class="grid max-sm:grid-cols-1 max-md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 xl:gap-10">
    {#each sector as { id, label, color }}
      <Pill {id} {label} {color} />
    {/each}
  </div>
</section>

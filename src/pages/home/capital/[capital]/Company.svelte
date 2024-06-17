<script>
  import { getStarRating } from "@src/core/logic/getStarRating";
  import { createEventDispatcher } from "svelte";
  export let logo = "";
  export let name = "";
  name = name.length > 14 ? name.slice(0, 14) + "..." : name;
  export let rating = 0;

  let star_color =
    rating <= 2 ? "red" : rating >= 2.5 && rating <= 3.5 ? "orange" : "green";

  const stars = getStarRating(rating);
  const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<section
  role="button"
  on:click={() => {
    dispatch("click", { company: name });
  }}
  class="overflow-hidden w-full bg-gray-50 justify-between shadow-md flex flex-col pt-4"
>
  <div class="px-4">
    <img class="w-20 mx-auto rounded-full" alt="img" src={logo} />
    <div class="flex justify-center">
      {#each stars as star}
        <span style="color: {star_color}" class="text-xl">{star}</span>
      {/each}
    </div>
  </div>
  <div
    class="border-t border-orange-600 flex justify-center h-full items-center py-2"
  >
    <span class="font-medium">
      {name}
    </span>
  </div>
</section>

<script lang="ts">
  import { getStarRating } from "@src/core/logic/getStarRating";
  import { createEventDispatcher } from "svelte";

  export let user_alias = "";
  export let user_rating = 0;
  export let user_review = "";
  const dispatch = createEventDispatcher();
  const stars = getStarRating(user_rating).join("");
  $: expand_review = false;
  $: max_length = 100;

  function handleViewMore() {
    expand_review = !expand_review;

    if (max_length === 100) {
      max_length = -1;
    } else {
      max_length = 100;
    }
  }

  $: star_color =
    user_rating < 2.5
      ? "red"
      : user_rating >= 2.5 && user_rating <= 3.5
        ? "orange"
        : "green";
</script>

<section class="w-full flex flex-col bg-gray-50">
  <div class="flex items-center gap-4 px-4 py-2 bg-gray-300">
    <span class="font-medium text-lg">{user_alias}</span>
    <span style="color: {star_color}" class="text-2xl">{stars}</span>
  </div>
  <div
    class="px-4 py-4 flex flex-col overflow-y-scroll h-44"
  >
    <span class="text-xl"
      >{user_review.slice(0, max_length)}{!expand_review ? "..." : ""}</span
    >
    <button
      on:click={handleViewMore}
      type="button"
      class="w-fit mt-2 text-orange-600 text-xs"
      >View {expand_review ? "Less" : "More"}</button
    >
  </div>
  <div class="w-full flex items-start">
    <button
      class="block transition-all hover:bg-gray-300 text-sm h-full py-3 w-full bg-gray-200"
      type="button">I agree <span class="font-medium">(10)</span> </button
    >
    <button
      class="block transition-all hover:bg-gray-300 text-sm h-full py-3 w-full text-red-400 bg-gray-200"
      type="button">I disagree <span class="font-medium">(2)</span> </button
    >
  </div>
</section>

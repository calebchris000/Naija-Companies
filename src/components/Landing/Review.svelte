<script lang="ts">
  import { getStarRating } from "@src/core/logic/getStarRating";
  import Quote from "@src/assets/svg/Quote.svelte";

  export let company_name: string = "";
  export let rating: number = 0;
  export let review_text: string = "";
  export let reviewer_alias: string = "";
  export let is_employee: boolean = false;
  const star_color =
    rating <= 2
      ? "#dc2626"
      : rating > 3 && rating < 3.5
        ? "#f97316"
        : rating >= 3.5
          ? "#16a34a"
          : "";
  const stars = getStarRating(rating);
</script>

<section>
  <div class="flex flex-col text-orange-500">
    <span class="font-medium text-xl">{company_name}</span>
    <span style="color: {star_color}" class="flex items-center text-lg">
      {#each stars as star}
        <span class="text-xl">{star}</span>
      {/each}
    </span>
  </div>
  <div class="flex flex-col gap-1">
    <span>
      <Quote className="w-6 fill-green-800" />
    </span>
    <span>
      {review_text}
    </span>
    <span class="ms-auto">
      <Quote className="w-6 rotate-180 fill-green-800" />
    </span>
  </div>
  <div class="">
    <span>{reviewer_alias}</span>
    <span>
      {is_employee ? "Employee" : "Ex-Employee"}
    </span>
  </div>
</section>

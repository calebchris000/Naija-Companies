<script lang="ts">
  import LinkIcon from "@src/assets/svg/Link.svelte";
  import { getStarColor, getStarRating } from "@src/core/logic/getStarRating";
  import { Link } from "svelte-routing";

  export let organization_name = "";
  export let organization_review = 0.5;
  export let organization_description = "";
  export let organization_website = "";
  export let organization_logo = "";

  const stars = getStarRating(organization_review).join("");
  const star_color = getStarColor(organization_review);
</script>

<section class="h-[16rem] bg-gray-200 shadow-sm space-y-6 p-4">
  <div class="flex items-center gap-20">
    <div class="w-16 h-16 rounded-full overflow-hidden">
      <img class="w-full" src={organization_logo} alt="organization_logo" />
    </div>

    <div class="flex flex-col">
      <span class="font-medium text-lg">{organization_name}</span>
      <span style="color: {star_color}" class="text-xl">{stars}</span>

      {#if organization_website}
        <a
          href={organization_website}
          class="text-blue-600 text-sm flex items-center gap-2"
        >
          <span>Visit Website</span>
          <LinkIcon className="text-blue-500 w-4" />
        </a>
      {/if}
    </div>
  </div>
  <div
    class="border-t border-gray-300 py-2 font-normal text-sm max-h-[8rem] overflow-y-scroll"
  >
    <span>{organization_description}</span>
  </div>
</section>

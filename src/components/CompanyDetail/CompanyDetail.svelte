<script lang="ts">
  import LinkIcon from "@src/assets/svg/Link.svelte";
  import { getStarColor, getStarRating } from "@src/core/logic/getStarRating";
  import { Link } from "svelte-routing";

  export let organization_name = "";
  export let organization_review = 0.5;
  export let organization_description = "";
  export let organization_website = "";
  export let organization_logo = "";

  $: stars = getStarRating(organization_review).join("");
  $: star_color = getStarColor(organization_review);
  $: website =
    organization_website.slice(0, 4) !== "http"
      ? `https://${organization_website}`
      : organization_website;
</script>

<section class="h-[16rem] bg-gray-800 text-white shadow-sm space-y-6 p-4 lg:w-full lg:p-6 lg:h-[80vh]">
  <div class="flex items-center gap-20">
    <div class="w-16 h-16 rounded-full overflow-hidden lg:w-28 lg:h-28">
      <img class="w-full" src={organization_logo} alt="organization_logo" />
    </div>

    <div class="flex flex-col">
      <span class="font-medium text-lg lg:text-4xl lg:font-semibold">{organization_name}</span>
      <span style="color: {star_color}" class="text-xl lg:text-4xl">{stars}</span>

      {#if organization_website}
        <a
          target="_blank"
          href={website}
          class="text-blue-600 text-sm flex items-center gap-2 lg:text-lg"
        >
          <span>Visit Website</span>
          <LinkIcon className="text-blue-500 w-4 lg:w-6" />
        </a>
      {/if}
    </div>
  </div>
  <div
    class="border-t border-gray-300 py-2 font-normal text-sm max-h-[8rem] overflow-y-scroll lg:text-lg lg:max-h-[40vh] lg:overflow-auto"
  >
    <span>{organization_description}</span>
  </div>
</section>

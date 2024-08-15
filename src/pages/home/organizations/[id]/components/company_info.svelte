<script lang="ts">
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import Building from "@src/assets/svg/building.svelte";
    import EmptyStar from "@src/assets/svg/empty_star.svelte";
    import HalfStar from "@src/assets/svg/half_star.svelte";
    import Star from "@src/assets/svg/star.svelte";

    import { getStarColor, getStarRating } from "@src/core/logic/getStarRating";
    import type { OrganizationDetailType } from "@src/types";

    export let detail: OrganizationDetailType = {};

    $: stars = getStarRating(detail.average);

    $: image_loaded = false;
    function handleImageLoad() {
        image_loaded = true;
    }
</script>

<section
    class="bg-primary max-h-[20rem] text-secondary w-full rounded-3xl h-[50vh] flex items-start gap-10 p-10 pb-20"
>
    <div class="flex flex-col justify-between gap-4 h-full">
        <div class="w-40 mx-auto rounded-full overflow-hidden">
            <img
                hidden={!image_loaded}
                on:load={handleImageLoad}
                class=""
                src={detail.logoUrl}
                alt="logo"
            />
            <span
                style="display: {image_loaded ? 'none' : 'gridq'}"
                class="w-40 grid text-xl place-items-center bg-gray-300 text-gray-500 h-40"
            >
                Logo
            </span>
        </div>
        <span
            class="bg-secondary rounded-md mx-auto text-primary font-bold w-fit px-4"
            >{detail.industry?.toUpperCase()}</span
        >
    </div>
    <div class="flex flex-col gap-2 h-full">
        <div class="flex items-center gap-2">
            <span class="text-2xl text-secondary font-semibold"
                >{detail.name}</span
            >
            {#if detail.verified}
                <span class="w-4 h-4 rounded-full bg-green-500"></span>
            {/if}
        </div>
        <span class="text-3xl flex gap-1">
            {#each stars as star}
                {#if star === "half"}
                    <HalfStar className="w-6" />
                {:else if star === "empty"}
                    <EmptyStar className="w-6" />
                {:else}
                    <Star className="w-6" />
                {/if}
            {/each}</span
        >
        <a
            class="flex items-center gap-1"
            target="_blank"
            href={detail.website && !detail.website.startsWith("http")
                ? `https://${detail.website}`
                : detail.website}
        >
            <span class="font-medium">{detail.website}</span>
            <Arrow className="w-3 rotate-[135deg]" />
        </a>
        <div class="flex-grow"></div>
        <span class="leading-loose">{detail.description}</span>
    </div>
</section>

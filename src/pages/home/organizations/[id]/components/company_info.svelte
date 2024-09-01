<script lang="ts">
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import Building from "@src/assets/svg/building.svelte";
    import EmptyStar from "@src/assets/svg/empty_star.svelte";
    import HalfStar from "@src/assets/svg/half_star.svelte";
    import Star from "@src/assets/svg/star.svelte";

    import { getStarColor, getStarRating } from "@src/core/logic/getStarRating";
    import { store } from "@src/lib/store";
    import type { OrganizationDetailType } from "@src/types";

    $: detail = $store.organization.selected;

    $: stars = getStarRating(detail.average);

    $: image_loaded = false;
    function handleImageLoad() {
        image_loaded = true;
    }
</script>

<section
    class="bg-primary xl:max-h-[20rem] text-secondary w-full rounded-2xl xl:h-[50vh] flex flex-col items-center xl:flex-row xl:items-start gap-10 p-10 pb-10"
>
    <div class="flex flex-col justify-between gap-4 h-full">
        <div
            class="w-40 h-40 border mx-auto rounded-full overflow-hidden flex items-center justify-center"
        >
            <img
                hidden={!image_loaded}
                on:load={handleImageLoad}
                class="w-full h-fit"
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
    </div>
    <div class="flex flex-col gap-2 h-full">
        <div class="flex items-center gap-2 flex-col xl:flex-row">
            <span class="text-2xl text-nowrap text-secondary font-semibold"
                >{detail.name ?? "Unknown"}</span
            >
            {#if detail.verified}
                <span class="w-4 h-4 hidden xl:inline rounded-full bg-green-500"
                ></span>
                <span
                    class="xl:hidden bg-green-500 font-semibold uppercase px-4 rounded-md text-white"
                    >Verified</span
                >
            {/if}
        </div>

        <span
            class="text-3xl flex gap-1 justify-center xl:justify-start xl:py-0 py-2"
        >
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
            class="flex items-center gap-1 justify-center xl:justify-start"
            target="_blank"
            class:select-none={!detail.website}
            class:pointer-events-none={!detail.website}
            href={detail.website && !detail.website.startsWith("http")
                ? `https://${detail.website}`
                : (detail.website ?? "")}
        >
            <span class="font-medium">{detail.website ?? ""}</span>
            <Arrow
                style="display: {!detail.website ? 'none' : 'block'};"
                className="w-3 rotate-[135deg]"
            />
        </a>
        <span
            class="bg-secondary hidden xl:inline w-fit text-wrap rounded-md text-primary font-bold px-4"
            >{detail?.industry?.name?.toUpperCase() ?? ""}
        </span>
        <div class="flex-grow"></div>
        <span
            class="leading-loose text-center overflow-y-auto max-h-[6rem] description xl:text-start"
            >{detail.description ?? ""}</span
        >
    </div>
</section>

<style>
    .description {
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    .description::-webkit-scrollbar {
        display: none;
    }
</style>

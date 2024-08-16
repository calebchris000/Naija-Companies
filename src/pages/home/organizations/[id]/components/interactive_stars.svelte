<script lang="ts">
    import EmptyStar from "@src/assets/svg/empty_star.svelte";
    import Star from "@src/assets/svg/star.svelte";
    import { getStarColor } from "@src/core/logic/getStarRating";
    import { store } from "@src/lib/store";

    export let default_star_color = "#003366";
    export let focus = false;

    $: hoveredStar = 0;
    $: selected_star = 0;
    $: star_color = getStarColor(hoveredStar);
    $: {
        if (focus) {
            console.log("focused and rating is", $store.organization.rating);
            selected_star = $store.organization.rating;
        }
    }
</script>

<div class="text-3xl review_stars flex">
    {#each Array(5) as _, i}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <button
            class="p-[0.1rem]"
            style="color: {star_color}"
            type="button"
            on:click={() => {
                selected_star = i + 1;
                $store.organization.rating = selected_star;

                const button = event.target.closest("button");
                button.style.transform = "scale(1.2)";
                setTimeout(() => {
                    button.style.transform = "scale(1)";
                }, 200);
            }}
            on:mouseover={() => (hoveredStar = i + 1)}
            on:mouseout={() => (hoveredStar = selected_star)}
        >
            {#if (i < $store.organization.rating && $store.organization.rating > 0 && $store.organization.rating <= 5) || i < hoveredStar}
                <Star className="w-6" />
            {:else}
                <EmptyStar
                    style="color: {default_star_color}"
                    className="w-6 "
                />
            {/if}
        </button>
    {/each}
</div>

<script lang="ts">
    import EmptyStar from "@src/assets/svg/empty_star.svelte";
    import Star from "@src/assets/svg/star.svelte";
    import { getStarColor } from "@src/core/logic/getStarRating";
    import { useToken, useUserData } from "@src/core/utils/utils";
    import { store } from "@src/lib/store";
    import { navigate } from "svelte-routing";

    const params_id = window.location.href.split("/").slice(-1).join("");
    const token = useToken();
    const user = useUserData();
    export let default_star_color = "#003366";
    export let focus = false;

    $: hoveredStar = 0;
    $: selected_star = 0;
    $: {
        if (focus) {
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
            style="color: {$store.organization.starColor}"
            type="button"
            on:click={() => {
                selected_star = i + 1;
                $store.organization.starColor = getStarColor(selected_star);
                $store.organization.rating = selected_star;
                $store.organization.id = params_id;

                const button = event.target.closest("button");
                button.style.transform = "scale(1.2)";
                setTimeout(() => {
                    button.style.transform = "scale(1)";
                }, 200);

                setTimeout(() => {
                    if (!token || !user) {
                        navigate("/signup");
                        return;
                    }
                    if (!$store.review_modal_open) {
                        $store.review_modal_open = true;
                    }
                }, 500);
            }}
            on:mouseover={() => {
                hoveredStar = i + 1;
                $store.organization.starColor = getStarColor(hoveredStar);
            }}
            on:mouseout={() => {
                hoveredStar = selected_star;
                $store.organization.starColor = getStarColor(hoveredStar);
            }}
        >
            {#if (i < $store.organization.rating && $store.organization.rating > 0 && $store.organization.rating <= 5) || i < hoveredStar}
                <Star className="w-6 " />
            {:else}
                <EmptyStar
                    style="color: {default_star_color}"
                    className="w-6 "
                />
            {/if}
        </button>
    {/each}
</div>

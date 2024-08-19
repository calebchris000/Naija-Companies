<script lang="ts">
    import EmptyStar from "@src/assets/svg/empty_star.svelte";
    import HalfStar from "@src/assets/svg/half_star.svelte";
    import Star from "@src/assets/svg/star.svelte";
    import { getStarRating } from "@src/core/logic/getStarRating";
    import { navigate } from "svelte-routing";

    export let item: {
        id: string;
        image: string;
        name: string;
        rating: number;
        reviews: string[];
    };

    const stars = getStarRating(item?.rating);

    function handleClick() {
        navigate(`/home/organizations/${item.id}`);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<div
    role="button"
    on:click={handleClick}
    class="w-80 border border-transparent hover:border-primary transition-all max-w-96 max-h-64 bg-gray-100 rounded-2xl flex flex-col p-4 justify-between"
>
    <div class="flex flex-col gap-1 justify-center items-center text-primary">
        <span class="w-16 h-16 bg-primary overflow-hidden rounded-full"></span>
        <!-- <img
            class=""
            src={item?.image}
            alt=""
        /> -->
        <span class="text-xl">{item?.name}</span>
        <span class="text-2xl my-2 flex gap-1">
            {#each stars as star}
                {#if star === "half"}
                    <HalfStar className="w-6" />
                {:else if star === "empty"}
                    <EmptyStar className="w-6" />
                {:else}
                    <Star className="w-6" />
                {/if}
            {/each}
        </span>
    </div>
    <div
        class="bg-gray-200 rounded-lg w-full max-h-12 p-1 py-2 overflow-x-auto flex"
    >
        <!-- {#each item?.reviews as review}
            <span class="">{review}</span>
        {/each} -->
        <span class="text-primary">{item?.reviews[0]}</span>
    </div>
</div>

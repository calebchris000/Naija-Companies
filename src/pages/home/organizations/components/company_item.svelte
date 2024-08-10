<script lang="ts">
    import { getStarRating } from "@src/core/logic/getStarRating";

    export let item: {
        id: string;
        image: string;
        name: string;
        rating: number;
        reviews: string[];
    };

    const stars = getStarRating(item?.rating).join("");
</script>

<div
    class="w-80 max-w-96 max-h-64 bg-gray-200 flex flex-col p-4 justify-between"
>
    <div class="flex flex-col gap-1 justify-center items-center text-primary">
        <span class="w-16 h-16 bg-primary overflow-hidden rounded-full"></span>
        <!-- <img
            class=""
            src={item?.image}
            alt=""
        /> -->
        <span class="text-xl">{item?.name}</span>
        <span class="text-2xl -translate-y-2">{stars}</span>
    </div>
    <div class="bg-gray-300 w-full max-h-12 p-1 py-2 overflow-x-auto flex f">
        <!-- {#each item?.reviews as review}
            <span class="">{review}</span>
        {/each} -->
        <span class="text-primary">{item?.reviews[0]}</span>
    </div>
</div>

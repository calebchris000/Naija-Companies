<script lang="ts">
    import Filter from "@src/assets/svg/filter.svelte";
    import Sort from "@src/assets/svg/sort.svelte";
    import { capitals } from "@src/lib/capitals";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    $: item_clicked = { filter: false, sort: false };
    $: selected_filters = { filter: "Lagos", sort: "Alphabetical" };
</script>

<div class="flex justify-between xl:justify-start xl:items-center gap-4">
    <button
        on:click={() => {
            item_clicked.filter = !item_clicked.filter;
        }}
        class=" py-1 rounded-full relative bg-gray-200 px-6 xl:min-w-[14vw] flex items-center gap-4 hover:text-primary text-primary"
        type="button"
    >
        <Filter className="w-4 fill-primary" />
        <span>{selected_filters.filter}</span>

        {#if item_clicked.filter}
            <div
                class="absolute flex flex-col items-center top-10 bg-gray-200 left-0 right-0 xl:max-h-32 overflow-y-auto"
            >
                {#each capitals as capital}
                    <button
                        on:click={() => {
                            selected_filters.filter = capital.name;
                            dispatch("filter", capital.name);
                        }}
                        class="p-2 hover:bg-primary hover:text-secondary w-full text-start"
                        type="button">{capital.name}</button
                    >
                {/each}
            </div>
        {/if}
    </button>
    <button
        on:click={() => {
            item_clicked.sort = !item_clicked.sort;
        }}
        class="min-w-[14vw] py-1 relative rounded-full alpha bg-gray-200 px-6 flex items-center gap-4 hover:text-primary text-primary"
        type="button"
    >
        <Sort className="w-4 fill-primary" />
        <span>{selected_filters.sort}</span>
        {#if item_clicked.sort}
            <div
                class="absolute flex flex-col items-center top-10 bg-gray-200 left-0 right-0 max-h-32 overflow-y-auto"
            >
                {#each ["Ascending", "Descending"] as sortType}
                    <button
                        on:click={() => {
                            selected_filters.sort = sortType;
                            dispatch("sort", sortType);
                        }}
                        class="p-2 hover:bg-primary hover:text-secondary w-full text-start"
                        type="button">{sortType}</button
                    >
                {/each}
            </div>
        {/if}
    </button>
</div>

<style>
    .alpha:hover svg {
        fill: red !important;
    }
</style>

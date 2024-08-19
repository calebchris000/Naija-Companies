<script lang="ts">
    import Filter from "@src/assets/svg/filter.svelte";
    import Sort from "@src/assets/svg/sort.svelte";
    import { GetCapital } from "@src/core/api/capital";
    import { useToken } from "@src/core/utils/utils";
    import { Notification } from "@src/utils/notification";
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();
    const notification = new Notification();

    const token = useToken();
    $: capitals = [] as any[];
    $: item_clicked = { filter: false, sort: false };
    $: selected_filters = {
        filter: { id: "LAG", name: "Lagos" },
        sort: "Ascending",
    };

    function handleClickOutside(event: MouseEvent) {
        const filterElement = document.querySelector(".filter");
        const sortElement = document.querySelector(".sort");

        if (filterElement && !filterElement.contains(event.target as Node)) {
            item_clicked.filter = false;
        }

        if (sortElement && !sortElement.contains(event.target as Node)) {
            item_clicked.sort = false;
        }
    }

    onMount(() => {
        document.addEventListener("click", handleClickOutside);
        GetCapital({ token }).then((d) => {
            const { status, data } = d;

            if (status !== 200) {
                return notification.error({ text: data?.message ?? "" });
            }
            console.log(data?.data);
            capitals = data?.data;
        });
    });
</script>

<div class="flex justify-between xl:justify-start xl:items-center gap-4">
    <button
        on:click={() => {
            item_clicked.filter = !item_clicked.filter;
        }}
        class="filter py-1 rounded-full relative bg-gray-200 px-6 xl:min-w-[14%] flex items-center gap-4 hover:text-primary text-primary"
        type="button"
    >
        <Filter className="w-4 fill-primary" />
        <span>{selected_filters.filter.name}</span>

        {#if item_clicked.filter}
            <div
                class="absolute flex flex-col items-center top-10 bg-gray-200 left-0 right-0 xl:max-h-32 overflow-y-auto"
            >
                {#each capitals as capital}
                    <button
                        on:click={() => {
                            selected_filters.filter = {
                                id: capital.id,
                                name: capital.name,
                            };
                            dispatch("filter", selected_filters.filter);
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
        class="sort min-w-[14%] py-1 relative rounded-full alpha bg-gray-200 px-6 flex items-center gap-4 hover:text-primary text-primary"
        type="button"
    >
        <Sort className="w-4 fill-primary" />
        <span>{selected_filters.sort}</span>
        {#if item_clicked.sort}
            <div
                class="absolute flex flex-col items-center top-10 bg-gray-200 left-0 right-0 max-h-32 overflow-y-auto"
            >
                {#each ["Default", "Ascending", "Descending"] as sortType}
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

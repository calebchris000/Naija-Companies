<script lang="ts">
    import Search from "@src/assets/svg/search.svelte";
    import { createEventDispatcher } from "svelte";

    type ItemType = {
        id: string | number;
        name: string;
    };

    const dispatch = createEventDispatcher();
    export let className = "";
    export let placeholder = "Search for a company";
    export let items: ItemType[] = [];
    export let selected_items = [] as string[] | number[];

    $: item_filter = items;
    $: search_value = "";

    function handleInput(
        event: Event & { currentTarget: EventTarget & HTMLInputElement },
    ) {
        const target = event.target as HTMLInputElement;
        search_value = target?.value ?? "";
        item_filter =
            items.filter(
                (item: { id: string | number; name: string }) =>
                    (item.name ?? "None")
                        .toLowerCase()
                        .includes(search_value.toLowerCase()) &&
                    !selected_items.includes(item?.id as never),
            ) ?? [];
    }

    function handleCompanyClick({ name, id }: { name: string; id: string }) {
        search_value = "";
        item_filter = items;
        dispatch("click", { name, id });
    }
</script>

<section>
    <div
        class="search filter_items bg-primary lg:bg-secondary rounded-md lg:text-secondary mt-4 flex items-center gap-4 p-4 {className}"
    >
        <Search className="w-6   text-secondary lg:text-primary" />
        <input
            on:input={handleInput}
            class="bg-transparent w-full text-secondary placeholder:text-secondary outline-none lg:text-primary lg:placeholder:text-primary"
            type="text"
            {placeholder}
        />
    </div>

    <div
        class:opacity-100={search_value}
        class:opacity-0={!search_value}
        class="filter_content absolute z-50 transition-all max-h-40 top-20 bg-secondary flex flex-col overflow-y-scroll items-start rounded-lg shadow-lg left-0 right-0"
    >
        {#if !item_filter.length || search_value === ""}
            <button
                on:click={() => {
                    search_value = "";
                    item_filter = items;
                }}
                id="org0"
                class="font-medium text-primary h-full hover:bg-primary hover:text-secondary py-3 px-4 w-full text-start"
                type="button">No Organization</button
            >
        {:else}
            {#each item_filter as { name, id }}
                <button
                    on:click={() => {
                        handleCompanyClick({ name, id });
                    }}
                    id="org{id}"
                    class="font-medium text-primary h-full hover:bg-primary hover:text-secondary p-4 w-full text-start"
                    type="button">{name}</button
                >
            {/each}
        {/if}
    </div>
</section>

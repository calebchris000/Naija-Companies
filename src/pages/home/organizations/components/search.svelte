<script lang="ts">
    import { GetOrganizations } from "@src/core/api/organization";
    import { useToken } from "@src/core/utils/utils";
    import { Notification } from "@src/utils/notification";
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();
    const token = useToken();
    const notification = new Notification();

    export let placeholder = "";
    export let container_class = "";
    export let input_class = "";
    export let list_class = "";

    let input: HTMLInputElement;
    let inputValue = "";
    let filteredItemsDiv: HTMLDivElement;

    $: organizations = [] as any[];
    $: filter_items = organizations;

    function handleSelect(event: Event) {
        const target = event.target as HTMLInputElement;
        inputValue = target.value;
        filter_items = organizations.filter((item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase()),
        );
    }

    function handleItemSelect(item: { id: string; name: string }) {
        dispatch("itemSelect", item);
        inputValue = "";
        input.value = "";
    }

    function handleClickOutside(event: MouseEvent) {
        if (
            filteredItemsDiv &&
            !filteredItemsDiv.contains(event.target as Node)
        ) {
            filter_items = [];
            inputValue = "";
            input.value = "";
        }
    }

    async function getOrganizations() {
        const response = await GetOrganizations({ token, showAverage: true });

        const { status, data } = response;
        console.log(data);

        if (status !== 200) {
            return notification.error({
                text: data?.message ?? "Could not get organizations",
            });
        }

        organizations = data?.data.map((org: any) => ({
            id: org.id,
            name: org.name,
        }));
    }

    onMount(() => {
        getOrganizations();
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });
</script>

<div class="w-full relative {container_class}">
    <input
        bind:this={input}
        on:input={handleSelect}
        class="outline-none px-10 border border-gray-200 p-4 rounded-full w-full {input_class}"
        {placeholder}
    />
    {#if inputValue}
        <div
            bind:this={filteredItemsDiv}
            class="filtered-items z-50 absolute left-0 right-0 top-16 bg-gray-200 overflow-y-auto max-h-72 rounded-3xl {list_class}"
        >
            {#if filter_items.length > 0}
                {#each filter_items as item}
                    <button
                        class="w-full p-4 border-b text-primary border-gray-300 px-10 hover:bg-primary hover:text-secondary transition-all font-medium
                        text-left"
                        on:click={() => {
                            handleItemSelect(item);
                        }}>{item.name}</button
                    >
                {/each}
            {:else}
                <button
                    on:click={() => {
                        inputValue = "";
                        input.value = "";
                    }}
                    type="button"
                    class="w-full p-4 border-b text-primary border-gray-300 px-10 hover:bg-primary hover:text-secondary transition-all font-medium
                text-left">No Organization</button
                >
            {/if}
        </div>
    {/if}
</div>

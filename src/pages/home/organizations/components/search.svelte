<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let items: { id: string; name: string }[] = [
        { id: "a7x9", name: "Apple" },
        { id: "b3k2", name: "Banana" },
        { id: "c5m8", name: "Cherry" },
        { id: "d1f4", name: "Date" },
        { id: "e6h7", name: "Elderberry" },
    ];

    export let placeholder = "";
    export let container_class = "";
    export let input_class = "";

    let input: HTMLInputElement;
    let inputValue = "";

    $: filter_items = items;

    function handleSelect(event: Event) {
        const target = event.target as HTMLInputElement;
        inputValue = target.value;
        filter_items = items.filter((item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase()),
        );
    }
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
            class="filtered-items absolute left-0 right-0 top-16 bg-gray-200 overflow-y-auto max-h-72 rounded-3xl"
        >
            {#if filter_items.length > 0}
                {#each filter_items as item}
                    <button
                        class="w-full p-4 border-b text-primary border-gray-300 px-10 hover:bg-primary hover:text-secondary transition-all font-medium
                        text-left"
                        on:click={() => {
                            inputValue = "";
                            input.value = "";
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

<script lang="ts">
    import Search from "@src/assets/svg/search.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    let input_val: HTMLInputElement;

    function handleInput(
        event: Event & { currentTarget: EventTarget & HTMLInputElement },
    ) {
        const target = event.target as HTMLInputElement;
        if (!target) return;
        dispatch("input", target.value);
    }
</script>

<div
    class="search bg-secondary rounded-md text-secondary mt-4 flex items-center gap-4 p-4"
>
    <Search className="w-6 text-primary" />
    <input
        bind:this={input_val}
        on:input={handleInput}
        class="bg-transparent outline-none text-primary placeholder:text-primary"
        type="text"
        placeholder="Search for a company"
    />
</div>

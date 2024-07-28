<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let type: "text" | "number" | "email" | "password" = "text";
    export let label: string = "";
    export let placeholder: string = "";
    const dispatch = createEventDispatcher();

    function handleInput(e: Event) {
        dispatch("input", {
            label,
            value: (e.target as HTMLInputElement)?.value,
        });
    }
</script>

<div class="flex flex-col space-y-2 relative rounded-lg w-full">
    <label class="font-medium text-secondary" for={label}>{label}</label>
    <input
        on:input={handleInput}
        class="outline-none text-secondary rounded-lg p-4 bg-light placeholder:text-secondary border-transparent w-full"
        {type}
        {placeholder}
    />
</div>

<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let type: "text" | "number" | "email" | "password" = "text";
    export let label: string = "";
    export let placeholder: string = "";
    export let defaultValue = "";
    export let check = { valid: true, reason: "" };
    const dispatch = createEventDispatcher();

    function handleInput(e: Event) {
        dispatch("input", {
            label,
            value: (e.target as HTMLInputElement)?.value,
        });
    }
</script>

<div class="flex flex-col space-y-2 relative rounded-lg w-full">
    <label class="font-medium relative text-primary" for={label}
        >{label}

        <span
            style="opacity: {check.valid ? '0' : '1'}"
            class="text-white font-semibold transition-all absolute right-0 text-sm"
        >
            {check.reason}</span
        >
    </label>
    <input
        on:input={handleInput}
        class="outline-none bg-accent text-primary rounded-lg p-4 bg-light placeholder:text-primary border-transparent w-full"
        {type}
        value={defaultValue}
        {placeholder}
    />
</div>

<style>
</style>

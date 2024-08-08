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

<div class="flex flex-col space-y-2 relative rounded-full w-full">
    <label class="font-medium relative text-primary" for={label}
        >{label}

        <span
            style="opacity: {check.valid ? '0' : '1'}"
            class="text-[#ff4500] font-semibold transition-all max-w-[20rem] ms-auto absolute right-0 text-sm"
        >
            {check.reason}</span
        >
    </label>
    <input
        on:input={handleInput}
        class="outline-none bg-primary rounded-full p-4 px-6 text-white placeholder:text-white border-transparent w-full"
        {type}
        value={defaultValue}
        {placeholder}
    />
</div>

<style>
</style>

<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let name = "Submit";
    export let disabled = false;
    export let className = "";
    export let type: "fit" | "max" = "fit";
    const dispatch = createEventDispatcher();
    function handleClick() {
        dispatch("click");
    }
</script>

<button
    {disabled}
    style="width: {type === 'max'
        ? '100%'
        : 'fit-content'}; background-color: {disabled ? 'gray' : ''}"
    on:click={handleClick}
    class="bg-cto p-4 text-light transition-all font-semibold rounded-lg {className}"
>
    {name}</button
>

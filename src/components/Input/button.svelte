<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let name = "Submit";
    export let disabled = false;
    export let style: string = "";
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
        : 'fit-content'}; background-color: {disabled ? 'gray' : ''}; {style}"
    on:click={handleClick}
    class="bg-black border-2 border-transparent hover:border-orange-500 p-4 text-secondary transition-all font-semibold rounded-full {className}"
>
    {name}</button
>

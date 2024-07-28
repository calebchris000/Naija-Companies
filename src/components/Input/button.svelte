<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let name = "Submit";
    export let className = "";
    export let type: "fit" | "max" = "fit";
    const dispatch = createEventDispatcher();
    function handleClick() {
        dispatch("click");
    }
</script>

<button
    style="width: {type === 'max' ? '100%' : 'fit-content'}"
    on:click={handleClick}
    class="bg-cto p-4 text-light font-semibold rounded-lg {className}"
>
    {name}</button
>

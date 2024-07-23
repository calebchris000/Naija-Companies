<script lang="ts">
    export let id = "0";
    export let label = "Pill";
    export let color = "#68b900";
</script>

<div
    {id}
    class="grid grid-cols-12 h-16 z-10 rounded-lg w-full items-center overflow-hidden bg-white border border-gray-200 lg:max-w-[40vw]"
>
    <span style="background-color: {color};" class="h-full w-full col-span-1"
    ></span>
    <span class="col-span-11 ps-4 font-medium text-secondary text-wrap"
        >{label}</span
    >
</div>

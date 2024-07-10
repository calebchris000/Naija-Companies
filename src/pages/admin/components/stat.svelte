<script lang="ts">
  import More from "@src/assets/svg/More.svelte";

  export let className = "";
  export let title: string = "total organization";
  export let value:
    | string
    | number
    | { value: string | number; label: string }[] = [
    { label: "Unverified", value: 23 }, {label: "Verified", value: 12}
  ];
</script>

<div class="p-6 stat {className} text-gray-200 flex flex-col gap-8">
  <div class="flex items-center justify-between ">
    <span class="font-medium text-2xl">{title.toUpperCase()}</span>
    <button type="button">
      <More className="w-8" />
    </button>
  </div>
  <div>
    {#if Array.isArray(value)}
    <div class="flex items-center justify-between">

      {#each value as { value: v, label }}
      <div>
        <span class="text-[4rem] font-semibold">{v}</span>
        <span class="font-medium text-lg">{label}</span>
      </div>
      {/each}
    </div>
    {:else}
      <span class="text-[4rem] font-semibold">{value}</span>
    {/if}
  </div>
</div>

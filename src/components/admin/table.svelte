<script lang="ts">
  export let columns: { title: string; label: string }[] = [];
  export let rows: { full_name: string; email: string; role: string }[] = [];
</script>

<div class="overflow-x-auto w-full max-h-[60vh] overflow-scroll">
  <table class="min-w-full bg-white">
    <thead class="sticky top-0">
      <tr class="bg-blue-900 text-white">
        {#each columns as { title, label }}
          <th id={label} class="py-3 px-4 text-left">{title}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="">
      {#each rows as row, i}
        <tr
          class={i % 2 === 0
            ? "bg-gray-300 text-black"
            : "bg-gray-400 text-black"}
        >
          <td class="py-3 px-4 border-b">{row.full_name}</td>
          <td class="py-3 px-4 border-b">{row.email}</td>
          <td class="py-3 px-4 border-b">{row.role}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  /* Add any additional styles here if needed */
  :global(tr:hover) {
    @apply bg-gray-200;
  }
</style>

<script lang="ts">
  import Cancel from "@src/assets/svg/cancel.svelte";
  import Check from "@src/assets/svg/check.svelte";

  export let rows: any[] = [
    {
      name: "Gurugeeks LTD",
      email: "gurugeeks@mail.com",
      website: "gurugeeks.com",
    },
    {
      name: "Marksman Enterprise",
      email: "marksman@mail.com",
      website: "marksman.com",
    },
  ];
  export let columns: { title: string; label: string; url: boolean }[] = [
    { title: "S/N", label: "s/n", url: false },
    { title: "Name", label: "name", url: false },
    { title: "Website", label: "website", url: true },
    { title: "Email Address", label: "email", url: true },
    { title: "Action", label: "action", url: false },
  ];

  function handleClick() {}
</script>

<div class="p-6 flex flex-col gap-4">
  <span class="text-2xl font-medium">INCOMING ORGANIZATION REQUEST</span>

  <table>
    <thead>
      <tr>
        {#each columns as column}
          <th>{column.title}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, idx}
        <tr class="">
          <td>{idx + 1}</td>
          {#each Object.values(row) as cell, idx}
            <td role="button" on:click={handleClick} class="font-medium"
              >{cell}</td
            >
          {/each}
          <td>
            <button class="flex items-center gap-2" type="button">
              <span
                class="w-8 h-8 rounded-full bg-green-500 overflow-hidden flex items-center justify-center"
                ><Check /></span
              >
              <span
                class="w-8 h-8 rounded-full bg-red-500 overflow-hidden flex items-center justify-center"
                ><Cancel className="w-3" />
              </span>
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    @apply bg-gray-900;
  }
</style>

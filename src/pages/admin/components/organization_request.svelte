<script lang="ts">
  export let rows: any[] = [
    {
      name: "Gurugeeks LTD",
      email: "gurugeeks@mail.com",
      website: "gurugeeks.com",
    },
  ];
  export let columns: { title: string; label: string; url: boolean }[] = [
    { title: "S/N", label: "s/n", url: false },
    { title: "Name", label: "name", url: false },
    { title: "Website", label: "website", url: true },
    { title: "Email Address", label: "email", url: true },
    { title: "Action", label: "action", url: false },
  ];
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
            <td>{cell}</td>
          {/each}
          <td>
            <button type="button">Options</button>
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

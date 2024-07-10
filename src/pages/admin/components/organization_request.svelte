<script lang="ts">
  import Cancel from "@src/assets/svg/cancel.svelte";
  import Check from "@src/assets/svg/check.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let rows: any[] = [];
  $: row_ids = rows.map((r) => r.id);
  $: rows_edited = rows.map((r, i) => {
    const { id, ...others } = r;
    return { "s/n": i + 1, ...others };
  });
  $: console.log(rows, "is in");

  export let columns: {
    title: string;
    label: string;
    url: boolean;
    type?: string;
  }[] = [
    { title: "S/N", label: "s/n", url: false },
    { title: "Name", label: "name", url: false },
    { title: "Website", label: "website", url: true, type: "https://" },
    { title: "Email Address", label: "email", url: true, type: "mailto:" },
    { title: "Action", label: "action", url: false },
  ];

  function handleClick() {}
  function handleAction({
    index,
    action,
  }: {
    index: number;
    action: "approve" | "reject";
  }) {
    const id = row_ids[index];
    dispatch("action", { organizationId: id, action });
  }
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
      {#each rows_edited as row, idx}
        <tr class="">
          {#each columns as { title, label, url, type }}
            {#if label !== "action"}
              <td class="font-medium">
                {#if url}
                  <a target="_blank" href="{type}{row?.[label]}"
                    >{row?.[label]}</a
                  >
                {:else}
                  <span>{row?.[label]}</span>
                {/if}
              </td>
            {:else}
              <td>
                <div class="flex items-center gap-2">
                  <button
                    on:click={() =>
                      handleAction({ index: idx, action: "approve" })}
                    type="button"
                    class="w-8 h-8 rounded-full bg-green-500 overflow-hidden flex items-center justify-center"
                    ><Check /></button
                  >
                  <button
                    on:click={() =>
                      handleAction({ index: idx, action: "reject" })}
                    type="button"
                    class="w-8 h-8 rounded-full bg-red-500 overflow-hidden flex items-center justify-center"
                    ><Cancel className="w-3" />
                  </button>
                </div>
              </td>
            {/if}
          {/each}
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

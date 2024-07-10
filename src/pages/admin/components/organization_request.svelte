<script lang="ts">
  import Cancel from "@src/assets/svg/cancel.svelte";
  import Check from "@src/assets/svg/check.svelte";
  import { AcceptOrReject, GetOrganizations } from "@src/core/api/organization";
  import { useToken } from "@src/core/utils/utils";
  import { Notification } from "@src/utils/notification";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();
  const token = useToken();
  const notification = new Notification();

  $: all_organizations = [] as any[];
  $: unverified_organizations = [] as any[];
  $: row_ids = unverified_organizations.map((r) => r.id);
  $: rows_edited = unverified_organizations.map((r, i) => {
    const { id, ...others } = r;
    return { "s/n": i + 1, ...others };
  });

  const columns: {
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

  async function getOrganizations() {
    const res = await GetOrganizations({ token });
    if (res.status !== 200) {
      return notification.error({
        text: "Could not get organizations at this time",
      });
    }
    const org = res.data?.data as any[];
    all_organizations = org;
    const not_verified = org.filter((o) => !o.verified);
    unverified_organizations = not_verified.map((uo: any) => ({
      id: uo.id,
      name: uo.name,
      website: uo.website,
      email: uo.email,
    }));
  }
  async function handleAction({
    index,
    action,
  }: {
    index: number;
    action: "approve" | "reject";
  }) {
    const id = row_ids[index];

    const res = await AcceptOrReject({ token, organizationId: id, action });
    if (res.status !== 200) {
      return notification.error({ text: "Accept or reject failed" });
    }
    getOrganizations();
    notification.success({ text: res.data?.message });
  }

  onMount(() => {
    getOrganizations();
  });
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

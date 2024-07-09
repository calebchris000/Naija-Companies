<script lang="ts">
  import Navbar from "@src/components/admin/navbar/index.svelte";
  import QuickInfoWidget from "@src/components/admin/quickInfoWidget.svelte";
  import Sidebar from "@src/components/admin/sidebar.svelte";
  import Table from "@src/components/admin/table.svelte";
  import { GetOrganizations } from "@src/core/api/organization";
  import { useToken } from "@src/core/utils/utils";
  import { Notification } from "@src/utils/notification";
  import { onMount } from "svelte";
  const token = useToken();
  const notification = new Notification();

  const user_columns = [{ title: "Name", label: "name" }];
  let organizations: any[] = [];
  const columns = [
    { title: "Name", label: "name" },
    { title: "Email Address", label: "email" },
    { title: "Website", label: "website" },
    { title: "Verified", label: "verified" },
  ];

  async function getOrganizations() {
    const response = await GetOrganizations({ token });

    if (response.status !== 200) {
      notification.error({
        text: response.data?.message ?? "Could not get organization",
      });
      return;
    }

    const result = response.data?.data as any[];
    console.log(result, "is res")
    const formatted = result.map((r) => {
      return {
        name: r.name,
        email: r.email,
        website: r.website,
        verified: r.verified,
      };
    });

    organizations = formatted;
  }

  onMount(() => {
    getOrganizations();
  });
</script>

<main class="bg-gray-900 h-screen flex items-start text-white gap-10">
  <Navbar />
  <Sidebar />

  <div class="flex flex-col w-full p-10 text-white">
    <div class="flex flex-col w-full p-10">
      <div class="py-14 pt-28 flex items-start gap-10">
        <QuickInfoWidget
          title="Total Organizations"
          value={organizations.length}
        />
      </div>
      <Table {columns} rows={organizations} />
    </div>
    <div class="text-white mx-10">
      <span class="font-medium text-3xl">Pending Approval</span>
    </div>
  </div>
 
</main>

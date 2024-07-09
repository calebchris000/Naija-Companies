<script lang="ts">
  import Navbar from "@src/components/admin/navbar/index.svelte";
  import QuickInfoWidget from "@src/components/admin/quickInfoWidget.svelte";
  import Sidebar from "@src/components/admin/sidebar.svelte";
  import Table from "@src/components/admin/table.svelte";

  const user_columns = [{ title: "Name", label: "name" }];
  const organizations: any[] = [];
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
      <Table columns={user_columns} rows={organizations} />
    </div>
  </div>
</main>

<script>
  import QuickInfoWidget from "@src/components/admin/quickInfoWidget.svelte";
  import Sidebar from "@src/components/admin/sidebar.svelte";
</script>

<main class="bg-gray-900 h-screen flex items-start text-white gap-10">
  <Sidebar />

  <div class="p-10 py-14 flex items-start gap-10">
    <QuickInfoWidget title="Total Users" value="50" />
    <QuickInfoWidget title="Total Reviews" value="120" />
  </div>
</main>

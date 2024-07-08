<script lang="ts">
  import QuickInfoWidget from "@src/components/admin/quickInfoWidget.svelte";
  import Sidebar from "@src/components/admin/sidebar.svelte";
  import Table from "@src/components/admin/table.svelte";
  import { GetAllReviews, GetReviews } from "@src/core/api/review";
  import { GetUsers } from "@src/core/api/user";
  import { useToken } from "@src/core/utils/utils";
  import { Notification } from "@src/utils/notification";
  import { onMount } from "svelte";

  $: users = [] as any[];
  $: reviews = [] as any[];
  const notification = new Notification();
  const token = useToken();

  async function getUsers() {
    const response = await GetUsers({ token });

    if (response.status !== 200) {
      notification.error({
        text: response.data?.message ?? "Could not get users at this time",
      });
    } else {
      const result = response.data?.data as any[];
      const formatted = result.map((r) => {
        return {
          full_name: `${r.firstName} ${r.lastName}`,
          email: r.email,
          role: r.role,
        };
      });
      console.log(formatted);
      users = formatted;
    }
  }

  async function getReviews() {
    const response = await GetAllReviews({ token });
    if (response.status !== 200) {
      notification.error({
        text: response.data?.message ?? "Could not get all reviews",
      });
    } else {
      reviews = response.data?.data;
    }
  }
  onMount(() => {
    getUsers();
    getReviews();
  });

  const user_columns = [
    { title: "Full Name", label: "full_name" },
    { title: "Email Address", label: "email" },
    { title: "Role", label: "role" },
  ];
</script>

<main class="bg-gray-900 h-screen flex items-start text-white gap-10">
  <Sidebar />

  <div class="flex flex-col w-full p-10">
    <div class="py-14 flex items-start gap-10">
      <QuickInfoWidget title="Total Users" value={users.length} />
      <QuickInfoWidget title="Total Reviews" value={reviews.length} />
    </div>
    <Table columns={user_columns} rows={users} />
  </div>
</main>

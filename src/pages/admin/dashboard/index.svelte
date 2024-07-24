<script lang="ts">
  import Stat from "../components/stat.svelte";
  import Notifications from "../components/notifications.svelte";
  import "./style.css";
  import OrganizationRequest from "../components/organization_request.svelte";
  import Time from "../components/time.svelte";
  import Navbar from "../components/navbar.svelte";
  import { onMount } from "svelte";
  import { GetUsers } from "@src/core/api/user";
  import { useToken } from "@src/core/utils/utils";
  import { Notification } from "@src/utils/notification";
  import { AcceptOrReject, GetOrganizations } from "@src/core/api/organization";
  import UserList from "../components/user_list.svelte";
  import { VerifyToken } from "@src/core/api/auth";

  const token = useToken();
  const notification = new Notification();
  $: all_organizations = [] as any[];
  $: all_users = [] as any[];
  $: statistics = {
    organizations_verified: 0,
    organizations_unverified: 0,
    users_verified: 0,
    users_unverified: 0,
  };

  async function getUsers() {
    const res = await GetUsers({ token });

    if (res.status !== 200) {
      return notification.error({ text: "Could not get users at this time" });
    }
    const users = res.data?.data as any[];
    all_users = users;
    const verified = users.filter((u) => u.isVerified);
    const not_verified = users.filter((u) => !u.isVerified);
    statistics.users_verified = verified.length;
    statistics.users_unverified = not_verified.length;
  }
  async function getOrganizations() {
    const res = await GetOrganizations({ token, verified: false });
    if (res.status !== 200) {
      return notification.error({
        text: "Could not get organizations at this time",
      });
    }
    const org = res.data?.data as any[];
    all_organizations = org;
    const verified = org.filter((o) => o.verified);
    const not_verified = org.filter((o) => !o.verified);

    statistics.organizations_verified = verified.length;
    statistics.organizations_unverified = not_verified.length;
  }

  onMount(() => {
    getUsers();
    getOrganizations();
  });
</script>

{#await VerifyToken({ token }) then { status, data }}
  {#if data.data?.privilege === "admin"}
      <main class="bg-gray-900 w-screen overflow-x-hidden h-screen max-lg:h-full text-white main">
      <Navbar />

      <section
        class="max-md:flex max-md:flex-col md:grid 2lg:grid-cols-12 gap-4 2lg:grid-rows-12 pt-24 pb-4 px-5 h-screen  lg:grid-rows-3 lg:grid-cols-6 lg:grid-cols-4 lg:grid-rows-3"
      >
        <div class="w-full h-full bg-gray-700 2lg:col-span-3 2lg:row-span-3 lg:col-span-2">
          <Stat
            title="Total Organizations"
            value={[
              { label: "Verified", value: statistics.organizations_verified },
              {
                label: "Unverified",
                value: statistics.organizations_unverified,
              },
            ]}
          />
        </div>
        <div
          class="w-full h-full bg-gray-700 2lg:row-start-4 2lg:row-span-3 2lg:col-span-3 lg:col-span-2"
        >
          <Stat
            title="Total Users"
            value={[
              { label: "Verified", value: statistics.users_verified },
              { label: "Unverified", value: statistics.users_unverified },
            ]}
          />
        </div>
        <div class="w-full h-full bg-gray-700 2lg:col-span-3 2lg:row-span-6 lg:col-span-2 lg:row-span-2 lg:col-span-2 lg:row-span-2">
          <Notifications />
        </div>
        <div class="w-full h-full bg-gray-700 2lg:col-span-6 2lg:row-span-6 lg:row-start-2 lg:col-span-3 lg:col-span-2">
          <OrganizationRequest />
        </div>
        <div class="w-full h-full bg-gray-700 2lg:row-span-6 2lg:col-span-6 lg:row-start-3 lg:col-span-3 lg:row-start-3 lg:col-span-2">
          <UserList />
        </div>
        <div class="w-full h-full bg-gray-700 2lg:col-span-3 2lg:row-span-4"></div>
        <div class="w-full h-full bg-gray-700 2lg:col-span-3 2lg:row-span-4 lg:col-span-2">
          <Time />
        </div>
        <div
          class="w-full h-full bg-gray-700 2lg:col-start-7 2lg:row-span-2 2lg:col-span-6"
        ></div>
      </section>
    </main>
  {/if}
{/await}

<style>
  .main {
    font-family: "Rajdhani", sans-serif;
  }
</style>

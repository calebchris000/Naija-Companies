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
  import TextArea from "@src/components/Input/TextArea.svelte";
  import UserList from "../components/user_list.svelte";

  const token = useToken();
  const notification = new Notification();
  $: all_organizations = [] as any[];
  $: all_users = [] as any[];
  $: unverified_organizations = [] as any[];
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
    const res = await GetOrganizations({ token });
    if (res.status !== 200) {
      return notification.error({
        text: "Could not get organizations at this time",
      });
    }
    const org = res.data?.data as any[];
    all_organizations = org;
    const verified = org.filter((o) => o.verified);
    const not_verified = org.filter((o) => !o.verified);
    unverified_organizations = not_verified.map((uo: any) => ({
      id: uo.id,
      name: uo.name,
      website: uo.website,
      email: uo.email,
    }));
    console.log(unverified_organizations);

    statistics.organizations_verified = verified.length;
    statistics.organizations_unverified = not_verified.length;
  }

  async function handleAction(d: any) {
    console.log(d);
    const { organizationId, action } = d;
    const res = await AcceptOrReject({ token, organizationId, action });
    if (res.status !== 200) {
      return notification.error({ text: "Accept or reject failed" });
    }
    notification.success({ text: res.data?.message });
  }

  onMount(() => {
    getUsers();
    getOrganizations();
  });
</script>

<main class="bg-gray-900 w-screen h-screen text-white main">
  <Navbar />

  <section
    class="grid grid-cols-12 gap-4 grid-rows-12 pt-24 pb-4 px-5 h-screen border border-white"
  >
    <div class="w-full h-full bg-gray-700 col-span-3 row-span-3">
      <Stat
        title="Total Organizations"
        value={[
          { label: "Verified", value: statistics.organizations_verified },
          { label: "Unverified", value: statistics.organizations_unverified },
        ]}
      />
    </div>
    <div class="w-full h-full bg-gray-700 row-start-4 row-span-3 col-span-3">
      <Stat
        title="Total Users"
        value={[
          { label: "Verified", value: statistics.users_verified },
          { label: "Unverified", value: statistics.users_unverified },
        ]}
      />
    </div>
    <div class="w-full h-full bg-gray-700 col-span-3 row-span-6">
      <Notifications />
    </div>
    <div class="w-full h-full bg-gray-700 col-span-6 row-span-6">
      <OrganizationRequest
        on:action={(e) => {
          handleAction(e.detail);
        }}
        rows={unverified_organizations}
      />
    </div>
    <div class="w-full h-full bg-gray-700 row-span-6 col-span-6">
      <UserList />
    </div>
    <div class="w-full h-full bg-gray-700 col-span-3 row-span-4"></div>
    <div class="w-full h-full bg-gray-700 col-span-3 row-span-4">
      <Time />
    </div>
    <div
      class="w-full h-full bg-gray-700 col-start-7 row-span-2 col-span-6"
    ></div>
  </section>
</main>

<style>
  .main {
    font-family: "Rajdhani", sans-serif;
  }

  .spaced {
    letter-spacing: 0.5px;
  }
</style>

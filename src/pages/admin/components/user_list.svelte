<script lang="ts">
  import { GetUsers } from "@src/core/api/user";
  import { useToken } from "@src/core/utils/utils";
  import { Notification } from "@src/utils/notification";
  import moment from "moment";
  import { onMount } from "svelte";

  type UsersType = {
    firstName: string;
    lastName: string;
    email: string;
  };
  const token = useToken();
  const notification = new Notification();
  $: search = "";
  $: filter = "" as number | string;
  $: users = [] as UsersType[] | any;
  $: filtered_users = [] as UsersType[] | any;

  $: users_status = "not_fetched" as
    | "not_fetched"
    | "loading"
    | "success"
    | "failure"
    | "pending";

  const columns = [
    { title: "S/N", label: "s-n" },
    { title: "FULL NAME", label: "full_name" },
    { title: "EMAIL", label: "email" },
    { title: "JOINED", label: "joined" },
    { title: "ROLE", label: "role" },
  ];

  function handleSearch(e: any) {
    const search_lower = e.target.value?.toLowerCase();
    let filtered = users.filter((u: any) => {
      return (
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(search_lower) ||
        u.email?.toLowerCase().includes(search_lower)
      );
    });

    if (filter) {
      filtered = filtered.filter((u: any) => {
        const year = moment(u.createdAt).year();

        return Number(filter) === year;
      });
    }
    filtered_users = filtered;
  }

  function handleFilter(e: any) {
    const data = e.target.value;
    filter = data;

    const filtered = users.filter((u: any) => {
      const year = moment(u.createdAt).year();

      return Number(data) === year;
    });
    filtered_users = filtered;
    return filtered;
  }
  async function getUsers() {
    users_status = "pending";
    const res = await GetUsers({ token, query: "verified=true" });

    if (res.status !== 200) {
      users_status = "failure";
      notification.error({ text: "Could not get users" });
      return;
    }

    const data: any[] = res.data.data.map((u: any, idx: number) => {
      return {
        "s-n": String(idx + 1),
        full_name: `${u.firstName} ${u.lastName}`,
        joined: moment(u.createdAt).format("MMMM D, YYYY"),
        role: u.role.toUpperCase(),
        ...u,
      };
    });

    users = data;
    filtered_users = data;
    users_status = "success";
    console.log(res.data?.data);
  }

  onMount(() => {
    getUsers();
  });
</script>

<section class="p-6 flex flex-col gap-4">
  <span class="text-2xl font-medium">USERS</span>
  <div
    class="grid grid-cols-6 max-md:grid-cols-1 max-md:w-full items-center gap-4 w-[28rem]"
  >
    <div class="w-full lg:col-span-4">
      <input
        on:input={handleSearch}
        class="w-full h-10 rounded-2xl outline-none bg-gray-300 text-gray-900 px-6 font-medium placeholder:text-gray-600 text-lg"
        type="text"
        placeholder="Search Users..."
        name=""
        id=""
      />
    </div>
    <select
      on:change={handleFilter}
      class="w-full h-10 outline-none text-gray-600 font-medium rounded-2xl px-2 lg:col-span-2 bg-gray-300"
      name=""
      id=""
    >
      <option class="font-medium" value="2024">2024</option>
      <option class="font-medium" value="2023">2023</option>
      <option class="font-medium" value="2022">2022</option>
      <option class="font-medium" value="2021">2021</option>
      <option class="font-medium" value="2020">2020</option>
    </select>
  </div>

  <div class="w-full">
    {#if users_status === "pending"}
      <span>Loading Users</span>
    {:else if users_status === "failure"}
      <span>Sorry. Could not fetch users</span>
    {:else if users_status === "success"}
      {#if filtered_users.length}
        <div class="w-full overflow-x-auto">
          <section class="flex flex-col gap-2 max-lg:w-[40rem]">
            <div
              class="grid bg-gray-900 p-2 border-b border-gray-300 font-bold grid-cols-12 w-full"
            >
              {#each columns as column}
                <span class="" id={column.label}>{column.title}</span>
              {/each}
            </div>
            {#each filtered_users as u}
              <div class="grid grid-cols-12 p-2 w-full border-b border-gray-300">
                {#each columns as { label }}
                  <span class="font-medium" id={label}
                    >{u?.[label]?.toUpperCase()}</span
                  >
                {/each}
              </div>
            {/each}
          </section>
        </div>
      {:else}
        <span class="font-semibold text-lg">NO USERS</span>
      {/if}
    {/if}
  </div>
</section>

<style>
  #s-n {
    @apply col-span-1;
  }
  #full_name {
    @apply col-span-3;
  }
  #email {
    @apply col-span-5;
  }
  #joined {
    @apply col-span-2;
  }
  #role {
    @apply col-span-1;
  }
</style>

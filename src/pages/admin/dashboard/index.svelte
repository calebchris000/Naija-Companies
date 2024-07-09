<script>
  import Stat from "../components/stat.svelte";
  import Notifications from "../components/notifications.svelte";
  import "./style.css";
  import OrganizationRequest from "../components/organization_request.svelte";
  import Time from "../components/time.svelte";
  import Navbar from "../components/navbar.svelte";
</script>

<main class="bg-gray-900 w-screen h-screen text-white test">
  <Navbar />

  <section
    class="grid grid-cols-12 gap-4 grid-rows-12 pt-24 pb-4 px-5 h-screen border border-white"
  >
    <div class="w-full h-full bg-gray-700 col-span-3 row-span-3">
      <Stat />
    </div>
    <div class="w-full h-full bg-gray-700 row-start-4 row-span-3 col-span-3">
      <Stat
        title="Total Users"
        value={[
          { label: "Verified", value: 19 },
          { label: "Unverified", value: 2 },
        ]}
      />
    </div>
    <div class="w-full h-full bg-gray-700 col-span-3 row-span-6">
      <Notifications />
    </div>
    <div class="w-full h-full bg-gray-700 col-span-6 row-span-6">
      <OrganizationRequest />
    </div>
    <div class="w-full h-full bg-gray-700 row-span-6 col-span-3"></div>
    <div class="w-full h-full bg-gray-700 row-span-6 col-span-3"></div>
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
  .test {
    font-family: "Rajdhani", sans-serif;
  }

  .spaced {
    letter-spacing: 0.5px;
  }
</style>

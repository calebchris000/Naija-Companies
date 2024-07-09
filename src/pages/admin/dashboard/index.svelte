<script>
  import Grid from "@src/assets/svg/grid.svelte";
  import Stat from "../components/stat.svelte";
  import Notifications from "../components/notifications.svelte";
  import "./style.css"
</script>

<main class="bg-gray-900 w-screen h-screen text-white test">
  <nav
    class="h-20 bg-gray-700 flex fixed left-0 right-0 items-center justify-between px-5"
  >
    <section>
      <button type="button">
        <Grid className="w-10 text-white" />
      </button>
    </section>
    <section></section>
    <section class="flex items-center gap-2">
      <div class="h-10 w-10 bg-white rounded-full">
        <img src="" alt="" />
      </div>
      <button type="button" class="flex flex-col gap-1">
        <span class="text-xs font-medium spaced">Caleb Nwaizu</span>
        <span class="text-xs font-medium spaced">calebchris000@gmail.com</span>
      </button>
    </section>
  </nav>

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
    <div class="w-full h-full bg-gray-700 col-span-6 row-span-6"></div>
    <div class="w-full h-full bg-gray-700 row-span-6 col-span-3"></div>
    <div class="w-full h-full bg-gray-700 row-span-6 col-span-3"></div>
    <div class="w-full h-full bg-gray-700 col-span-3 row-span-4"></div>
    <div class="w-full h-full bg-gray-700 col-span-3 row-span-4"></div>
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

<script lang="ts">
  import Logout from "@src/assets/svg/logout.svelte";
  import { Link, navigate } from "svelte-routing";

  const routes = [{ label: "About", path: "/about" }];
  const account_actions = [{ label: "Preferences", path: "/account_edit" }];

  function handleLogout() {
    localStorage.clear();
    navigate("/home");
  }
</script>

<section class="bg-white p-2 px-4 flex flex-col gap-4">
  <div>
    <span>Account</span>
    <div class="font-medium mt-2 flex flex-col gap-2">
      {#each account_actions as { label, path }}
        <Link to="/home">{label}</Link>
      {/each}
    </div>
    <button
      on:click={handleLogout}
      class="bg-orange-500 p-4 py-3 mt-2 w-full rounded-md mx-auto flex items-center gap-2 justify-center text-white font-medium"
      type="button"
    >
      <Logout className="w-6" />
      <span>Logout</span>
    </button>
  </div>
</section>

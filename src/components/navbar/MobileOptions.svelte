<script lang="ts">
  import { Link } from "svelte-routing";

  const routes = [{ label: "About", path: "/about" }];
  const account_actions = [{ label: "Preferences", path: "/account_edit" }];
</script>

<section class="bg-white p-2 px-4 flex flex-col gap-4">
  <div>
    <span>Account</span>
    <div class="font-medium mt-2 flex flex-col gap-2">
      {#each account_actions as { label, path }}
        <Link to="">{label}</Link>
      {/each}
    </div>
    <button
      class="bg-orange-500 p-4 py-3 mt-2 w-full rounded-md mx-auto block font-medium"
      type="button">Logout</button
    >
  </div>
</section>

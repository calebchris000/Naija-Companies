<script lang="ts">
  import { Link } from "svelte-routing";

  const routes = [{ label: "About", path: "/about" }];
  const account_actions = [
    { label: "Edit Details", path: "/account_edit" },
    { label: "Delete Account", path: "/account_delete" },
  ];
</script>

<section class="bg-white p-2 px-4 flex flex-col gap-4">
  <div>
    <span class="text-sm">MENU</span>
    <div class="flex flex-col gap-1">
      {#each routes as { label, path }}
        <Link to={path}
          ><span class="font-medium text-lg">
            {label}
          </span>
        </Link>
      {/each}
    </div>
  </div>
  <div>
    <span class="text-sm">ACCOUNT</span>
    <div class="flex flex-col gap-1">
      {#each account_actions as { label, path }}
        <Link to={path}
          ><span class="font-medium text-lg">
            {label}
          </span>
        </Link>
      {/each}
    </div>
  </div>
</section>

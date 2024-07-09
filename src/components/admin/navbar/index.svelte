<script lang="ts">
  import Logout from "@src/assets/svg/logout.svelte";
  import { handleLogout } from "@src/core/utils/utils";


</script>



<nav class="fixed h-20 bg-blue-900 w-full flex justify-between px-24 items-center">
    <div></div>
    <div></div>
    <div>
        <button
        class="bg-orange-500 p-2 flex gap-2 items-center px-4 rounded-md font-medium text-white"
        type="button"
        on:click={handleLogout}
        ><Logout className="w-6 rotate-180" />
        <span>Logout</span>
      </button>
    </div>
</nav>
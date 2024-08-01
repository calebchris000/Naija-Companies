<script lang="ts">
    import BellRead from "@src/assets/svg/bell_read.svelte";
    import Logout from "@src/assets/svg/logout.svelte";
    import { handleLogout } from "@src/core/utils/utils";
</script>

<nav
    class="fixed h-20 bg-blue-900 w-full flex justify-between px-24 items-center"
>
    <div></div>
    <div></div>
    <div class="flex items-center gap-10">
        <button class="relative" type="button">
            <BellRead className="w-10" />
            <span
                class="w-5 h-5 block absolute overflow-hidden -top-3 -right-3 rounded-full bg-red-500"
                >1</span
            >
        </button>
        <button
            class="bg-yellow-500 p-2 flex gap-2 items-center px-4 rounded-full font-medium text-white"
            type="button"
            on:click={handleLogout}
            ><Logout className="w-6 rotate-180" />
            <span>Logout</span>
        </button>
    </div>
</nav>

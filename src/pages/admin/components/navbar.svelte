<script lang="ts">
    import Grid from "@src/assets/svg/grid.svelte";
    import { handleLogout, useUserData } from "@src/core/utils/utils";
    import default_user from "@src/assets/default_user.png";
    import Logout from "@src/assets/svg/logout.svelte";

    const user = useUserData();
    const full_name = `${user.firstName} ${user.lastName}`;
    const email = user.email;
    $: show_menu = false;

    function handleShowMenu() {
        show_menu = !show_menu;
    }
</script>

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
            <img class="h-full w-full scale-[1.4]" src={default_user} alt="" />
        </div>
        <button
            on:click={handleShowMenu}
            type="button"
            class="flex flex-col relative gap-1"
        >
            <span class="text-xs font-medium spaced">{full_name}</span>
            <span class="text-xs font-medium spaced">{email}</span>

            <div
                style="opacity: {show_menu
                    ? '1'
                    : '0'}; pointer-events: {show_menu ? 'auto' : 'none'}"
                class="absolute top-10 bg-gray-700 transition-all border border-gray-500 text-black left-0 right-0 p-2"
            >
                <button
                    class="bg-gray-900 p-1 w-full flex gap-2 items-center px-4 rounded-full font-medium text-gray-300"
                    type="button"
                    on:click={handleLogout}
                    ><Logout className="w-3 rotate-180" />
                    <span class="text-sm">Logout</span>
                </button>
            </div>
        </button>
    </section>
</nav>

<script lang="ts">
    import User from "@src/assets/svg/User.svelte";
    import Building from "@src/assets/svg/Building.svelte";
    import logo from "@src/assets/svg/logo_white.svg";
    import { Link, navigate } from "svelte-routing";
    import { store } from "@src/lib/store";
    import { LocalStorage } from "@src/core/utils/utils";

    const routes = [
        { name: "Users", url: "/admin/dashboard/user", Icon: User },
        {
            name: "Organizations",
            url: "/admin/dashboard/organization",
            Icon: Building,
        },
        {
            name: "Reviews",
            url: "/admin/dashboard/organization",
            Icon: Building,
        },
    ];

    $: selected = $store.sidebar_selected;

    function handleClick(name: string, url: string) {
        $store.sidebar_selected = name;
        navigate(url);
    }
</script>

<nav class="h-screen w-64 bg-blue-900 py-20 px-5 flex flex-col gap-10">
    <div class="w-full border-b p-4 flex items-center justify-center">
        <img class="w-32" src={logo} alt="" />
    </div>
    <div class="flex flex-col gap-2">
        {#each routes as { name, url, Icon }}
            <button
                id={url}
                type="button"
                on:click={() => {
                    handleClick(name, url);
                }}
                on:mousedown={() => {
                    handleClick(name, url);
                }}
                style="background-color: {selected === name
                    ? '#f97316'
                    : ''}; color: {selected === name ? 'black' : ''}"
                class="font-medium text-xl p-4 transition-all text-white hover:text-black hover:bg-white flex items-center gap-4"
            >
                <Icon className="w-4" />
                <Link to={url}>{name}</Link>
                <!-- <span>{name}</span> -->
            </button>
        {/each}
    </div>
</nav>

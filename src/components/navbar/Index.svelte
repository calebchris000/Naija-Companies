<script lang="ts">
    import logo_white from "@src/assets/logo-white.png";
    import { VerifyToken } from "@src/core/api/auth";
    import { useToken } from "@src/core/utils/utils";
    import { store } from "@src/lib/store";
    import { Link } from "svelte-routing";
    import MobileMenu from "./mobile_menu.svelte";

    const token = useToken();
    let authenticated = false;
    $: {
        VerifyToken({ token }).then((result) => {
            if (result.status === 200) {
                authenticated = true;
            }
        });
    }
</script>

<div
    class="navbar bg-primary justify-between sticky top-0 z-[100] gap-10 px-10"
>
    <div class="flex items-center gap-10">
        <div class="w-40 flex-grow-0 flex-shrink-0">
            <Link class=" text-xl" to="/">
                <img class="w-full" src={logo_white} alt="" />
            </Link>
        </div>
        <div class="gap-2 md:block hidden">
            <a
                class="btn btn-ghost text-gray-300 normal-case"
                href="/home/review">Companies</a
            >
            <a class="btn btn-ghost text-gray-300 normal-case" href="/home"
                >Features</a
            >
            <a class="btn btn-ghost text-gray-300 normal-case" href="/home"
                >Services</a
            >
        </div>
    </div>

    <button
        type="button"
        on:click={() => {
            $store.mobileSidebarOpen = !$store.mobileSidebarOpen;
        }}
        class=""
    >
        <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                />
            </svg>
        </label>
    </button>

    <div class="hidden lg:block">
        {#if authenticated}
            <a
                href="/signup"
                class="btn bg-white text-primary border-none hover:bg-gray-100"
                >Review an Organization</a
            >
        {:else}
            <a
                href="/signup"
                class="btn bg-white text-primary border-none hover:bg-gray-100"
                >Get Started</a
            >
        {/if}
    </div>

    <MobileMenu />
</div>

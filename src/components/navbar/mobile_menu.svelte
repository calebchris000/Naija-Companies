<script lang="ts">
    import { VerifyToken } from "@src/core/api/auth";
    import { useToken } from "@src/core/utils/utils";
    import { store } from "@src/lib/store";
    import { onMount } from "svelte";

    let parent: HTMLDivElement | undefined = undefined;
    const token = useToken();
    let authenticated = false;
    $: {
        VerifyToken({ token }).then((result) => {
            if (result.status === 200) {
                authenticated = true;
            }
        });
    }
    $: screenWidth = 0;

    $: {
        if ($store.mobileSidebarOpen && parent) {
            parent.style.right = "5px";
        } else if (parent) {
            parent.style.right = `${-screenWidth}px`;
        }
    }

    onMount(() => {
        screenWidth = window.innerWidth;
        window.addEventListener("resize", () => {
            screenWidth = window.innerWidth;
        });
    });
</script>

<div
    bind:this={parent}
    class:hidden={screenWidth > 1024}
    class="card card-compact transition-all ease-in-out duration-[500ms] h-[85%] top-[45%] -translate-y-[40%] bg-white w-72 fixed right-5"
>
    <div class="p-4 w-full flex flex-col space-y-2 gap-2">
        <div class="card w-full gap-2 md:hidden">
            <a href="#" class="btn btn-ghost text-primary w-full">Services</a>
            <a href="#" class="btn btn-ghost text-primary w-full">Features</a>
            <a href="#" class="btn btn-ghost text-primary w-full">Companies</a>
        </div>
        {#if authenticated}
            <a href="#" class="btn btn-ghost text-primary w-full"
                >Review an Organization</a
            >
        {:else}
            <div class="card gap-4">
                <a
                    href="/signup"
                    class="btn btn-ghost px-10 text-primary border-none hover:bg-gray-100"
                    >Get Started</a
                >
                <a
                    href="/login"
                    class="btn btn-ghost px-10 text-primary border-none"
                    >Login</a
                >
            </div>
        {/if}
    </div>
</div>

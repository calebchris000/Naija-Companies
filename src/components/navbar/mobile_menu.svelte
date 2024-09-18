<script lang="ts">
    import { store } from "@src/lib/store";
    import { onMount } from "svelte";

    let parent: HTMLDivElement | undefined = undefined;
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
    <div class="p-4 w-full flex flex-col space-y-2 gap-4">
        <a href="#" class="btn btn-ghost text-primary w-full"
            >Review Organizations</a
        >

        <div class="card w-full gap-4 md:hidden">
            <a href="#" class="btn btn-ghost text-primary w-full">Companies</a>
            <a href="#" class="btn btn-ghost text-primary w-full">Features</a>
            <a href="#" class="btn btn-ghost text-primary w-full">Services</a>
        </div>
    </div>
</div>

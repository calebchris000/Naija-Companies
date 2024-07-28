<script lang="ts">
    import logo from "@src/assets/logo.png";
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import { VerifyToken } from "@src/core/api/auth";
    import { useToken } from "@src/core/utils/utils";
    import { Link, navigate } from "svelte-routing";

    export let disabled = false;
    export let className = "";

    const token = useToken();
    $: menu_open = false;
    $: screen_height = window.innerHeight;
    $: scroll_y = 0;

    let menu_element: HTMLDivElement;
    let nav_element: HTMLElement;

    function handleMenuToggle() {
        menu_open = !menu_open;
        console.log(menu_open);
    }

    window.addEventListener("scroll", () => {
        scroll_y = window.scrollY;
    });

    window.addEventListener("resize", () => {
        setTimeout(() => {
            menu_element.style.display = "flex";
        }, 1000);
        menu_element.style.display = "none";
        menu_open = false;
        screen_height = window.innerHeight;
    });
</script>

<nav
    bind:this={nav_element}
    style="box-shadow: {scroll_y > 0
        ? '0 1px 10px rgba(131, 143, 165, 0.5)'
        : ''}; z-index: {scroll_y > 0 ? '100' : '50'}"
    class="sticky top-10 w-full bg-primary h-20 transition-all {className}"
>
    <!--* Desktop -->
    <div class="hidden lg:flex items-center w-full h-full px-10 gap-20">
        <button
            type="button"
            on:click={() => {
                window.location.href = "/home";
            }}
            class="items-center hidden lg:flex"
        >
            <img class="w-36 -translate-y-1" src={logo} alt="" />
        </button>
        {#if !disabled}
            <div class="items-center gap-10 font-medium text-secondary lg:flex">
                <Link to="/home">Blog</Link>
                <Link to="/home">Features</Link>
                <Link to="/home">Services</Link>
            </div>
            <div class="gap-4 items-center justify-self-end lg:flex ms-auto">
                {#await VerifyToken({ token }) then { status, data }}
                    {#if status === 200}
                        <button
                            on:click={() => {
                                navigate("/home/capital");
                            }}
                            class=" bg-cto p-2 px-4 rounded-lg font-semibold text-light"
                            type="button">Dashboard</button
                        >
                    {:else}
                        <button
                            on:click={() => {
                                navigate("/signup");
                            }}
                            class=" bg-cto p-2 px-4 rounded-lg font-semibold text-light"
                            type="button">Get Started</button
                        >
                        <button
                            on:click={() => {
                                navigate("/login");
                            }}
                            class="font-semibold text-cto"
                            type="button">Log In</button
                        >
                    {/if}
                {:catch err}
                    <button
                        on:click={() => {
                            navigate("/signup");
                        }}
                        class=" bg-cto p-2 px-4 rounded-lg font-semibold text-light"
                        type="button">Get Started</button
                    >
                    <button
                        on:click={() => {
                            navigate("/login");
                        }}
                        class="font-semibold text-cto"
                        type="button">Log In</button
                    >
                {/await}
            </div>
        {/if}
    </div>
    <!--* Desktop  -->

    <!--* Mobile -->
    <div
        class="w-full h-full z-0 px-4 flex relative items-center justify-end lg:hidden"
    >
        <img
            style="left: {disabled ? '8%' : '50%'}; transform: {disabled
                ? 'translateX(0)'
                : 'translateX(-50%)'}"
            class="w-40 absolute"
            src={logo}
            alt=""
        />

        {#if !disabled}
            <button
                on:click={handleMenuToggle}
                type="button"
                class="w-6 flex flex-col gap-2"
            >
                <span class="w-full h-[0.3rem] rounded-lg bg-secondary"></span>
                <span class="w-full h-[0.3rem] rounded-lg bg-secondary"></span>
            </button>

            <div
                bind:this={menu_element}
                on:wheel|preventDefault={() => {}}
                style="height: {menu_open
                    ? '100vh'
                    : '0'}; padding-top: {menu_open
                    ? '2.5rem'
                    : '0'}; padding-bottom: {menu_open ? '2.5rem' : '0'}"
                class="fixed slow-transition flex w-full h-full z-[9999] flex-col overflow-hidden p-10 justify-between inset-0 bg-secondary"
            >
                <div class="flex justify-end w-full">
                    <button
                        on:click={handleMenuToggle}
                        type="button"
                        class="w-8 flex flex-col gap-2 absolute right-4"
                    >
                        <span
                            class="w-full h-[0.3rem] rounded-lg rotate-45 bg-primary"
                        ></span>
                        <span
                            class="w-full h-[0.3rem] rounded-lg -rotate-45 bg-primary absolute"
                        ></span>
                    </button>
                </div>

                <!-- svelte-ignore a11y-interactive-supports-focus -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                    role="button"
                    on:click={() => {
                        menu_open = false;
                    }}
                    class="flex flex-col gap-4"
                >
                    <Link
                        class="text-[4rem] text-primary font-semibold"
                        to="/home">Blog</Link
                    >
                    <Link
                        class="text-[4rem] text-primary font-semibold"
                        to="/home">Features</Link
                    >
                    <Link
                        class="text-[4rem] text-primary font-semibold"
                        to="/home">Services</Link
                    >
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-interactive-supports-focus -->
                <div
                    role="button"
                    on:click={() => {
                        menu_open = false;
                    }}
                    class="flex flex-col gap-4"
                >
                    {#await VerifyToken({ token }) then { status }}
                        {#if status === 200}
                            <Link
                                class="text-[4rem] flex items-center gap-8 text-light font-semibold"
                                to="/home/capital"
                            >
                                <span>Review</span>
                                <Arrow className="w-8 rotate-180" />
                            </Link>
                        {:else}
                            <Link
                                class="text-[4rem] text-light font-semibold"
                                to="/signup">Sign Up</Link
                            >
                            <Link
                                class="text-[4rem] text-light font-semibold"
                                to="/login">Log In</Link
                            >
                        {/if}
                    {:catch err}
                        <Link
                            class="text-[4rem] text-light font-semibold"
                            to="/signup">Sign Up</Link
                        >
                        <Link
                            class="text-[4rem] text-light font-semibold"
                            to="/login">Log In</Link
                        >
                    {/await}
                </div>
            </div>
        {/if}
    </div>
    <!--* Mobile  -->
</nav>

<style>
    .slow-transition {
        transition: all 0.8s ease-in-out;
    }
</style>

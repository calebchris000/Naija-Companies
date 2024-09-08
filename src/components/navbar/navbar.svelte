<script lang="ts">
    import logo_white from "@src/assets/logo-white.png";
    import logo_black from "@src/assets/logo.png";
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import Exit from "@src/assets/svg/exit.svelte";
    import Pencil from "@src/assets/svg/Pencil.svelte";
    import PersonFilled from "@src/assets/svg/person_filled.svelte";
    import User from "@src/assets/svg/User.svelte";
    import { VerifyToken } from "@src/core/api/auth";
    import { LocalStorage, useToken, useUserData } from "@src/core/utils/utils";
    import { Link, navigate } from "svelte-routing";

    export let disabled = false;
    export let className = "";
    export let use_dark_logo = false;

    const token = useToken();
    const local_storage = new LocalStorage();
    let user = useUserData();
    $: menu_open = false;
    $: screen_height = window.innerHeight;
    $: scroll_y = 0;
    $: profile_menu_open = false;

    let menu_element: HTMLDivElement;
    let nav_element: HTMLElement;

    function handleMenuToggle() {
        menu_open = !menu_open;
    }

    function handleLogout() {
        local_storage.clear();
        window.location.reload();
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
        ? '0 1px 5px rgba(255,255,255, 0.1)'
        : ''}; z-index: {scroll_y > 0 ? '100' : '50'}"
    class="sticky top-0 w-full bg-primary h-20 transition-all {className}"
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
            <img
                class="w-36 -translate-y-1"
                src={use_dark_logo ? logo_black : logo_white}
                alt=""
            />
        </button>
        {#if !disabled}
            <div class="items-center gap-10 font-medium text-secondary lg:flex">
                <Link
                    class="border-b-2 transition-all border-transparent hover:border-orange-500"
                    to="/home/review">Companies</Link
                >
                <Link
                    class="border-b-2 transition-all border-transparent hover:border-orange-500"
                    to="/home">Features</Link
                >
                <Link
                    class="border-b-2 transition-all border-transparent hover:border-orange-500"
                    to="/home">Services</Link
                >
            </div>
            <div class="gap-4 items-center justify-between xl:flex ms-auto">
                {#await VerifyToken({ token }) then { status, data }}
                    {#if status === 200}
                        <button
                            on:click={() => {
                                navigate("/home/review");
                            }}
                            class=" bg-secondary transition-all w-fit justify-self-end flex items-center gap-4 p-2 px-4 rounded-full font-semibold text-primary"
                            type="button"
                        >
                            <span>Write A Review</span>
                            <Pencil className="w-4" />
                        </button>

                        <button
                            on:click={() => {
                                profile_menu_open = !profile_menu_open;
                            }}
                            type="button"
                            class=" w-fit relative transition-all p-1 px-4 flex items-center gap-4 border border-secondary border-opacity-25 hover:border-opacity-100 rounded-full ms-end"
                        >
                            <div
                                class="h-8 w-8 bg-secondary grid place-items-center rounded-full"
                            >
                                <PersonFilled className="w-3 text-primary" />
                            </div>
                            <span class="text-white flex font-medium"
                                >{user?.firstName} {user?.lastName}</span
                            >

                            <div
                                class:opacity-100={profile_menu_open}
                                class:pointer-events-auto={profile_menu_open}
                                class="transition-all pointer-events-none opacity-0 bg-white overflow-hidden w-full absolute top-12 left-0 right-0 rounded-2xl"
                            >
                                <button
                                    class="text-primary hover:bg-primary w-full transition-all py-2 hover:text-secondary"
                                    on:click|stopPropagation={handleLogout}
                                    >Logout</button
                                >
                            </div>
                        </button>
                    {:else}
                        <button
                            on:click={() => {
                                navigate("/signup");
                            }}
                            class=" bg-secondary p-2 px-6 rounded-full font-semibold text-primary"
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
                        class=" bg-cto p-2 px-6 rounded-full font-semibold text-primary"
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
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
            on:click={() => {
                navigate("/home");
            }}
            style="left: {disabled ? '16px' : '50%'}; transform: {disabled
                ? 'translateX(0)'
                : 'translateX(-50%)'}"
            class="w-40 absolute cursor-pointer"
            src={use_dark_logo ? logo_black : logo_white}
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
                class="fixed slow-transition flex w-full h-full z-[9999] flex-col overflow-hidden p-10 justify-between inset-0 bg-black"
            >
                <div class="flex justify-end w-full">
                    <button
                        on:click={handleMenuToggle}
                        type="button"
                        class="w-8 flex flex-col gap-2 absolute right-4"
                    >
                        <span
                            class="w-full h-[0.3rem] rounded-lg rotate-45 bg-secondary"
                        ></span>
                        <span
                            class="w-full h-[0.3rem] rounded-lg -rotate-45 bg-secondary absolute"
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
                        class="text-[4rem] text-secondary font-semibold"
                        to="/home/review">Companies</Link
                    >
                    <Link
                        class="text-[4rem] text-secondary font-semibold"
                        to="/home">Features</Link
                    >
                    <Link
                        class="text-[4rem] text-secondary font-semibold"
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
                                class="text-[4rem] flex items-center gap-8 text-secondary font-semibold"
                                to="/home/review"
                            >
                                <span>Review</span>
                                <Arrow className="w-8 rotate-180" />
                            </Link>
                            <button
                                on:click={handleLogout}
                                class="text-white grid items-center grid-cols-2 gap-4 text-[4rem] font-semibold w-fit h-fit"
                                type="button"
                            >
                                <span>Logout</span>
                                <Exit className="w-12 ms-auto" />
                            </button>
                        {:else}
                            <Link
                                class="text-[4rem] text-secondary font-semibold"
                                to="/signup">Sign Up</Link
                            >
                            <Link
                                class="text-[4rem] text-secondary font-semibold"
                                to="/login">Log In</Link
                            >
                        {/if}
                    {:catch err}
                        <Link
                            class="text-[4rem] text-secondary font-semibold"
                            to="/signup">Sign Up</Link
                        >
                        <Link
                            class="text-[4rem] text-secondary font-semibold"
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

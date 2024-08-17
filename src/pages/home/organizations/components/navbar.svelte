<script lang="ts">
    import logo from "@src/assets/logo.png";
    import BellRead from "@src/assets/svg/bell_read.svelte";
    import BellUnread from "@src/assets/svg/bell_unread.svelte";
    import PersonFilled from "@src/assets/svg/person_filled.svelte";
    import User from "@src/assets/svg/User.svelte";
    import { navigate } from "svelte-routing";

    export let shadow = true;
</script>

<nav
    class="h-20 sticky top-0 left-0 right-0 bg-secondary z-50 flex items-center justify-between px-10"
    style={shadow
        ? "box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"
        : ""}
>
    <button
        type="button"
        on:click={() => {
            navigate("/home");
        }}
        class="-translate-y-1"
    >
        <img class="w-44" src={logo} alt="logo" />
    </button>

    <div class="flex items-center gap-20">
        <button type="button" class="bell">
            <BellRead
                className="w-6 lg:block hidden fill-primary transition-transform hover:scale-105"
            />
        </button>

        <button class="text-primary flex items-center gap-2" type="button">
            <span
                class="w-8 h-8 rounded-full bg-primary grid place-items-center"
            >
                <PersonFilled className="text-secondary w-4" />
            </span>
            <abbr title="Caleb Nwaizu" class="no-underline hidden lg:inline"
                ><span class="font-medium">Caleb Nwaizu</span></abbr
            >
        </button>
    </div>
</nav>

<style>
    .bell:hover {
        animation: bellShake 0.5s ease-in-out;
    }

    @keyframes bellShake {
        0%,
        100% {
            transform: rotate(0);
        }
        25% {
            transform: rotate(10deg);
        }
        50% {
            transform: rotate(-10deg);
        }
        75% {
            transform: rotate(5deg);
        }
    }
</style>

<script lang="ts">
  import Building from "@src/assets/svg/Building.svelte";
  import Category from "@src/assets/svg/category.svelte";
  import logo from "@src/assets/svg/logo.svg";
  import Logout from "@src/assets/svg/logout.svelte";
  import Pencil from "@src/assets/svg/Pencil.svelte";
  import { handleLogout, useToken } from "@src/core/utils/utils";
  import { store } from "@src/lib/store";
  import { Link } from "svelte-routing";
  import { navigate } from "svelte-routing";

  export let show_right_action = true;
  $: device = $store.device;
  const token = useToken();

  function handleGetStarted() {
    navigate("/signup");
  }
</script>

<nav
  class="fixed w-full py-4 px-44 flex items-center z-50 justify-between gap-32 bg-white shadow-md"
>
  <button
    type="button"
    on:click={() => {
      navigate("/home");
    }}
    class="w-20"
  >
    <img src={logo} alt="logo" />
  </button>
  <div class="flex gap-6">
    {#if $store.user_role === "user"}
      <Link
        class="font-medium text-sm flex items-center gap-1"
        to="/home/capital"
      >
        <Pencil className="w-4" />
        <span>Write a Review</span>
      </Link>
      <Link class="font-medium text-sm flex items-center gap-2" to="/home">
        <Category className="w-5" />
        <span>Categories</span>
      </Link>
      <Link class="font-medium text-sm flex items-center gap-2" to="/home/organization/add">
        <Building className="w-3" />
        <span>Add An Organization</span>
      </Link>
      {:else if $store.user_role === "admin"}
      <Link class="font-medium text-sm flex items-center gap-2" to="/admin/dashboard">
        <Building className="w-3" />
        <span>Go To Dashboard</span>
      </Link>
    {:else}
      <Link class="font-medium text-sm" to="/home">About Us</Link>
      <Link class="font-medium text-sm" to="/home">FAQ</Link>
      <Link class="font-medium text-sm" to="/home">Contact</Link>
    {/if}
  </div>
  <div>
    {#if !token && show_right_action}
      <button
        on:click={handleGetStarted}
        class="bg-orange-500 p-2 px-4 rounded-md font-medium text-white"
        type="button">Get Started</button
      >
    {:else if show_right_action}
      <button
        class="bg-orange-500 p-2 flex gap-2 items-center px-4 rounded-md font-medium text-white"
        type="button"
        on:click={handleLogout}
        ><Logout className="w-6 rotate-180" />
        <span>Logout</span>
      </button>
    {/if}
  </div>
</nav>

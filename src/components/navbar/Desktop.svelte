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

  $: device = $store.device;
  const token = useToken();

  function handleGetStarted() {
    navigate("/signup");
  }
</script>

<nav
  class="fixed w-full py-4 px-44 flex items-center justify-between gap-32 bg-white shadow-md"
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
    {#if token}
      <Link
        class="font-medium text-sm flex items-center gap-1"
        to="/home/capital"
      >
        <Pencil className="w-4" />
        <span>Write a Review</span>
      </Link>
      <Link class="font-medium text-sm flex items-center gap-2" to="">
        <Category className="w-5" />
        <span>Categories</span>
      </Link>
      <Link class="font-medium text-sm flex items-center gap-2" to="">
        <Building className="w-3" />
        <span>Add An Organization</span>
      </Link>
    {:else}
      <Link class="font-medium text-sm" to="/home">About Us</Link>
    {/if}
  </div>
  <div>
    {#if !token}
      <button
        on:click={handleGetStarted}
        class="bg-orange-500 p-2 px-4 rounded-md font-medium text-white"
        type="button">Get Started</button
      >
    {:else}
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

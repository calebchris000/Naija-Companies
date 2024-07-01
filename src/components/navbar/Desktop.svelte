<script lang="ts">
  import logo from "@src/assets/svg/logo.svg";
  import { Link } from "svelte-routing";
  import { navigate } from "svelte-routing";

  function handleGetStarted() {
    navigate("/signup");
  }
</script>

<nav
  class="fixed w-full py-4 px-44 flex items-center justify-between gap-32 bg-white shadow-md"
>
  <div class="w-20">
    <img src={logo} alt="logo" />
  </div>
  <div>
    <Link class="font-medium text-sm" to="/home">About Us</Link>
  </div>
  <div>
    <button
      on:click={handleGetStarted}
      class="bg-orange-500 p-2 px-4 rounded-md font-medium text-white"
      type="button">Get Started</button
    >
  </div>
</nav>

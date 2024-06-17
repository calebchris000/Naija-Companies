<script lang="ts">
  import Navbar from "@src/components/navbar/Index.svelte";
  import Landing from "./Landing.svelte";
  import Pencil from "@src/assets/svg/Pencil.svelte";

  function handleWrite() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("login");
      return;
    }
    window.location.href = "/home/organizations?focus=true";
  }
</script>

<section>
  <Navbar>
    <div class="mx-auto flex items-center gap-1">
      <Pencil className="fill-orange-600 stroke-white w-4" />
      <button
        on:click={handleWrite}
        class="font-medium underline text-orange-600 p-0 text-nowrap"
        type="button">Write a Review</button
      >
    </div>
  </Navbar>

  <Landing />
</section>

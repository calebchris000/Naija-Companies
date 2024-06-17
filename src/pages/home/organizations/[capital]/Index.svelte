<script>
  import Navbar from "@src/components/navbar/Index.svelte";
  import Action from "@src/components/action/action.svelte";

  const capital = localStorage.getItem("params");
  console.log(capital);
</script>

<section class="pt-24">

  <Navbar>
    <div></div>
  </Navbar>
  <div>
    <Action title="Search Companies In {capital}" />
  </div>
</section>

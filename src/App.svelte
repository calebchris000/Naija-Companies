<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/home/Index.svelte";

  let url = "";

  function handleAutoRoute() {
    const { pathname } = window.location;

    const split = pathname.split("/");
    console.log(split);
    if (split[split.length - 1]) return;

    window.location.replace("home");
  }

  $: handleAutoRoute();
</script>

<main>
  <Router {url}>
    <Route path="/home" component={Home} />
  </Router>
</main>

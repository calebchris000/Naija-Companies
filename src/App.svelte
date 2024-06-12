<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/home/Index.svelte";
  import Login from "./pages/login/Index.svelte"
  import Signup from "./pages/signup/Index.svelte"
  
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
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/about" component={Home} />
  </Router>
</main>

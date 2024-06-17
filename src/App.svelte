<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/home/Index.svelte";
  import Login from "./pages/login/Index.svelte";
  import Signup from "./pages/signup/Index.svelte";
  import Organization from "@src/pages/home/organizations/Index.svelte";
  import Capital from "./pages/home/organizations/[capital]/Index.svelte";

  let url = "";

  function handleAutoRoute() {
    const { pathname } = window.location;

    const path =
      pathname[pathname.length - 1] === "/" ? pathname.slice(0, -2) : pathname;
    const split = path.split("/");
    if (split[split.length - 1]) return;

    window.location.href = "home";
  }

  $: handleAutoRoute();
</script>

<main>
  <Router {url}>
    <Route path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/about" component={Home} />
    <Route path="/home/organizations" component={Organization} />
    <Route path="/home/organizations/:capital" component={Capital} />
  </Router>
</main>

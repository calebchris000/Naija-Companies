<script lang="ts">
  import { Router, Route, link } from "svelte-routing";
  import Home from "./pages/home/Index.svelte";
  import Login from "./pages/login/Index.svelte";
  import Signup from "./pages/signup/Index.svelte";
  import Capital from "@src/pages/home/capital/Index.svelte";
  import Organization from "./pages/home/capital/[capital]/Index.svelte";
  import CompanyRedirect from "./pages/home/capital/[capital]/[organization]/Index.svelte";
  import Review from "./pages/home/capital/[capital]/[organization]/review/Index.svelte";
  import Reviews from "./pages/home/capital/[capital]/[organization]/reviews/Index.svelte";
  import CreateOrganization from "./pages/home/organization/create/Index.svelte";
  import { onMount } from "svelte";
  import { store } from "./lib/store";

  let url = "";
  console.log("Hi");

  function handleAutoRoute() {
    const { pathname } = window.location;

    const path =
      pathname[pathname.length - 1] === "/" ? pathname.slice(0, -2) : pathname;
    const split = path.split("/");
    if (split[split.length - 1]) return;

    window.location.href = "home";
  }

  $: handleAutoRoute();

  function handleResize() {
    const { innerWidth } = window;

    let deviceType;
    if (innerWidth >= 768 && innerWidth <= 1024) {
      $store.device = "tablet";
    } else if (innerWidth > 1024 && innerWidth <= 1200) {
      $store.device = "large-tablet";
    } else if (innerWidth > 1200) {
      $store.device = "desktop";
    } else {
      $store.device = "mobile";
    }
  }

  window.addEventListener("resize", handleResize);

  onMount(() => {
    handleResize();
  });
</script>

<main>
  <Router {url}>
    <Route path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/about" component={Home} />
    <Route path="/home/capital" component={Capital} />
    <Route path="/home/capital/:capital" component={Organization} />
    <Route path="/home/capital/:capital/:company" component={CompanyRedirect} />
    <Route path="/home/capital/:capital/:company/review" component={Review} />
    <Route path="/home/capital/:capital/:company/reviews" component={Reviews} />
    <Route path="/home/organization/add" component={CreateOrganization} />
  </Router>
</main>

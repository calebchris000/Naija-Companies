<script lang="ts">
  import { Router, Route, link, navigate } from "svelte-routing";
  import Home from "./pages/home/Index.svelte";
  import Login from "./pages/login/Index.svelte";
  import Signup from "./pages/signup/Index.svelte";
  import Capital from "@src/pages/home/capital/Index.svelte";
  import Organization from "./pages/home/capital/[capital]/Index.svelte";
  import CompanyRedirect from "./pages/home/capital/[capital]/[organization]/Index.svelte";
  import Review from "./pages/home/capital/[capital]/[organization]/review/Index.svelte";
  import Reviews from "./pages/home/capital/[capital]/[organization]/reviews/Index.svelte";
  import CreateOrganization from "./pages/home/organization/create/Index.svelte";
  import AdminDashboard from "@src/pages/admin/dashboard/index.svelte";
  import AdminOrganization from "@src/pages/admin/dashboard/organization/index.svelte";
  import AdminUsers from "@src/pages/admin/dashboard/user/index.svelte";
  import { onMount } from "svelte";
  import { store } from "./lib/store";
  import { Middleware } from "./middleware";
  import { useToken, useUserData } from "./core/utils/utils";

  let url = "";

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
    Middleware();
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

  <!-- Admin Routes -->
  <Router basepath="admin">
    <Route path="/dashboard" component={AdminDashboard} />
    <Route path="/dashboard/organization" component={AdminOrganization} />
    <Route path="/dashboard/user" component={AdminUsers} />
  </Router>
</main>

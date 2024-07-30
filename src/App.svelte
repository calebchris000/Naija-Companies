<script lang="ts">
    import { Router, Route, link, navigate } from "svelte-routing";
    import Home from "./pages/home/Index.svelte";
    import Login from "./pages/auth/login/Index.svelte";
    import Signup from "./pages/auth/signup/index.svelte";
    import Otp from "./pages/auth/otp/index.svelte";
    import Capital from "@src/pages/home/capital/Index.svelte";
    import Organization from "./pages/home/capital/[capital]/Index.svelte";
    import CompanyRedirect from "./pages/home/capital/[capital]/[organization]/Index.svelte";
    import Review from "./pages/home/capital/[capital]/[organization]/review/Index.svelte";
    import Reviews from "./pages/home/capital/[capital]/[organization]/reviews/Index.svelte";
    import CreateOrganization from "./pages/home/organization/create/Index.svelte";
    import AdminDashboard from "@src/pages/admin/dashboard/index.svelte";
    import { onMount } from "svelte";
    import { Middleware } from "./middleware";
    import { handleResize } from "./middleware/screen";

    let url = "";

    window.addEventListener("resize", handleResize);

    onMount(() => {
        Middleware();
    });
</script>

<main class="">
    <Router {url}>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/verify-otp" component={Otp} />
        <Route path="/about" component={Home} />
        <Route path="/home/capital" component={Capital} />
        <Route path="/home/capital/:capital" component={Organization} />
        <Route
            path="/home/capital/:capital/:company"
            component={CompanyRedirect}
        />
        <Route
            path="/home/capital/:capital/:company/review"
            component={Review}
        />
        <Route
            path="/home/capital/:capital/:company/reviews"
            component={Reviews}
        />
        <Route path="/home/organization/add" component={CreateOrganization} />
    </Router>

    <!-- Admin Routes -->
    <Router basepath="admin">
        <Route path="/dashboard" component={AdminDashboard} />
    </Router>
</main>

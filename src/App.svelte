<script lang="ts">
    import { Router, Route, link, navigate } from "svelte-routing";
    import Home from "./pages/home/Index.svelte";
    import Login from "./pages/auth/login/Index.svelte";
    import Signup from "./pages/auth/signup/index.svelte";
    import Otp from "./pages/auth/otp/index.svelte";
    import SignupSuccess from "./pages/auth/success/index.svelte";
    import FindCompanies from "./pages/auth/find-companies/index.svelte";
    import Review from "./pages/home/organizations/index.svelte";
    import Organization from "./pages/home/organizations/[id]/index.svelte";
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
        <Route path="/signup/find-companies" component={FindCompanies} />
        <Route path="/signup/verify-otp" component={Otp} />
        <Route path="/signup/success" component={SignupSuccess} />

        <Route path="/about" component={Home} />

        <Route path="/home/review" component={Review} />

        <Route path="/home/organizations/:id" component={Organization} />
    </Router>

    <!-- Admin Routes -->
    <Router basepath="admin">
        <Route path="/dashboard" component={AdminDashboard} />
    </Router>
</main>

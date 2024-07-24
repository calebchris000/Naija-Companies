<script lang="ts">
    import AboutUs from "@src/components/Landing/about-us.svelte";
    import BestRated from "@src/components/Landing/best-rated.svelte";
    import Footer from "@src/components/Landing/footer.svelte";
    import Hero from "@src/components/Landing/Hero.svelte";
    import Sector from "@src/components/Landing/sector.svelte";
    import Stats from "@src/components/Landing/stats.svelte";
    import Navbar from "@src/components/navbar/navbar.svelte";
</script>

<section class="">
    <Navbar />
    <Hero />
    <Stats />
    <Sector />
    <BestRated />
    <AboutUs />
    <Footer />
</section>

<svelte:head>
    <title>Naija Companies - Home</title>
</svelte:head>

<style>
</style>

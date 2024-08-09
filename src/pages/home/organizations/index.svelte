<script lang="ts">
    import Navbar from "./components/navbar.svelte";
    import Search from "./components/search.svelte";
</script>

<section class="h-screen bg-secondary">
    <Navbar />

    <section>
        <div class="mt-10 w-[50vw] mx-auto">
            <Search
                placeholder="Search a company"
                input_class="bg-gray-200 placeholder:text-primary text-primary"
            />
        </div>
        <div></div>
        <div></div>
    </section>
</section>

<script lang="ts">
    import CompanyList from "./components/company_list.svelte";
    import Filters from "./components/filters.svelte";
    import Navbar from "./components/navbar.svelte";
    import Search from "./components/search.svelte";
</script>

<section class="h-full org bg-secondary">
    <Navbar />

    <section class="px-10 flex flex-col gap-10">
        <div class="mt-10 w-[50vw] mx-auto flex flex-col gap-4">
            <Search
                placeholder="Search a company"
                input_class="bg-gray-200 placeholder:text-primary text-primary"
            />
            <Filters />
        </div>
        <div class="flex flex-col gap-10">
            <CompanyList type="Trending" />
            <CompanyList type="Upcoming Startups" />
        </div>
    </section>
</section>

<style>
    .org {
        font-family: "Inter", sans-serif;
    }
</style>

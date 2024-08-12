<script lang="ts">
    import CompanyList from "./components/company_list.svelte";
    import Filters from "./components/filters.svelte";
    import Navbar from "./components/navbar.svelte";
    import Search from "./components/search.svelte";
</script>

<section class="h-full 2xl:h-screen org bg-secondary">
    <Navbar />

    <section class="px-10 flex flex-col gap-10">
        <div class="mt-10 w-[50vw] mx-auto flex flex-col gap-4">
            <Search
                on:itemSelect={(e) => {
                    console.log(e.detail, "is selected");
                }}
                placeholder="Search a company"
                input_class="bg-gray-200 placeholder:text-primary text-primary"
            />
            <Filters
                on:filter={(e) => {
                    console.log("filter is", e.detail);
                }}
                on:sort={(e) => {
                    console.log("sort is ", e.detail);
                }}
            />
        </div>
        <div class="flex flex-col gap-10">
            <CompanyList type="Trending" />
            <CompanyList type="Upcoming Startups" />
        </div>
    </section>
</section>

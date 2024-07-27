<script>
    import CompanyCard from "./components/company-card.svelte";
    import CompanyReview from "./components/company-review.svelte";
</script>

<section class="lg:p-32 p-4 h-full py-20 space-y-10">
    <div class="flex flex-col gap-4 items-center font-medium text-secondary">
        <span class="text-center text-2xl lg:text-3xl"
            >Best Rated Organization Of 2024</span
        >
        <span class="lg:max-w-[50vw] text-center font-normal leading-loose"
            >Discover top-rated Nigerian employers across industries.
            Employee-verified excellence based on workplace satisfaction and
            company culture.</span
        >
    </div>
    <div
        class="grid grid-cols-1 max-h-[350px] gap-y-4 lg:grid-cols-12 lg:gap-10 lg:h-[50vh]"
    >
        <CompanyCard className="col-span-7" />
        <CompanyReview className="col-span-5" />
    </div>
</section>

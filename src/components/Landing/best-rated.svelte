<script>
    import CompanyCard from "./components/company-card.svelte";
    import CompanyReview from "./components/company-review.svelte";
</script>

<section class="lg:px-10 p-4 space-y-10 bg-white flex flex-col py-20">
    <div
        class="flex flex-col gap-4 items-center font-medium text-s text-primary"
    >
        <span
            class="text-center text-3xl leading-relaxed underline underline-offset-8"
            >Best Rated Organization Of 2024</span
        >
        <span class="lg:max-w-[50vw] text-center font-normal leading-loose"
            >Discover top-rated Nigerian employers across industries.
            Employee-verified excellence based on workplace satisfaction and
            company culture.</span
        >
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <CompanyCard className="lg:col-span-7" />
        <CompanyReview className="lg:col-span-5" />
    </div>
</section>

<script>
  import CompanyCard from "./company-card.svelte";
  import CompanyReview from "./company-review.svelte";
</script>

<section class="xl:p-32 p-4 h-full py-20 space-y-10 xl:h-screen">
  <div class="flex flex-col gap-4 items-center font-medium text-secondary">
    <span class="text-center text-2xl xl:text-3xl">Best Rated Organization Of 2024</span>
    <span class="xl:max-w-[50vw] text-center font-normal leading-loose"
      >Discover top-rated Nigerian employers across industries.
      Employee-verified excellence based on workplace satisfaction and company
      culture.</span
    >
  </div>
  <div class="grid grid-cols-1 gap-y-4 xl:grid-cols-12 xl:gap-10 h-[50vh]">
    <CompanyCard className="col-span-7" />
    <CompanyReview className="col-span-5" />
  </div>
</section>

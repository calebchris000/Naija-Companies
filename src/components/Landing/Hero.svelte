<script lang="ts">
    import hero_review from "@src/assets/svg/hero_review.svg";
    import Search from "@src/assets/svg/search.svelte";
</script>

<section
    class="hero lg:max-h-[700px] bg-gradient-to-br w-full separator grid grid-cols-1 lg:grid-cols-12 h-screen lg:h-[85vh] bg-primary p-4 py-10 lg:p-32 lg:px-10 lg:py-10 pb-0 lg:pb-0"
>
    <div class="w-full h-full flex flex-col gap-4 z-10 lg:col-span-5">
        <span
            class="leading-tight text-4xl font-medium text-secondary text-center lg:text-start lg:text-[40px]"
        >
            Uncover the Truth About Nigerian Workplaces - Read <b>Authentic</b> Employee
            Reviews
        </span>
        <span class="text-secondary leading-loose text-center lg:text-start">
            Get honest insights from real Nigerian employees. Make informed
            career decisions based on genuine workplace experiences.
        </span>

        <div
            class="bg-secondary flex h-16 items-center p-4 gap-4 rounded-full mt-5 lg:h-12"
        >
            <Search className="lg:w-6 w-10 text-primary" />
            <input
                class="text-light placeholder:text-primary font-medium outline-none w-full bg-transparent"
                placeholder="Search for a company"
                type="text"
                name=""
                id=""
            />
        </div>
    </div>
    <div class="w-full lg:col-span-7 hidden lg:block z-10 -translate-y-5">
        <img class="ms-auto w-[28rem]" src={hero_review} alt="" />
    </div>
</section>

<style>
    .hero {
        z-index: 10;
    }
    .hero::after {
        content: "";
        position: absolute;
        inset: 0;
        height: calc(100vh + 5rem);
        /* background-image: url("../../assets/overlay/death-star.svg"); */
        background-size: 80px;
        opacity: 0.05;
        z-index: 0;
    }
</style>

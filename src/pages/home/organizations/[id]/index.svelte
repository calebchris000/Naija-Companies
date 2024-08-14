<script lang="ts">
    import { onMount } from "svelte";
    import Pencil from "@src/assets/svg/Pencil.svelte";
    import Navbar from "../components/navbar.svelte";
    import CompanyInfo from "./components/company_info.svelte";
    import { getStarColor, getStarRating } from "@src/core/logic/getStarRating";
    import Reviews from "./components/reviews.svelte";
    import HalfStar from "@src/assets/svg/half_star.svelte";
    import Star from "@src/assets/svg/star.svelte";
    import EmptyStar from "@src/assets/svg/empty_star.svelte";
    type DetailType = {
        id: string;
        image: string;
        name: string;
        type: string;
        average: number;
        website: string;
        description: string;
        verified: boolean;
    };

    const params_id = window.location.href.split("/").slice(-1).join("");
    const detail: DetailType = {
        id: "comp123",
        image: "https://picsum.photos/200",
        name: "TechWave Solutions",
        type: "Technology",
        average: 4.7,
        website: "https://techwavesolutions.com",
        description:
            "Innovative software solutions for all businesses. Expert team delivers cutting-edge tech tailored to needs. Comprehensive services: custom apps, cloud integration, cybersecurity. Driving digital transformation, empowering organizations to stay ahead, focusing on scalability and user experience.",
        verified: true,
    };
    const stars = getStarRating(detail.average);
    let top_section: HTMLDivElement;

    $: isIntersecting = true as any;
    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                isIntersecting = entry.isIntersecting;
            },
            { threshold: 0.1 },
        );

        if (top_section) {
            observer.observe(top_section);
        }

        return () => {
            if (top_section) {
                observer.unobserve(top_section);
            }
        };
    });
</script>

<section class="h-full bg-secondary max-w-[120rem] mx-auto">
    <Navbar shadow={isIntersecting} />
    <section class="mx-auto mt-10 px-56">
        <div bind:this={top_section} class="flex flex-col gap-4">
            <CompanyInfo />
            <div
                class="bg-primary w-full h-24 rounded-3xl p-4 px-8 flex justify-between items-center"
            >
                <button
                    class="text-secondary flex items-center gap-4"
                    type="button"
                >
                    <span class="">Write a review</span>
                    <Pencil className="w-4" />
                </button>

                <button
                    class="text-secondary text-4xl flex gap-1"
                    type="button"
                >
                    <EmptyStar className="w-6" />
                    <EmptyStar className="w-6" />
                    <EmptyStar className="w-6" />
                    <EmptyStar className="w-6" />
                    <EmptyStar className="w-6" />
                </button>
            </div>
        </div>
        <figure
            class:opacity-100={!isIntersecting}
            class:pointer-events-none={isIntersecting}
            class="opacity-0 transition-all max-w-[120rem] mx-auto fixed top-20 shadow-md bg-gray-100 px-10 py-4 left-0 right-0 flex flex-col gap-4"
        >
            <section class="flex items-center gap-4">
                <div class="w-16 rounded-full overflow-hidden">
                    <img src={detail.image} alt="" />
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-xl font-medium text-primary"
                        >{detail.name}</span
                    >
                    <span
                        style="color: {getStarColor(detail.average)}"
                        class="text-2xl flex gap-1"
                    >
                        {#each stars as star}
                            {#if star === "half"}
                                <HalfStar className="w-5" />
                            {:else if star === "empty"}
                                <EmptyStar className="w-5" />
                            {:else}
                                <Star className="w-5" />
                            {/if}
                        {/each}</span
                    >
                </div>
            </section>
            <section class="flex items-center justify-between">
                <button
                    class="bg-gradient-to-r from-red-500 to-orange-500 text-secondary p-2 px-4 rounded-full"
                    type="button">Summarize Review</button
                >
                <button
                    class="bg-primary flex items-center gap-2 text-secondary p-2 px-4 rounded-full"
                    type="button"
                >
                    <span>Write a Review</span>
                    <Pencil className="w-3" />
                </button>
            </section>
        </figure>
        <div>
            <Reviews />
        </div>
    </section>
</section>

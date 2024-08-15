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
    import type { OrganizationDetailType, ReviewType } from "@src/types";
    import { GetOrganization } from "@src/core/api/organization";
    import { useToken } from "@src/core/utils/utils";
    import { Notification } from "@src/utils/notification";
    import MultipleStars from "@src/assets/svg/multiple_stars.svelte";
    import { store } from "@src/lib/store";
    import Editor from "@src/components/editor/Editor.svelte";

    const params_id = window.location.href.split("/").slice(-1).join("");
    const token = useToken();
    const notification = new Notification();
    const detail: OrganizationDetailType = {
        id: "comp123",
        name: "TechWave Solutions",
        logoUrl: "https://picsum.photos/200",
        industry: "Technology",
        average: 4.7,
        website: "https://techwavesolutions.com",
        description:
            "Innovative software solutions for all businesses. Expert team delivers cutting-edge tech tailored to needs. Comprehensive services: custom apps, cloud integration, cybersecurity. Driving digital transformation, empowering organizations to stay ahead, focusing on scalability and user experience.",
        verified: true,
    };

    let top_section: HTMLDivElement;

    $: organization_detail = {} as OrganizationDetailType;
    $: reviews = [] as ReviewType[];
    $: reviews_filter = reviews as ReviewType[];
    $: stars = getStarRating(detail.average);
    $: image_loaded = false as boolean;
    $: review_modal_open = false;
    $: isIntersecting = true as any;

    function handleSummarize() {
        $store.summarize_status = "pending";
    }
    onMount(() => {
        GetOrganization({
            token,
            organizationId: params_id,
            query: "getReviews=true",
        }).then((d) => {
            const { status, data } = d;

            if (status !== 200) {
                return notification.error({
                    text: data?.message ?? "Could not get organization info",
                });
            }
            organization_detail = data.data as OrganizationDetailType;
            reviews = data.data.reviews as ReviewType[];
        });
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

<section class=" bg-secondary max-w-[120rem] mx-auto">
    <Navbar shadow={isIntersecting} />
    <section class="mx-auto mt-10 px-56">
        <div bind:this={top_section} class="flex flex-col gap-4">
            <CompanyInfo detail={organization_detail} />

            <section
                class:opacity-100={review_modal_open}
                class:pointer-events-auto={review_modal_open}
                class="fixed z-[100] transition-all opacity-0 grid place-items-center pointer-events-none overflow-hidden inset-0"
            >
                <div
                    class="absolute inset-0 bg-black bg-opacity-45 backdrop-filter backdrop-blur-sm"
                ></div>
                <div
                    class="relative rounded-2xl p-10 bg-secondary w-[60vw] h-[70vh] flex flex-col gap-4 justify-between"
                >
                    <div class="flex justify-between items-center">
                        <input
                            class="text-2xl font-semibold outline-none text-primary placeholder:text-primary"
                            type="text"
                            placeholder="Title..."
                        />
                        <span class="text-3xl flex gap-1">
                            <EmptyStar
                                className="w-6 bg-secondary text-primary"
                            />
                            <EmptyStar
                                className="w-6 bg-secondary text-primary"
                            />
                            <EmptyStar
                                className="w-6 bg-secondary text-primary"
                            />
                            <EmptyStar
                                className="w-6 bg-secondary text-primary"
                            />
                            <EmptyStar
                                className="w-6 bg-secondary text-primary"
                            />
                        </span>
                    </div>
                    <Editor focus={review_modal_open} />
                    <div class="flex z-10 items-center justify-between">
                        <button
                            on:click={() => {
                                review_modal_open = false;
                            }}
                            class="font-medium bg-primary text-secondary p-2 px-4 rounded-full"
                            type="button">Cancel</button
                        >
                        <button
                            class="font-medium bg-primary text-secondary p-2 px-4 rounded-full"
                            type="button">Submit</button
                        >
                    </div>
                </div>
            </section>
            <div
                class="bg-primary w-full h-24 rounded-3xl p-4 px-8 flex justify-between items-center"
            >
                <button
                    on:click={() => {
                        review_modal_open = !review_modal_open;
                    }}
                    class="text-secondary hover:text-primary hover:bg-secondary p-3 px-2 rounded-lg transition-all flex items-center gap-4"
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
            class="opacity-0 z-50 transition-all max-w-[120rem] mx-auto fixed top-20 shadow-md bg-gray-100 px-10 py-4 left-0 right-0 flex flex-col gap-4"
        >
            <section class="flex items-center gap-4">
                <div class="w-16 rounded-full overflow-hidden">
                    {#if !image_loaded}
                        <span
                            class="w-full h-16 bg-gray-200 flex items-center justify-center text-gray-400"
                        >
                            Logo
                        </span>
                    {/if}
                    <img
                        class:hidden={!image_loaded}
                        on:load={() => {
                            image_loaded = true;
                        }}
                        src={organization_detail.logoUrl}
                        alt=""
                    />
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
                    on:click={handleSummarize}
                    class:linear_animate={$store.summarize_status === "pending"}
                    class="bg-gradient-to-r from-red-500 to-orange-500 text-secondary p-2 px-4 rounded-full flex items-center gap-2"
                    type="button"
                >
                    <span>Summarize Review</span>
                    <div
                        class:rotate={$store.summarize_status === "pending"}
                        style="transition: transform 1s linear;"
                    >
                        <MultipleStars className="w-6 " />
                    </div>
                </button>
                <button
                    class="bg-primary flex items-center gap-2 text-secondary p-2 px-4 rounded-full"
                    type="button"
                >
                    <span>Write a Review</span>
                    <Pencil className="w-4" />
                </button>
            </section>
        </figure>
        <div>
            <Reviews reviews={reviews_filter} />
        </div>
    </section>
</section>

<style>
    .rotate {
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .linear_animate {
        background-size: 200% 200%;
        animation: gradient 2s ease infinite;
    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .blur {
        background: rgba(255, 255, 255, 0);
        backdrop-filter: blur(9.7px);
        -webkit-backdrop-filter: blur(9.7px);
    }
</style>

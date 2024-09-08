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
    import { useToken, useUserData } from "@src/core/utils/utils";
    import { Notification } from "@src/utils/notification";
    import MultipleStars from "@src/assets/svg/multiple_stars.svelte";
    import { store } from "@src/lib/store";
    import Editor from "@src/components/editor/Editor.svelte";
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import InteractiveStars from "./components/interactive_stars.svelte";
    import { AddReview } from "@src/core/api/review";
    import { navigate } from "svelte-routing";

    const params_id = window.location.href.split("/").slice(-1).join("");
    const token = useToken();
    const user = useUserData();
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

    $: organization_detail = $store.organization.selected ?? {};
    $: reviews = [] as ReviewType[];
    $: reviews_filter = reviews as ReviewType[];
    $: image_loaded = false as boolean;
    $: isIntersecting = true as any;
    $: stars = getStarRating(detail.average);
    $: review_data = { title: "", content: "" } as {
        title: string;
        content: string[] | "";
    };

    function handleSummarize() {
        $store.summarize_status = "pending";

        setTimeout(() => {
            $store.summarize_status = "inactive";
            notification.info({ text: "Feature is coming very soon!" });
        }, 1000);
    }

    async function handleSubmit() {
        if (!$store.organization.rating) {
            return notification.error({
                text: "Please provide a rating for your review",
            });
        }

        if (!review_data.title) {
            return notification.error({
                text: "Please provide a title for your review",
            });
        }
        if (!review_data.content?.length) {
            return notification.error({
                text: "Please provide content for your review",
            });
        }

        const response = await AddReview({
            token,
            data: {
                ...review_data,
                content: review_data.content,
                rating: String($store.organization.rating),
                organizationId: $store.organization.id,
            },
        });

        if (response.status !== 201) {
            return notification.error({
                text: response.data ?? "Failed to add review",
            });
        }
        $store.review_modal_open = false;

        notification.success({
            text: "Review added successfully",
        });

        // Refresh reviews
        GetOrganization({
            token,
            organizationId: params_id,
            query: "getReviews=true",
        }).then((d) => {
            if (d.status === 200) {
                reviews = d.data.data.reviews as ReviewType[];
            }
        });
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
            $store.organization.selected = data.data as OrganizationDetailType;
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

<section class="  lg:max-w-[120rem] mx-auto">
    <Navbar shadow={isIntersecting} />
    <section class="mx-auto mt-10 xl:px-56">
        <div bind:this={top_section} class="flex flex-col gap-4 px-4 xl:p-0">
            <CompanyInfo />

            <section
                class:opacity-100={$store.review_modal_open}
                class:pointer-events-auto={$store.review_modal_open}
                class="fixed z-[100] transition-all opacity-0 grid place-items-center pointer-events-none overflow-hidden inset-0"
            >
                <div
                    class="absolute inset-0 bg-black bg-opacity-45 backdrop-filter backdrop-blur-sm"
                ></div>
                <div
                    class="relative select-none rounded-2xl p-10 bg-secondary w-[60vw] h-[70vh] flex flex-col gap-4 justify-between"
                >
                    <div class="flex justify-between items-center">
                        <input
                            on:input={(e) => {
                                if (!e.target) return;
                                review_data.title = e.target.value;
                            }}
                            class="text-2xl font-semibold outline-none text-primary placeholder:text-primary"
                            type="text"
                            placeholder="Title..."
                        />
                        <InteractiveStars />
                    </div>
                    <Editor
                        on:change={(e) => {
                            review_data.content = e.detail;
                        }}
                    />
                    <div class="flex z-10 items-center justify-between">
                        <button
                            on:click={() => {
                                $store.review_modal_open = false;
                            }}
                            class="font-medium hover:bg-orange-500 hover:font-semibold transition-all hover:border-transparent hover:text-white flex items-center gap-4 border border-primary text-primary p-2 px-6 rounded-full"
                            type="button"
                        >
                            <Arrow className="w-4" />
                            <span>Cancel</span>
                        </button>
                        <button
                            on:click={handleSubmit}
                            class="font-medium flex items-center gap-4 bg-primary text-secondary p-2 px-6 rounded-full"
                            type="button"
                        >
                            <span>Submit</span>
                            <Arrow className="w-4 rotate-180" />
                        </button>
                    </div>
                </div>
            </section>
            <div
                class="bg-primary w-full flex-col xl:flex-row h-24 rounded-xl p-4 px-8 flex justify-between items-center"
            >
                <button
                    on:click={() => {
                        if (!token || !user) {
                            navigate("/signup");
                            return;
                        }
                        $store.review_modal_open = !$store.review_modal_open;
                    }}
                    class="text-secondary hover:text-primary hover:bg-secondary p-2 px-4 rounded-full transition-all flex items-center gap-4"
                    type="button"
                >
                    <span class="">Write a review</span>
                    <Pencil className="w-4" />
                </button>

                <InteractiveStars
                    focus={$store.review_modal_open}
                    default_star_color="white"
                />
            </div>
        </div>
        <figure
            class:opacity-100={!isIntersecting}
            class:pointer-events-none={isIntersecting}
            class="opacity-0 hidden z-50 transition-all xl:max-w-[120rem] mx-auto fixed top-20 shadow-md bg-primary px-10 py-4 left-0 right-0 xl:flex justify-between gap-4"
        >
            <section class="flex xl:flex-row items-center gap-4">
                <div class="flex items-center gap-4">
                    <span class="text-xl font-semibold text-secondary"
                        >{detail.name}</span
                    >
                    <span style="color: white" class="text-2xl flex gap-1">
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
            <section
                class="flex items-center justify-between gap-4 space-x-4 xl:gap-0"
            >
                <button
                    on:click={handleSummarize}
                    class:linear_animate={$store.summarize_status === "pending"}
                    class="bg-gradient-to-r from-red-500 w-full xl:w-fit justify-between xl:justify-start to-orange-500 text-secondary p-2 px-4 rounded-full flex items-center gap-2"
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
                    on:click={() => {
                        if (!token || !user) {
                            navigate("/signup");
                            return;
                        }
                        $store.review_modal_open = !$store.review_modal_open;
                    }}
                    class="bg-secondary flex items-center gap-2 justify-between xl:justify-start w-full xl:w-fit text-primary p-2 px-4 rounded-full"
                    type="button"
                >
                    <span>Write a Review</span>
                    <Pencil className="w-4" />
                </button>
            </section>
        </figure>
        <div class="py-6 w-full px-4 xl:px-0">
            {#if !reviews_filter.length}
                <span
                    class="text-gray-600 text-lg font-medium w-fit block mx-auto"
                    >No reviews yet. Be the first to share your experience!</span
                >
            {:else}
                <Reviews reviews={reviews_filter} />
            {/if}
        </div>
    </section>
</section>

<svelte:head>
    <title>{$store.organization.selected.name} | Naija Companies</title>
</svelte:head>

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

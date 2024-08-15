<script lang="ts">
    import EmptyStar from "@src/assets/svg/empty_star.svelte";
    import Filter from "@src/assets/svg/filter.svelte";
    import HalfStar from "@src/assets/svg/half_star.svelte";
    import Like from "@src/assets/svg/Like.svelte";
    import MultipleStars from "@src/assets/svg/multiple_stars.svelte";
    import Star from "@src/assets/svg/star.svelte";
    import { getStarColor, getStarRating } from "@src/core/logic/getStarRating";
    import { store } from "@src/lib/store";
    import type { ReviewType } from "@src/types";
    import { Notification } from "@src/utils/notification";

    const notification = new Notification();
    $: rating_type = "All" as "All" | "5" | "4" | "3" | "2" | "1";

    export let reviews: any[] = [
        {
            id: "1",
            title: "Great work environment",
            content:
                "I've been working here for 2 years and I love the company culture. The team is supportive, and management really values work-life balance. We have regular team-building activities and the office amenities are top-notch. The flexible working hours are a big plus, and I appreciate the opportunities for professional development.",
            rating: 5,
            reviewer: "John Doe",
            isEmployee: true,
            agreed: 15,
            verified: true,
        },
        {
            id: "2",
            title: "Room for improvement",
            content:
                "The pay is good but the workload can be overwhelming at times. While the company offers competitive salaries, the project deadlines are often unrealistic. This leads to frequent overtime and stress. The management could improve on resource allocation and project planning. Despite these challenges, my colleagues are great to work with and the benefits package is comprehensive.",
            rating: 3,
            reviewer: "Jane Smith",
            isEmployee: true,
            agreed: 8,
            verified: true,
        },
        {
            id: "3",
            title: "Excellent customer service",
            content:
                "I had a great experience with their support team. Very helpful! When I encountered an issue with my product, I reached out to customer service expecting a long wait. To my surprise, I got an immediate response. The representative was knowledgeable, patient, and went above and beyond to resolve my problem. They even followed up a week later to ensure everything was still working well.",
            rating: 5,
            reviewer: "Mike Johnson",
            isEmployee: false,
            agreed: 22,
            verified: false,
        },
        {
            id: "4",
            title: "Disappointing product quality",
            content:
                "The product I received was not up to the standards I expected. The marketing materials promised high-quality materials and durability, but what I got fell short. The finish was inconsistent, and some parts felt flimsy. When I tried to return it, the process was unnecessarily complicated. While the customer service was polite, they couldn't fully address my concerns about the product quality.",
            rating: 2,
            reviewer: "Sarah Brown",
            isEmployee: false,
            agreed: 5,
            verified: false,
        },
        {
            id: "5",
            title: "Good company, but slow growth",
            content:
                "It's a stable job, but career progression is quite slow here. The company provides a secure work environment with good benefits, which is appreciated. However, the promotional opportunities are limited, and it often feels like there's a ceiling to how far you can advance. The company could benefit from implementing clearer career paths and more frequent performance reviews. Despite this, the work-life balance is excellent, and my colleagues are fantastic.",
            rating: 4,
            reviewer: "Chris Lee",
            isEmployee: true,
            agreed: 11,
            verified: true,
        },
    ];

    function handleSummarize() {
        $store.summarize_status = "pending";
    }
</script>

<section class="mt-10 text-primary w-full p-4 px-0 flex flex-col gap-4">
    <div class="flex items-center justify-between">
        <button
            on:click={handleSummarize}
            class:linear_animate={$store.summarize_status === "pending"}
            class="bg-gradient-to-r from-red-500 to-orange-500 text-secondary p-2 px-4 rounded-full flex items-center gap-2"
            type="button"
        >
            <span class="font-medium">Summarize Review</span>
            <div
                class:rotate={$store.summarize_status === "pending"}
                style="transition: transform 1s linear;"
            >
                <MultipleStars className="w-6 " />
            </div>
        </button>
        <button
            class="bg-primary flex items-center gap-4 p-2 px-4 rounded-full text-secondary"
            type="button"
        >
            <Filter className="fill-secondary w-4" />
            <span>Rating: <b class="ps-2">{rating_type}</b></span>
        </button>
    </div>
    <div class="flex flex-col gap-4">
        {#each reviews as review}
            <div
                class="review border border-gray-100 overflow-hidden rounded-3xl flex flex-col gap-2"
            >
                <div
                    class="flex px-10 py-5 bg-gray-100 items-center justify-between"
                >
                    <span class="font-medium text-lg">{review.title}</span>
                    <span
                        style="color: {getStarColor(review.rating)}"
                        class="text-2xl flex gap-1"
                    >
                        {#each getStarRating(review.rating) as star}
                            {#if star === "half"}
                                <HalfStar className="w-6" />
                            {:else if star === "empty"}
                                <EmptyStar className="w-6" />
                            {:else}
                                <Star className="w-6" />
                            {/if}
                        {/each}
                    </span>
                </div>

                <div class="px-10 py-5">
                    <span class="leading-loose">{review.content}</span>
                </div>

                <div
                    class="flex px-10 items-center justify-between w-full bg-gray-100 py-5"
                >
                    <div class="flex items-center gap-4">
                        <button
                            on:click={() => {
                                notification.info({
                                    text: "This feature will be implemented soon 🙂",
                                });
                            }}
                            class="flex items-center gap-2"
                            type="button"
                        >
                            <Like
                                className="w-6 hover:scale-110 transition-all"
                            />
                            <span>I agree</span>
                        </button>

                        <!-- <span>({review.agreed} agreed to this)</span> -->
                        {#if review?.agreed}
                            <span>(0 agreed to this)</span>
                        {/if}
                    </div>

                    <div class="flex font-medium items-center gap-2">
                        <span
                            >{review.reviewer.firstName}
                            {review.reviewer.lastName} -
                        </span>
                        <span
                            >{!review.isEmployee ? "Ex Employee" : "Employee"}
                        </span>
                        {#if review.verified}
                            <span class="w-3 h-3 bg-green-500 rounded-full"
                            ></span>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
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
</style>

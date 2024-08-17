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
    $: rating_open = false;
    $: rating_type = "All" as string | "All" | "5" | "4" | "3" | "2" | "1";

    export let reviews: any[] = [];

    $: reviews_filter = reviews;

    function handleSummarize() {
        $store.summarize_status = "pending";
        setTimeout(() => {
            $store.summarize_status = "inactive";
            notification.info({ text: "Feature is coming very soon!" });
        }, 1000);
    }

    function handleRating() {
        if (rating_type === "All") {
            reviews_filter = reviews;
        } else {
            reviews_filter = reviews.filter(
                (review) => review.rating === parseInt(rating_type),
            );
        }
    }
</script>

<section class="mt-10 text-primary w-full p-4 px-0 flex flex-col gap-4">
    <div class="flex items-center flex-col gap-4 justify-between xl:flex-row">
        <button
            on:click={handleSummarize}
            class:linear_animate={$store.summarize_status === "pending"}
            class="bg-gradient-to-r from-red-500 w-full p-4 xl:w-fit to-orange-500 text-secondary xl:p-2 px-4 rounded-full flex justify-between items-center gap-2 xl:justify-start"
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
            on:click={() => {
                rating_open = !rating_open;
            }}
            class="bg-primary relative flex w-full xl:w-fit p-4 items-center gap-4 xl:p-2 px-4 rounded-full text-secondary justify-between xl:flex-row flex-row-reverse xl:justify-start"
            type="button"
        >
            <Filter className="fill-secondary w-4" />
            <span
                >Rating: <b class="ps-2"
                    >{rating_type} {rating_type === "1" ? "star" : "stars"}</b
                ></span
            >

            {#if rating_open}
                <div
                    class="absolute flex flex-col rounded-xl overflow-hidden top-12 left-0 right-0 bg-white text-primary shadow-md"
                >
                    {#each ["All", "5", "4", "3", "2", "1"] as rating}
                        <button
                            on:click|stopPropagation={() => {
                                rating_open = false;

                                rating_type = rating.toString();
                                handleRating();
                            }}
                            type="button"
                            class="transition-all py-2 hover:bg-primary hover:text-secondary"
                            >{rating}
                        </button>
                    {/each}
                </div>
            {/if}
        </button>
    </div>
    <div class="flex flex-col gap-4">
        {#each reviews_filter as review}
            <div
                class="review border border-gray-100 overflow-hidden rounded-3xl flex flex-col gap-2"
            >
                <div
                    class="flex flex-col xl:flex-row px-10 gap-2 xl:gap-0 py-5 bg-gray-100 items-center justify-between"
                >
                    <span class="font-medium text-xl xl:text-lg"
                        >{review.title}</span
                    >
                    <span
                        style="color: {getStarColor(review.rating)}"
                        class="text-2xl flex gap-1"
                    >
                        {#each getStarRating(review.rating) as star}
                            {#if star === "half"}
                                <HalfStar className="xl:w-6 w-8" />
                            {:else if star === "empty"}
                                <EmptyStar className="xl:w-6 w-8" />
                            {:else}
                                <Star className="xl:w-6 w-8" />
                            {/if}
                        {/each}
                    </span>
                </div>

                <div class="px-10 py-5">
                    <span class="leading-loose">{@html review.content}</span>
                </div>

                <div
                    class="flex px-10 flex-col gap-4 xl:gap-0 xl:flex-row items-center justify-between w-full bg-gray-100 py-5"
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

                    <div
                        class="flex font-medium flex-col xl:flex-row items-center gap-2"
                    >
                        <span
                            >{review.reviewer.firstName}
                            {review.reviewer.lastName} -
                        </span>
                        <span>
                            {review.reviewer.isEmployee === null ||
                            typeof review.reviewer.isEmployee !== "boolean"
                                ? "Non Employee"
                                : review.reviewer.isEmployee
                                  ? "Employee"
                                  : "Ex Employee"}
                        </span>
                        {#if review.reviewer.experienceVerified}
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

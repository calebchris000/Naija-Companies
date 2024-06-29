<script lang="ts">
  import Like from "@src/assets/svg/Like.svelte";
  import LikeFilled from "@src/assets/svg/LikeFilled.svelte";
  import { DeleteReview, GetReviews } from "@src/core/api/review";
  import More from "@src/assets/svg/More.svelte";
  import { getStarRating } from "@src/core/logic/getStarRating";
  import { createEventDispatcher, onMount } from "svelte";
  import { useToken, useUserData } from "@src/core/utils/utils";
  import { Notification } from "@src/utils/notification";

  export let user_alias = "";
  export let options = ["Delete"];
  export let id = "";
  export let posterId = "";
  export let user_rating = 0;
  export let user_review = "";
  export let userReaction;
  export let reactions = { likes: 0, dislikes: 0 };
  const token = useToken();
  const user = useUserData();
  const dispatch = createEventDispatcher();
  const stars = getStarRating(user_rating).join("");
  $: max_length = 120;
  $: expand_review = user_review.length < max_length;
  $: show_options = false;

  function handleViewMore() {
    expand_review = !expand_review;

    if (max_length === 120) {
      max_length = -1;
    } else {
      max_length = 120;
    }
  }

  function handleReaction({ reaction }: any) {
    dispatch("reaction", { reaction, id });
  }

  function handleMoreOptions() {
    show_options = !show_options;
  }

  async function handleDelete() {
    const notification = new Notification();
    const response = await DeleteReview({ token, reviewId: id });

    if (response.status !== 200) {
      notification.error({ text: response.data ?? "Could not delete review" });
      return;
    }
    notification.success({
      text: response.data?.message ?? "Successfully removed review",
    });
    dispatch("delete");
  }

  function handleClick(option: string) {
    console.log(option);
    show_options = !show_options;

    switch (option) {
      case "Delete":
        handleDelete();
        break;

      default:
        break;
    }
  }

  $: star_color =
    user_rating < 2.5
      ? "red"
      : user_rating >= 2.5 && user_rating <= 3.5
        ? "orange"
        : "green";
</script>

<section class="w-full flex flex-col bg-gray-50">
  <div
    class="flex items-center relative justify-between gap-6 px-4 py-2 bg-gray-300"
  >
    <span class="font-medium text-lg">{user_alias}</span>
    <span style="color: {star_color}" class="text-2xl">{stars}</span>
    {#if user.id === posterId}
      <button on:click={handleMoreOptions} type="button" class="">
        <More className="w-5" />
      </button>
    {/if}

    {#if show_options}
      <div class="bg-white absolute right-0 shadow-md top-10 p-2">
        {#each options as option}
          <button
            on:click|stopPropagation={() => handleClick(option)}
            type="button"
            class="block w-fit">{option}</button
          >
        {/each}
      </div>
    {/if}
  </div>
  <div class="px-4 py-4 flex flex-col overflow-y-scroll min-h-20 max-h-44">
    <span class="text-lg"
      >{@html user_review.slice(0, max_length)}{!expand_review
        ? "..."
        : ""}</span
    >
    <div class="mt-2 flex items-center justify-between">
      {#if user_review.length > max_length}
        <button
          on:click={handleViewMore}
          type="button"
          class="w-fit text-orange-600 text-xs"
          >View {expand_review ? "Less" : "More"}</button
        >
      {/if}
      <span class="w-fit ms-auto font-medium text-orange-600 text-xs"
        >Mar 12, 2024</span
      >
    </div>
  </div>
  <div class="w-full flex items-start">
    <button
      style=""
      on:click={() => {
        userReaction === "liked"
          ? handleReaction({ reaction: "no_reaction" })
          : handleReaction({ reaction: "liked" });
      }}
      class="transition-all flex gap-2 bg-gray-200 items-center justify-center hover:bg-gray-300 text-sm h-full py-3 w-full"
      type="button"
    >
      {#if userReaction === "liked"}
        <LikeFilled className="w-6" />
      {:else}
        <Like className="w-6" />
      {/if}

      <span> I agree</span>
      <span class="font-medium"
        >{reactions.likes ? `(${reactions.likes})` : ""}</span
      >
    </button>
    <button
      on:click={() => {
        userReaction === "disliked"
          ? handleReaction({ reaction: "no_reaction" })
          : handleReaction({ reaction: "disliked" });
      }}
      class="flex gap-2 items-center justify-center transition-all hover:bg-gray-300 text-sm h-full py-3 w-full text-red-400 bg-gray-200"
      type="button"
    >
      {#if userReaction === "disliked"}
        <LikeFilled className="w-5 rotate-180 mt-1" />
      {:else}
        <Like className="w-5 rotate-180 mt-1" />
      {/if}
      <span>I disagree</span>
      <span class="font-medium"
        >{reactions.dislikes ? `(${reactions.dislikes})` : ""}</span
      >
    </button>
  </div>
</section>

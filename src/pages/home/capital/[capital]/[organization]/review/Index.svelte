<script lang="ts">
  import Editor from "@src/components/editor/Editor.svelte";
  import Review from "@src/components/review/Review.svelte";
  import Action from "@src/components/action/action.svelte";
  import Navbar from "@src/components/navbar/navbar.svelte";
  import { Notification } from "@src/utils/notification";
  import {
    useLocalStorage,
    useToken,
    useUserData,
  } from "@src/core/utils/utils";
  import { store } from "@src/lib/store";
  import { AddReview, GetReviews, ReactReview } from "@src/core/api/review";
  import { navigate } from "svelte-routing";
  import Pencil from "@src/assets/svg/Pencil.svelte";
  import ReviewOutline from "@src/assets/svg/ReviewOutline.svelte";
  import { onMount } from "svelte";

  const user = useUserData();
  const token = useToken();
  $: reviews = [] as any;
  $: review_status = "not_reviewed";

  function saveItem() {
    const saveEditor = new CustomEvent("onSaveEditor");
    document.dispatchEvent(saveEditor);
  }

  async function handleSave(data: { content: any[]; star: any }) {
    const organizationId: any = (
      useLocalStorage({
        key: "selected_organization",
        isString: false,
      }) as any
    )?.id;
    const notification = new Notification();
    const { content, star } = data;
    if (!content.length) {
      notification.error({ text: "Write a review" });
      return;
    }

    const to_plain_html = `<div>${content.join("")}</div>`;
    const review_data = {
      content: to_plain_html,
      star: star === 0 ? 0.5 : star,
      organizationId,
    };

    const response = await AddReview({ token, data: review_data });
    if (response.status !== 201) {
      console.log(response.data);

      notification.error({
        text: response.data ?? "Could not add review. Try again.",
      });
      return;
    }
    notification.success({ text: "Review added!" });

    setTimeout(() => {
      const { href } = window.location;
      let href_ = href[href.length - 1] === "/" ? href.slice(0, -1) : href;
      navigate(`${href_}s`);
    }, 4000);
  }

  async function getReviews() {
    const notification = new Notification();
    const organization = useLocalStorage({
      key: "selected_organization",
      isString: false,
    }) as any;
    const response = await GetReviews({
      token,
      organizationId: organization?.id as string,
    });

    if (response.status !== 200) {
      notification.error({
        text: response.data?.message ?? "Could not get reviews",
      });
      return;
    }
    reviews = response.data?.data as any[];
  }

  async function handleReaction(d: {
    id: string;
    reaction: "no_reaction" | "liked" | "disliked";
  }) {
    const notification = new Notification();
    const response = await ReactReview({
      token,
      data: { reviewId: d.id, reaction: d.reaction },
    });

    const status = [200, 201];

    if (!status.includes(response.status)) {
      notification.error({
        text: response.data?.message ?? "Could not react to review. Try again",
      });
      return;
    }

    console.log("Successfully add reaction");
    getReviews();
  }

  onMount(() => {
    getReviews();
  });
</script>

<section class="pt-20 xl:p-0 bg-gray-900">
  <Navbar>
    <button
      on:click={() => {
        const { href } = window.location;
        const _href =
          href[href.length - 1] === "/" ? href.slice(0, -1) + "s" : href + "s";
        navigate(_href);
      }}
      class="text-yellow-500 w-full justify-center p-1 transition-all flex items-center gap-2"
      type="button"
    >
      <span class="text-sm">View all reviews</span>
      <ReviewOutline className="w-4" />
    </button>
  </Navbar>
  <div class="py-4 xl:pt-20">
    <Action custom_path="/home" title="Write Your Review" />
  </div>

  <div
    class="px-4 flex flex-col gap-4 xl:w-[80vw] xl:mx-auto xl:flex-row xl:justify-between xl:gap-20"
  >
    <div class="flex flex-col gap-4 xl:w-full">
      <Editor
        on:save={(e) => {
          handleSave(e.detail);
        }}
      />
      <button
        class="bg-yellow-500 font-semibold w-fit mx-auto p-2 px-4 rounded-sm xl:w-full xl:rounded-xl xl:py-4"
        on:click={() => {
          saveItem();
        }}
        type="button">Add Review</button
      >
    </div>

    <div
      class=" flex flex-col gap-4 xl:w-full xl:mt-10 xl:h-[85vh] xl:overflow-y-scroll"
    >
      {#each reviews as { id, fullName, star, content, userReaction, userId, user_review }}
        <Review
          on:reaction={(e) => {
            handleReaction(e.detail);
          }}
          on:delete={() => getReviews()}
          {id}
          user_review={content}
          user_alias={fullName}
          {userReaction}
          user_rating={star}
          posterId={userId}
        />
      {/each}
    </div>
  </div>
</section>

<svelte:head>
  <title>See Reviews - Naija Companies</title>
</svelte:head>

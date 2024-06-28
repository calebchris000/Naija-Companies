<script lang="ts">
  import Editor from "@src/components/editor/Editor.svelte";
  import Review from "@src/components/review/Review.svelte";
  import Action from "@src/components/action/action.svelte";
  import Navbar from "@src/components/navbar/Index.svelte";
  import { reviews } from "@src/lib/rating";
  import { Notification } from "@src/utils/notification";
  import {
    useLocalStorage,
    useToken,
    useUserData,
  } from "@src/core/utils/utils";
  import { store } from "@src/lib/store";
  import { AddReview } from "@src/core/api/review";
  import { navigate } from "svelte-routing";
  import Pencil from "@src/assets/svg/Pencil.svelte";
  import ReviewOutline from "@src/assets/svg/ReviewOutline.svelte";

  const user = useUserData();
  const token = useToken();
  $: review_status = "not_reviewed";

  function saveItem() {
    const saveEditor = new CustomEvent("onSaveEditor");
    document.dispatchEvent(saveEditor);
  }

  async function handleSave(data: { content: any[] }) {
    const organizationId = useLocalStorage({
      key: "selected_organization",
      isString: false,
    })?.id;
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
      notification.error({
        text: response.data?.message ?? "Could not add review. Try again.",
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
</script>

<section class="pt-20">
  <Navbar>
    <button
      on:click={() => {
        const { href } = window.location;
        const _href =
          href[href.length - 1] === "/" ? href.slice(0, -1) + "s" : href + "s";
        navigate(_href);
      }}
      class="text-orange-500 w-full justify-center p-1 transition-all flex items-center gap-2"
      type="button"
    >
      <span class="text-sm">View all reviews</span>
      <ReviewOutline className="w-4" />
    </button>
  </Navbar>
  <div class="py-4">
    <Action custom_path="/home" title="Write Your Review" />
  </div>

  <div class="px-4 flex flex-col gap-4">
    <Editor
      on:save={(e) => {
        handleSave(e.detail);
      }}
    />
    <button
      class="bg-blue-500 text-white w-fit mx-auto p-2 px-4 rounded-sm"
      on:click={() => {
        saveItem();
      }}
      type="button">Add Review</button
    >

    <div class=" flex flex-col gap-4">
      {#each reviews as { fullName, star, user_review }}
        <Review user_alias={fullName} user_rating={star} {user_review} />
      {/each}
    </div>
  </div>
</section>

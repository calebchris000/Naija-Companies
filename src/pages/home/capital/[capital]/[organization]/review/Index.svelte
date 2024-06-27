<script lang="ts">
  import Editor from "@src/components/editor/Editor.svelte";
  import Review from "@src/components/review/Review.svelte";
  import Action from "@src/components/action/action.svelte";
  import Navbar from "@src/components/navbar/Index.svelte";
  import { reviews } from "@src/lib/rating";
  import { Notification } from "@src/utils/notification";
  import { useUserData } from "@src/core/utils/utils";

  const user = useUserData();
  $: review_status = "not_reviewed";

  function saveItem() {
    const saveEditor = new CustomEvent("onSaveEditor");
    document.dispatchEvent(saveEditor);
  }

  async function handleSave(data: { content: any[] }) {
    const notification = new Notification();
    const { content, star } = data;
    if (!content.length) {
      notification.error({ text: "Write a review" });
      return;
    }
    const userId = user.id;
    const review_data = { userId, content, star };

    console.log(content);
  }
</script>

<section class="pt-20">
  <Navbar>
    <div></div>
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
      {#each reviews as { user_alias, user_rating, user_review }}
        <Review {user_alias} {user_rating} {user_review} />
      {/each}
    </div>
  </div>
</section>

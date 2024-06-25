<script lang="ts">
  import Editor from "@src/components/editor/Editor.svelte";
  import Review from "@src/components/review/Review.svelte";
  import Company from "./../../Company.svelte";
  import Action from "@src/components/action/action.svelte";
  import Navbar from "@src/components/navbar/Index.svelte";
  import { reviews } from "@src/lib/rating";

  function saveItem() {
    const saveEditor = new CustomEvent("onSaveEditor");
    document.dispatchEvent(saveEditor);
  }
</script>

<section class="pt-20">
  <Navbar>
    <div></div>
  </Navbar>
  <div class="py-4">
    <Action title="Write Your Review" />
  </div>

  <div class="px-4 flex flex-col gap-4">
    <Editor />
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

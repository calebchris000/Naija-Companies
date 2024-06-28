<script lang="ts">
  import Editor from "@src/components/editor/Editor.svelte";
  import Review from "@src/components/review/Review.svelte";
  import Action from "@src/components/action/action.svelte";
  import Navbar from "@src/components/navbar/Index.svelte";
  import { reviews } from "@src/lib/rating";
  import { Notification } from "@src/utils/notification";
  import { useToken, useUserData } from "@src/core/utils/utils";
  import { store } from "@src/lib/store";
  import { AddReview } from "@src/core/api/review";
  import CompanyDetail from "@src/components/CompanyDetail/CompanyDetail.svelte";
  import { getStarColor } from "@src/core/logic/getStarRating";

  const user = useUserData();
  const token = useToken();
  $: review_status = "not_reviewed";

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
    <Action custom_path="/home" title="" />
  </div>

  <div class="px-4 flex flex-col gap-4">
    <CompanyDetail
      organization_name="Gurugeeks LTD"
      organization_review={2}
      organization_website="https://www.gurugeeks.com"
      organization_description="Gurugeeks develops cloud-based HRM software for mid-sized businesses. Their user-friendly platform streamlines hiring, onboarding, performance reviews, and payroll processes. Founded by HR veterans, PeopleFlow aims to simplify workforce management, boost employee engagement, and drive productivity."
      organization_logo="https://i.ibb.co/85czqJQ/Gemini-Generated-Image-rx2vc3rx2vc3rx2v.jpg"
    />
    <div class="flex flex-col gap-4 mt-10">
      {#each reviews as { user_alias, user_rating, user_review }}
        <Review {user_alias} {user_rating} {user_review} />
      {/each}
    </div>
  </div>
</section>


<svelte:head>
    <title>Gurugeeks LTD Reviews</title>
</svelte:head>

<script lang="ts">
  import edit from "@src/assets/svg/edit.svg";
  import Review from "@src/components/review/Review.svelte";
  import Action from "@src/components/action/action.svelte";
  import Navbar from "@src/components/navbar/Index.svelte";
  import { Notification } from "@src/utils/notification";
  import {
    useLocalStorage,
    useToken,
    useUserData,
  } from "@src/core/utils/utils";
  import { store } from "@src/lib/store";
  import { AddReview, GetReviews } from "@src/core/api/review";
  import CompanyDetail from "@src/components/CompanyDetail/CompanyDetail.svelte";
  import { getStarColor } from "@src/core/logic/getStarRating";
  import Select from "@src/components/Input/Select.svelte";
  import { getYears } from "@src/core/logic/getYears";
  import { months } from "@src/lib/months";
  import { onMount } from "svelte";
  import Building from "@src/assets/svg/Building.svelte";
  import Pencil from "@src/assets/svg/Pencil.svelte";
  import { navigate } from "svelte-routing";

  const user = useUserData();
  const token = useToken();
  $: reviews = [];
  $: reactions = [];
  $: review_status = "not_reviewed";

  function saveItem() {
    const saveEditor = new CustomEvent("onSaveEditor");
    document.dispatchEvent(saveEditor);
  }
  const years = getYears({ from: 2024, till: 1900 }).map((y) => ({
    id: Math.random() * 10,
    name: y,
  }));

  async function getReviews() {
    const notification = new Notification();
    const organization = useLocalStorage({
      key: "selected_organization",
      isString: false,
    });
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

  onMount(() => {
    getReviews();
  });
</script>

<section class="pt-20">
  <Navbar>
    <button
      on:click={() => {
        const { href } = window.location;
        const _href =
          href[href.length - 1] === "/" ? href.slice(0, -2) : href.slice(0, -1);
        navigate(_href);
      }}
      class="text-orange-500 w-full justify-center p-1 transition-all flex items-center gap-2"
      type="button"
    >
      <span class="text-sm">Write a review</span>
      <Pencil className="w-3" />
    </button>
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
    <div class="py-5 flex items-center justify-between gap-8">
      <!-- <span class="font-medium text-lg">Filter</span> -->
      <Select list={years} placeholder="Year" className="w-full" icon={edit} />
      <Select
        list={months}
        placeholder="Month"
        className="w-full"
        icon={edit}
      />
    </div>
    <div class="flex flex-col gap-4">
      {#each reviews as { fullName, star, quickReactionView, content }}
        <Review
          reactions={quickReactionView}
          user_alias={fullName}
          user_rating={star}
          user_review={content}
        />
      {/each}
    </div>
  </div>
</section>

<svelte:head>
  <title>Gurugeeks LTD Reviews</title>
</svelte:head>
